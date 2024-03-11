import { IdValueObject } from 'src/implementations/value-objects/id/id.value-object';
import { verifyAreValueObjects } from 'src/utils/verify-are-value-objects/verify-are-value-objects.util';

describe('verify-are-value-objects.util.spec', () => {
  it('should be return true if all props is value objects', () => {
    const propNames = ['id'];
    const entity = { id: IdValueObject.getDefault() } as any;

    const areValueObjects = verifyAreValueObjects(propNames, entity);

    expect(areValueObjects).toBeTruthy();
  });

  it('should be return false if some prop is not value object', () => {
    const propNames = ['id'];
    const entity = { id: 'invalid' } as any;

    const areValueObjects = verifyAreValueObjects(propNames, entity);

    expect(areValueObjects).toBeFalsy();
  });
});
