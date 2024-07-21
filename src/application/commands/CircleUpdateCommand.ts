export class CircleUpdateCommand {
  circleId: string;
  circleName: string;

  constructor(id: string, name: string) {
    if (!id) {
      throw new Error("id cannot be null or empty");
    }

    if (!name) {
      throw new Error("name cannot be null or empty");
    }

    this.circleId = id;
    this.circleName = name;
  }
}
