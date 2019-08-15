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
  describe('mix(color, target, intensity?)', () => {
    test('returns the mixture of two colors', () => {
      expect(swatch.mix(color, 'green')).toBe('#25878e');
    });
    test('can adjust intensity of mixture', () => {
      expect(swatch.mix(color, 'green', 80)).toBe('#17835a');
    });
  });
});
