import { spin, modify, mixColors, createBlend } from '../../src/color/utils';

describe('Color transform utilities', () => {
  describe('spin(color: string, rotation: number, counterClockwise?: boolean): string', () => {
    test('spins the hue of a color to desired degrees', () => {
      expect(spin('red', 15)).toBe('rgb(255, 64, 0)');
      expect(spin('red', 30)).toBe('rgb(255, 128, 0)');
      expect(spin('red', 45)).toBe('rgb(255, 191, 0)');
      expect(spin('red', 60)).toBe('rgb(255, 255, 0)');
      expect(spin('red', 75)).toBe('rgb(191, 255, 0)');
      expect(spin('red', 90)).toBe('rgb(128, 255, 0)');
      expect(spin('red', 105)).toBe('rgb(64, 255, 0)');
      expect(spin('red', 120)).toBe('rgb(0, 255, 0)');
    });
    test('can also spin counter-clockwise', () => {
      expect(spin('red', 15, true)).toBe('rgb(255, 0, 64)');
      expect(spin('red', 30, true)).toBe('rgb(255, 0, 128)');
      expect(spin('red', 45, true)).toBe('rgb(255, 0, 191)');
      expect(spin('red', 60, true)).toBe('rgb(255, 0, 255)');
    });
  });
  describe('modify(color: string, property: string, modifier: (currentValue: number) => number): string', () => {
    test('allows modification of hue', () => {
      expect(modify('red', 'hue', (current: number) => current + 15)).toBe(
        'rgb(255, 64, 0)'
      );
      expect(modify('red', 'hue', (current: number) => current + 72)).toBe(
        'rgb(204, 255, 0)'
      );
      expect(
        modify('red', 'hue', (current: number) => current + 2 * 3 * 4)
      ).toBe('rgb(255, 102, 0)');
      expect(modify('red', 'hue', (current: number) => current + 30 * 2)).toBe(
        'rgb(255, 255, 0)'
      );
    });
    test('allows modification of saturation', () => {
      expect(
        modify('red', 'saturation', (current: number) => current / 2)
      ).toBe('rgb(191, 64, 64)');
      expect(
        modify('red', 'saturation', (current: number) => current - 72)
      ).toBe('rgb(163, 92, 92)');
      expect(
        modify('red', 'saturation', (current: number) => current / 2 + 15)
      ).toBe('rgb(210, 45, 45)');
      expect(
        modify('red', 'saturation', (current: number) => (current / 5) * 2)
      ).toBe('rgb(179, 77, 77)');
    });
    test('allows modification of lightness', () => {
      expect(modify('red', 'lightness', (current: number) => current / 2)).toBe(
        'rgb(128, 0, 0)'
      );
      expect(
        modify('red', 'lightness', (current: number) => current - 30)
      ).toBe('rgb(102, 0, 0)');
      expect(
        modify('red', 'lightness', (current: number) => current / 2 + 15)
      ).toBe('rgb(204, 0, 0)');
      expect(
        modify('red', 'lightness', (current: number) => current + 25)
      ).toBe('rgb(255, 128, 128)');
    });
  });
  describe('mixColors(color: string, target: string, amount: string): string', () => {
    test('mixes colors evenly', () => {
      expect(mixColors('red', 'blue')).toBe('rgb(180, 0, 180)');
      expect(mixColors('green', 'orange')).toBe('rgb(180, 148, 0)');
      expect(mixColors('yellow', 'indigo')).toBe('rgb(188, 180, 92)');
    });
    test('mixes colors variably', () => {
      expect(mixColors('red', 'blue', 30)).toBe('rgb(213, 0, 140)');
      expect(mixColors('green', 'orange', 60)).toBe('rgb(198, 151, 0)');
      expect(mixColors('yellow', 'indigo', 90)).toBe('rgb(108, 81, 123)');
    });
  });
  describe('createBlend(color: string, target: string, contrast?: number, limit?: number): string', () => {
    test('creates blends for a given color', () => {
      expect(createBlend('red', 'blue')).toStrictEqual([
        'rgb(210, 0, 145)',
        'rgb(152, 0, 205)',
        'rgb(44, 0, 251)'
      ]);
      expect(createBlend('green', 'orange')).toStrictEqual([
        'rgb(145, 141, 0)',
        'rgb(205, 153, 0)',
        'rgb(251, 164, 0)'
      ]);
      expect(createBlend('yellow', 'indigo')).toStrictEqual([
        'rgb(214, 210, 74)',
        'rgb(163, 152, 105)',
        'rgb(86, 44, 128)'
      ]);
    });
    test('can adjust the contrast', () => {
      expect(createBlend('red', 'blue', 30)).toStrictEqual([
        'rgb(242, 0, 81)',
        'rgb(228, 0, 114)',
        'rgb(213, 0, 140)'
      ]);
      expect(createBlend('green', 'orange', 60)).toStrictEqual([
        'rgb(114, 136, 0)',
        'rgb(161, 144, 0)',
        'rgb(198, 151, 0)'
      ]);
      expect(createBlend('yellow', 'indigo', 49)).toStrictEqual([
        'rgb(235, 233, 53)',
        'rgb(214, 209, 74)',
        'rgb(190, 182, 91)'
      ]);
    });
    test('can set an output range limit', () => {
      expect(createBlend('red', 'blue', 80, 2)).toStrictEqual([
        'rgb(198, 0, 161)',
        'rgb(114, 0, 228)'
      ]);
      expect(createBlend('red', 'blue', 60, 4)).toStrictEqual([
        'rgb(235, 0, 99)',
        'rgb(213, 0, 140)',
        'rgb(189, 0, 171)',
        'rgb(161, 0, 198)'
      ]);
    });
  });
});
