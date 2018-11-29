const lis = require('../src/lis.js');

it('returns empty array if empty array given', () => {
  expect(lis([])).toEqual([]);
});
