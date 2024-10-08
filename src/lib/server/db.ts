import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { env } from "$env/dynamic/private";
import * as schema from "$lib/drizzle/schema"

const client = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_TOKEN
})

export const db = drizzle(client, {schema})
