import {
  INVALID_USER_PASSWORD,
  INVALID_INCORRECT_PASSWORD,
  INVALID_PASSWORD_IS_NOT_HASHED,
  INVALID_PASSWORD_ALREADY_HASHED,
} from "src/implementations/value-objects/password/password.errors";

import { PasswordValueObject } from "src/implementations/value-objects/password/password.value-object";

describe("user-password.value-object.spec", () => {
  const password = "FuiComprarPãoNaPadariaDepoisFuiNoMercado";

  it("should be defined", () => {
    const valueObject = PasswordValueObject.init({
      value: password,
    }).result as PasswordValueObject;

    expect(valueObject).toBeInstanceOf(PasswordValueObject);
  });

  it("should be init password with success", () => {
    const initPassword = PasswordValueObject.init({
      value: password,
    });
    const passwordValueObject = initPassword.result as PasswordValueObject;

    expect(initPassword.isSuccess).toBeTruthy();
    expect(passwordValueObject).toBeInstanceOf(PasswordValueObject);
    expect(passwordValueObject.value).toEqual(password);
  });

  it("should be hash password", () => {
    const valueObject = PasswordValueObject.init({
      value: password,
    }).result as PasswordValueObject;

    expect(valueObject.value).toEqual(password);
    const hash = valueObject.hash();

    expect(hash.isSuccess).toBeTruthy();
    expect(valueObject.value).not.toEqual(password);
  });

  it("should be verify is hashed password", () => {
    const valueObject = PasswordValueObject.init({
      value: password,
    }).result as PasswordValueObject;

    expect(valueObject.isHashed).toBeFalsy();
    valueObject.hash();
    expect(valueObject.isHashed).toBeTruthy();
  });

  it("should be fail to hash password two times", () => {
    const valueObject = PasswordValueObject.init({
      value: password,
    }).result as PasswordValueObject;

    valueObject.hash();
    const hash = valueObject.hash();

    expect(hash.isFailure).toBeTruthy();
    expect(hash.result).toEqual(INVALID_PASSWORD_ALREADY_HASHED);
  });

  it("should be compare passwords", () => {
    const valueObject = PasswordValueObject.init({
      value: password,
    }).result as PasswordValueObject;

    valueObject.hash();

    const compareCorrect = valueObject.compare(password);
    const compareIncorrect = valueObject.compare("password");

    expect(compareCorrect.isSuccess).toBeTruthy();
    expect(compareIncorrect.isFailure).toBeTruthy();
    expect(compareIncorrect.result).toEqual(INVALID_INCORRECT_PASSWORD);
  });

  it("should be fail to compare passwords", () => {
    const valueObject = PasswordValueObject.init({
      value: password,
    }).result as PasswordValueObject;

    const compareCorrect = valueObject.compare(password);

    expect(compareCorrect.isFailure).toBeTruthy();
    expect(compareCorrect.result).toEqual(INVALID_PASSWORD_IS_NOT_HASHED);
  });

  it("should be fail to init password without min length", () => {
    const initPassword = PasswordValueObject.init({
      value: "Password",
    });

    expect(initPassword.isFailure).toBeTruthy();
    expect(initPassword.result).toEqual(INVALID_USER_PASSWORD);
  });

  it("should be fail to init password without uppercase char", () => {
    const initPassword = PasswordValueObject.init({
      value: password.toLocaleLowerCase(),
    });

    expect(initPassword.isFailure).toBeTruthy();
    expect(initPassword.result).toEqual(INVALID_USER_PASSWORD);
  });

  it("should be fail to init password without lowercase char", () => {
    const initPassword = PasswordValueObject.init({
      value: password.toUpperCase(),
    });

    expect(initPassword.isFailure).toBeTruthy();
    expect(initPassword.result).toEqual(INVALID_USER_PASSWORD);
  });
});
