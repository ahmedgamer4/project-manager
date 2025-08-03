import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server';
import { createContext } from '@/server/context';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    createContext: () => createContext({ headers: req.headers }),
    router: appRouter,
    req,
  });

export { handler as GET, handler as POST };
