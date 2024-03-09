import { Domain } from "src/abstract/domain.abstract";
import { IdValueObject } from "src/implementations/value-objects/id/id.value-object";
import { IBaseDomainEntity } from "src/abstract/entity/base-domain-entity";

export abstract class Entity<T extends IBaseDomainEntity> extends Domain<T> {
  protected defaultValueObjects: string[] = [];
  protected defaultEntities: string[] = [];

  constructor(props: T) {
    super(props);
    this.props.id = props.id ?? IdValueObject.getDefault();
    this.defaultValueObjects.push("id");
  }

  get id() {
    return this.props.id;
  }

  equals(entity: Entity<T>) {
    return this.id.equals(entity.id);
  }
}
