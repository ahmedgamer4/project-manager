import { protectedProcedure, router } from '../../trpc';
import { createProjectDto } from './dto/create-project.dto';
import { ProjectService } from './projects.service';

const projectService = ProjectService.getInstance();

export const projectsRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return projectService.getAll(ctx.user.id);
  }),

  create: protectedProcedure
    .input(createProjectDto)
    .mutation(({ ctx, input }) => {
      return projectService.create(ctx.user.id, input);
    }),
});
