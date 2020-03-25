import {
  complementary,
  analogous,
  triad,
  tetrad
} from '../../src/color/scheme';

describe('Scheme functions', () => {
  const input = '#348ec9';
  describe('complementary(): Scheme', () => {
    test('can create complementary schemes', () => {
      expect(complementary(input)).toStrictEqual([
        'rgb(52, 143, 203)',
        'rgb(203, 112, 52)'
      ]);
    });
  });
  describe('analogous(): Scheme', () => {
    test('can create analogous schemes', () => {
      const midContrastAnalogous = analogous(30);
      expect(midContrastAnalogous(input)).toStrictEqual([
        'rgb(52, 203, 188)',
        'rgb(52, 143, 203)',
        'rgb(52, 67, 203)'
      ]);
    });
    test('low contrast analogous', () => {
      const lowContrast = analogous(15);
      expect(lowContrast(input)).toStrictEqual([
        'rgb(52, 180, 203)',
        'rgb(52, 143, 203)',
        'rgb(52, 105, 203)'
      ]);
    });
    test('high contrast analogous', () => {
      const highContrast = analogous(45);
      expect(highContrast(input)).toStrictEqual([
        'rgb(52, 203, 150)',
        'rgb(52, 143, 203)',
        'rgb(75, 52, 203)'
      ]);
    });
  });
  describe('triad(): Scheme', () => {
    test('can create triads', () => {
      const pureTriad = triad(60);
      expect(pureTriad(input)).toStrictEqual([
        'rgb(52, 143, 203)',
        'rgb(203, 52, 143)',
        'rgb(143, 203, 52)'
      ]);
    });
    test('imperfect triads', () => {
      const imperfectTriad = triad(30);
      expect(imperfectTriad(input)).toStrictEqual([
        'rgb(52, 143, 203)',
        'rgb(203, 52, 67)',
        'rgb(203, 188, 52)'
      ]);
    });
  });
  describe('tetrad(): Scheme', () => {
    test('can create tetrad', () => {
      const pureTetrad = tetrad(90);
      expect(pureTetrad(input)).toStrictEqual([
        'rgb(52, 143, 203)',
        'rgb(203, 112, 52)',
        'rgb(188, 52, 203)',
        'rgb(67, 203, 52)'
      ]);
    });
    test('imperfect tetrads', () => {
      const imperfectTetrad = tetrad(45);
      expect(imperfectTetrad(input)).toStrictEqual([
        'rgb(52, 143, 203)',
        'rgb(203, 112, 52)',
        'rgb(75, 52, 203)',
        'rgb(180, 203, 52)'
      ]);
    });
  });
});
