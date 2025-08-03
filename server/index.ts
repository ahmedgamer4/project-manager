import { projectsRouter } from './modules/projects/projects.router';
import { workspacesRouter } from './modules/workspaces/workspaces.router';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return {
      status: 'ok',
    };
  }),
  workspaces: workspacesRouter,
  projects: projectsRouter,
});

export type AppRouter = typeof appRouter;
