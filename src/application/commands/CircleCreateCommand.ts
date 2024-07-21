import { User } from "../../domain/models";

export class CircleCreateCommand {
  name: string;
  user: User;

  constructor(user: User, name: string) {
    if (!name) {
      throw new Error("name cannot be null or empty");
    }

    if (!user) {
      throw new Error("user cannot be null or empty");
    }

    this.user = user;
    this.name = name;
  }
}
