import { HttpStatus } from "src/utils/enums/http-status.enum";
import { IError } from "src/interfaces/error-message.interface";

export const INVALID_USER_PASSWORD: IError = {
  message:
    "the password must have at least 20 characters, one uppercase letter and one lowercase letter",
  statusCode: HttpStatus.BAD_REQUEST,
};

export const INVALID_PASSWORD_ALREADY_HASHED: IError = {
  message: "password already hashed",
  statusCode: HttpStatus.BAD_REQUEST,
};

export const INVALID_PASSWORD_IS_NOT_HASHED: IError = {
  message: "password is not hashed",
  statusCode: HttpStatus.BAD_REQUEST,
};

export const INVALID_INCORRECT_PASSWORD: IError = {
  message: "invalid incorrect credentials",
  statusCode: HttpStatus.BAD_REQUEST,
};
