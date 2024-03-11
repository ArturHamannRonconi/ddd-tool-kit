import { Entity } from 'src/abstract/entity/entity.abstract';

import { DateValueObject } from 'src/implementations/value-objects/date/date.value-object';
import { IBaseDomainAggregate } from 'src/abstract/aggregate/base-domain-aggregate';

export abstract class Aggregate<
  T extends IBaseDomainAggregate,
> extends Entity<T> {
  constructor(props: T) {
    super(props);
    this.props.createdAt = props.createdAt ?? DateValueObject.getDefault();
    this.props.updatedAt = props.updatedAt ?? DateValueObject.getDefault();
    this.defaultValueObjects.push('createdAt', 'updatedAt');
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
