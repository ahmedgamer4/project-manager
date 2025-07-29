'use client';

import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function SubmitButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button className={cn(className)} disabled={pending} type="submit">
      {pending && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
