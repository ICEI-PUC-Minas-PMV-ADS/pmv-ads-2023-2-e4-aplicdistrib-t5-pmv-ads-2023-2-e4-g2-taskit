import { z } from "zod";
import { SubTaskSchema } from "./SubTask";

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().regex(/^[A-Z0-9][A-Za-z0-9]+$/).min(3).max(24),
  content: z.string().regex(/^[a-z0-9*\-\/|`$%#@!?&()]+$/i).max(128).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  startedAt: z.string().datetime().optional(),
  finishedAt: z.string().datetime().optional(),
  timespent: z.string().optional(),
  status: z.string(),
  owner: z.object({
    id: z.string(),
    name: z.string().min(3).regex(/^[A-Z][a-z]+$/).max(32),
    avatar: z.string().url(),
  }),
  ownerId: z.string(),
  subtasks: SubTaskSchema.array(),
  canEdit: z.string().array().optional(),
  canView: z.string().array().optional(),
})

export type TaskType = z.infer<typeof TaskSchema>
