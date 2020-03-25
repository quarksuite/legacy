import {
  color,
  adjust,
  complement,
  mix,
  negate,
  convert
} from '../../src/color/index';

describe('Color functions', () => {
  const input = '#348ec9';
  describe('adjust(modifier: (current: Hue | Saturation | Lightness) => Degrees | Percent): Color', () => {
    test('Double the value of current hue, then nudge 25 degrees left', () => {
      const hue = adjust((current: number) => current * 2 - 25, 'hue');
      expect(hue(input)).toBe('rgb(203, 110, 52)');
    });
  });
});
