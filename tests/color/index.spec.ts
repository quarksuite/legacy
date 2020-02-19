import { complement, neutralize, mix } from '../../src/color';

describe('Color utilities', () => {
  describe('color.complement(color)', () => {
    test('returns the complement of a color', () => {
      const color = '#348ec9';
      expect(complement(color)).toBe('rgb(203, 112, 52)');
    });
    test('tests another color: #bada55', () => {
      const color = '#bada55';
      expect(complement(color)).toBe('rgb(115, 84, 217)');
    });
  });
  describe('color.neutralize(color)', () => {
    test('negates a color with its complement', () => {
      const color = '#348ec9';
      expect(neutralize(color)).toBe('rgb(148, 127, 147)');
    });
    test('tests another color', () => {
      const color = '#deaded';
      expect(neutralize(color)).toBe('rgb(206, 208, 208)');
    });
  });
  describe('color.mix(color)', () => {
    test('mixes two colors by a given amount', () => {
      const color = '#348ec9';
      const target = '#a03339';
      expect(mix(color, target)).toBe('rgb(119, 107, 148)');
    });
    test('accepts an amount', () => {
      const color = '#348ec9';
      const target = '#a03339';
      expect(mix(color, target, 60)).toBe('rgb(129, 99, 136)');
    });
  });
});
