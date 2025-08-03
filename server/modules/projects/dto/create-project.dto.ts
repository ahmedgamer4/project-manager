import { z } from 'zod';

export const createProjectDto = z.object({
  name: z.string(),
  description: z.string(),
  workspaceId: z.string(),
});

export type CreateProjectDto = z.infer<typeof createProjectDto>;
