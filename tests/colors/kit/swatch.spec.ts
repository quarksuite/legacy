import { complement, neutralize } from '../../../src/colors/kit';

describe('Utilities for color swatches', () => {
  const color = '#f00000';
  describe('complement(color)', () => {
    test('returns the complement (opposite) of a color', () => {
      expect(complement(color)).toBe('#00f0f0');
    });
  });
  describe('neutralize(color)', () => {
    test('neutralizes a color with its opposite', () => {
      expect(neutralize(color)).toBe('#aaaaaa');
    });
  });
});
