import { HttpStatus } from 'src/utils/enums/http-status.enum';
import { IError } from 'src/interfaces/error-message.interface';

export const INVALID_IP: IError = {
  message: 'invalid ip',
  statusCode: HttpStatus.BAD_REQUEST,
};
