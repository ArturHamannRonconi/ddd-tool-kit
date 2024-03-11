import { HttpStatus } from 'src/utils/enums/http-status.enum';
import { IError } from 'src/interfaces/error-message.interface';

export const INVALID_ID: IError = {
  message: 'this is invalid id',
  statusCode: HttpStatus.BAD_REQUEST,
};
