import { CircleId, CircleName, User, UserId } from ".";

/**
 * サークルを表現するエンティティ
 */
export class Circle {
  public id: CircleId;
  public name: CircleName;
  public owner: UserId;
  private members: UserId[];

  constructor(
    id: CircleId,
    name: CircleName,
    owner: UserId,
    members: UserId[]
  ) {
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

  isFull() {
    return this.countMembers() >= 30;
  }

  countMembers() {
    return this.members.length + 1;
  }

  changeName(name: CircleName) {
    if (!name) {
      throw new Error("name cannot be null or undefined");
    }

    this.name = name;
  }

  join(user: User) {
    if (!user) {
      throw new Error("user cannot be null or undefined");
    }

    if (this.members.some((userId) => userId === user.id)) {
      throw new Error("User is already a member of this circle.");
    }

    if (this.isFull()) {
      throw new Error("Circle is full.");
    }

    this.members.push(user.id);
  }
}
