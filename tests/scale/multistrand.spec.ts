import { ratios, build, output, multistrand } from '../../src/scale';

describe('Utilities for quarks.scale', () => {
  describe('multistrand(scale, ratios)', () => {
    test('Can output a multistranded scale', () => {
      const data = output(multistrand(build(ratios.golden, 6), [1.5, 2]), {
        precision: 6
      });

      expect(data).toStrictEqual([
        '1rem',
        '1.61804rem',
        '2.61804rem',
        '4.23609rem',
        '5.1406rem',
        '6.85414rem',
        '6.85416rem',
        '8.31769rem',
        '11.0902rem',
        '11.0903rem'
      ]);
    });
    test('works with ratios less than 1', () => {
      const data = output(multistrand(build(ratios.golden, 6), [0.5, 0.25]), {
        precision: 3
      });

      expect(data).toStrictEqual([
        '0.857rem',
        '1rem',
        '1.39rem',
        '1.62rem',
        '1.71rem',
        '2.24rem',
        '2.62rem',
        '2.77rem',
        '3.63rem',
        '4.24rem',
        '4.49rem',
        '5.87rem',
        '6.85rem',
        '7.26rem',
        '9.5rem',
        '11.1rem'
      ]);
    });
  });
});
