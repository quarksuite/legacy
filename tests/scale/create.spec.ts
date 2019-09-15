import { create } from '../../src/scale';

describe('Scale creation and modification', () => {
  describe('scale.create(base, ratio, limit?)', () => {
    test('outputs a modular scale', () => {
      expect(create()).toStrictEqual([
        1,
        1.61804,
        2.61804,
        4.23609,
        6.85416,
        11.0903
      ]);
    });
    test('accepts named ratios', () => {
      expect(create(1, 'dim5th')).toStrictEqual([
        1,
        1.414,
        1.9994,
        2.82715,
        3.99758,
        5.65258
      ]);
    });
    test('accepts custom ratios', () => {
      expect(create(1, 2.25)).toStrictEqual([
        1,
        2.25,
        5.0625,
        11.3906,
        25.6289,
        57.665
      ]);
    });
    test('accepts a user-defined limit', () => {
      expect(create(1, 1.2345, 3)).toStrictEqual([1, 1.2345, 1.52399]);
    });
    test('accepts invert boolean', () => {
      expect(create(1, 1.2345, 3, true)).toStrictEqual([1, 0.810045, 0.656172]);
    });
  });
});
