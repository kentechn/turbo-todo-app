

import type { UsersRepository } from "../../kernel/interface/usersRepository.js";
import db from "../db.js";

import { UserCreateInputSchema } from "../../../prisma/generated/zod/index.js";
import type { z } from "zod";
import { BadRequestError } from "../../kernel/errors/index.js";
import { Prisma } from "@prisma/client";


export const usersRepository = {
  async findById(id: number) {
    const res = await db.user.findUnique({
      where: { id },
    });

    return res
  },
  async findAll() {
    const res = await db.user.findMany({});
    return res;
  },
  async create(data: z.infer<typeof UserCreateInputSchema>) {
    // ユーザー作成
    try {
      return await db.user.create({
        data
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific Prisma errors
        if (error.code === 'P2002') {
          throw new BadRequestError("User with this email already exists.", error.stack);
        }
      }
      throw error
    }
  },
  async delete(id: number) {
    try {
      return await db.user.delete({
          where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific Prisma errors
        if (error.code === 'P2025') {
          throw new BadRequestError("User not found.", error.stack);
        }
      }
      throw error; // Re-throw other errors
    }

  }
}