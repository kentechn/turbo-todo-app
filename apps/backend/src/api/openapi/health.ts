import { createRoute } from "@hono/zod-openapi";
import { HealthResponseSchema, HealthQuerySchema } from "../schemas/health.js";
import { commonErrorResponses } from "./common.js";

export const healthRoute = createRoute({
  method: "get",
  path: "/",
  request: {
    query: HealthQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HealthResponseSchema,
        },
      },
      description: "Health check response",
    },
    ...commonErrorResponses
  },
  tags: ["health"],
  summary: "Health check endpoint",
  description: "Returns the health status of the server",
});