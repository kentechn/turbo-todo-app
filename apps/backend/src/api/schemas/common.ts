import { z } from "@hono/zod-openapi";

// Common error response schema
export const ErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string()
  }),
}).openapi("ErrorResponse");

// Validation error response schema
export const ValidationErrorResponseSchema = z.object({
  error: ErrorResponseSchema.shape.error.extend({
    fields: z.array(
      z.object({
        path: z.string(),
        message: z.string(),
      })
    ), // ValidationErrorの場合、fieldsは必須
  }),
}).openapi("ValidationErrorResponse");
