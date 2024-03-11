import { isEmail } from 'class-validator';

import { Output } from 'src/utils/output/output.util';
import { ValueObject } from 'src/abstract/value-object/value-object.abstract';
import { IEmailProps } from 'src/implementations/value-objects/email/email.props';
import { INVALID_EMAIL } from 'src/implementations/value-objects/email/email.errors';

export class EmailValueObject extends ValueObject<IEmailProps> {
  protected sanitizeProps(): void {
    this.props.value.trim();
  }

  protected isValidProps(): boolean {
    return isEmail(this.value);
  }

  static init(props: IEmailProps) {
    const email = new EmailValueObject(props);
    const isInvalidProps = !email.isValidProps();

    if (isInvalidProps) {
      return Output.fail(INVALID_EMAIL);
    }

    return Output.success(email);
  }
}
