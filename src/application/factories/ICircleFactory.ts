import { Circle } from "../../domain/entities";
import { User, CircleName } from "../../domain/models";

export interface ICircleFactory {
  create(name: CircleName, owner: User): Circle;
}
