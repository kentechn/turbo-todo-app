// src/kernel/usecase/getUser.ts
import { usersRepository } from "../../adapter/repository/users.repository.js";
import type { UsersRepository } from "../interface/usersRepository.js";

// kernel/usecase/getUsers.ts
export const getUsers = async () => {
  return await usersRepository.findAll();
};