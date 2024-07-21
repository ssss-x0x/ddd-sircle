import { IUserRepository } from "../repositories/";
import { Circle } from "../models";

export class CircleFullSpecification {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  isSatisfiedBy(circle: Circle) {
    const users = this.userRepository.findAll(circle.members);

    const premiumUsers = users.filter((v) => v.isPremium);

    const limit = premiumUsers.length >= 10 ? 50 : 30;

    return circle.countMembers() >= limit;
  }
}
