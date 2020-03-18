import { variant } from '../../src';

describe('Variant functions', () => {
  const input = '#348ec9';

  describe('variant.create(color: Color, fromTarget: Color, withContrast: Percent = 97, upToRange: Limit = 3)', () => {
    test('default', () => {
      expect(variant.create(input, 'coral')).toStrictEqual([
        'rgb(151, 137, 171)',
        'rgb(207, 132, 136)',
        'rgb(251, 127, 86)'
      ]);
    });
    test('can change the contrast', () => {
      expect(variant.create(input, 'coral', 72)).toStrictEqual([
        'rgb(133, 139, 180)',
        'rgb(181, 135, 155)',
        'rgb(218, 131, 126)'
      ]);
    });
    test('can change the range', () => {
      expect(variant.create(input, 'coral', 50, 10)).toStrictEqual([
        'rgb(76, 141, 197)',
        'rgb(95, 141, 192)',
        'rgb(110, 140, 188)',
        'rgb(123, 139, 183)',
        'rgb(135, 138, 179)',
        'rgb(146, 138, 174)',
        'rgb(157, 137, 169)',
        'rgb(166, 136, 164)',
        'rgb(175, 135, 158)',
        'rgb(184, 135, 153)'
      ]);
    });
  });
  describe('variant.tints(color: Color, withContrast: Percent = 97, upToRange: Limit = 3)', () => {
    test('default', () => {
      expect(variant.tints(input)).toStrictEqual([
        'rgb(151, 186, 220)',
        'rgb(207, 222, 237)',
        'rgb(251, 252, 254)'
      ]);
    });
    test('can change the contrast', () => {
      expect(variant.tints(input, 80)).toStrictEqual([
        'rgb(139, 179, 217)',
        'rgb(190, 210, 231)',
        'rgb(229, 237, 245)'
      ]);
    });
    test('can change the range', () => {
      expect(variant.tints(input, 90, 5)).toStrictEqual([
        'rgb(118, 168, 212)',
        'rgb(159, 191, 222)',
        'rgb(191, 211, 232)',
        'rgb(218, 229, 241)',
        'rgb(242, 246, 250)'
      ]);
    });
  });
  describe('variant.tones(color: Color, withContrast: Percent = 97, upToRange: Limit = 3)', () => {
    test('default', () => {
      expect(variant.tones(input)).toStrictEqual([
        'rgb(106, 152, 192)',
        'rgb(140, 161, 182)',
        'rgb(168, 169, 171)'
      ]);
    });
    test('can change the contrast', () => {
      expect(variant.tones(input, 80)).toStrictEqual([
        'rgb(98, 150, 193)',
        'rgb(129, 158, 185)',
        'rgb(154, 165, 177)'
      ]);
    });
    test('can change the range', () => {
      expect(variant.tones(input, 90, 5)).toStrictEqual([
        'rgb(86, 147, 196)',
        'rgb(110, 153, 190)',
        'rgb(130, 158, 185)',
        'rgb(147, 163, 179)',
        'rgb(162, 167, 173)'
      ]);
    });
  });
  describe('variant.shades(color: Color, withContrast: Percent = 97, upToRange: Limit = 3)', () => {
    test('default', () => {
      expect(variant.shades(input)).toStrictEqual([
        'rgb(44, 117, 166)',
        'rgb(34, 86, 120)',
        'rgb(19, 30, 39)'
      ]);
    });
    test('can change the contrast', () => {
      expect(variant.shades(input, 80)).toStrictEqual([
        'rgb(45, 122, 172)',
        'rgb(38, 98, 138)',
        'rgb(28, 65, 91)'
      ]);
    });
    test('can change the range', () => {
      expect(variant.shades(input, 90, 5)).toStrictEqual([
        'rgb(48, 129, 182)',
        'rgb(43, 114, 161)',
        'rgb(37, 97, 137)',
        'rgb(31, 77, 107)',
        'rgb(23, 48, 66)'
      ]);
    });
  });
});
