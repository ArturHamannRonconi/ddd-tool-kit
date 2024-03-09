import { Output } from "src/utils/output/output.util";

import { IError } from "src/interfaces/error-message.interface";

export const throwFailOutput = (Fail: Output<IError> | Output<any>) => {
  const error = Fail.result as IError;
  return Output.fail(error);
};
