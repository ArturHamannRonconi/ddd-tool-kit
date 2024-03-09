import { DateValueObject } from "src/implementations/value-objects/date/date.value-object";
import { IBaseDomainEntity } from "src/abstract/entity/base-domain-entity";

export interface IBaseDomainAggregate extends IBaseDomainEntity {
  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
}
