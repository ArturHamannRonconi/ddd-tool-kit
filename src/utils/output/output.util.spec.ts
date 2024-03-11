import { Output } from 'src/utils/output/output.util';
import { HttpStatus } from 'src/utils/enums/http-status.enum';

describe('output.util.spec', () => {
  it('should be defined as success void', () => {
    const util = Output.success();

    expect(util).toBeInstanceOf(Output);
    expect(util.result).toBeUndefined();
    expect(util.isFailure).toBeFalsy();
    expect(util.isSuccess).toBeTruthy();
  });

  it('should be defined as success boolean', () => {
    const util = Output.success(true);

    expect(util).toBeInstanceOf(Output);
    expect(util.result).toBe(true);
    expect(util.isFailure).toBeFalsy();
    expect(util.isSuccess).toBeTruthy();
  });

  it('should be defined as success number', () => {
    const util = Output.success(10);

    expect(util).toBeInstanceOf(Output);
    expect(util.result).toBe(10);
    expect(util.isFailure).toBeFalsy();
    expect(util.isSuccess).toBeTruthy();
  });

  it('should be defined as success string', () => {
    const util = Output.success('Test');

    expect(util).toBeInstanceOf(Output);
    expect(util.result).toBe('Test');
    expect(util.isFailure).toBeFalsy();
    expect(util.isSuccess).toBeTruthy();
  });

  it('should be defined as success Object', () => {
    const util = Output.success({});

    expect(util).toBeInstanceOf(Output);
    expect(util.result).toEqual({});
    expect(util.isFailure).toBeFalsy();
    expect(util.isSuccess).toBeTruthy();
  });

  it('should be defined as fail erro-message', () => {
    const util = Output.fail({
      message: 'invalid',
      statusCode: HttpStatus.BAD_REQUEST,
    });

    expect(util).toBeInstanceOf(Output);
    expect(util.isFailure).toBeTruthy();
    expect(util.isSuccess).toBeFalsy();
    expect(util.result).toEqual({
      message: 'invalid',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  });
});
