// src/kernel/usecase/getUser.ts
import { usersRepository } from "../../adapter/repository/users.repository.js";
import { NotFoundError } from "../errors/index.js";
import type { UserCreateInput } from "../schema/user.schema.js";

// kernel/usecase/getUsers.ts
export const getUsers = async () => {
  return await usersRepository.findAll();
};

export const createUser = async (data: UserCreateInput) => {
  return await usersRepository.create(data)
}

export const getUserById = async (id: number) => {
  const user = await usersRepository.findById(id);
  if (!user) {
    throw new NotFoundError(`User with id ${id}`);
  }
  return user;
}
