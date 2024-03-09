import { HttpStatus } from "src/utils/enums/http-status.enum";

import { IError } from "src/interfaces/error-message.interface";

export const INVALID_SESSION: IError = {
  message: "invalid session",
  statusCode: HttpStatus.BAD_REQUEST,
};

export const INVALID_UNAUTORIZED_SESSION: IError = {
  message: "unautorized session",
  statusCode: HttpStatus.UNAUTHORIZED,
};
