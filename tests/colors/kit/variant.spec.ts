import { tints, tones, shades } from '../../../src/colors/kit';

describe('Utilities for color variants', () => {
  const color = '#f00000';
  describe('tints(color, options?)', () => {
    test('returns tints of color', () => {
      expect(tints(color)).toStrictEqual([
        '#ff6343',
        '#ff987d',
        '#ffc9ba',
        '#fef9f9'
      ]);
    });
  });
  describe('tones(color, options?)', () => {
    test('returns tones of a color', () => {
      expect(tones(color)).toStrictEqual([
        '#e84e32',
        '#db7058',
        '#c98d7f',
        '#aea6a6'
      ]);
    });
  });
  describe('shades(color, options?)', () => {
    test('returns shades of a color', () => {
      expect(shades(color)).toStrictEqual([
        '#be130b',
        '#8f1710',
        '#621612',
        '#381111'
      ]);
    });
  });
});
