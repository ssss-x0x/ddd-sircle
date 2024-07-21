import { User } from "../models";

export interface IUserRepository {
  findById(id: string): User | null;
}
