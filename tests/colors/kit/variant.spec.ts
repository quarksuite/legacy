import { tints, tones, shades } from '../../../src/colors/kit';

describe('Utilities for color variants', () => {
  const color = '#f00000';
  describe('tints(color, options?)', () => {
    test('returns the complement (opposite) of a color', () => {
      expect(tints(color)).toStrictEqual([
        '#f00000',
        '#ff7656',
        '#ffb9a5',
        '#fef9f9'
      ]);
    });
  });
  describe('tones(color, options?)', () => {
    test('neutralizes a color with its opposite', () => {
      expect(tones(color)).toStrictEqual([
        '#f00000',
        '#e45a3f',
        '#d08472',
        '#aea6a6'
      ]);
    });
  });
  describe('shades(color, options?)', () => {
    test('neutralizes a color with its opposite', () => {
      expect(shades(color)).toStrictEqual([
        '#f00000',
        '#ae150d',
        '#711711',
        '#381111'
      ]);
    });
  });
});
