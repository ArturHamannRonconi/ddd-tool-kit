import { HttpStatus } from "src/utils/enums/http-status.enum";
import { IError } from "src/interfaces/error-message.interface";

export const INTERNAL_SERVER_ERROR: IError = {
  message: "internal server error",
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
};
