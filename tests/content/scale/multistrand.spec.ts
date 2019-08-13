import { ratios, build, output, multistrand } from '../../../src/content/scale';

describe('Utilities for content', () => {
  describe('multistrand(scale, ratios)', () => {
    test('Can output a multistranded scale', () => {
      const data = output(multistrand(build(ratios.golden, 6), [2, 3]));

      expect(data).toStrictEqual([
        '1rem',
        '1.618rem',
        '2.618rem',
        '4.236rem',
        '6.854rem',
        '6.854rem',
        '10.28rem',
        '11.09rem',
        '11.09rem'
      ]);
    });
    test('works with ratios less than 1', () => {
      const data = output(multistrand(build(ratios.golden, 6), [0.5, 0.25]));

      expect(data).toStrictEqual([
        '0.8568rem',
        '1rem',
        '1.386rem',
        '1.618rem',
        '1.714rem',
        '2.243rem',
        '2.618rem',
        '2.773rem',
        '3.629rem',
        '4.236rem',
        '4.486rem',
        '5.872rem',
        '6.854rem',
        '7.259rem',
        '9.502rem',
        '11.09rem'
      ]);
    });
  });
});
