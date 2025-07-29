'use server';

import { redirect } from 'next/navigation';
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

  redirect('/');
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
