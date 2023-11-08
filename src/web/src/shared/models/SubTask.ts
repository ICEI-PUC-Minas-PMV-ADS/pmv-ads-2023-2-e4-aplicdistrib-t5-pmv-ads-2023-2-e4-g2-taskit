import { z } from "zod";

export const SubTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  startedAt: z.string().datetime().optional(),
  finishedAt: z.string().datetime().optional(),
  timespent: z.string().optional(),
  task: z.object({
    id: z.string(),
    title: z.string(),
  }),
  taskId: z.string(),
});

export type SubTaskType = z.infer<typeof SubTaskSchema>
