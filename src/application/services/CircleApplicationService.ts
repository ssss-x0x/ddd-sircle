import { ICircleFactory } from "../factories";
import { ICircleRepository, IUserRepository } from "../../domain/repositories";
import { CircleService } from "../../domain/sevices";
import { CircleCreateCommand, CircleJoinCommand } from "../commands";
import { CircleName, CircleId } from "../../domain/models";

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

    const owner = this.userRepository.findById(command.user.id);

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

    // FIXME: ドメインのルールがアプリケーションサービスに漏れているので修正するべき
    // オーナーを含めてサークルメンバーは30人以内
    if (circle.members.length >= 29) {
      throw new Error("CircleFullException");
    }

    circle.members.push(member);

    this.circleRepository.save(circle);

    transaction.complete();
  }
}
