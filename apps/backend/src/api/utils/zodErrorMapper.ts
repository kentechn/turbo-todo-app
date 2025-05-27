import { ValidationError } from "../../kernel/errors/index.js";
import { z } from "@hono/zod-openapi";

export function mapZodError(error: z.ZodError): ValidationError {
  const fields = error.errors.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));

  // Create a user-friendly message
  const message = fields.length === 1 
    ? fields[0].message 
    : `Validation failed: ${fields.map(f => f.path).join(", ")}`;

  return new ValidationError(message, fields);
}