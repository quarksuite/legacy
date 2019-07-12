import { loadPalette } from '../../src/colors/kit';

describe('color utility kit', () => {
  const color = '#ff0000';
  describe('loadPalette(color, options?)', () => {
    test('loads a given color with tints and shades', () => {
      const schema = {
        100: { value: expect.any(String) },
        200: { value: expect.any(String) },
        300: { value: expect.any(String) },
        400: { value: expect.any(String) },
        500: { value: expect.any(String) },
        600: { value: expect.any(String) },
        700: { value: expect.any(String) },
        800: { value: expect.any(String) },
        900: { value: expect.any(String) }
      };

      expect(loadPalette(color)).toMatchObject(schema);
    });
  });
});
