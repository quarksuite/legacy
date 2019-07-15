import { ColorCustomPaletteSchema } from '../../../src/schema';
import { palette } from '../../../src/colors/custom';

describe('Custom color modules', () => {
  describe('palette(data, options?)', () => {
    test('outputs tokens in the correct format', () => {
      const data: ColorCustomPaletteSchema = {
        main: {
          base: '#f00'
        },
        accent: {
          base: '#0f0'
        },
        spot: {
          base: '#00f'
        }
      };

      interface PaletteOutput {
        [index: string]: {
          [index: string]: { value: string };
        };
      }

      const schema: PaletteOutput = {
        main: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) },
          600: { value: expect.any(String) },
          700: { value: expect.any(String) },
          800: { value: expect.any(String) },
          900: { value: expect.any(String) }
        },
        accent: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) },
          600: { value: expect.any(String) },
          700: { value: expect.any(String) },
          800: { value: expect.any(String) },
          900: { value: expect.any(String) }
        },
        spot: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) },
          600: { value: expect.any(String) },
          700: { value: expect.any(String) },
          800: { value: expect.any(String) },
          900: { value: expect.any(String) }
        }
      };

      expect(palette(data)).toMatchObject<PaletteOutput>(schema);
    });
    test('options.range = "minimal"', () => {
      const data: ColorCustomPaletteSchema = {
        main: {
          base: '#f00',
          options: {
            range: 'minimal'
          }
        },
        accent: {
          base: '#0f0',
          options: { range: 'minimal' }
        },
        spot: {
          base: '#00f',
          options: { range: 'minimal' }
        }
      };

      interface PaletteOutput {
        [index: string]: {
          [index: string]: { value: string };
        };
      }

      const schema: PaletteOutput = {
        main: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        },
        accent: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        },
        spot: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        }
      };

      expect(palette(data)).toMatchObject<PaletteOutput>(schema);
    });
  });
});
