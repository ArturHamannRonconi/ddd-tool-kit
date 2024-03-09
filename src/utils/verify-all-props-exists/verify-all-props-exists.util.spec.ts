import { ISessionProps } from "src/implementations/entities/session/session.props";
import { SessionEntity } from "src/implementations/entities/session/session.entity";
import { IpValueObject } from "src/implementations/value-objects/ip/ip.value-object";
import { verifyAllPropsExists } from "src/utils/verify-all-props-exists/verify-all-props-exists.util";

describe("verify-all-props.exists.util.spec", () => {
  it("should be return true if all props exists", () => {
    const sessionIp = IpValueObject.init({ value: "139.205.112.175" })
      .result as IpValueObject;

    const entity = SessionEntity.init({ ip: sessionIp })
      .result as SessionEntity;

    const propNames = ["id", "ip", "loggedAt", "expiresAt"];

    const allPropsExists = verifyAllPropsExists(propNames, entity);
    expect(allPropsExists).toBeTruthy();
  });

  it("should be return false if some prop is not exists", () => {
    const entity = SessionEntity.init({} as ISessionProps)
      .result as SessionEntity;

    const propNames = ["id", "ip", "loggedAt", "expiresAt"];

    const allPropsExists = verifyAllPropsExists(propNames, entity);
    expect(allPropsExists).toBeFalsy();
  });
});
