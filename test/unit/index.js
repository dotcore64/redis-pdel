import { join } from 'path';
import { readFileSync } from 'fs';
import { createRequire } from 'module';
import { dirname } from 'dirname-filename-esm';
import { expect } from 'chai';

// https://github.com/import-js/eslint-plugin-import/issues/1649
// eslint-disable-next-line import/no-unresolved
import { name, lua, numberOfKeys } from 'redis-pdel';

const pdel = readFileSync(join(dirname(import.meta), '..', '..', 'src', 'pdel.lua'), 'utf8');

describe('unit', () => {
  it('should export correct object literal from esm build', () => {
    expect(name).to.equal('pdel');
    expect(lua).to.equal(pdel);
    expect(numberOfKeys).to.equal(1);
  });

  it('should export correct object literal from cjs build', () => {
    const require = createRequire(import.meta.url);
    // eslint-disable-next-line import/extensions
    expect(require('../..')).to.deep.equal({
      name,
      lua,
      numberOfKeys,
    });
  });
});
