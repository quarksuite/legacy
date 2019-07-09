import {Scheme} from '../../../colors/scheme';
import {ColorBasicPaletteSchema} from '../../../helpers/interfaces';

describe('basic scheme generation', () => {
  describe('for monochromatic schemes (default)', () => {
    test('with a base defined', () => {
      const data: ColorBasicPaletteSchema = {
        base: '#DEADED'
      };

      const schema = {
        primary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        }
      };

      expect(Scheme.monochromatic(data)).toMatchObject(schema);
    });
    test('with a contrast', () => {
      const data: ColorBasicPaletteSchema = {
        base: '#DEADED',
        options: {
          contrast: 'med'
        }
      };

      const schema = {
        primary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        }
      };

      expect(Scheme.monochromatic(data)).toMatchObject(schema);
    });
    test('with fewer colors', () => {
      const data: ColorBasicPaletteSchema = {
        base: '#DEADED',
        options: {
          range: 'minimal'
        }
      };

      const schema = {
        primary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) }
        }
      };

      expect(Scheme.monochromatic(data)).toMatchObject(schema);
    });
    test('with more colors', () => {
      const data: ColorBasicPaletteSchema = {
        base: '#DEADED',
        options: {
          range: 4
        }
      };

      const schema = {
        primary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) },
          600: { value: expect.any(String) },
          700: { value: expect.any(String) }
        }
      };

      expect(Scheme.monochromatic(data)).toMatchObject(schema);
    });
  });
});
