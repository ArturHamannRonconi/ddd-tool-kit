import { IBaseDomainEntity } from 'src/abstract/entity/base-domain-entity';
import { IpValueObject } from 'src/implementations/value-objects/ip/ip.value-object';
import { DateValueObject } from 'src/implementations/value-objects/date/date.value-object';

export interface ISessionProps extends IBaseDomainEntity {
  ip: IpValueObject;
  loggedAt?: DateValueObject;
  expiresAt?: DateValueObject;
}
