import { variant } from '../../src';

describe('Variant functions', () => {
  const input = '#348ec9';
  describe('variant.blend(): Variant', () => {
    test('can create blends', () => {
      const blend = variant.blend('coral', 64, 3);
      expect(blend(input)).toStrictEqual([
        'rgb(126, 139, 182)',
        'rgb(171, 136, 161)',
        'rgb(206, 133, 137)'
      ]);
    });
  });
  describe('variant.tints(): Variant', () => {
    test('can create tints', () => {
      const tints = variant.tints(95, 3);
      expect(tints(input)).toStrictEqual([
        'rgb(150, 185, 220)',
        'rgb(205, 220, 237)',
        'rgb(249, 251, 253)'
      ]);
    });
  });
  describe('variant.tones(): Variant', () => {
    test('can create tones', () => {
      const tones = variant.tones(95, 3);
      expect(tones(input)).toStrictEqual([
        'rgb(105, 151, 192)',
        'rgb(139, 160, 182)',
        'rgb(166, 169, 172)'
      ]);
    });
  });
  describe('variant.shades(): Variant', () => {
    test('can create shades', () => {
      const shades = variant.shades(95, 3);
      expect(shades(input)).toStrictEqual([
        'rgb(44, 118, 166)',
        'rgb(34, 87, 122)',
        'rgb(20, 36, 48)'
      ]);
    });
  });
});
