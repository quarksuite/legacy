import { palette } from '../../src/color';

describe('Color utilities', () => {
  const color = '#348ec9';
  describe('tints(color, count?, contrast?)', () => {
    test('returns an array of tints for a color', () => {
      expect(palette.tints(color)).toStrictEqual([
        '#62a8d6',
        '#72b1da',
        '#91c2e3',
        '#eff6fb'
      ]);
    });
    test('can pass in a count', () => {
      expect(palette.tints(color, 3, 100)).toStrictEqual([
        '#72b1da',
        '#91c2e3',
        '#eff6fb'
      ]);
    });
    test('can pass in a contrast', () => {
      expect(palette.tints(color, 3, 60)).toStrictEqual([
        '#59a3d4',
        '#6badd9',
        '#a4cde7'
      ]);
    });
  });
  describe('tones(color, count?, contrast?)', () => {
    test('returns an array of tones for a color', () => {
      expect(palette.tones(color)).toStrictEqual([
        '#448bb9',
        '#498ab4',
        '#5487a9',
        '#73818a'
      ]);
    });
    test('can pass in a count', () => {
      expect(palette.tones(color, 3)).toStrictEqual([
        '#498ab4',
        '#5487a9',
        '#73818a'
      ]);
    });
    test('can pass in a contrast', () => {
      expect(palette.tones(color, 3, 60)).toStrictEqual([
        '#418bbc',
        '#478ab6',
        '#5a86a3'
      ]);
    });
  });
  describe('shades(color, count?, contrast?)', () => {
    test('returns an array of shades for a color', () => {
      expect(palette.shades(color)).toStrictEqual([
        '#2a71a0',
        '#266893',
        '#1f5578',
        '#0a1b27'
      ]);
    });
    test('can pass in a count', () => {
      expect(palette.shades(color, 3)).toStrictEqual([
        '#266893',
        '#1f5578',
        '#0a1b27'
      ]);
    });
    test('can pass in a contrast', () => {
      expect(palette.shades(color, 3, 60)).toStrictEqual([
        '#2c77a9',
        '#276c98',
        '#1b4968'
      ]);
    });
  });
});
