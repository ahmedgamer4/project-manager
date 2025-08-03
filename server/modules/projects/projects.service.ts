import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { projects, workspaceMembers, workspaces } from '@/db/schema';
import { attempt } from '@/lib/error-handling';
import type { CreateProjectDto } from './dto/create-project.dto';

export class ProjectService {
  private static instance: ProjectService;

  private constructor() {}

  static getInstance() {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  async getAll(userId: string) {
    const [result, error] = await attempt(
      db.query.projects.findMany({
        with: {
          workspace: {
            columns: { id: true },
            with: {
              members: {
                columns: { id: true },
                where: eq(workspaceMembers.userId, userId),
              },
            },
          },
        },
      })
    );

    if (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      });
    }
    return result;
  }

  async create(userId: string, dto: CreateProjectDto) {
    const [, error] = await attempt(
      db.transaction(async (tx) => {
        const [workspace] = await tx
          .select()
          .from(workspaces)
          .where(eq(workspaces.id, dto.workspaceId));

        if (!workspace) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Workspace not found',
          });
        }

        if (workspace.ownerId !== userId) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message:
              'You are not allowed to create a project in this workspace',
          });
        }

        await tx.insert(projects).values(dto);
      })
    );
    if (error) {
      console.error(error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      });
    }
  }
}
