import { Output } from "src/utils/output/output.util";
import { Entity } from "src/abstract/entity/entity.abstract";
import { IError } from "src/interfaces/error-message.interface";
import { ISessionProps } from "src/implementations/entities/session/session.props";
import { IdValueObject } from "src/implementations/value-objects/id/id.value-object";
import { IpValueObject } from "src/implementations/value-objects/ip/ip.value-object";
import { throwFailOutput } from "src/utils/throw-fail-output/throw-fail-output.util";
import { INVALID_SESSION } from "src/implementations/entities/session/session.errors";
import { DateValueObject } from "src/implementations/value-objects/date/date.value-object";
import { verifyAllPropsExists } from "src/utils/verify-all-props-exists/verify-all-props-exists.util";
import { verifyAreValueObjects } from "src/utils/verify-are-value-objects/verify-are-value-objects.util";

export class SessionEntity extends Entity<ISessionProps> {
  private readonly EXPIRATION_SESSION_IN_DAYS = 30;

  constructor(props: ISessionProps) {
    super(props);

    const defaultExpiresAt = DateValueObject.getDefault();
    defaultExpiresAt.addDays(this.EXPIRATION_SESSION_IN_DAYS);

    this.props.expiresAt = props.expiresAt ?? defaultExpiresAt;
    this.props.loggedAt = props.loggedAt ?? DateValueObject.getDefault();
  }

  get ip() {
    return this.props.ip;
  }

  get expiresAt() {
    return this.props.expiresAt;
  }

  get loggedAt() {
    return this.props.loggedAt;
  }

  renew(ip: string): Output<IError> | Output<IdValueObject> {
    const initIp = IpValueObject.init({ value: ip });
    if (initIp.isFailure) return throwFailOutput(initIp);

    const loggedAt = DateValueObject.getDefault();
    const expiresAt = DateValueObject.getDefault();

    expiresAt.addDays(this.EXPIRATION_SESSION_IN_DAYS);

    this.props.loggedAt = loggedAt;
    this.props.expiresAt = expiresAt;
    this.props.id = IdValueObject.getDefault();

    return Output.success(this.id);
  }

  protected sanitizeProps(): void {}
  protected isValidProps(): boolean {
    const valueObjects = ["ip", "expiresAt", "loggedAt"];

    valueObjects.push(...this.defaultValueObjects);

    const requiredProps = [...valueObjects];

    const allPropsExists = verifyAllPropsExists(requiredProps, this);
    const areValueObjects = verifyAreValueObjects(valueObjects, this);

    return allPropsExists && areValueObjects;
  }

  static init(props: ISessionProps) {
    const session = new SessionEntity(props);
    const isInvalidProps = !session.isValidProps();

    if (isInvalidProps) {
      return Output.fail(INVALID_SESSION);
    }

    return Output.success(session);
  }
}
