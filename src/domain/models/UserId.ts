export class UserId {
  public value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error("value cannot be null or undefined");
    }

    this.value = value;
  }
}
