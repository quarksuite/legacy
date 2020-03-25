import { scale } from '../../src';

describe('Scale update function', () => {
  const base = 1;
  describe('scale.update(scale, n, modifier)', () => {
    test('updates a modular scale', () => {
      const orig = scale.create('golden', 6);
      const modified = scale.update(2, (n: number, value: number) => n * value);
      const input = scale.pipe(orig, modified);
      expect(input(base)).toStrictEqual([
        2,
        3.23608,
        5.23608,
        8.47218,
        13.7083,
        22.1806
      ]);
    });
  });
});
