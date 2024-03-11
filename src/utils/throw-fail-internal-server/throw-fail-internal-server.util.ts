import { Output } from 'src/utils/output/output.util';
import { INTERNAL_SERVER_ERROR } from 'src/utils/errors/internal-server-error.error';

export const throwFailInternalServer = (error: Error) => {
  console.error(error);
  return Output.fail(INTERNAL_SERVER_ERROR);
};
