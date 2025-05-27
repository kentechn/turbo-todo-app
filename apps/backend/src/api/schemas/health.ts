import { z } from "zod";

export const HealthResponseSchema = z.object({
  status: z.literal("ok"),
}).openapi("HealthCheckResponse");

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

// Test query parameters for validation
export const HealthQuerySchema = z.object({
  verbose: z
    .string()
    .optional()
    .refine((val) => val === undefined || val === "true" || val === "false", {
      message: "verbose must be 'true' or 'false'",
    }),
  format: z.enum(["json", "xml"]).optional(),
});