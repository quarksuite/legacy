import { scheme } from '../../src/color';

describe('Utilities for color.scheme', () => {
  const color = '#f00000';
  const second = '#348ec9';
  describe('analogous(color, degrees?, range?)', () => {
    test('outputs multi-color schemes from color origin', () => {
      expect(scheme.analogous(color, 60)).toStrictEqual([
        '#f77700',
        '#f8b600',
        '#f0f000'
      ]);
    });
    test('example: second color', () => {
      expect(scheme.analogous(second)).toStrictEqual([
        '#5474c9',
        '#6558c9',
        '#6f34c9'
      ]);
    });
    test('can input the degrees to spread by', () => {
      expect(scheme.analogous(color, 45)).toStrictEqual([
        '#f35e00',
        '#f38c00',
        '#f0b400'
      ]);
    });
    test('can adjust the range of colors to output', () => {
      expect(scheme.analogous(color, 60, 6)).toStrictEqual([
        '#f45000',
        '#f77700',
        '#f89800',
        '#f8b600',
        '#f5d300',
        '#f0f000'
      ]);
    });
  });
  describe('triad(color, degrees?)', () => {
    test('outputs a triadic color scheme', () => {
      expect(scheme.triad(color)).toStrictEqual([
        '#f00000',
        '#0000f0',
        '#00f000'
      ]);
    });
    test('when degrees = 90 is a clash', () => {
      expect(scheme.triad(color, 90)).toStrictEqual([
        '#f00000',
        '#7800f0',
        '#78f000'
      ]);
    });
  });
  describe('tetrad(color, degrees?)', () => {
    test('outputs a tetradic color scheme', () => {
      expect(scheme.tetrad(color)).toStrictEqual([
        '#f00000',
        '#00f0f0',
        '#f0f000',
        '#0000f0'
      ]);
    });
    test('when degrees = 90 is a square', () => {
      expect(scheme.tetrad(color, 90)).toStrictEqual([
        '#f00000',
        '#00f0f0',
        '#78f000',
        '#7800f0'
      ]);
    });
  });
});
