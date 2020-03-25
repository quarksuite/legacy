import { scheme } from '../../src';

describe('Scheme functions', () => {
  const input = '#348ec9';
  describe('scheme.complementary(): Scheme', () => {
    test('can create complementary schemes', () => {
      expect(scheme.complementary(input)).toStrictEqual([
        'rgb(52, 143, 203)',
        'rgb(203, 112, 52)'
      ]);
    });
  });
  describe('scheme.analogous(): Scheme', () => {
    test('can create analogous schemes', () => {
      const midContrastAnalogous = scheme.analogous(30);
      expect(midContrastAnalogous(input)).toStrictEqual([
        'rgb(52, 203, 188)',
        'rgb(52, 143, 203)',
        'rgb(52, 67, 203)'
      ]);
    });
    test('low contrast analogous', () => {
      const lowContrast = scheme.analogous(15);
      expect(lowContrast(input)).toStrictEqual([
        'rgb(52, 180, 203)',
        'rgb(52, 143, 203)',
        'rgb(52, 105, 203)'
      ]);
    });
    test('high contrast analogous', () => {
      const highContrast = scheme.analogous(45);
      expect(highContrast(input)).toStrictEqual([
        'rgb(52, 203, 150)',
        'rgb(52, 143, 203)',
        'rgb(75, 52, 203)'
      ]);
    });
  });
  describe('scheme.triad(): Scheme', () => {
    test('can create triads', () => {
      const pureTriad = scheme.triad(60);
      expect(pureTriad(input)).toStrictEqual([
        'rgb(52, 143, 203)',
        'rgb(203, 52, 143)',
        'rgb(143, 203, 52)'
      ]);
    });
    test('imperfect triads', () => {
      const imperfectTriad = scheme.triad(30);
      expect(imperfectTriad(input)).toStrictEqual([
        'rgb(52, 143, 203)',
        'rgb(203, 52, 67)',
        'rgb(203, 188, 52)'
      ]);
    });
  });
  describe('scheme.tetrad(): Scheme', () => {
    test('can create tetrad', () => {
      const pureTetrad = scheme.tetrad(90);
      expect(pureTetrad(input)).toStrictEqual([
        'rgb(52, 143, 203)',
        'rgb(203, 112, 52)',
        'rgb(188, 52, 203)',
        'rgb(67, 203, 52)'
      ]);
    });
    test('imperfect tetrads', () => {
      const imperfectTetrad = scheme.tetrad(45);
      expect(imperfectTetrad(input)).toStrictEqual([
        'rgb(52, 143, 203)',
        'rgb(203, 112, 52)',
        'rgb(75, 52, 203)',
        'rgb(180, 203, 52)'
      ]);
    });
  });
});
