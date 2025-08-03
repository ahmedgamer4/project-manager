import { TRPCError } from '@trpc/server';
import { eq, or } from 'drizzle-orm';
import { db } from '@/db';
import { workspaceMembers, workspaces } from '@/db/schema';
import { attempt } from '@/lib/error-handling';
import type {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
} from './dto/workspace.dto.';

export class WorkspacesService {
  private static instance: WorkspacesService;

  private constructor() {}

  static getInstance() {
    if (!WorkspacesService.instance) {
      WorkspacesService.instance = new WorkspacesService();
    }
    return WorkspacesService.instance;
  }

  async getAll(userId: string) {
    const [result, error] = await attempt(
      db
        .select({
          id: workspaces.id,
          name: workspaces.name,
          ownerId: workspaces.ownerId,
          createdAt: workspaces.createdAt,
          updatedAt: workspaces.updatedAt,
          role: workspaceMembers.role,
        })
        .from(workspaces)
        .innerJoin(
          workspaceMembers,
          eq(workspaces.id, workspaceMembers.workspaceId)
        )
        .where(
          or(
            eq(workspaceMembers.userId, userId),
            eq(workspaces.ownerId, userId)
          )
        )
    );
    if (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch workspaces',
      });
    }
    return result;
  }

  async create(userId: string, dto: CreateWorkspaceDto) {
    const [result, error] = await attempt(
      db.transaction(async (tx) => {
        const [workspace] = await tx
          .insert(workspaces)
          .values({
            name: dto.name,
            ownerId: userId,
          })
          .returning({
            id: workspaces.id,
          });

        await tx.insert(workspaceMembers).values({
          workspaceId: workspace.id,
          userId,
          role: 'owner',
        });
        return workspace;
      })
    );
    if (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create workspace',
      });
    }
    return result;
  }

  async getOne(id: string) {
    const [result, error] = await attempt(
      db.query.workspaces.findFirst({
        where: eq(workspaces.id, id),
      })
    );
    if (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch workspace',
      });
    }

    if (!result) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Workspace not found',
      });
    }

    return result;
  }

  async update(userId: string, dto: UpdateWorkspaceDto) {
    const [, error] = await attempt(
      db.transaction(async (tx) => {
        const workspace = await tx.query.workspaces.findFirst({
          where: eq(workspaces.id, dto.id),
        });
        if (!workspace) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Workspace not found',
          });
        }

        if (workspace.ownerId !== userId) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You are not allowed to update this workspace',
          });
        }

        await tx
          .update(workspaces)
          .set({ name: dto.name })
          .where(eq(workspaces.id, dto.id))
          .returning({
            id: workspaces.id,
          });
      })
    );
    if (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to update workspace',
      });
    }
  }

  async delete(userId: string, id: string) {
    const [, error] = await attempt(
      db.transaction(async (tx) => {
        const workspace = await tx.query.workspaces.findFirst({
          where: eq(workspaces.id, id),
        });
        if (!workspace) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Workspace not found',
          });
        }

        if (workspace.ownerId !== userId) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You are not allowed to delete this workspace',
          });
        }

        await tx.delete(workspaces).where(eq(workspaces.id, id));
      })
    );
    if (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to delete workspace',
      });
    }
  }
}
