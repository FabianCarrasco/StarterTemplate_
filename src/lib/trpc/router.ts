import {t} from '$lib/trpc/t'
import delay from 'delay'

export const router = t.router({
    greeting: t.procedure.query(async () => {
        await delay(500);
        return `Hello tRPC v10 @ ${new Date().toLocaleString()}`;
    })
});

export const createCaller = t.createCallerFactory(router);

export type Router = typeof router;
