import { scheme } from '../../src';

describe('Scheme functions', () => {
  const input = '#348ec9';
  describe('scheme.complementary(color: Color): Scheme', () => {
    test('Create a complementary scheme', () =>
      expect(scheme.complementary(input)).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(203, 112, 52)'
      ]));
  });
  describe('scheme.analogous(color: Color, spreadBy: Degrees = 30): Scheme', () => {
    test('default: mid contrast analogous', () => {
      expect(scheme.analogous(input)).toStrictEqual([
        'rgb(52, 203, 188)',
        'rgb(52, 142, 201)',
        'rgb(52, 67, 203)'
      ]);
    });
    test('low contrast analogous', () => {
      expect(scheme.analogous(input, 15)).toStrictEqual([
        'rgb(52, 180, 203)',
        'rgb(52, 142, 201)',
        'rgb(52, 105, 203)'
      ]);
    });
    test('high contrast analogous', () => {
      expect(scheme.analogous(input, 45)).toStrictEqual([
        'rgb(52, 203, 150)',
        'rgb(52, 142, 201)',
        'rgb(75, 52, 203)'
      ]);
    });
  });
  describe('scheme.triad(color: Color, splitComplementBy: Degrees = 60): Scheme', () => {
    test('default: perfect triad', () => {
      expect(scheme.triad(input)).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(203, 52, 143)',
        'rgb(143, 203, 52)'
      ]);
    });
    test('imperfect triad', () => {
      expect(scheme.triad(input, 32)).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(203, 52, 72)',
        'rgb(203, 193, 52)'
      ]);
    });
  });
  describe('scheme.tetrad(color: Color, spreadBy: Degrees = 90): Scheme', () => {
    test('default: perfect tetrad', () => {
      expect(scheme.tetrad(input)).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(203, 112, 52)',
        'rgb(188, 52, 203)',
        'rgb(67, 203, 52)'
      ]);
    });
    test('imperfect tetrad', () => {
      expect(scheme.tetrad(input, 45)).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(203, 112, 52)',
        'rgb(75, 52, 203)',
        'rgb(180, 203, 52)'
      ]);
    });
  });
});
