import { complement, neutralize, mix } from '../../src/color';

describe('Color utilities', () => {
  describe('color.complement(color)', () => {
    test('returns the complement of a color', () => {
      const color = '#348ec9';
      expect(complement(color)).toBe('#cb7034');
    });
    test('tests another color: #bada55', () => {
      const color = '#bada55';
      expect(complement(color)).toBe('#7354d9');
    });
  });
  describe('color.neutralize(color)', () => {
    test('negates a color with its complement', () => {
      const color = '#348ec9';
      expect(neutralize(color)).toBe('#948093');
    });
    test('tests another color', () => {
      const color = '#deaded';
      expect(neutralize(color)).toBe('#cdcfcf');
    });
  });
  describe('color.mix(color)', () => {
    test('mixes two colors by a given amount', () => {
      const color = '#348ec9';
      const target = '#a03339';
      expect(mix(color, target)).toBe('#776b94');
    });
    test('accepts an amount', () => {
      const color = '#348ec9';
      const target = '#a03339';
      expect(mix(color, target, 60)).toBe('#806287');
    });
  });
});
