import { Entity } from 'src/abstract/entity/entity.abstract';

export const verifyAllPropsExists = <T extends Entity<any>>(
  propNames: string[],
  entity: T,
) => propNames.every((prop) => !!entity[prop]);
