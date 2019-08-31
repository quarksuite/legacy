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
      expect(swatch.neutralize(color)).toBe('#7f7f7f');
    });
  });
  describe('mix(color, target, amount?)', () => {
    test('returns the mixture of two colors', () => {
      expect(swatch.mix(color, 'green')).toBe('#1a8765');
    });
    test('can adjust amount of mixture less', () => {
      expect(swatch.mix(color, 'green', 30)).toBe('#248a8d');
    });
    test('can adjust amount of mixture more', () => {
      expect(swatch.mix(color, 'green', 80)).toBe('#0a8328');
    });
  });
});
