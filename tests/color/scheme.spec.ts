import { scheme } from '../../src/color';

describe('Color utilities', () => {
  const color = '#348ec9';
  describe('complementary(color)', () => {
    test('returns a complementary color scheme', () => {
      expect(scheme.complementary(color)).toStrictEqual(['#348ec9', '#c96f34']);
    });
  });
  describe('splitComplementary(color)', () => {
    test('returns a split complementary color scheme', () => {
      expect(scheme.splitComplementary(color)).toStrictEqual([
        '#348ec9',
        '#c94a34',
        '#c99434'
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
  describe('analogous(color)', () => {
    test('returns an analogous color scheme', () => {
      expect(scheme.analogous(color)).toStrictEqual([
        '#348ec9',
        '#34b3c9',
        '#3469c9'
      ]);
    });
  });
  describe('dual(color)', () => {
    test('returns an dual color scheme', () => {
      expect(scheme.dual(color)).toStrictEqual([
        '#348ec9',
        '#3469c9',
        '#c96f34',
        '#c99434'
      ]);
    });
  });
});
