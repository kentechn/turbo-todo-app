

import type { UsersRepository } from "../../kernel/interface/usersRepository.js";
import db from "../db.js";

export const usersRepository = {
  // async findById(id: number) {
  //   const res = await db.user.findUnique({
  //     where: { id },
  //   });

  //   return res
  // },
  async findAll() {
    const res = await db.user.findMany({});
    return res;
  }
}