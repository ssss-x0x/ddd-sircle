import { User, UserId } from "../models";

export interface IUserRepository {
  findById(id: UserId): User | null;
}
