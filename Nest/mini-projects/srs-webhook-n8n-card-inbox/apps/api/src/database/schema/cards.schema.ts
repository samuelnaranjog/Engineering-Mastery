import { sqliteTable, integer, text, check } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const cards_inbox = sqliteTable('cards_inbox', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    deck: text('deck').notNull(),
    front: text('front').notNull(),
    back: text('back').notNull(),
    status: text('status').notNull().default('PENDING'),
    receivedAt: integer('receivedAt', {mode: 'timestamp_ms'}).notNull().default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`),
    reviewedAt: integer('reviewedAt', {mode: 'timestamp_ms'}).notNull(),
}, (table => [
    check('status_accepeted_values', 
    sql` ${table.status} IN ('PENDING', 'ACCEPTED', 'REJECTED')`
)]))