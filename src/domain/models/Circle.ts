import { CircleId } from ".";
import { CircleName } from ".";
import { User } from ".";

/**
 * サークルを表現するエンティティ
 */
export class Circle {
  public id: CircleId;
  public name: CircleName;
  public owner: User;
  private members: User[];

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

  isFull(): boolean {
    return this.members.length >= 29;
  }

  join(user: User): void {
    if (!user) {
      throw new Error("user cannot be null or undefined");
    }

    if (this.members.some((member) => member.id === user.id)) {
      throw new Error("User is already a member of this circle.");
    }

    if (this.isFull()) {
      throw new Error("Circle is full.");
    }

    this.members.push(user);
  }
}
