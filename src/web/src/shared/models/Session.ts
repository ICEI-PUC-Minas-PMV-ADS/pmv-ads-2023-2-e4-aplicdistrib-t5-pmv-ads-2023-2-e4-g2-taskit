import { z } from "zod";
import { UserSchema } from "./User";

const SessionSchema = z.object({
  id: z.string(),
  user: UserSchema,
  userId: z.string(),
  token: z.string(),
  expires: z.string().datetime(),
})

export type SessionType = z.infer<typeof SessionSchema>
