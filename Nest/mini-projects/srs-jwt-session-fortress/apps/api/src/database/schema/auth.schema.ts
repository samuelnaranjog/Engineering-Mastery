import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';
import { sql, relations } from 'drizzle-orm';

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
    email: text('email').unique().notNull(),
    passwordHash: text().notNull(),
})

export const refresh_tokens = sqliteTable("refresh_tokens", {
    id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
    userId: integer("userId").unique().notNull(),
    tokenHash: text('tokenHash').notNull(),
    expiresAt: integer('expiresAt').notNull(),
    revoked: integer('revoked', { mode: 'boolean' }).notNull().default(false),
})

// --- Users Types ---
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// --- Refresh Tokens Types ---
export type RefreshToken = typeof refresh_tokens.$inferSelect;
export type NewRefreshToken = typeof refresh_tokens.$inferInsert;

// Acts as the switch 
export const userRelations = relations(users, ({many}) => ({
    refreshToken: many(refresh_tokens)
}))

// Acts as the plug or child contianign the foreign key
export const refreshTokensRelation = relations(refresh_tokens, ({one}) => ({
    user: one(users, {
        fields: [refresh_tokens.userId],
        references: [users.id],
        })
}))