import { ColorCustomPaletteSchema } from "../../src/utils/interfaces";
import { createPalette } from "../../src/colors/custom";

describe('Custom color modules', () => {
  describe('createPalette(data)', () => {
    test('creates a palette from color collection', () => {
      const data: ColorCustomPaletteSchema = {
        teal: {
          value: '#39cccc',
        },
        orange: {
          value: '#ff851b',
          options: {
            range: 'minimal',
            contrast: 80
          }
        }
      };

      type CustomPaletteTokenOutput = {
        [index: string]: {
          [index: string]: { value: string }
        }
      }

      const schema: CustomPaletteTokenOutput = {
        teal: {
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
        orange: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        }
      };

      expect(createPalette(data)).toMatchObject<CustomPaletteTokenOutput>(schema);
    })
  })
})
