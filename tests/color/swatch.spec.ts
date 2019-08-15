import { swatch } from '../../src/color';

describe('Color utilities', () => {
  const color = '#348ec9';
  describe('complement(color)', () => {
    test('returns the complement of a color', () => {
      expect(swatch.complement(color)).toBe('#c96f34');
    });
  });
  describe('neutralize(color)', () => {
    test('returns the negation of a color', () => {
      expect(swatch.neutralize(color)).toBe('#937f93');
    });
  });
});
