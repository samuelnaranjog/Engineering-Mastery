import { Injectable, NotFoundException, InternalServerErrorException, Inject } from '@nestjs/common';
import { UpdateCardSchedulerDto } from './dto/submit-card-review.dto.js';
import { DefaultScheduler, Rating, createEmptyCard, Grade, State, type Card as DefaultSchedulerCard, DefaultSchedulerCardInput} from 'ts-fsrs';
import { cards_inbox } from '../database/schema/cards.schema.js';
import { InsertCard } from '../database/schema/cards.schema.js';
import {eq, and} from 'drizzle-orm'
import { type IScheduler } from 'ts-fsrs';
// Import your Drizzle DB instance and schema here

import { DRIZZLE } from '../database/database.tokens.js';
import type { DrizzleDBSchema } from '../database/database.module.js';

@Injectable()
export class ReviewSystemService {

    constructor(@Inject(DRIZZLE) private readonly db: DrizzleDBSchema){}

    private scheduler!: DefaultScheduler

    // 2. Initialize it inside the async NestJS lifecycle hook
    async onModuleInit() {
        this.scheduler = await DefaultScheduler({
            version: 'FSRS-7',
            desiredRetention: 0.9,      // Aiming for 90% recall
            learningSteps: ['1m', '10m'], // Short term intervals for 'New' cards
            maximumInterval: 36500,     // Max interval (100 years)
        });
    }



  async processReview(userId: number, dto: UpdateCardSchedulerDto, now: Date = new Date()) {
    const { cardId, difficulty } = dto;
    
    // 1. Fetch current card/FSRS state from Drizzle
    // validate that user indeed has that card id
    const  dbCard = await this.db.select().from(cards_inbox).where(and(eq(cards_inbox.userId, userId), eq(cards_inbox.id, cardId ))).limit(1)
    const isConditionMet = dbCard.length > 0

    if(!isConditionMet){
        throw new NotFoundException('The card does not exist in the database')
    }

    const dbCardData = dbCard[0]
   
    // 2. Calculate next interval using ts-fsrs
    const cardForFsrs = this.mapDbToFsrsInput(dbCardData)

    const { card: nextCardState, revlog: reviewLog } = this.scheduler.review({ 
      card: cardForFsrs, 
      grade: difficulty as Grade, 
      now 
    });
    // 3. Update SQLite record

    const updatePayload = {
        state: nextCardState.state,
        dueAt: nextCardState.dueAt,
        stability: nextCardState.stability,
        difficulty: nextCardState.difficulty,
        scheduledDays: nextCardState.scheduledDays,
        reps: nextCardState.reps,
        lapses: nextCardState.lapses,
        stabilityFast: nextCardState.stabilityFast,
        learningStep: nextCardState.learningStep ?? 0, // Fallback if undefined
        scheduleStatus: nextCardState.scheduleStatus,
        
        // ALIAS FIX: Map FSRS output back to your DB column name
        reviewedAt: nextCardState.lastReviewAt, 
        
    } satisfies Partial<typeof cards_inbox.$inferInsert>;

    const updatedCards = await this.db.update(cards_inbox).set(updatePayload).where(eq(cards_inbox.id, cardId )).returning({ updatedId: cards_inbox.id });
    if (updatedCards.length === 0) {
        throw new NotFoundException(`Card with ID ${cardId} not found.`);
    }
    return { 
      success: true, 
      message: 'Review saved successfully' 
    };
  }

  mapDbToFsrsInput(dbCard: typeof cards_inbox.$inferSelect): DefaultSchedulerCardInput<"FSRS-7"> {
  return {
    cardId: dbCard.id, // Aliased from DB 'id'
    difficulty: dbCard.difficulty,
    dueAt: dbCard.dueAt, 
    stability: dbCard.stability,
    scheduledDays: dbCard.scheduledDays,
    reps: dbCard.reps,
    lapses: dbCard.lapses,
    stabilityFast: dbCard.stabilityFast,
    learningStep: dbCard.learningStep,
    lastReviewAt: dbCard.reviewedAt, // Aliased from DB 'reviewedAt'
    state: dbCard.state,
    scheduleStatus: dbCard.scheduleStatus,
  };
}
}