import { palette } from '../../src/color';

describe('Utilities for color.palette', () => {
  const color = '#f00000';
  describe('tints(color, options?)', () => {
    test('returns tints of color', () => {
      expect(palette.tints(color)).toStrictEqual([
        '#ff6343',
        '#ff987d',
        '#ffc9ba',
        '#fef9f9'
      ]);
    });
  });
  describe('tones(color, options?)', () => {
    test('returns tones of a color', () => {
      expect(palette.tones(color)).toStrictEqual([
        '#e84e32',
        '#db7058',
        '#c98d7f',
        '#aea6a6'
      ]);
    });
  });
  describe('shades(color, options?)', () => {
    test('returns shades of a color', () => {
      expect(palette.shades(color)).toStrictEqual([
        '#be130b',
        '#8f1710',
        '#621612',
        '#381111'
      ]);
    });
  });
  describe('temperature(color, kelvin?, options?)', () => {
    test('blends a color with a number on the temperature scale', () => {
      expect(palette.temperature(color)).toStrictEqual([
        '#f85127',
        '#fd7a47',
        '#ff9d67',
        '#febe87'
      ]);
    });
    test('test candlelight', () => {
      expect(palette.temperature(color, 2000)).toStrictEqual([
        '#f43d02',
        '#f85a06',
        '#fb720c',
        '#fe8713'
      ]);
    });
    test('test sunset', () => {
      expect(palette.temperature(color, 3500)).toStrictEqual([
        '#f85127',
        '#fd7a47',
        '#ff9d67',
        '#febe87'
      ]);
    });
    test('test daylight', () => {
      expect(palette.temperature(color, 6500)).toStrictEqual([
        '#ff6143',
        '#ff967d',
        '#ffc5b9',
        '#fef4f8'
      ]);
    });
    test('output more colors', () => {
      expect(palette.temperature(color, 4500, { range: 6 })).toStrictEqual([
        '#f74624',
        '#fd6941',
        '#ff865d',
        '#ffa179',
        '#ffbb96',
        '#fed5b4'
      ]);
    });
    test('output fewer colors', () => {
      expect(palette.temperature(color, 4500, { range: 2 })).toStrictEqual([
        '#ff865d',
        '#fed5b4'
      ]);
    });
  });
});
