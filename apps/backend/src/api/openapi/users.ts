import { createRoute, z } from "@hono/zod-openapi";
import { commonErrorResponses } from "./common.js";
import { GetUserParamsSchema, GetUsersResponseSchema } from "../schemas/users.js";
import { UserCreateInputSchema, UserSchema } from "../../kernel/schema/user.schema.js";

export const getUserRoute = createRoute({
  method: "get",
  path: '/{id}',
  request: {
    params: GetUserParamsSchema
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "User details",
    },
    ...commonErrorResponses
  },
  tags: ["users"],
  summary: "Get user by ID endpoint",
  description: "Returns details of a user by their ID",
})

export const getUsersRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetUsersResponseSchema,
        },
      },
      description: "List of users",
    },
    ...commonErrorResponses
  },
  tags: ["users"],
  summary: "List users endpoint",
  description: "Returns a list of users in the system",
});

export const createUserRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserCreateInputSchema, // Assuming the request body schema is similar to the response
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "User created successfully",
    },
    ...commonErrorResponses
  },
  tags: ["users"],
  summary: "Create user endpoint",
  description: "Creates a new user in the system",
})

export const deleteUserRoute = createRoute({
  method: "delete",
  path: '/{id}',
  request: {
    params: GetUserParamsSchema
  },
  responses: {
    204: {
      description: "User deleted successfully",
    },
    ...commonErrorResponses
  },
  tags: ["users"],
  summary: "Delete user by ID endpoint",
  description: "Deletes a user by their ID",
})

export const updateUserRoute = createRoute({
  method: "put",
  path: '/{id}',
  request: {
    params: GetUserParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: UserCreateInputSchema, // Assuming the request body schema is similar to the response
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "User updated successfully",
    },
    ...commonErrorResponses
  },
  tags: ["users"],
  summary: "Update user by ID endpoint",
  description: "Updates a user by their ID",
})