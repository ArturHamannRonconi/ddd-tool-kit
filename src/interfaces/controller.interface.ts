import { Output } from "src/utils/output/output.util";
import { IError } from "src/interfaces/error-message.interface";

export interface IController<Input, Success = void> {
  exec: (input: Input) => Promise<Output<Success> | Output<IError>>;
}
