import { protectedProcedure, router } from '../../trpc';
import {
  createWorkspaceDto,
  deleteWorkspaceDto,
  getWorkspaceDto,
  updateWorkspaceDto,
} from './dto/workspace.dto.';
import { WorkspacesService } from './workspaces.service';

const workspacesService = WorkspacesService.getInstance();

export const workspacesRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return workspacesService.getAll(ctx.user.id);
  }),

  getOne: protectedProcedure.input(getWorkspaceDto).query(({ input }) => {
    return workspacesService.getOne(input.id);
  }),

  create: protectedProcedure
    .input(createWorkspaceDto)
    .mutation(({ ctx, input }) => {
      return workspacesService.create(ctx.user.id, input);
    }),

  update: protectedProcedure
    .input(updateWorkspaceDto)
    .mutation(({ ctx, input }) => {
      return workspacesService.update(ctx.user.id, input);
    }),

  delete: protectedProcedure
    .input(deleteWorkspaceDto)
    .mutation(({ ctx, input }) => {
      return workspacesService.delete(ctx.user.id, input.id);
    }),
});
