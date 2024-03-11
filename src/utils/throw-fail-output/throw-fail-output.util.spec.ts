import { Output } from 'src/utils/output/output.util';
import { throwFailOutput } from 'src/utils/throw-fail-output/throw-fail-output.util';
import { INTERNAL_SERVER_ERROR } from 'src/utils/errors/internal-server-error.error';

describe('throw-fail-output.util.spec', () => {
  it('should be call output fail', () => {
    const failSpy = jest.spyOn(Output, 'fail');

    const output = Output.fail(INTERNAL_SERVER_ERROR);
    throwFailOutput(output);

    expect(failSpy).toHaveBeenCalledTimes(2);
  });
});
