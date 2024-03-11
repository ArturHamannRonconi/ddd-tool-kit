import { IBaseDomainEntity } from 'src/abstract/entity/base-domain-entity';
import { DateValueObject } from 'src/implementations/value-objects/date/date.value-object';

export interface IBaseDomainAggregate extends IBaseDomainEntity {
  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
}
