import { ColorCustomSwatchSchema } from "../../src/utils/interfaces";
import { createSwatches } from "../../src/colors/custom";

describe('Custom color modules', () => {
  describe('createSwatches(data)', () => {
    test('creates tokens from a swatch object', () => {
      const data: ColorCustomSwatchSchema = {
        navy: '#001f3f',
        blue: '#0074d9',
        aqua: '#7fdbff',
        teal: '#39cccc',
        olive: '#3d9970',
        green: '#2ecc40',
        lime: '#01ff70',
        yellow: '#ffdc00',

        orange: '#ff851b',
        red: '#ff4136',
        maroon: '#85144b',
        fuchsia: '#f012be',
        purple: '#b10dc9',
        black: '#111111',
        gray: '#aaaaaa',
        silver: '#dddddd',

        white: '#ffffff'
      };

      type CustomSwatchTokenOutput = {
        [index: string]: { value: string }
      }

      const schema: CustomSwatchTokenOutput = {
        navy: { value: expect.any(String) },
        blue: { value: expect.any(String) },
        aqua: { value: expect.any(String) },
        teal: { value: expect.any(String) },
        olive: { value: expect.any(String) },
        green: { value: expect.any(String) },
        lime: { value: expect.any(String) },
        yellow: { value: expect.any(String) },

        orange: { value: expect.any(String) },
        red: { value: expect.any(String) },
        maroon: { value: expect.any(String) },
        fuchsia: { value: expect.any(String) },
        purple: { value: expect.any(String) },
        black: { value: expect.any(String) },
        gray: { value: expect.any(String) },
        silver: { value: expect.any(String) },

        white: { value: expect.any(String) }
      };

      expect(createSwatches(data)).toMatchObject<CustomSwatchTokenOutput>(schema);
    })
  })
})
