import { z, type Hook } from "@hono/zod-openapi";
import type { Env } from "hono";
import { mapZodError } from "./zodErrorMapper.js";

export const defaultHook: Hook<any, Env, any, any> = (result) => {
  if (!result.success) {
  // mapping関数を使って、zodエラーをapp errorに変換する
    if (result.error instanceof z.ZodError) {
      throw mapZodError(result.error);
    }
  }
};
