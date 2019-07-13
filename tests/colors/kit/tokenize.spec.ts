import { tokenize, shades } from '../../../src/colors/kit/index';

describe('Utilities for formatting tokens', () => {
  const color = '#f00000';
  const data = shades(color, { range: 35 });
  describe('tokenize()', () => {
    test('can output as swatches', () => {
      const tokens = tokenize(data, 'main');

      interface SwatchOutput {
        [index: string]: { value: string };
      }

      const swatch: SwatchOutput = {
        main: { value: expect.any(String) }
      };

      expect(tokens).toMatchObject<SwatchOutput>(swatch);
    });
    test('can output as palettes', () => {
      const tokens = tokenize(data, 'main', true);

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
