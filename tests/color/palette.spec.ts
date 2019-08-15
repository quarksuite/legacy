import { palette } from '../../src/color';

describe('Color utilities', () => {
  const color = '#348ec9';
  describe('tints(color)', () => {
    test('returns an array of tints for a color', () => {
      expect(palette.tints(color)).toStrictEqual([
        '#65a9d6',
        '#96c4e3',
        '#c8dff0',
        '#f9fbfd'
      ]);
    });
    test('can pass in a range', () => {
      expect(palette.tints(color, 3)).toStrictEqual([
        '#76b2da',
        '#b7d6eb',
        '#f9fbfd'
      ]);
    });
    test('can pass in a contrast', () => {
      expect(palette.tints(color, 3, 60)).toStrictEqual([
        '#65a7d4',
        '#97c0e0',
        '#c8d9eb'
      ]);
    });
  });
  describe('tones(color)', () => {
    test('returns an array of tones for a color', () => {
      expect(palette.tones(color)).toStrictEqual([
        '#5195c2',
        '#6d9bba',
        '#8aa2b3',
        '#a6a9ac'
      ]);
    });
    test('can pass in a range', () => {
      expect(palette.tones(color, 3)).toStrictEqual([
        '#5a97bf',
        '#80a0b5',
        '#a6a9ac'
      ]);
    });
    test('can pass in a contrast', () => {
      expect(palette.tones(color, 3, 60)).toStrictEqual([
        '#5094c3',
        '#6c9abd',
        '#889fb7'
      ]);
    });
  });
  describe('shades(color)', () => {
    test('returns an array of shades for a color', () => {
      expect(palette.shades(color)).toStrictEqual([
        '#2c73a3',
        '#24597c',
        '#1c3e56',
        '#142430'
      ]);
    });
    test('can pass in a range', () => {
      expect(palette.shades(color, 3)).toStrictEqual([
        '#296b96',
        '#1f4763',
        '#142430'
      ]);
    });
    test('can pass in a contrast', () => {
      expect(palette.shades(color, 3, 60)).toStrictEqual([
        '#2e7db1',
        '#296c98',
        '#235b80'
      ]);
    });
  });
});
