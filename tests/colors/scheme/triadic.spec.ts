import { ColorBasicPaletteSchema } from '../../../src/schema';
import { triadic } from '../../../src/colors/scheme';

describe('Color scheme modules', () => {
  describe('triadic(data)', () => {
    test('outputs tokens in correct format', () => {
      const data: ColorBasicPaletteSchema = {
        base: '#f00'
      };

      interface TriadOutput {
        main: {
          [index: string]: { value: string };
        };
        accent: {
          [index: string]: { value: string };
        };
        spot: {
          [index: string]: { value: string };
        };
      }

      const schema: TriadOutput = {
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

      expect(triadic(data)).toMatchObject<TriadOutput>(schema);
    });
  });
});
