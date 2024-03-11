import { Entity } from 'src/abstract/entity/entity.abstract';
import { SessionEntity } from 'src/implementations/entities/session/session.entity';
import { IpValueObject } from 'src/implementations/value-objects/ip/ip.value-object';
import { verifyAreEntities } from 'src/utils/verify-are-entities/verify-are-entities.util';

describe('verify-are-entities.util.spec', () => {
  it('should be return true if all array is entities', () => {
    const sessionIp = IpValueObject.init({ value: '139.205.112.175' })
      .result as IpValueObject;

    const entities = [
      SessionEntity.init({ ip: sessionIp }).result as SessionEntity,
      SessionEntity.init({ ip: sessionIp }).result as SessionEntity,
      SessionEntity.init({ ip: sessionIp }).result as SessionEntity,
    ];

    const propNames = ['sessions'];
    const entity = { sessions: entities } as any;

    const areEntities = verifyAreEntities(propNames, entity);
    expect(entities[0]).toBeInstanceOf(Entity);
    expect(entities[1]).toBeInstanceOf(Entity);
    expect(entities[2]).toBeInstanceOf(Entity);
    expect(areEntities).toBeTruthy();
  });

  it('should be return false if some prop name is not array', () => {
    const propNames = ['sessions'];
    const entity = { sessions: 'string' } as any;

    const areEntities = verifyAreEntities(propNames, entity);
    expect(areEntities).toBeFalsy();
  });

  it('should be return false if some is not instance of entity', () => {
    const invalidIp = IpValueObject.init({ value: 'invalidIP' })
      .result as IpValueObject;

    const sessionIp = IpValueObject.init({ value: '139.205.112.175' })
      .result as IpValueObject;

    const entities = [
      SessionEntity.init({ ip: sessionIp }).result as SessionEntity,
      SessionEntity.init({ ip: invalidIp }).result as SessionEntity,
      SessionEntity.init({ ip: sessionIp }).result as SessionEntity,
    ];

    const propNames = ['sessions'];
    const entity = { sessions: entities } as any;

    const areEntities = verifyAreEntities(propNames, entity);
    expect(entities[0]).toBeInstanceOf(Entity);
    expect(entities[1]).not.toBeInstanceOf(Entity);
    expect(entities[2]).toBeInstanceOf(Entity);
    expect(areEntities).toBeFalsy();
  });
});
