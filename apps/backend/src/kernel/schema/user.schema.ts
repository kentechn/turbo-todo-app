import { z } from "@hono/zod-openapi";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().optional().nullable(),
  email: z.string().email("Invalid email format"),
  createdAt: z.date(),
  updatedAt: z.date()
}).openapi("User");
export type User = z.infer<typeof UserSchema>;

export const UserCreateInputSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})
export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;