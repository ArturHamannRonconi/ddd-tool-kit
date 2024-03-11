import { INVALID_IP } from 'src/implementations/value-objects/ip/ip.errors';
import { IpValueObject } from 'src/implementations/value-objects/ip/ip.value-object';

describe('session-ip.value-object.spec', () => {
  it('should be defined', () => {
    const initValueObject = IpValueObject.init({
      value: '205.119.103.92',
    });

    const valueObject = initValueObject.result as IpValueObject;

    expect(initValueObject.isSuccess).toBeTruthy();
    expect(valueObject).toBeInstanceOf(IpValueObject);
  });

  it('should be fail if is invalid IP', () => {
    const initValueObject = IpValueObject.init({
      value: '2050.119.103.92',
    });

    const valueObject = initValueObject.result as IpValueObject;

    expect(initValueObject.isFailure).toBeTruthy();
    expect(valueObject).toEqual(INVALID_IP);
  });

  it('should be create an public IPv4', () => {
    const initValueObject = IpValueObject.init({
      value: '203.0.113.1',
    });

    const valueObject = initValueObject.result as IpValueObject;

    expect(initValueObject.isSuccess).toBeTruthy();
    expect(valueObject).toBeInstanceOf(IpValueObject);

    expect(valueObject.isIPv4).toBeTruthy();
    expect(valueObject.isPublicIP).toBeTruthy();
  });

  it('should be create an private IPv4', () => {
    const initValueObject = IpValueObject.init({
      value: '192.168.1.1',
    });

    const valueObject = initValueObject.result as IpValueObject;

    expect(initValueObject.isSuccess).toBeTruthy();
    expect(valueObject).toBeInstanceOf(IpValueObject);

    expect(valueObject.isIPv4).toBeTruthy();
    expect(valueObject.isPrivateIP).toBeTruthy();
  });

  it('should be create an public IPv6', () => {
    const initValueObject = IpValueObject.init({
      value: '2001:4860:4860::8888',
    });

    const valueObject = initValueObject.result as IpValueObject;

    expect(initValueObject.isSuccess).toBeTruthy();
    expect(valueObject).toBeInstanceOf(IpValueObject);

    expect(valueObject.isIPv6).toBeTruthy();
    expect(valueObject.isPublicIP).toBeTruthy();
  });

  it('should be create an private IPv6', () => {
    const initValueObject = IpValueObject.init({
      value: 'fd00::1',
    });

    const valueObject = initValueObject.result as IpValueObject;

    expect(initValueObject.isSuccess).toBeTruthy();
    expect(valueObject).toBeInstanceOf(IpValueObject);

    expect(valueObject.isIPv6).toBeTruthy();
    expect(valueObject.isPrivateIP).toBeTruthy();
  });
});
