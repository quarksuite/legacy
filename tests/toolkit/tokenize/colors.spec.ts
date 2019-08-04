import { variants } from '../../../src/toolkit/colors';
import * as tokenize from '../../../src/toolkit/tokenize';

describe('Utilities for formatting tokens', () => {
  const color = '#f00000';
  const data = variants.shades(color, { range: 10 });
  describe('tokenize()', () => {
    test('can output a swatch token', () => {
      const tokens = tokenize.colors(color, 'main');

      interface SwatchOutput {
        [index: string]: { value: string };
      }
      const swatch: SwatchOutput = {
        main: { value: expect.any(String) }
      };

      expect(tokens).toMatchObject<SwatchOutput>(swatch);
    });
    test('can output palette tokens', () => {
      const tokens = tokenize.colors(data, 'main');

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
