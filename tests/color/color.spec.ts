import { color } from '../../src';

describe('Color functions', () => {
  const input = '#348ec9';
  describe('color.hue(color: Color, modifier: (current: Hue) => Degrees): Color', () => {
    test('Double the value of current hue, then nudge 25 degrees left', () => {
      expect(color.hue(input, (current: number) => current * 2 - 25)).toBe(
        'rgb(203, 110, 52)'
      );
    });
  });
  describe('color.saturation(color: Color, modifier: (current: Saturation) => Percent): Color', () => {
    test('Increase saturation by 30%', () => {
      expect(color.saturation(input, (current: number) => current + 30)).toBe(
        'rgb(14, 150, 241)'
      );
    });
  });
  describe('color.lightness(color: Color, modifier: (current: Lightness) => Percent): Color', () => {
    test('Darken by 10%', () => {
      expect(color.lightness(input, (current: number) => current - 10)).toBe(
        'rgb(42, 114, 162)'
      );
    });
  });
  describe('color.mix(color: Color, withTarget: Color, byAmount: Percent = 50): Color', () => {
    test('Mixes a color evenly', () => {
      expect(color.mix(input, 'coral')).toBe('rgb(184, 135, 153)');
    });
    test('Mixes more with the target', () => {
      expect(color.mix(input, 'coral', 72)).toBe('rgb(218, 131, 126)');
    });
    test('Mixes less with the target', () => {
      expect(color.mix(input, 'coral', 30)).toBe('rgb(146, 138, 174)');
    });
  });
  describe('color.complement(color: Color): Color', () => {
    test('Fetch the complement', () =>
      expect(color.complement(input)).toBe('rgb(203, 112, 52)'));
  });
  describe('color.negate(color: Color): Color', () => {
    test('Negate the input color', () =>
      expect(color.negate(input)).toBe('rgb(148, 128, 147)'));
  });
  describe('color.format(color: Color, toFormat): Color', () => {
    test('RGB by default', () =>
      expect(color.convert(input)).toBe('rgb(52, 142, 201)'));
    test('color to HSL', () =>
      expect(color.convert(input, 'hsl')).toBe('hsl(204, 59%, 50%)'));
  });
});
