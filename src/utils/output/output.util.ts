import { IOutputProps } from 'src/utils/output/output.props';
import { IError } from 'src/interfaces/error-message.interface';

export class Output<S = IError> {
  private props: IOutputProps<S>;

  private constructor(props: IOutputProps<S>) {
    this.props = props;
  }

  get result() {
    return this.props.result;
  }

  get isSuccess() {
    return this.props.isSuccess;
  }

  get isFailure() {
    return this.props.isFailure;
  }

  static fail(error: IError) {
    return this.init({
      result: error,
      isFailure: true,
      isSuccess: false,
    });
  }

  static success<S = void>(result?: S) {
    return this.init({
      result: result,
      isSuccess: true,
      isFailure: false,
    });
  }

  private static init<S>(props: IOutputProps<S>) {
    return new Output<S>(props);
  }
}
