import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
export const categories = sqliteTable('categories', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    budget: real('budget').notNull().default(0),
    createdAt: text('created_at').default(sql `(CURRENT_TIMESTAMP)`),
});
//# sourceMappingURL=users.schema.js.map