import { isArray } from "class-validator";

import { Entity } from "src/abstract/entity/entity.abstract";

export const verifyAreEntities = <T extends Entity<any>>(
  propNames: string[],
  entity: T,
) =>
  propNames.every((prop) => {
    const entities = entity[prop] as Entity<any>[];
    const isNotArray = !isArray(entities);

    if (isNotArray) return false;

    return entities.every((entity) => entity instanceof Entity);
  });
