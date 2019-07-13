import { split, spread, triad, tetrad } from '../../../src/colors/kit';

describe('Utilities for color palettes', () => {
  const color = '#f00000';
  describe('split(color, degrees?)', () => {
    test('outputs the colors on either side of target color', () => {
      expect(split(color)).toStrictEqual(['#f000f0', '#f0f000']);
    });
  });
  describe('triad(color, degrees?)', () => {
    test('outputs a triad from the target color', () => {
      expect(triad(color)).toStrictEqual(['#f00000', '#0000f0', '#00f000']);
    });
    test('when degrees = 90 is a clash', () => {
      expect(triad(color, 90)).toStrictEqual(['#f00000', '#7800f0', '#78f000']);
    });
  });
  describe('tetrad(color, degrees?)', () => {
    test('outputs a tetrad from the target color', () => {
      expect(tetrad(color)).toStrictEqual([
        '#f00000',
        '#00f0f0',
        '#f0f000',
        '#0000f0'
      ]);
    });
    test('when degrees = 90 is a square', () => {
      expect(tetrad(color, 90)).toStrictEqual([
        '#f00000',
        '#00f0f0',
        '#78f000',
        '#7800f0'
      ]);
    });
  });
  describe('spread(color, degrees?, range?)', () => {
    test('outputs a range of colors from the split of target color', () => {
      expect(spread(color)).toStrictEqual(['#f000f0', '#ff9c9c', '#f0f000']);
    });
  });
});
