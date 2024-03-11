import { HttpStatus } from 'src/utils/enums/http-status.enum';

import { IError } from 'src/interfaces/error-message.interface';

export const INVALID_EMAIL: IError = {
  message: 'invalid email',
  statusCode: HttpStatus.BAD_REQUEST,
};
