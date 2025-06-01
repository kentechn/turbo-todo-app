import { OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook } from "../utils/defaultHook.js";
import { getUsersRoute, createUserRoute, getUserRoute, deleteUserRoute } from "../openapi/users.js";
import { getUsers, createUser, getUserById, deleteUserById } from "../../kernel/usecase/user.usecase.js";
import { NotFoundError } from "../../kernel/errors/index.js";

const usersRouter = new OpenAPIHono({
  defaultHook
});

usersRouter.openapi(getUserRoute, async (c) => {
  const userId = c.req.param("id");
  const user = await getUserById(Number(userId));

  return c.json(user, 200);
})

usersRouter.openapi(getUsersRoute, async (c) => {
  const users = await getUsers();

  const res = {
    users: users
  }

  return c.json(res, 200);
});

usersRouter.openapi(createUserRoute, async (c) => {
  const body = c.req.valid("json")

  const user = await createUser(body);
  return c.json(user, 201);
})

usersRouter.openapi(deleteUserRoute, async (c) => {
  const userId = c.req.param("id");
  const user = await deleteUserById(Number(userId));

  return new Response(null, { status: 204 });
})



export default usersRouter;
