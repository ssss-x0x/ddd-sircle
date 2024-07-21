import { UserId } from "../../domain/models";

export class CircleCreateCommand {
  name: string;
  userId: UserId;

  constructor(userId: UserId, name: string) {
    if (!name) {
      throw new Error("name cannot be null or empty");
    }

    if (!userId) {
      throw new Error("userId cannot be null or empty");
    }

    this.userId = userId;
    this.name = name;
  }
}
