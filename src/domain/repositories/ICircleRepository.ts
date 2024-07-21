import { Circle, CircleId, CircleName } from "../models";

export interface ICircleRepository {
  save(circle: Circle): void;
  findById(id: CircleId): Circle | null;
  findByName(name: CircleName): Circle | null;
}
