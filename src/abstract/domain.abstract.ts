export abstract class Domain<T> {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = props;
    this.sanitizeProps();
  }

  protected abstract sanitizeProps(): void;
  protected abstract isValidProps(): boolean;
}
