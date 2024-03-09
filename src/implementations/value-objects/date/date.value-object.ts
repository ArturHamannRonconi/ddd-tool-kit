import { toDate, addDays, differenceInDays, isSameDay } from "date-fns";

import { Output } from "src/utils/output/output.util";
import { IDateProps } from "src/implementations/value-objects/date/date.props";
import { INVALID_DATE } from "src/implementations/value-objects/date/date.errors";
import { ValueObject } from "src/abstract/value-object/value-object.abstract";

export class DateValueObject extends ValueObject<IDateProps> {
  addDays(days: number) {
    this.props.value = addDays(this.value, days);
  }

  differenceInDays(date: DateValueObject) {
    return differenceInDays(this.value, date.value);
  }

  isSameDay(date: DateValueObject) {
    return isSameDay(this.value, date.value);
  }

  protected sanitizeProps(): void {
    this.props.value = toDate(this.value);
  }

  protected isValidProps(): boolean {
    const numberDate = this.value as unknown as number;
    const isValidDate = !isNaN(numberDate);
    return isValidDate;
  }

  static getDefault() {
    return this.init({
      value: new Date(),
    }).result as DateValueObject;
  }

  static init(props: IDateProps) {
    const date = new DateValueObject(props);
    const isInvalidProps = !date.isValidProps();

    if (isInvalidProps) {
      return Output.fail(INVALID_DATE);
    }

    return Output.success(date);
  }
}
