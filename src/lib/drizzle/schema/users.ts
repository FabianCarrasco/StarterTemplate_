import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { name, relations, sql } from "drizzle-orm";
import { z } from "zod";

export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    createdAt: integer('created_at', {mode: 'timestamp'}).notNull().default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer('updated_at', {mode: 'timestamp'}).notNull().default(sql`(strftime('%s', 'now'))`),
    name: text('name').notNull(),
    username: text('username', {length: 32}).unique(),
    profilePictureURL: text('profile_picture_url'),
    password: text('password'),
    email: text('email').notNull().unique(),
    githubId: integer('github_id').unique(),
    googleId: integer('google_id').unique(),
    emailVerified: integer('email_verified', {mode: 'boolean'}).notNull(),
})

export const insertUserSchema = createInsertSchema(users, {
    email: (schema) => schema.email.email()
})

export const selectUserSchema = createSelectSchema(users)

export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
