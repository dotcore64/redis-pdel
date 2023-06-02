import Redis from 'ioredis';
import { use, expect } from 'chai';

// https://github.com/import-js/eslint-plugin-import/issues/1649
// eslint-disable-next-line import/no-unresolved
import { lua, name, numberOfKeys } from 'redis-pdel';

// eslint-disable-next-line unicorn/no-await-expression-member
use((await import('chai-as-promised')).default);

const keyPrefix = 'pdel:test:';
const redis = new Redis({ keyPrefix });
redis.defineCommand(name, { lua, numberOfKeys });

describe('integration', () => {
  beforeEach(async () => {
    const keys = await redis
      .multi()
      .pdel('foo:*')
      .pdel('bar:*')
      .keys(`${keyPrefix}foo:*`)
      .keys(`${keyPrefix}bar:*`)
      .exec();

    expect(keys[2][1].length).to.equal(0);
    expect(keys[3][1].length).to.equal(0);
  });

  after(() => redis.disconnect());

  it('should delete foo keys but not bar keys', async () => {
    await Promise.all([
      redis.set('foo:1', 'val'),
      redis.set('foo:2', 'val'),
      redis.set('bar:1', 'val'),
      redis.set('bar:2', 'val'),
    ]);

    await expect(redis.pdel('foo:*')).to.become(2);
    return expect(redis.mget([
      'foo:1',
      'foo:2',
      'bar:1',
      'bar:2',
    ])).to.become([null, null, 'val', 'val']); // eslint-disable-line unicorn/no-null
  });
});
