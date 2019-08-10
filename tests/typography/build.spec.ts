import { build, create } from '../../../src/toolkit/composition';

describe('quarks.toolkit.scale modules', () => {
  describe('scale.build', () => {
    describe('ratio(value?, limit?)', () => {
      test('default values', () => {
        const decimals = (v: number, precision: number) =>
          parseFloat(v.toPrecision(precision));
        const major3rd = (limit: number = 8) => build.ratio(1.25, limit);
        const data = create.scale(major3rd).map(v => decimals(v, 4));

        expect(data).toStrictEqual([
          1,
          1.25,
          1.563,
          1.953,
          2.441,
          3.052,
          3.815,
          4.768
        ]);
      });
    });
  });
});
