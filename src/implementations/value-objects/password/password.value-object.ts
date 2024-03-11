import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

import {
  INVALID_USER_PASSWORD,
  INVALID_INCORRECT_PASSWORD,
  INVALID_PASSWORD_IS_NOT_HASHED,
  INVALID_PASSWORD_ALREADY_HASHED,
} from 'src/implementations/value-objects/password/password.errors';

import { Output } from 'src/utils/output/output.util';
import { IError } from 'src/interfaces/error-message.interface';
import { IPasswordProps } from 'src/implementations/value-objects/password/password.props';
import { ValueObject } from 'src/abstract/value-object/value-object.abstract';

export class PasswordValueObject extends ValueObject<IPasswordProps> {
  get isHashed() {
    return this.value.includes('$2a$12') && this.value.length === 60;
  }

  hash(): Output<IError> | Output<void> {
    if (this.isHashed) {
      return Output.fail(INVALID_PASSWORD_ALREADY_HASHED);
    }

    const password = this.props.value;
    const salt = genSaltSync(12);

    this.props.value = hashSync(password, salt);

    return Output.success<void>();
  }

  compare(password: string): Output<IError> | Output<void> {
    if (!this.isHashed) {
      return Output.fail(INVALID_PASSWORD_IS_NOT_HASHED);
    }

    const isCorrectPassword = compareSync(password, this.value);

    return isCorrectPassword
      ? Output.success<void>()
      : Output.fail(INVALID_INCORRECT_PASSWORD);
  }

  protected sanitizeProps(): void {
    this.props.value.trim();
  }

  protected isValidProps(): boolean {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    const password = this.value;
    const hasMinLength = password.length >= 20;
    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);

    return hasMinLength && hasUppercase && hasLowercase;
  }

  static init(props: IPasswordProps) {
    const password = new PasswordValueObject(props);
    const isInvalidProps = !password.isValidProps();

    if (isInvalidProps) {
      return Output.fail(INVALID_USER_PASSWORD);
    }

    return Output.success(password);
  }
}
