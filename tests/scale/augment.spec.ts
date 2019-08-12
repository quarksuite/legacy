import { create, build, augment } from '../../src/scale';

describe('Utilities for quarks.scale', () => {
  describe('augment(base, scale, transform)', () => {
    test('augments a scale with a significant base value', () => {
      const decimals = (v: number, precision: number) =>
        parseFloat(v.toPrecision(precision));
      const perfectFourth = (limit: number) => create(1.333, limit);
      const multiply = (base: number, v: number) => base * v;
      const data = augment(1.5, build(perfectFourth), multiply).map(
        (v: number) => decimals(v, 4)
      );

      expect(data).toStrictEqual([
        1.5,
        1.999,
        2.665,
        3.553,
        4.736,
        6.313,
        8.415,
        11.22
      ]);
    });
  });
});
