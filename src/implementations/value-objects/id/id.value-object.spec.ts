import { INVALID_ID } from "src/implementations/value-objects/id/id.errors";
import { IdValueObject } from "src/implementations/value-objects/id/id.value-object";

describe("id.value-object.spec", () => {
  it("should be defined random ID", () => {
    const valueObject = IdValueObject.getDefault();
    expect(valueObject.value).toHaveLength(16);
  });

  it("should be defined value for ID", () => {
    const value = "1234567890123456";
    const valueObject = IdValueObject.init({ value }).result as IdValueObject;

    expect(valueObject.value).toEqual(value);
  });

  it("should be fail if id is not valid", () => {
    const value = "321";
    const initId = IdValueObject.init({ value });

    expect(initId.isFailure).toBeTruthy();
    expect(initId.result).toEqual(INVALID_ID);
  });

  it("should be truthy equal ids", () => {
    const valueObject1 = IdValueObject.getDefault();
    const valueObject2 = IdValueObject.init({ value: valueObject1.value })
      .result as IdValueObject;

    const isEqualValueObject = valueObject1.equals(valueObject2);
    expect(isEqualValueObject).toBeTruthy();
  });

  it("should be falsy equal ids", () => {
    const valueObject1 = IdValueObject.getDefault();
    const valueObject2 = IdValueObject.getDefault();

    const isNotEqualValueObject = valueObject1.equals(valueObject2);
    expect(isNotEqualValueObject).toBeFalsy();
  });
});
