import { color, adjust, mix, convert } from '../../src/color/index';

describe('Color functions', () => {
  const input = '#348ec9';
  describe('adjust(): Color', () => {
    test('Double the value of current hue, then nudge 25 degrees left', () => {
      const hue = adjust('hue', (current: number) => current * 2 - 25);
      expect(hue(input)).toBe('rgb(203, 110, 52)');
    });
    test('Increase saturation by 30%', () => {
      const saturation = adjust(
        'saturation',
        (current: number) => current + 30
      );
      expect(saturation(input)).toBe('rgb(14, 150, 241)');
    });
    test('Darken by 10%', () => {
      const lightness = adjust('lightness', (current: number) => current - 10);
      expect(lightness(input)).toBe('rgb(42, 114, 162)');
    });
    test('Grab the complement of a color', () => {
      const complement = adjust('hue', (v: number) => v + 180);
      expect(complement(input)).toBe('rgb(203, 112, 52)');
    });
  });
  describe('mix(): Color', () => {
    test('Mix a color evenly', () => {
      const evenly = mix('coral', 50);
      expect(evenly(input)).toBe('rgb(184, 135, 153)');
    });
    test('Mix a color more with target', () => {
      const moreOfTarget = mix('coral', 72);
      expect(moreOfTarget(input)).toBe('rgb(218, 131, 126)');
    });
    test('Mix a color less with target', () => {
      const lessOfTarget = mix('coral', 30);
      expect(lessOfTarget(input)).toBe('rgb(146, 138, 174)');
    });
    test('Negate a color', () => {
      const complement = adjust('hue', (v: number) => v + 180);
      const negate = mix(complement(input), 50);
      expect(negate(input)).toBe('rgb(148, 128, 147)');
    });
  });
  describe('convert(): Color', () => {
    test('Convert a color to Hex', () => {
      const toHex = convert('hex');
      expect(toHex(input)).toBe('#348ec9');
    });
    test('Convert a color to RGB', () => {
      const toRGB = convert('rgb');
      expect(toRGB(input)).toBe('rgb(52, 142, 201)');
    });
    test('Convert a color to hsl', () => {
      const toHSL = convert('hsl');
      expect(toHSL(input)).toBe('hsl(204, 59%, 50%)');
    });
  });
});

describe('color(): Color', () => {
  test('scenario: begin with red, rotate hue 90deg, decrease saturation by quarter', () => {
    const base = 'red';
    const turnQuarterCircle = adjust('hue', (current: number) => current + 90);
    const reduceSat = adjust('saturation', (current: number) => current / 4);
    const input = color(turnQuarterCircle, reduceSat);

    expect(input(base)).toBe('rgb(128, 159, 96)');
  });
  test('scenario: begin with dodgerblue, mix evenly with lime, fetch complement of result, raise lightness by half', () => {
    const base = 'dodgerblue';
    const withLime = mix('lime', 25);
    const complement = adjust('hue', (v: number) => v + 180);
    const setLightness = adjust('lightness', (v: number) => v * 2);
    const input = color(withLime, complement, setLightness);

    expect(input(base)).toBe('rgb(253, 240, 237)');
  });
});
