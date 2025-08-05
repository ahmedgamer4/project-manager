'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Loader2, Plus, Trash } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { trpc } from '@/app/_trpc/client';
import { Loading } from '@/components/loading';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Textarea } from '@/components/ui/textarea';
import { createProjectDto } from '@/server/modules/projects/dto/create-project.dto';

export function ProjectsSection() {
  const { workspace } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const resolver = useMemo(() => zodResolver(createProjectDto), []);
  const form = useForm<z.infer<typeof createProjectDto>>({
    resolver,
    defaultValues: {
      name: '',
      description: '',
      workspaceId: '',
    },
  });

  const trpcUtils = trpc.useUtils();
  const [isExpanded, setIsExpanded] = useState(true);
  const {
    data: projects,
    isLoading,
    isError,
  } = trpc.projects.all.useQuery({
    workspaceId: workspace as string,
  });
  const createProject = trpc.projects.create.useMutation({
    onSuccess: () => {
      trpcUtils.projects.all.invalidate();
      setDialogOpen(false);
      form.reset();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  function onSubmit(data: z.infer<typeof createProjectDto>) {
    createProject.mutate({
      ...data,
      workspaceId: workspace as string,
    });
  }

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <SidebarGroup>
        <div className="flex items-center justify-between">
          <SidebarGroupLabel
            asChild
            className="flex cursor-pointer items-center gap-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <button className="flex items-center gap-2" type="button">
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
              />
              <span>Projects</span>
            </button>
          </SidebarGroupLabel>
          <DialogTrigger asChild>
            <Button className="h-6 w-6" size="icon" variant="ghost">
              <Plus className="h-3 w-3" />
            </Button>
          </DialogTrigger>
        </div>

        {isExpanded && (
          <AlertDialog key={'project-delete-dialog'}>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {projects?.map((p) => (
                  <SidebarMenuItem key={p.id}>
                    <SidebarMenuButton className="justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-primary p-2 text-primary-foreground text-sm">
                          {p.name.charAt(0)}
                        </div>
                        <span>{p.name}</span>
                      </div>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive"
                          size="icon"
                          variant="ghost"
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Project</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                Are you sure you want to delete this project? This action cannot
                be undone.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <Button variant="destructive">Delete</Button>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </SidebarGroup>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <DialogDescription>Create a new project</DialogDescription>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={createProject.isPending || !form.formState.isValid}
                type="submit"
                variant="skeuomorphic-subtle"
              >
                {createProject.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Create'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
