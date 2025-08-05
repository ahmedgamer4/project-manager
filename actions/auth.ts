'use server';

import { desc, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { users, workspaces } from '@/db/schema';
import { auth } from '@/lib/auth';
import { attempt } from '@/lib/error-handling';
import { signInSchema, signUpSchema } from '@/lib/schema-validation/auth';

export const signIn = async (_: object, formData: FormData) => {
  const result = signInSchema.safeParse({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (!result.success) {
    return { error: result.error.message };
  }

  const { email, password } = result.data;

  const [, error] = await attempt(
    auth.api.signInEmail({
      body: {
        email,
        password,
      },
    })
  );

  if (error) {
    return { error: error.message };
  }

  const [workspaceId, workspaceError] = await attempt(
    db.transaction(async (tx) => {
      const user = await tx.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user) {
        throw new Error('User not found');
      }

      const workspace = await tx.query.workspaces.findFirst({
        where: eq(workspaces.ownerId, user.id),
        orderBy: [desc(workspaces.createdAt)],
      });

      if (!workspace) {
        throw new Error('Workspace not found');
      }

      return workspace.id;
    })
  );

  if (workspaceError) {
    return { error: workspaceError.message };
  }

  redirect(`/${workspaceId}`);
};

export const signUp = async (_: object, formData: FormData) => {
  const result = signUpSchema.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (!result.success) {
    return { error: result.error.message };
  }

  const { name, email, password } = result.data;

  const [, error] = await attempt(
    auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    })
  );

  if (error) {
    return { error: error.message };
  }

  redirect('/');
};
