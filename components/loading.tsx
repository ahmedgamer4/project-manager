import { Loader } from 'lucide-react';

export function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Loader className="size-4 animate-spin" />
    </div>
  );
}
