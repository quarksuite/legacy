import { ColorBasicPaletteSchema } from '../../../src/schema';
import { monochromatic } from '../../../src/colors/scheme';

describe('Color scheme modules', () => {
  describe('monochromatic(data)', () => {
    test('outputs tokens in correct format', () => {
      const data: ColorBasicPaletteSchema = {
        base: '#f00'
      };

      interface MonoOutput {
        [index: string]: {
          [index: string]: { value: string };
        };
      }

      const schema: MonoOutput = {
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

      expect(monochromatic(data)).toMatchObject<MonoOutput>(schema);
    });
  });
});
