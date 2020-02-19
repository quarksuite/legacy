import { scheme, variants } from '../../src/color';

describe('Color palette utilities', () => {
  const color = '#348ec9';

  describe('color.scheme(color, type, options?)', () => {
    test('can generate a complementary scheme', () => {
      expect(scheme(color, 'complementary')).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(203, 112, 52)'
      ]);
    });
    test('can generate an analogous scheme with default options', () => {
      expect(scheme(color, 'analogous')).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(52, 105, 203)',
        'rgb(52, 67, 203)'
      ]);
    });
    test('can generate an analogous scheme with options.distance', () => {
      expect(scheme(color, 'analogous', { distance: 30 })).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(52, 67, 203)',
        'rgb(112, 52, 203)'
      ]);
    });
    test('can generate an analogous scheme with options.accented', () => {
      expect(scheme(color, 'analogous', { accented: true })).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(52, 105, 203)',
        'rgb(52, 67, 203)',
        'rgb(203, 112, 52)'
      ]);
    });
    test('can generate a split complementary scheme', () => {
      expect(scheme(color, 'split')).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(203, 150, 52)',
        'rgb(203, 75, 52)'
      ]);
    });
    test('can generate a split complementary scheme with options.distance', () => {
      expect(scheme(color, 'split', { distance: 30 })).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(203, 188, 52)',
        'rgb(203, 52, 67)'
      ]);
    });
    test('can generate a split complementary scheme with options.accented', () => {
      expect(
        scheme(color, 'split', { distance: 30, accented: true })
      ).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(203, 112, 52)',
        'rgb(203, 188, 52)',
        'rgb(203, 52, 67)'
      ]);
    });
    test('can generate a triadic scheme', () => {
      expect(scheme(color, 'triadic')).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(143, 203, 52)',
        'rgb(203, 52, 143)'
      ]);
    });
    test('can generate a dual color scheme', () => {
      expect(scheme(color, 'dual')).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(52, 105, 203)',
        'rgb(203, 112, 52)',
        'rgb(203, 150, 52)'
      ]);
    });
    test('can generate a dual color scheme with options.distance', () => {
      expect(scheme(color, 'dual', { distance: 30 })).toStrictEqual([
        'rgb(52, 142, 201)',
        'rgb(52, 67, 203)',
        'rgb(203, 112, 52)',
        'rgb(203, 188, 52)'
      ]);
    });
  });
  describe('color.variants(color, target, options?)', () => {
    test('can generate tints', () => {
      expect(variants(color, '#ffffff')).toStrictEqual([
        'rgb(180, 204, 228)',
        'rgb(251, 252, 254)'
      ]);
    });
    test('can generate tints with options.limit', () => {
      expect(variants(color, '#ffffff', { limit: 3 })).toStrictEqual([
        'rgb(152, 186, 221)',
        'rgb(207, 222, 237)',
        'rgb(251, 252, 254)'
      ]);
    });
    test('can generate tints with options.contrast', () => {
      expect(
        variants(color, '#ffffff', { limit: 3, contrast: 80 })
      ).toStrictEqual([
        'rgb(139, 180, 218)',
        'rgb(192, 211, 232)',
        'rgb(229, 237, 245)'
      ]);
    });
    test('can generate tints with options.mode', () => {
      expect(
        variants(color, '#ffffff', { limit: 3, contrast: 80, mode: 'linear' })
      ).toStrictEqual([
        'rgb(106, 172, 215)',
        'rgb(162, 203, 230)',
        'rgb(215, 232, 244)'
      ]);
    });
    test('can generate tones', () => {
      expect(variants(color, '#aaaaaa')).toStrictEqual([
        'rgb(124, 156, 187)',
        'rgb(169, 170, 173)'
      ]);
    });
    test('can generate shades', () => {
      expect(variants(color, '#111111')).toStrictEqual([
        'rgb(39, 102, 145)',
        'rgb(18, 29, 38)'
      ]);
    });
    test('can generate variants from any target', () => {
      expect(variants(color, 'rebeccapurple', { limit: 9 })).toStrictEqual([
        'rgb(59, 134, 196)',
        'rgb(68, 130, 193)',
        'rgb(73, 120, 188)',
        'rgb(78, 113, 183)',
        'rgb(83, 103, 178)',
        'rgb(88, 93, 173)',
        'rgb(93, 84, 166)',
        'rgb(97, 70, 160)',
        'rgb(100, 55, 154)'
      ]);
    });
  });
});
