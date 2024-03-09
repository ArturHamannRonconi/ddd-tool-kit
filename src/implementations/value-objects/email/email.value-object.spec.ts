import { INVALID_EMAIL } from "src/implementations/value-objects/email/email.errors";
import { EmailValueObject } from "src/implementations/value-objects/email/email.value-object";

describe("user-email.value-object.spec", () => {
  const email = "validemail@mail.com";

  it("should be defined", () => {
    const valueObject = EmailValueObject.init({
      value: email,
    }).result as EmailValueObject;

    expect(valueObject).toBeInstanceOf(EmailValueObject);
  });

  it("should be init email with success", () => {
    const initEmail = EmailValueObject.init({
      value: email,
    });

    const emailValueObject = initEmail.result as EmailValueObject;

    expect(initEmail.isSuccess).toBeTruthy();
    expect(emailValueObject.value).toEqual(email);
  });

  it("should be fail to init email", () => {
    const initEmail = EmailValueObject.init({
      value: "email",
    });

    expect(initEmail.isFailure).toBeTruthy();
    expect(initEmail.result).toEqual(INVALID_EMAIL);
  });
});
