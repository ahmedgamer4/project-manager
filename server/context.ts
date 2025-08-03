import { auth } from '@/lib/auth';

export async function createContext(opts: { headers: Headers }) {
  async function getUserFromHeader() {
    const user = await auth.api.getSession({ headers: opts.headers });
    return user;
  }

  const user = await getUserFromHeader();

  return {
    ...user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
