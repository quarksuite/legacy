import { palette } from '../../src/color';

describe('Color palette utility', () => {
  describe('color.palette(color, config?)', () => {
    test('outputs a monochromatic palette all variants by default', () => {
      const color = '#348ec9';
      expect(palette(color)).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)'
        }
      ]);
    });
    test('config: scheme.type = complementary', () => {
      const color = '#348ec9';
      expect(
        palette(color, { scheme: { type: 'complementary' } })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)'
        },
        {
          base: 'rgb(203, 112, 52)'
        }
      ]);
    });
    test('config: scheme.type = split complementary', () => {
      const color = '#348ec9';
      expect(
        palette(color, { scheme: { type: 'split complementary' } })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)'
        },
        {
          base: 'rgb(203, 150, 52)'
        },
        {
          base: 'rgb(203, 75, 52)'
        }
      ]);
    });
    test('config: scheme.type = split complementary, scheme.distance = 30', () => {
      const color = '#348ec9';
      expect(
        palette(color, {
          scheme: { type: 'split complementary', distance: 30 }
        })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)'
        },
        {
          base: 'rgb(203, 188, 52)'
        },
        {
          base: 'rgb(203, 52, 67)'
        }
      ]);
    });
    test('config: scheme.type = split complementary, scheme.distance = 45', () => {
      const color = '#348ec9';
      expect(
        palette(color, {
          scheme: { type: 'split complementary', distance: 45 }
        })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)'
        },
        {
          base: 'rgb(180, 203, 52)'
        },
        {
          base: 'rgb(203, 52, 105)'
        }
      ]);
    });
    test('config: scheme.type = split complementary, scheme.distance = 45, scheme.accented = true', () => {
      const color = '#348ec9';
      expect(
        palette(color, {
          scheme: { type: 'split complementary', distance: 45, accented: true }
        })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)'
        },
        {
          base: 'rgb(203, 112, 52)'
        },
        {
          base: 'rgb(180, 203, 52)'
        },
        {
          base: 'rgb(203, 52, 105)'
        }
      ]);
    });
    test('config: scheme.type = triadic', () => {
      const color = '#348ec9';
      expect(palette(color, { scheme: { type: 'triadic' } })).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)'
        },
        {
          base: 'rgb(143, 203, 52)'
        },
        {
          base: 'rgb(203, 52, 143)'
        }
      ]);
    });
    test('config: scheme.type = analogous, scheme.distance = 30', () => {
      const color = '#348ec9';
      expect(
        palette(color, { scheme: { type: 'analogous', distance: 30 } })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)'
        },
        {
          base: 'rgb(52, 67, 203)'
        },
        {
          base: 'rgb(112, 52, 203)'
        }
      ]);
    });
    test('config: scheme.type = analogous, scheme.distance = 30, scheme.accented = true', () => {
      const color = '#348ec9';
      expect(
        palette(color, {
          scheme: { type: 'analogous', distance: 30, accented: true }
        })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)'
        },
        {
          base: 'rgb(52, 67, 203)'
        },
        {
          base: 'rgb(112, 52, 203)'
        },
        {
          base: 'rgb(203, 112, 52)'
        }
      ]);
    });
    test('config: scheme.type = dual color, scheme.distance = 30', () => {
      const color = '#348ec9';
      expect(
        palette(color, { scheme: { type: 'dual color', distance: 30 } })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)'
        },
        {
          base: 'rgb(52, 67, 203)'
        },
        {
          base: 'rgb(203, 112, 52)'
        },
        {
          base: 'rgb(203, 188, 52)'
        }
      ]);
    });
    test('config: scheme.type = tetradic', () => {
      const color = '#348ec9';
      expect(
        palette(color, { scheme: { type: 'tetradic', distance: 30 } })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)'
        },
        {
          base: 'rgb(188, 52, 203)'
        },
        {
          base: 'rgb(203, 112, 52)'
        },
        {
          base: 'rgb(67, 203, 52)'
        }
      ]);
    });
    test('config: tints', () => {
      const color = '#348ec9';
      expect(
        palette(color, {
          tints: {}
        })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)',
          tint: ['rgb(151,186,220)', 'rgb(207,222,237)', 'rgb(251,252,254)']
        }
      ]);
    });
    test('config: tones', () => {
      const color = '#348ec9';
      expect(
        palette(color, {
          tones: {}
        })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)',
          tone: ['rgb(106,152,192)', 'rgb(140,161,182)', 'rgb(168,169,171)']
        }
      ]);
    });
    test('config: shades', () => {
      const color = '#348ec9';
      expect(
        palette(color, {
          shades: {}
        })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)',
          shade: ['rgb(44,117,166)', 'rgb(34,86,120)', 'rgb(19,30,39)']
        }
      ]);
    });
    test('config: tints, tones', () => {
      const color = '#348ec9';
      expect(
        palette(color, {
          tints: {},
          tones: {}
        })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)',
          tint: ['rgb(151,186,220)', 'rgb(207,222,237)', 'rgb(251,252,254)'],
          tone: ['rgb(106,152,192)', 'rgb(140,161,182)', 'rgb(168,169,171)']
        }
      ]);
    });
    test('config: tints, shades', () => {
      const color = '#348ec9';
      expect(
        palette(color, {
          tints: {},
          shades: {}
        })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)',
          tint: ['rgb(151,186,220)', 'rgb(207,222,237)', 'rgb(251,252,254)'],
          shade: ['rgb(44,117,166)', 'rgb(34,86,120)', 'rgb(19,30,39)']
        }
      ]);
    });
    test('config: tones, shades', () => {
      const color = '#348ec9';
      expect(
        palette(color, {
          tones: {},
          shades: {}
        })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)',
          tone: ['rgb(106,152,192)', 'rgb(140,161,182)', 'rgb(168,169,171)'],
          shade: ['rgb(44,117,166)', 'rgb(34,86,120)', 'rgb(19,30,39)']
        }
      ]);
    });
    test('config: tints, tones, shades', () => {
      const color = '#348ec9';
      expect(
        palette(color, {
          tints: {},
          tones: {},
          shades: {}
        })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)',
          tint: ['rgb(151,186,220)', 'rgb(207,222,237)', 'rgb(251,252,254)'],
          tone: ['rgb(106,152,192)', 'rgb(140,161,182)', 'rgb(168,169,171)'],
          shade: ['rgb(44,117,166)', 'rgb(34,86,120)', 'rgb(19,30,39)']
        }
      ]);
    });
    test('config: tints, tones, shades with options', () => {
      const color = '#348ec9';
      expect(
        palette(color, {
          tints: { contrast: 98, limit: 4 },
          tones: { limit: 2 },
          shades: { mode: 'linear' }
        })
      ).toStrictEqual([
        {
          base: 'rgb(52, 142, 201)',
          tint: [
            'rgb(134,177,215)',
            'rgb(182,205,229)',
            'rgb(220,231,242)',
            'rgb(253,253,254)'
          ],
          tone: ['rgb(124,156,187)', 'rgb(168,169,171)'],
          shade: ['rgb(41,102,142)', 'rgb(29,61,82)', 'rgb(18,21,23)']
        }
      ]);
    });
    test('config: format', () => {
      const color = '#348ec9';
      expect(palette(color, { format: 'hex' })).toStrictEqual([
        {
          base: '#348ec9'
        }
      ]);
    });
  });
});
