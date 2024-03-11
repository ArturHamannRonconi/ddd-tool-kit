import { INVALID_IP } from 'src/implementations/value-objects/ip/ip.errors';
import { ISessionProps } from 'src/implementations/entities/session/session.props';
import { SessionEntity } from 'src/implementations/entities/session/session.entity';
import { IdValueObject } from 'src/implementations/value-objects/id/id.value-object';
import { IpValueObject } from 'src/implementations/value-objects/ip/ip.value-object';
import { INVALID_SESSION } from 'src/implementations/entities/session/session.errors';
import { DateValueObject } from 'src/implementations/value-objects/date/date.value-object';

describe('user-session.entity.spec', () => {
  it('should be defined', () => {
    const expiresAt = DateValueObject.getDefault();
    expiresAt.addDays(30);

    const initEntity = SessionEntity.init({
      expiresAt,
      ip: IpValueObject.init({ value: '203.0.113.1' }).result as IpValueObject,
    });

    const entity = initEntity.result as SessionEntity;

    expect(initEntity.isSuccess).toBeTruthy();

    expect(entity).toBeInstanceOf(SessionEntity);
    expect(entity.id).toBeInstanceOf(IdValueObject);
    expect(entity.ip).toBeInstanceOf(IpValueObject);
    expect(entity.expiresAt).toBeInstanceOf(DateValueObject);
    expect(entity.loggedAt).toBeInstanceOf(DateValueObject);
  });

  it('should fail if some required prop is not pass', () => {
    const initUserSession = SessionEntity.init({} as ISessionProps);

    expect(initUserSession.isFailure).toBeTruthy();
    expect(initUserSession.result).toEqual(INVALID_SESSION);
  });

  it('should renew to 30 days', () => {
    const expiresAt = DateValueObject.getDefault();
    const session = SessionEntity.init({
      expiresAt,
      ip: IpValueObject.init({ value: '203.0.113.1' }).result as IpValueObject,
    }).result as SessionEntity;

    expect(session.expiresAt).toEqual(expiresAt);

    const oldSessionId = session.id;

    const renew = session.renew('203.0.113.1');
    expect(renew.isSuccess).toBeTruthy();

    const newSessionId = renew.result as IdValueObject;
    const isDifferentSessionId = !newSessionId.equals(oldSessionId);
    expect(isDifferentSessionId).toBeTruthy();

    const differenceInDays = session.expiresAt.differenceInDays(expiresAt);

    expect(differenceInDays).toBe(30);
    expect(session.expiresAt).not.toEqual(expiresAt);
  });

  it('should fial renew if is invalid ip', () => {
    const expiresAt = DateValueObject.getDefault();
    const session = SessionEntity.init({
      expiresAt,
      ip: IpValueObject.init({ value: '203.0.113.1' }).result as IpValueObject,
    }).result as SessionEntity;

    const renew = session.renew('invalid ip');
    expect(renew.isFailure).toBeTruthy();
    expect(renew.result).toEqual(INVALID_IP);
  });
});
