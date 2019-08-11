import { swatch } from '../../src/colors';

describe('Utilities for color swatches', () => {
  const color = '#f00000';
  describe('complement(color)', () => {
    test('returns the complement (opposite) of a color', () => {
      expect(swatch.complement(color)).toBe('#00f0f0');
    });
  });
  describe('neutralize(color)', () => {
    test('neutralizes a color with its opposite', () => {
      expect(swatch.neutralize(color)).toBe('#aaaaaa');
    });
  });
});
