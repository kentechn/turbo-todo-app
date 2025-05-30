import { OpenAPIHono } from "@hono/zod-openapi";
import { healthRoute } from "../openapi/health.js";
import { z } from "zod";
import { mapZodError } from "../utils/zodErrorMapper.js";
import { HTTPException } from "hono/http-exception";
import { defaultHook } from "../utils/defaultHook.js";
import { usersRoute } from "../openapi/users.js";
import { getUsers } from "../../kernel/usecase/user.usecase.js";

const usersRouter = new OpenAPIHono({
  defaultHook
});

usersRouter.openapi(usersRoute, async (c) => {
  const users = await getUsers();

  const res = {
    users: users
  }

  return c.json(res, 200);

});

export default usersRoute;