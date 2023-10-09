import { z } from "zod";
import { TaskSchema } from "./Task";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(3).regex(/^[A-Z][a-z]+$/).max(32),
  email: z.string().email(),
  avatar: z.string().url(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),  
  tasks: TaskSchema.array().optional(),
  taskId: z.string(),
  sessions: z.object({}).array().optional(),
})

export type UserType = z.infer<typeof UserSchema>
