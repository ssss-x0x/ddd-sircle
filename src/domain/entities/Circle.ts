import { CircleId } from "../models";
import { CircleName } from "../models";
import { User } from "../models";

/**
 * サークルを表現するエンティティ
 */
export class Circle {
  public id: CircleId;
  public name: CircleName;
  public owner: User;
  public members: User[];

  constructor(id: CircleId, name: CircleName, owner: User, members: User[]) {
    if (!id) {
      throw new Error("id cannot be null or undefined");
    }

    if (!name) {
      throw new Error("name cannot be null or undefined");
    }

    if (!owner) {
      throw new Error("owner cannot be null or undefined");
    }

    if (!members) {
      throw new Error("members cannot be null or undefined");
    }

    this.id = id;
    this.name = name;
    this.owner = owner;
    this.members = members;
  }
}
