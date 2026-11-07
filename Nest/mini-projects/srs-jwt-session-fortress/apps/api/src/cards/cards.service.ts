import { Injectable , Inject} from '@nestjs/common';
import { CalculateDto } from './dto/addition.dto.js';
import { CalculateResult, CardInboxItem } from '@project/shared-types';
import { CreateCard } from '@project/shared-types';
import { CreateCardDto } from './dto/create-card.dto.js';
import { DRIZZLE } from '../database/database.tokens.js';
import type { DrizzleDBSchema } from '../database/database.module.js';
import { cards_inbox } from '../database/schema/cards.schema.js';
import { ReviewCardDto } from './dto/review-card.dto.js';
import { CardStatus } from '@project/shared-types';
import { asc, eq} from 'drizzle-orm';
@Injectable()
export class CardsService {
    constructor(@Inject(DRIZZLE) private readonly db: DrizzleDBSchema ){}
    retrieveCard(payload: CalculateDto): CalculateResult{
        console.log("Received payload: ", payload)
        const result = payload.n1 + payload.n2 
        return {result: result}
    }

    newCard(createCardDto: CreateCardDto){
      
        return this.db.insert(cards_inbox).values(createCardDto).returning().get()
    }

    updateStatus(id: number, reviewCardDto: ReviewCardDto){
        if (reviewCardDto.status === CardStatus.ACCEPTED){
             return this.db.update(cards_inbox).set({status:CardStatus.ACCEPTED}).where(eq(cards_inbox.id, id)).returning().get()
        }
        else {
            return this.db.update(cards_inbox).set({status:CardStatus.REJECTED}).where(eq(cards_inbox.id, id)).returning().get()
        }
    }

    getCardsPending(): CardInboxItem[] {
        return this.db.select().from(cards_inbox).where(eq(cards_inbox.status, CardStatus.PENDING)).orderBy(asc(cards_inbox.receivedAt)).all()
    }
}
