import Color from '../../src/color';

describe('Swatch transformation', () => {
  test('converts to other format', () => {
    const color = new Color('#348ec9');
    expect(color.formatSwatchTo('hsl').swatchState).toBe(
      'hsl(204, 58.9%, 49.6%)'
    );
  });
  test('shifts the hue by given degrees', () => {
    const color = new Color('#348ec9');
    expect(color.shiftHue(42).swatchState).toBe('rgb(67, 52, 203)');
  });
  test('returns the complement of a color', () => {
    const color = new Color('#348ec9');
    expect(color.fetchComplement().swatchState).toBe('rgb(203, 112, 52)');
  });
  test('negates a color with its complement', () => {
    const color = new Color('#348ec9');
    expect(color.neutralize().swatchState).toBe('rgb(148, 128, 147)');
  });
  test('mixes two colors by a given amount', () => {
    const color = new Color('#348ec9');
    const target = '#a03339';
    expect(color.mix(target).swatchState).toBe('rgb(119, 107, 148)');
  });
  test('accepts a blend amount', () => {
    const color = new Color('#348ec9');
    const target = '#a03339';
    expect(color.mix(target, 60).swatchState).toBe('rgb(128, 98, 135)');
  });
});
