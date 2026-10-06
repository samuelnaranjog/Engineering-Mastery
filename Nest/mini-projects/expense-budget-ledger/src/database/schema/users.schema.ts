import { sqliteTable, integer, text, numeric, real} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const categories = sqliteTable('categories', {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),
    budget: real('budget').notNull().default(0),
    createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
})

// Full record returned from a SELECT query
export type Category = typeof categories.$inferSelect;

// Payload shape required for an INSERT query (id & defaults are optional)
export type NewCategory = typeof categories.$inferInsert;