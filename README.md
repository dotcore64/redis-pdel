# redis-pdel

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Dependency Status][dependency-status-badge]][dependency-status]
[![devDependency Status][dev-dependency-status-badge]][dev-dependency-status]

> pdel lua command for redis clients

## pdel redis command

Deletes all the keys matching a specific regex, for example

```
set foo:one val
set foo:two val
pdel foo:*
get foo:one <- nil
get foo:two <- nil
```

Note: this is *not* meant to be used in production. Supports Node 4+.

## Install

```
$ npm install --save redis-pdel
```

## Usage

The easiest usecase is to use with [https://github.com/luin/ioredis](ioredis) as follows:

```js
const Redis = require('ioredis');
const { name, lua, numberOfKeys } = require('redis-pdel');
const redis = new Redis();
redis.defineCommand(name, { lua, numberOfKeys });
```

Then, just run like any other command:

```js
redis.pdel('foo:*');
```

## Tests

There are unit tests and integration tests. The integration tests require redis to be running.

```bash
docker-compose up
npm test:unit
npm test:integration
npm test # run both tests
```

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[build-badge]: https://img.shields.io/github/workflow/status/dotcore64/redis-pdel/test/master?style=flat-square
[build]: https://github.com/dotcore64/redis-pdel/actions

[npm-badge]: https://img.shields.io/npm/v/redis-pdel.svg?style=flat-square
[npm]: https://www.npmjs.org/package/redis-pdel

[dependency-status-badge]: https://david-dm.org/dotcore64/redis-pdel.svg?style=flat-square
[dependency-status]: https://david-dm.org/dotcore64/redis-pdel

[dev-dependency-status-badge]: https://david-dm.org/dotcore64/redis-pdel/dev-status.svg?style=flat-square
[dev-dependency-status]: https://david-dm.org/dotcore64/redis-pdel#info=devDependencies
