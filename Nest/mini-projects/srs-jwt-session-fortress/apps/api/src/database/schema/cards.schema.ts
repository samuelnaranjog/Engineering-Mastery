import { sqliteTable, integer, text, check, real } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import { CardStatus } from '@project/shared-types';
import { users } from './auth.schema.js';

export const cards_inbox = sqliteTable('cards_inbox', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer("userId").notNull(),
    deck: text('deck').notNull(),
    front: text('front').notNull(),
    back: text('back').notNull(),


    status: text('status').$type<CardStatus>().notNull().default('PENDING'),
    receivedAt: integer('receivedAt', {mode: 'timestamp_ms'}).notNull().default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`),


     // FSRS Core Fields
    state: integer('state').$type<0 | 1 | 2 | 3>().notNull().default(0), 
    dueAt: integer('due_at', { mode: 'timestamp_ms' }).notNull().default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`),
    stability: real('stability').notNull().default(0),
    difficulty: real('difficulty').notNull().default(0),
    scheduledDays: integer('scheduled_days').notNull().default(0),
    reps: integer('reps').notNull().default(0),
    lapses: integer('lapses').notNull().default(0),
    stabilityFast: real('stability_fast').notNull().default(0),
    learningStep: integer('learning_step').notNull().default(0),
    reviewedAt: integer('reviewedAt', {mode: 'timestamp_ms'}),
    scheduleStatus: text('schedule_status').$type<"new" | "learning" | "review">().notNull().default("new"),

}, (table => [
    check('status_accepeted_values', 
    sql` ${table.status} IN ('PENDING', 'ACCEPTED', 'REJECTED')`
)]))

export type InsertCard = typeof cards_inbox.$inferInsert;
export type SelectCard = typeof cards_inbox.$inferSelect;

export const userCardRelation = relations(cards_inbox, ({one}) => ({
    user: one(users, {
        fields: [cards_inbox.userId],
        references: [users.id]
    })
}))