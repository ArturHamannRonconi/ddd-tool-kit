import { HttpStatus } from "src/utils/enums/http-status.enum";

import { IError } from "src/interfaces/error-message.interface";

export const INVALID_DATE: IError = {
  message: "Invalid Date",
  statusCode: HttpStatus.BAD_REQUEST,
};
