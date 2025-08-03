import { z } from 'zod';

export const createWorkspaceDto = z.object({
  name: z.string(),
});

export type CreateWorkspaceDto = z.infer<typeof createWorkspaceDto>;

export const updateWorkspaceDto = createWorkspaceDto.partial().extend({
  id: z.string(),
});

export type UpdateWorkspaceDto = z.infer<typeof updateWorkspaceDto>;

export const getWorkspaceDto = z.object({
  id: z.string(),
});

export const deleteWorkspaceDto = getWorkspaceDto;
