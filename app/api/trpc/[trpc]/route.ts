import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    createContext: () => ({}),
    router: appRouter,
    req,
  });

export { handler as GET, handler as POST };
