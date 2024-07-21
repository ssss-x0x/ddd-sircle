import { ICircleFactory } from "../factories";
import { ICircleRepository, IUserRepository } from "../../domain/repositories";
import { CircleService } from "../../domain/sevices";
import {
  CircleCreateCommand,
  CircleJoinCommand,
  CircleUpdateCommand,
} from "../commands";
import { CircleName, CircleId } from "../../domain/models";
import { CircleFullSpecification } from "../../domain/specifications";

export class CircleApplicationService {
  constructor(
    private circleFactory: ICircleFactory,
    private circleRepository: ICircleRepository,
    private circleService: CircleService,
    private userRepository: IUserRepository
  ) {}

  public create(command: CircleCreateCommand) {
    // トランザクションスコープの模倣
    const transaction = {
      complete: () => {
        console.log("Transaction completed");
      },
    };

    const owner = this.userRepository.findById(command.userId);

    if (!owner) {
      throw new Error("UserNotFoundException");
    }

    const name = new CircleName(command.name);
    const circle = this.circleFactory.create(name, owner);

    if (this.circleService.exists(circle)) {
      throw new Error("CircleAlreadyExistsException");
    }

    this.circleRepository.save(circle);

    transaction.complete();
  }

  public update(command: CircleUpdateCommand) {
    // トランザクションスコープの模倣
    const transaction = {
      complete: () => {
        console.log("Transaction completed");
      },
    };

    const id = new CircleId(command.circleId);

    const circle = this.circleRepository.findById(id);

    if (!circle) {
      throw new Error("CircleNotFoundException");
    }

    if (command.circleName) {
      const name = new CircleName(command.circleName);
      circle.changeName(name);
    }

    this.circleRepository.save(circle);

    transaction.complete();
  }

  public join(command: CircleJoinCommand) {
    // トランザクションスコープの模倣
    const transaction = {
      complete: () => {
        console.log("Transaction completed");
      },
    };

    const member = this.userRepository.findById(command.user.id);
    if (!member) {
      throw new Error("UserNotFoundException");
    }

    const id = new CircleId(command.circleId);

    const circle = this.circleRepository.findById(id);

    if (!circle) {
      throw new Error("CircleNotFoundException");
    }

    if (circle.members.some((userId) => userId === command.user.id)) {
      throw new Error("User is already a member of this circle.");
    }

    const circleSpecifications = new CircleFullSpecification(
      this.userRepository
    );

    if (circleSpecifications.isSatisfiedBy(circle)) {
      throw new Error("Circle is full.");
    }

    circle.join(member);

    this.circleRepository.save(circle);

    transaction.complete();
  }
}
