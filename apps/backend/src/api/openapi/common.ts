import { z } from "@hono/zod-openapi";
import { ErrorResponseSchema } from "../schemas/common.js";


// Common response definitions
export const commonErrorResponses = {
  400: {
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
    description: "Bad Request - Invalid input parameters",
  },
  401: {
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
    description: "Unauthorized - Authentication required",
  },
  403: {
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
    description: "Forbidden - Insufficient permissions",
  },
  404: {
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
    description: "Not Found - Resource not found",
  },
  500: {
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
    description: "Internal Server Error",
  },
};