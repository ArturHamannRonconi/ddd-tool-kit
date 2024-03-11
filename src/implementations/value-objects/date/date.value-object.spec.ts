import { INVALID_DATE } from 'src/implementations/value-objects/date/date.errors';
import { DateValueObject } from 'src/implementations/value-objects/date/date.value-object';

describe('date.value-object.spec', () => {
  it('should be defined a new date', () => {
    const valueObject = DateValueObject.getDefault();
    expect(valueObject.value).toBeInstanceOf(Date);
  });

  it('should be fail to init some date', () => {
    const initDate = DateValueObject.init({
      value: { isDate: false } as unknown as Date,
    });

    expect(initDate.isFailure).toBeTruthy();
    expect(initDate.result).toEqual(INVALID_DATE);
  });

  it('should be sanitize numbers to date', () => {
    const initDate = DateValueObject.init({
      value: 4984092 as unknown as Date,
    });

    expect(initDate.isSuccess).toBeTruthy();
    expect(initDate.result).toBeInstanceOf(DateValueObject);
  });

  it('should verify is same day true', () => {
    const date1 = DateValueObject.getDefault();
    const date2 = DateValueObject.getDefault();

    expect(date1.isSameDay(date2)).toBeTruthy();
    expect(date1.isSameDay(date1)).toBeTruthy();
  });

  it('should verify is same day true', () => {
    const today = new Date();
    const tomorrowDayNumber = today.getDate() + 1;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrowDayNumber);

    const dateToday = DateValueObject.init({
      value: today,
    }).result as DateValueObject;

    const dateTomorrow = DateValueObject.init({
      value: tomorrow,
    }).result as DateValueObject;

    const isSameDay = dateToday.isSameDay(dateTomorrow);
    expect(isSameDay).toBeFalsy();
  });

  it('should be add one days for today', () => {
    const today = DateValueObject.getDefault();
    const tomorrow = DateValueObject.getDefault();

    expect(today.isSameDay(tomorrow)).toBeTruthy();

    tomorrow.addDays(1);

    expect(today.isSameDay(tomorrow)).toBeFalsy();
  });

  it('should be difference in days is 1', () => {
    const differenceInDays = 1;
    const today = DateValueObject.getDefault();
    const tomorrow = DateValueObject.getDefault();

    tomorrow.addDays(differenceInDays);

    expect(tomorrow.differenceInDays(today)).toBe(differenceInDays);
  });
});
