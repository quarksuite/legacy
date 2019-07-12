import { split } from '../../src/colors/kit';

describe('color utility kit', () => {
  const color = '#ff0000';
  describe('split(color, distance?)', () => {
    test('returns a tuple of the colors adjacent to color', () => {
      expect(split(color)).toStrictEqual(['#ff007f', '#ff8000']);
    });
    test('with distance = 45', () => {
      expect(split(color, 45)).toStrictEqual(['#ff00bf', '#ffbf00']);
    });
    test('with distance = 75', () => {
      expect(split(color, 75)).toStrictEqual(['#bf00ff', '#bfff00']);
    });
    test('with distance = 90 (clash)', () => {
      expect(split(color, 90)).toStrictEqual(['#7f00ff', '#80ff00']);
    });
    test('with distance = 120 (triad)', () => {
      expect(split(color, 120)).toStrictEqual(['#0000ff', '#00ff00']);
    });
  });
});
