import { variant } from '../../src/color';

describe('Utilities for color variants', () => {
  const color = '#f00000';
  describe('tints(color, options?)', () => {
    test('returns tints of color', () => {
      expect(variant.tints(color)).toStrictEqual([
        '#ff6343',
        '#ff987d',
        '#ffc9ba',
        '#fef9f9'
      ]);
    });
  });
  describe('tones(color, options?)', () => {
    test('returns tones of a color', () => {
      expect(variant.tones(color)).toStrictEqual([
        '#e84e32',
        '#db7058',
        '#c98d7f',
        '#aea6a6'
      ]);
    });
  });
  describe('shades(color, options?)', () => {
    test('returns shades of a color', () => {
      expect(variant.shades(color)).toStrictEqual([
        '#be130b',
        '#8f1710',
        '#621612',
        '#381111'
      ]);
    });
  });
  describe('temperature(color, kelvin?, options?)', () => {
    test('blends a color with a number on the temperature scale', () => {
      expect(variant.temperature(color)).toStrictEqual([
        '#f85127',
        '#fd7a47',
        '#ff9d67',
        '#febe87'
      ]);
    });
    test('test candlelight', () => {
      expect(variant.temperature(color)).toStrictEqual([
        '#f85127',
        '#fd7a47',
        '#ff9d67',
        '#febe87'
      ]);
    });
    test('test sunset', () => {
      expect(variant.temperature(color)).toStrictEqual([
        '#f85127',
        '#fd7a47',
        '#ff9d67',
        '#febe87'
      ]);
    });
    test('test daylight', () => {
      expect(variant.temperature(color)).toStrictEqual([
        '#f85127',
        '#fd7a47',
        '#ff9d67',
        '#febe87'
      ]);
    });
  });
});
