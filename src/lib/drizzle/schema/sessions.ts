import { relations } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const sessions = sqliteTable('sessions', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    expiresAt: integer('expired_at').notNull(),
})

export const sessionsRelations = relations(sessions, ({one}) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id]
    })
}))

export const selectSessionSchema = createSelectSchema(sessions)
export const insertSessionSchema = createInsertSchema(sessions)

export type Session = typeof sessions.$inferSelect
export type InsertSession = typeof sessions.$inferInsert
