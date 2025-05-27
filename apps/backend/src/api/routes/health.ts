import { OpenAPIHono } from "@hono/zod-openapi";
import { healthRoute } from "../openapi/health.js";
import { z } from "zod";
import { mapZodError } from "../utils/zodErrorMapper.js";
import { HTTPException } from "hono/http-exception";
import { defaultHook } from "../utils/defaultHook.js";

const health = new OpenAPIHono({
  defaultHook
});

health.openapi(healthRoute, (c) => {
  return c.json({
    status: "ok" as const,
  }, 200);
});

export default health;