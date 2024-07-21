import { ICircleRepository } from "../../domain/repositories";
import { Circle } from "../../domain/entities";

export class CircleService {
  private circleRepository: ICircleRepository;

  constructor(circleRepository: ICircleRepository) {
    this.circleRepository = circleRepository;
  }

  public exists(circle: Circle): boolean {
    const duplicated = this.circleRepository.findByName(circle.name);
    return duplicated !== null;
  }
}
