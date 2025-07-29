'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SubmitButton } from '@/components/submit-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    setError('');
    setSuccess('');
    try {
      const result = await authClient.requestPasswordReset({
        email: values.email,
        redirectTo: '/reset-password',
      });
      if (result.error) {
        setError(result.error.message || 'Failed to send reset link');
      } else {
        setSuccess('If your email is registered, a reset link has been sent.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted p-4 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your email to receive a password reset link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="email"
                          placeholder="m@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && (
                  <output className="text-destructive text-sm">{error}</output>
                )}
                {success && (
                  <output className="text-green-600 text-sm">{success}</output>
                )}
                <SubmitButton className="w-full">Send Reset Link</SubmitButton>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="mt-4 text-center text-sm">
          Remember your password?{' '}
          <a className="underline underline-offset-4" href="/login">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
