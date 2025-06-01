import { z } from "@hono/zod-openapi";
import { UserSchema } from "../../kernel/schema/user.schema.js";

export const GetUsersResponseSchema = z.object({
  users: z.array(UserSchema),
}).openapi("GetUsersResponse");

export const GetUserParamsSchema = z.object({
  id: z
    .string()
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '1',
    }),
})

export type GetUsersResponse = z.infer<typeof GetUsersResponseSchema>;

