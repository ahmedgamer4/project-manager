'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Loader2, Plus, Search, SquarePen } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { trpc } from '@/app/_trpc/client';
import { Loading } from '@/components/loading';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const createWorkspaceSchema = z.object({
  name: z.string().min(1),
});

export function WorkspaceSwitcher() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const resolver = useMemo(() => zodResolver(createWorkspaceSchema), []);
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver,
    defaultValues: {
      name: '',
    },
  });

  const trpcUtils = trpc.useUtils();

  const {
    data: workspaces,
    isLoading,
    isError,
  } = trpc.workspaces.all.useQuery();

  const createWorkspace = trpc.workspaces.create.useMutation({
    onSuccess: () => {
      form.reset();
      setDialogOpen(false);
      trpcUtils.workspaces.all.invalidate();
    },
  });

  function onSubmit(data: z.infer<typeof createWorkspaceSchema>) {
    createWorkspace.mutate({
      name: data.name,
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="flex h-auto items-center gap-2 hover:bg-sidebar-accent"
              variant="ghost"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded bg-purple-500 font-medium text-white text-xs">
                T
              </div>
              <span className="font-medium text-sm">testFirst1</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {workspaces?.map((w) => (
              <Link href={`/${w.id}`} key={w.id}>
                <DropdownMenuItem key={w.id}>{w.name}</DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Plus className="h-4 w-4" />
                <span>Create workspace</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="ml-auto flex items-center gap-1">
          <Button className="h-8 w-8" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
          <Button className="h-8 w-8" size="icon" variant="ghost">
            <SquarePen className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new workspace</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Create a new workspace to get started.
        </DialogDescription>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  disabled={
                    createWorkspace.isPending || !form.formState.isValid
                  }
                  type="submit"
                  variant="skeuomorphic-subtle"
                >
                  {createWorkspace.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Create'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
