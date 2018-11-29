const lis = require('../src/lis.js');

it('returns empty subsequence if empty sequence given', () => {
  expect(lis([])).toEqual([]);
});

it('throws type error if non-array given', () => {
  expect(_ => lis(1)).toThrow(TypeError);
});

it('finds longest increasing subsequence', () => {
  expect(lis([1, 9, 5, 13, 3, 11, 7, 15, 2, 10, 6, 14, 4, 12, 8, 16])).toEqual([1, 3, 7, 10, 12, 16]);
});
