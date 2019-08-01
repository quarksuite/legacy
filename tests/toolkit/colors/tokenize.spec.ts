import colors from '../../../src/toolkit/colors';

describe('Utilities for formatting tokens', () => {
  const color = '#f00000';
  const data = colors.variants.shades(color, { range: 35 });
  describe('tokenize()', () => {
    test('can output a swatch token', () => {
      const tokens = colors.tokenize(color, 'main');

      interface SwatchOutput {
        [index: string]: { value: string };
      }
      const swatch: SwatchOutput = {
        main: { value: expect.any(String) }
      };

      expect(tokens).toMatchObject<SwatchOutput>(swatch);
    });
    test('can output palette tokens', () => {
      const tokens = colors.tokenize(data, 'main');

      interface PaletteOutput {
        [index: string]: {
          [index: string]: { value: string };
        };
      }

      const palette: PaletteOutput = {
        main: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        }
      };

      expect(tokens).toMatchObject<PaletteOutput>(palette);
    });
  });
});
