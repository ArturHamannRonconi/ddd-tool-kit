import { Entity } from 'src/abstract/entity/entity.abstract';
import { ValueObject } from 'src/abstract/value-object/value-object.abstract';

export const verifyAreValueObjects = <T extends Entity<any>>(
  propNames: string[],
  entity: T,
) => propNames.every((prop) => entity[prop] instanceof ValueObject);
