import { monochromatic } from '../../src/colors/scheme';
import { ColorBasicPaletteSchema } from '../../src/colors/kit/schema';

describe('Color scheme module', () => {
  describe('monochromatic()', () => {
    interface ColorSchemeMonoOutput {
      main: {
        [index: string]: { value: string };
      };
      neutral?: {
        [index: string]: { value: string };
      };
    }

    test('with base only', () => {
      const data: ColorBasicPaletteSchema = {
        base: '#f00000'
      };

      const schema: ColorSchemeMonoOutput = {
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
        }
      };

      expect(monochromatic(data)).toMatchObject<ColorSchemeMonoOutput>(schema);
    });
    test('with base, neutral = true', () => {
      const data: ColorBasicPaletteSchema = {
        base: '#f00000',
        neutral: true
      };

      const schema: ColorSchemeMonoOutput = {
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
        neutral: {
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

      expect(monochromatic(data)).toMatchObject(schema);
    });
    test('with options.range = "minimal"', () => {
      const data: ColorBasicPaletteSchema = {
        base: '#f00000',
        options: {
          range: 'minimal'
        }
      };

      const schema: ColorSchemeMonoOutput = {
        main: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        }
      };

      expect(monochromatic(data)).toMatchObject<ColorSchemeMonoOutput>(schema);
    });
    test('with options.range = 3', () => {
      const data: ColorBasicPaletteSchema = {
        base: '#f00000',
        options: {
          range: 3
        }
      };

      const schema: ColorSchemeMonoOutput = {
        main: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) },
          600: { value: expect.any(String) },
          700: { value: expect.any(String) }
        }
      };

      expect(monochromatic(data)).toMatchObject<ColorSchemeMonoOutput>(schema);
    });
    test('with options.contrast = "med"', () => {
      const data: ColorBasicPaletteSchema = {
        base: '#f00000',
        options: {
          contrast: 'med'
        }
      };

      const schema: ColorSchemeMonoOutput = {
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
        }
      };

      expect(monochromatic(data)).toMatchObject<ColorSchemeMonoOutput>(schema);
    });
    test('with options.contrast = "low"', () => {
      const data: ColorBasicPaletteSchema = {
        base: '#f00000',
        options: {
          contrast: 'low'
        }
      };

      const schema: ColorSchemeMonoOutput = {
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
        }
      };

      expect(monochromatic(data)).toMatchObject<ColorSchemeMonoOutput>(schema);
    });
  });
});
