import { Aggregate } from "src/abstract/aggregate/aggregate.abstract";
import { IdValueObject } from "src/implementations/value-objects/id/id.value-object";

export interface List<T> {
  items: T[];
  total: number;
}

export interface IRepository<D extends Aggregate<any>> {
  save: (aggregate: D) => Promise<void>;
  saveMany: (aggregates: D[]) => Promise<void>;
  delete: (id: IdValueObject) => Promise<void>;
  findMany: (ids: IdValueObject[]) => Promise<D[]>;
  findOne: (id: IdValueObject) => Promise<D | null>;
}
