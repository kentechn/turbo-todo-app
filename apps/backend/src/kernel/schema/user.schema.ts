import { z } from "@hono/zod-openapi";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.string().email("Invalid email format"),
}).openapi("User");

export type User = z.infer<typeof UserSchema>;
