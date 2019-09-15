import { palette } from '../../src/color';

describe('Color palette utility', () => {
  describe('color.palette(color, scheme?, config?)', () => {
    test('outputs a monochromatic palette by default', () => {
      const color = '#348ec9';
      expect(palette(color)).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)',
          tints: [
            'rgb(133,176,215)',
            'rgb(181,205,229)',
            'rgb(219,230,241)',
            'rgb(251,252,254)'
          ],
          tones: [
            'rgb(95,149,194)',
            'rgb(124,156,187)',
            'rgb(148,163,179)',
            'rgb(168,169,171)'
          ],
          shades: [
            'rgb(46,124,175)',
            'rgb(39,103,145)',
            'rgb(31,76,106)',
            'rgb(19,30,39)'
          ]
        }
      ]);
    });
    test('config: scheme', () => {
      const color = '#348ec9';
      expect(
        palette(color, { scheme: { type: 'complementary' } })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)',
          tints: [
            'rgb(133,176,215)',
            'rgb(181,205,229)',
            'rgb(219,230,241)',
            'rgb(251,252,254)'
          ],
          tones: [
            'rgb(95,149,194)',
            'rgb(124,156,187)',
            'rgb(148,163,179)',
            'rgb(168,169,171)'
          ],
          shades: [
            'rgb(46,124,175)',
            'rgb(39,103,145)',
            'rgb(31,76,106)',
            'rgb(19,30,39)'
          ]
        },
        {
          base: 'rgb(203, 112, 52)',
          shades: [
            'rgb(177,98,46)',
            'rgb(146,81,39)',
            'rgb(107,60,31)',
            'rgb(39,26,19)'
          ],
          tints: [
            'rgb(217,159,133)',
            'rgb(230,195,181)',
            'rgb(242,225,219)',
            'rgb(254,252,251)'
          ],
          tones: [
            'rgb(196,128,95)',
            'rgb(188,143,124)',
            'rgb(180,156,148)',
            'rgb(171,169,168)'
          ]
        }
      ]);
    });
    test('config: limit', () => {
      const color = '#348ec9';
      expect(palette(color, { limit: 2 })).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)',
          tints: ['rgb(181,205,229)', 'rgb(251,252,254)'],
          tones: ['rgb(124,156,187)', 'rgb(168,169,171)'],
          shades: ['rgb(39,103,145)', 'rgb(19,30,39)']
        }
      ]);
    });
    test('config: contrast', () => {
      const color = '#348ec9';
      expect(palette(color, { limit: 2, contrast: 60 })).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)',
          tints: ['rgb(146,183,219)', 'rgb(200,217,235)'],
          tones: ['rgb(103,151,192)', 'rgb(136,159,183)'],
          shades: ['rgb(44,119,168)', 'rgb(35,91,128)']
        }
      ]);
    });
    test('config: mode', () => {
      const color = '#348ec9';
      expect(palette(color, { limit: 2, mode: 'linear' })).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)',
          tints: ['rgb(150,197,227)', 'rgb(249,252,253)'],
          tones: ['rgb(109,156,186)', 'rgb(166,169,171)'],
          shades: ['rgb(35,81,112)', 'rgb(18,21,23)']
        }
      ]);
    });
    test('config: format', () => {
      const color = '#348ec9';
      expect(palette(color, { limit: 2, format: 'hex' })).toStrictEqual([
        {
          base: '#348ec9',
          tints: ['#b5cde5', '#fbfcfe'],
          tones: ['#7c9cbb', '#a8a9ab'],
          shades: ['#276791', '#131e27']
        }
      ]);
    });
  });
});
