import { HttpStatus } from 'src/utils/enums/http-status.enum';

export interface IError {
  message: string;
  statusCode: HttpStatus;
}
