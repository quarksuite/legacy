import {Custom} from '../../../colors/custom';
import {ColorCustomSwatchSchema, ColorCustomPaletteSchema} from '../../../helpers/interfaces';

describe('Colors.Custom', () => {
  describe('can generate custom', () => {
    describe('colors from color objects', () => {
      test('as swatches', () => {
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

        const schema = {
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

        expect(Custom.createSwatches(data)).toMatchObject(schema);
      });
      test('as palettes', () => {
        const data: ColorCustomPaletteSchema = {
          teal: {
            value: '#39cccc',
          },
          orange: {
            value: '#ff851b',
            options: {
              range: 'minimal'
            }
          }
        };

        const schema = {
          teal: {
            100: { value: expect.any(String) },
            200: { value: expect.any(String) },
            300: { value: expect.any(String) },
            400: { value: expect.any(String) },
            500: { value: expect.any(String) }
          },
          orange: {
            100: { value: expect.any(String) },
            200: { value: expect.any(String) },
            300: { value: expect.any(String) }
          }
        };

        expect(Custom.createPalette(data)).toMatchObject(schema);
      });
    });
  });
});
