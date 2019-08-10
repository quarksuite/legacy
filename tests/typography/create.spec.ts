import { build, create } from '../../../src/toolkit/composition';

describe('quarks.toolkit.scale modules', () => {
  describe('scale.create', () => {
    describe('custom(type, limit?)', () => {
      test('default values', () => {
        const decimals = (v: number, precision: number) =>
          parseFloat(v.toPrecision(precision));
        const perfectFourth = (limit: number = 8) => build.ratio(1.333, limit);
        const data = create.scale(perfectFourth).map(v => decimals(v, 4));

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
    });
    describe('octave(limit)', () => {
      test('default values', () => {
        const decimals = (v: number, precision: number) =>
          parseFloat(v.toPrecision(precision));
        const o = create.octave(8);
        const data = o.map(v => decimals(v, 4));

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
    });
  });
});
