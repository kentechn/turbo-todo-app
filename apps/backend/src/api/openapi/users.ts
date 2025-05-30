import { createRoute } from "@hono/zod-openapi";
import { commonErrorResponses } from "./common.js";
import { GetUsersResponseSchema } from "../schemas/users.js";

export const usersRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetUsersResponseSchema,
        },
      },
      description: "List of users",
    },
    ...commonErrorResponses
  },
  tags: ["users"],
  summary: "List users endpoint",
  description: "Returns a list of users in the system",
});