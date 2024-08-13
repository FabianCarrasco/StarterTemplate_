import { relations, sql } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./users";

export const passwordResetTokens = sqliteTable('password_reset_tokens', {
    id: text('id').primaryKey().notNull().unique(),
    userId: text('user_id').notNull(),
    expiresAt: integer('expires_at', {mode: 'timestamp'}).notNull(),
})

export const passwordResetTokensRelationa = relations(passwordResetTokens, ({one}) => ({
    user: one(users, {
        fields: [passwordResetTokens.userId],
        references: [users.id],
        relationName: 'user_password_reset_tokens'
    })
}))

export const selectPasswordResetToken = createSelectSchema(passwordResetTokens)
export const insertPasswordResetToken = createInsertSchema(passwordResetTokens)

export type PasswordResetToken = typeof passwordResetTokens.$inferSelect
export type InsertPasswordResetToken = typeof passwordResetTokens.$inferInsert
