import { Injectable , Inject, Logger, InternalServerErrorException, BadRequestException, ConflictException, NotFoundException} from '@nestjs/common';
import { CalculateDto } from './dto/addition.dto.js';
import { CalculateResult, CardInboxItem } from '@project/shared-types';
import { CreateCard } from '@project/shared-types';

import { CreateCardDto } from './dto/create-card.dto.js';
import { TriggerGenerationDto } from './dto/card-creation-request.dto.js';

import { DRIZZLE } from '../database/database.tokens.js';
import type { DrizzleDBSchema } from '../database/database.module.js';
import { cards_inbox } from '../database/schema/cards.schema.js';
import { ReviewCardDto } from './dto/review-card.dto.js';
import { UpdateCardSchedulerDto } from './dto/update-card-scheduler.dto.js';
import { CardStatus } from '@project/shared-types';
import { asc, eq, and, Many, count, isNull,lte,or, inArray} from 'drizzle-orm';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

// Other Service
import { ReviewSystemService } from '../review-system/review-system.service.js';

// Entities
import { GeneratedCardResponse } from '@project/shared-types';
import type { InsertCard } from '../database/schema/cards.schema.js';
import type  { SelectCard } from '../database/schema/cards.schema.js';
@Injectable()
export class CardsService {

    private readonly logger = new Logger(CardsService.name);

    constructor(@Inject(DRIZZLE) private readonly db: DrizzleDBSchema, private readonly httpService: HttpService, private reviewSystemService: ReviewSystemService){}
    retrieveCard(payload: CalculateDto): CalculateResult{
        console.log("Received payload: ", payload)
        const result = payload.n1 + payload.n2 
        return {result: result}
    }

    async triggerCardGenerationN8n(id: number, triggerGenerationDto: TriggerGenerationDto): Promise<GeneratedCardResponse>{
       const webhookUrl = "http://localhost:5678/webhook/14eff6ff-36f8-4f43-b025-9282659dbf99"
       
        try {
            // Craft the POST request with the exact payload expected by n8n
            const response = await firstValueFrom(
                this.httpService.post<GeneratedCardResponse>(
                webhookUrl,
                {
                    userId: id,
                    deck: triggerGenerationDto.deck,
                    content: triggerGenerationDto.content,
                },
                {
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    timeout: 30000, // 30s timeout to allow the LLM chain to complete
                },
                ),
            );

            // Axios puts the response body in .data
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                this.logger.error(
                `n8n request failed [${error.response?.status}]: ${JSON.stringify(error.response?.data || error.message)}`,
                );
            } else {
                this.logger.error('Unexpected failure dispatching to n8n', error);
            }

            throw new InternalServerErrorException('Failed to process card generation in n8n');
        }

    }

        async newCard( createCardDto: CreateCardDto) {
            const insertVal: InsertCard = {
            ...createCardDto,
            };

            const id = createCardDto.userId

            try {
            // Must await the insert so try/catch actually intercepts SQLite errors
            const result = await this.db
                .insert(cards_inbox)
                .values(insertVal)
                .returning()
                .get();

            return result;
            } catch (error: any) {
            // 1. Log the full SQLite error internally for debugging
            this.logger.error(
                `Failed to insert card for userId ${id}: ${error.message}`,
                error.stack,
            );

            // 2. Handle specific SQLite constraint errors cleanly
            if (error.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
                throw new BadRequestException(
                `User with ID ${id} does not exist in the database`,
                );
            }

            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                throw new ConflictException(
                'A card with this exact unique constraint already exists',
                );
            }

            if (error.code === 'SQLITE_CONSTRAINT_NOTNULL') {
                throw new BadRequestException(
                `Missing required non-nullable field: ${error.message}`,
                );
            }

            // 3. Fallback for other syntax or schema errors, exposing the specific message
            throw new InternalServerErrorException(
                `Database insertion failed: ${error.message || 'Unknown database error'}`,
            );
        }
    }

    updateStatus(id: number, userId: number, reviewCardDto: ReviewCardDto){
        if (reviewCardDto.status === CardStatus.ACCEPTED){
             return this.db.update(cards_inbox).set({status:CardStatus.ACCEPTED}).where(eq(cards_inbox.id, id)).returning().get()
        }
        else {
            return this.db.update(cards_inbox).set({status:CardStatus.REJECTED}).where(eq(cards_inbox.id, id)).returning().get()
        }
    }

    getCardsPending(id: number): CardInboxItem[] {
        return this.db.select().from(cards_inbox).where(and(eq(cards_inbox.status, CardStatus.PENDING), eq(cards_inbox.userId, id ))).orderBy(asc(cards_inbox.receivedAt)).all()
    }




    // Get the number of card pending to be reviewed
    async findTodayReviewCount(userId: number): Promise<number> {
        const cutoff = new Date(); // or endOfToday depending on whether you want strictly due now vs due today
        cutoff.setHours(23, 59, 59, 999);

        const [result] = await this.db
            .select({ total: count() })
            .from(cards_inbox)
            .where(
            and(
                eq(cards_inbox.userId, userId),
                eq(cards_inbox.status, 'ACCEPTED'),
                or(
                    isNull(cards_inbox.reviewedAt),
                    lte(cards_inbox.dueAt, cutoff)
                    )
            )
            );

            console.log('This are the pending count', result)

        return result?.total ?? 0;
    }

    async findTodayReviewTodayCards (userId: number){
        const cutoff = new Date(); // or endOfToday depending on whether you want strictly due now vs due today
        cutoff.setHours(23, 59, 59, 999);

        const data = await this.db.query.users.findFirst({
            where: (users, {eq}) => (
                (eq(users.id, userId)
            )),
            with: {cards: {
                where: (cards_inbox, {eq, and}) => (
                    and(
                        eq(cards_inbox.userId, userId),
                        eq(cards_inbox.status, 'ACCEPTED'),
                        or(
                        isNull(cards_inbox.reviewedAt),
                        lte(cards_inbox.dueAt, cutoff)
                        )
            )
            )
            }}
        })

        if (!data || data?.cards.length === 0){
            throw new NotFoundException('No cards found for the user')
        }

        const cards : SelectCard[] = data.cards

        return cards
    }

    async updateReviewedCardData(userId: number, updateCardSchedulerDto: UpdateCardSchedulerDto){
        // validate that user indeed has that card id
        return await this.reviewSystemService.processReview(userId, updateCardSchedulerDto)
    }
}

    

