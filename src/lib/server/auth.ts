import {Lucia, TimeSpan} from 'lucia'
import { dev } from '$app/environment'
import {DrizzleSQLiteAdapter} from '@lucia-auth/adapter-drizzle' 
import { db } from '$lib/server/db'
import { sessions, users } from '$lib/drizzle/schema'
import {GitHub, Google} from 'arctic'
import { GITHUB_CLIENT_ID, 
         GITHUB_CLIENT_SECRET, 
         GOOGLE_OAUTH_CLIENT_ID, 
         GOOGLE_OAUTH_CLIENT_SECRET, 
         GOOGLE_OAUTH_REDIRECT_URI } from '$env/static/private'

const adapter = new DrizzleSQLiteAdapter(db, sessions, users)

export const auth = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev,
        }
    },
    sessionExpiresIn: new TimeSpan(2, 'w'),
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username,
            name: attributes.name,
            githubId: attributes.githubId,
            googleId: attributes.googleId,
            profilePictureURL: attributes.profilePictureURL,
        }
    }
})

export const github = new GitHub(
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET
)

export const google = new Google(
    GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET,
    GOOGLE_OAUTH_REDIRECT_URI
)

declare module 'lucia' {
    interface Register {
        Lucia: typeof auth,
        DatabaseUserAttributes: DatabaseUserAttributes
    }
    interface DatabaseSessionAttributes {
        ip_country: string
    }
    interface DatabaseUserAttributes {
        username: string,
        name: string,
        githubId: number,
        googleId: string,
        profilePictureURL: string,
    }
}

export type Auth = typeof auth
