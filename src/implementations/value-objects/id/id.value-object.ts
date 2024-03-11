import { uid } from 'uid';

import { Output } from 'src/utils/output/output.util';
import { IdProps } from 'src/implementations/value-objects/id/id.props';
import { INVALID_ID } from 'src/implementations/value-objects/id/id.errors';
import { ValueObject } from 'src/abstract/value-object/value-object.abstract';

export class IdValueObject extends ValueObject<IdProps> {
  equals(domainId: IdValueObject) {
    return this.value === domainId.value;
  }

  protected sanitizeProps(): void {}
  protected isValidProps(): boolean {
    return this.props.value?.length === 16;
  }

  static getDefault() {
    return this.init({
      value: uid(16),
    }).result as IdValueObject;
  }

  static init(props: IdProps) {
    const name = new IdValueObject(props);
    const isInvalidProps = !name.isValidProps();

    if (isInvalidProps) {
      return Output.fail(INVALID_ID);
    }

    return Output.success(name);
  }
}
