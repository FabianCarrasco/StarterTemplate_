import { insertUserSchema, selectUserSchema, users } from '$lib/drizzle/schema'
import { eq } from 'drizzle-orm'
import { t } from '$lib/trpc/t'

export const accountRouter = t.router({
    create: t.procedure
        .input(insertUserSchema)
        .mutation(
            async ({ctx, input}) => {
                const userData = input
                return await ctx.db
                    .insert(users)
                    .values({...userData})
                    .returning({userId: users.id})
            }
        ),

    getUser: t.procedure
        .input(selectUserSchema)
        .query(
            async ({ctx, input}) => {
                return await ctx.db.query.users.findFirst({
                    where: eq(users.username, input.id)
                })
            }
        ),
})
