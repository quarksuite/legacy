import { color } from '../../src/';

describe('Color functions', () => {
  const input = '#348ec9';
  describe('color.a11y(): Color', () => {
    test('can grab accessible defaults', () => {
      expect(color.a11y('teal')).toBe('rgb(57, 204, 204)');
    });
    test('rejects undefined colors', () => {
      expect(color.a11y('wheat')).toThrowError(
        'Color wheat is not defined (See http://clrs.cc)'
      );
    });
  });
  describe('color.adjust(): Color', () => {
    test('Double the value of current hue, then nudge 25 degrees left', () => {
      const hue = color.adjust('hue', (h: number) => h * 2 - 25);
      expect(hue(input)).toBe('rgb(203, 110, 52)');
    });
    test('Increase saturation by 30%', () => {
      const saturation = color.adjust('saturation', (s: number) => s + 30);
      expect(saturation(input)).toBe('rgb(14, 150, 241)');
    });
    test('Darken by 10%', () => {
      const lightness = color.adjust('lightness', (l: number) => l - 10);
      expect(lightness(input)).toBe('rgb(42, 114, 162)');
    });
  });
  describe('color.mix(): Color', () => {
    test('Mix a color evenly', () => {
      const evenly = color.mix('coral', 50);
      expect(evenly(input)).toBe('rgb(184, 135, 153)');
    });
    test('Mix a color more with target', () => {
      const moreOfTarget = color.mix('coral', 72);
      expect(moreOfTarget(input)).toBe('rgb(218, 131, 126)');
    });
    test('Mix a color less with target', () => {
      const lessOfTarget = color.mix('coral', 30);
      expect(lessOfTarget(input)).toBe('rgb(146, 138, 174)');
    });
  });
  describe('color.complement(): Color', () => {
    test('Grab the complement of a color', () => {
      expect(color.complement(input)).toBe('rgb(203, 112, 52)');
    });
  });
  describe('color.negate(): Color', () => {
    test('Negate a color', () => {
      expect(color.negate(input)).toBe('rgb(148, 128, 147)');
    });
  });
  describe('color.convert(): Color', () => {
    test('Convert a color to Hex', () => {
      const toHex = color.convert('hex');
      expect(toHex(input)).toBe('#348ec9');
    });
    test('Convert a color to RGB', () => {
      const toRGB = color.convert('rgb');
      expect(toRGB(input)).toBe('rgb(52, 142, 201)');
    });
    test('Convert a color to hsl', () => {
      const toHSL = color.convert('hsl');
      expect(toHSL(input)).toBe('hsl(204, 59%, 50%)');
    });
  });
});

describe('color.pipe(): Color', () => {
  test('scenario: begin with red, rotate hue 150deg, decrease saturation by quarter', () => {
    const base = 'red';
    const turnQuarterCircle = color.adjust('hue', (h: number) => h + 150);
    const reduceSat = color.adjust('saturation', (s: number) => s - s / 4);
    const input = color.pipe(reduceSat, turnQuarterCircle);

    expect(input(base)).toBe('rgb(32, 223, 128)');
  });
  test('scenario: begin with dodgerblue, mix 60% with lime, fetch complement of result, raise lightness by half', () => {
    const base = 'dodgerblue';
    const withLime = color.mix('lime', 60);
    const setLightness = color.adjust('lightness', (l: number) => l + l / 2);
    const input = color.pipe(setLightness, color.complement, withLime);

    expect(input(base)).toBe('rgb(161, 239, 109)');
  });
  test('scenario: begin with goldenrod, negate, raise saturation by 23%', () => {
    const base = 'goldenrod';
    const setSaturation = color.adjust('saturation', (v: number) => v + 23);
    const input = color.pipe(setSaturation, color.negate);

    expect(input(base)).toBe('rgb(174, 135, 174)');
  });
  test('scenario: begin with goldenrod, consecutively mix with red, yellow', () => {
    const base = 'goldenrod';
    const withRed = color.mix('red', 75);
    const withYellow = color.mix('yellow', 50);
    const input = color.pipe(withYellow, withRed);

    expect(input(base)).toBe('rgb(251, 108, 12)');
  });
});
