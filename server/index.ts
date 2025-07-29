import { db } from '@/db';
import { users } from '@/db/schema';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return {
      status: 'ok',
    };
  }),
  getUsers: publicProcedure.query(() => {
    return db.select().from(users);
  }),
});

export type AppRouter = typeof appRouter;
