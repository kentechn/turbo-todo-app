import type { User } from "../schema/user.schema.js";

export interface UsersRepository {
  // findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(data: Omit<User, "id">): Promise<User>;
  // update(id: string, data: Partial<Omit<User, "id">>): Promise<User>;
  // delete(id: string): Promise<User>;
}