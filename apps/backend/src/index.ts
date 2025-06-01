import { serve } from "@hono/node-server";
import { OpenAPIHono, z, type Hook } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import healthRouter from "./api/routes/health.js";
import { AppError } from "./kernel/errors/AppError.js";
import { ValidationError } from "./kernel/errors/index.js";
import { defaultHook } from "./api/utils/defaultHook.js";

import { logger } from 'hono/logger'
import usersRouter from "./api/routes/users.js";

export const app = new OpenAPIHono({ defaultHook })
  .basePath("/api");

app.use(logger())

app.use("*", async (c, next) => {
  console.log(`Request: ${c.req.method} ${c.req.url}`);

  await next();
})

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

app.route("/health", healthRouter);
app.route("/users", usersRouter)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
