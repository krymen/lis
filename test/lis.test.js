const lis = require('../src/lis.js');

it('returns empty array if empty array given', () => {
  expect(lis([])).toEqual([]);
});

it('throws type error if non-array given', () => {
  expect(_ => lis(1)).toThrow(TypeError);
});
