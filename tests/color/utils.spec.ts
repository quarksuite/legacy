import * as utils from '../../src/color/utils';

describe('Color transform utilities', () => {
  describe('spin(color: string, rotation: number, counterClockwise?: boolean): string', () => {
    test.todo('spins the hue of a color to desired degrees');
    test.todo('can also spin counter-clockwise');
  });
  describe('modify(color: string, property: string, modifier: (currentValue: number) => number): string', () => {
    test.todo('allows modification of saturation');
    test.todo('allows modification of lightness');
  });
  describe('mixColors(color: string, target: string, amount: string): string', () => {
    test.todo('allows modification of saturation');
    test.todo('allows modification of lightness');
  });
  describe('createBlend(color: string, target: string, contrast?: number, limit?: number): string', () => {
    test.todo('creates blends for a given color');
    test.todo('can adjust the contrast');
    test.todo('can set an output range limit');
  });
});
