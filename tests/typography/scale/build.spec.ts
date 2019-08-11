import { scale } from '../../../src/typography';

describe('quarks.typography.scale modules', () => {
  describe('scale.build(type, limit?)', () => {
    test('default values', () => {
      const decimals = (v: number, precision: number) =>
        parseFloat(v.toPrecision(precision));
      const perfectFourth = (limit: number) => scale.create(1.333, limit);
      const data = scale
        .build(perfectFourth)
        .map((v: number) => decimals(v, 4));

      expect(data).toStrictEqual([
        1,
        1.333,
        1.777,
        2.369,
        3.157,
        4.209,
        5.61,
        7.478
      ]);
    });
    test('when limit = 4', () => {
      const decimals = (v: number, precision: number) =>
        parseFloat(v.toPrecision(precision));
      const perfect4th = (limit: number) => scale.create(1.333, limit);
      const data = scale
        .build(perfect4th, 4)
        .map((v: number) => decimals(v, 4));

      expect(data).toStrictEqual([1, 1.333, 1.777, 2.369]);
    });
  });
});
