import { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config()

export default {
    schema: './src/lib/drizzle/schema/',
    out: './migrations',
    driver: 'turso',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_TOKEN!,
    },
} satisfies Config
