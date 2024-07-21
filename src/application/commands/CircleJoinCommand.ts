import { User } from "../../domain/models";

export class CircleJoinCommand {
  user: User;
  circleId: string;

  constructor(user: User, id: string) {
    if (!id) {
      throw new Error("id cannot be null or empty");
    }

    if (!user) {
      throw new Error("user cannot be null or empty");
    }

    this.user = user;
    this.circleId = id;
  }
}
