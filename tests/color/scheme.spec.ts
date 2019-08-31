import { scheme } from '../../src/color';

describe('Color utilities', () => {
  const color = '#348ec9';
  describe('complementary(color)', () => {
    test('returns a complementary color scheme', () => {
      expect(scheme.complementary(color)).toStrictEqual(['#348ec9', '#c96f34']);
    });
  });
  describe('splitComplementary(color, distance?, accented?)', () => {
    test('returns a split complementary color scheme', () => {
      expect(scheme.splitComplementary(color)).toStrictEqual([
        '#348ec9',
        '#c94a34',
        '#c99434'
      ]);
    });
    test('can adjust distance', () => {
      expect(scheme.splitComplementary(color, 30)).toStrictEqual([
        '#348ec9',
        '#c93443',
        '#c9b934'
      ]);
    });
    test('can add complement as accent', () => {
      expect(scheme.splitComplementary(color, 20, true)).toStrictEqual([
        '#348ec9',
        '#c96f34',
        '#c93d34',
        '#c9a134'
      ]);
    });
  });
  describe('triadic(color)', () => {
    test('returns a split complementary color scheme', () => {
      expect(scheme.triadic(color)).toStrictEqual([
        '#348ec9',
        '#c9348e',
        '#8ec934'
      ]);
    });
  });
  describe('analogous(color, distance?)', () => {
    test('returns an analogous color scheme', () => {
      expect(scheme.analogous(color)).toStrictEqual([
        '#348ec9',
        '#3469c9',
        '#3443c9'
      ]);
    });
    test('can adjust distance of spread', () => {
      expect(scheme.analogous(color, 30)).toStrictEqual([
        '#348ec9',
        '#3443c9',
        '#6f34c9'
      ]);
    });
  });
  describe('dual(color, distance?)', () => {
    test('returns a dual color scheme', () => {
      expect(scheme.dual(color)).toStrictEqual([
        '#348ec9',
        '#3469c9',
        '#c96f34',
        '#c99434'
      ]);
    });
    test('can adjust distance', () => {
      expect(scheme.dual(color, 30)).toStrictEqual([
        '#348ec9',
        '#3443c9',
        '#c96f34',
        '#c9ba34'
      ]);
    });
  });
  describe('tetradic(color)', () => {
    test('returns a tetradic color scheme', () => {
      expect(scheme.tetradic(color)).toStrictEqual([
        '#348ec9',
        '#b934c9',
        '#c96f34',
        '#44c934'
      ]);
    });
  });
});
