import { serve } from "@hono/node-server";
import { OpenAPIHono, z, type Hook } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { HTTPException } from "hono/http-exception";
import health from "./api/routes/health.js";
import { AppError } from "./kernel/errors/AppError.js";
import { ValidationError } from "./kernel/errors/index.js";
import { mapZodError } from "./api/utils/zodErrorMapper.js";
import type { Env } from "hono";
import { defaultHook } from "./api/utils/defaultHook.js";


export const app = new OpenAPIHono({ defaultHook })
  .basePath("/api");

// Error handler
app.onError((err, c) => {
  if (err instanceof AppError) {
    // Log error details internally (except for validation errors)
    if (!(err instanceof ValidationError)) {
      console.error(err.toLogObject());
    }
    return c.json(err.toJSON(), err.statusCode);
  }

  // それ以外のエラーは予期せぬエラーのため、500エラーを返す
  console.error("Unexpected error:", {
    message: err.message,
    stack: err.stack,
  });
  return c.json(
    {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    }, 500
  )
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/health", health);

// OpenAPI documentation endpoint
app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Todo API",
    description: "API for managing todos",
  },
});

// Swagger UI
app.get("/docs", swaggerUI({ url: "/api/openapi.json" }));

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
