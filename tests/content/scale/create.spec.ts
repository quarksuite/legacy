import { create } from '../../../src/content/scale';

describe('Scale creation and modification', () => {
  describe('scale.create(base, ratio, limit?)', () => {
    test('outputs a modular scale', () => {
      expect(create(1, 1.123)).toStrictEqual([
        1,
        1.123,
        1.26113,
        1.41625,
        1.59045,
        1.78607
      ]);
    });
    test('accepts named ratios', () => {
      expect(create(1, 'golden')).toStrictEqual([
        1,
        1.61804,
        2.61804,
        4.23609,
        6.85416,
        11.0903
      ]);
    });
    test('accepts custom ratios', () => {
      expect(create(1, 1.2345)).toStrictEqual([
        1,
        1.2345,
        1.52399,
        1.88137,
        2.32255,
        2.86718
      ]);
    });
    test('accepts a user-defined limit', () => {
      expect(create(1, 1.2345, 3)).toStrictEqual([1, 1.2345, 1.52399]);
    });
  });
});
