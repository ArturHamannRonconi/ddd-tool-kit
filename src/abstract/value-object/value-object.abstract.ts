import { Domain } from "src/abstract/domain.abstract";
import { IBaseDomainValueObject } from "src/abstract/value-object/base-domain-value-object";

export abstract class ValueObject<
  T extends IBaseDomainValueObject<any>,
> extends Domain<T> {
  get value() {
    return this.props.value;
  }
}
