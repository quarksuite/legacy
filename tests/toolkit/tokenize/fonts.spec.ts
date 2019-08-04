import { ContentFontsSchema } from '../../../src/schema';
import * as tokenize from '../../../src/toolkit/tokenize';

describe('Content font module', () => {
  describe('tokenize(data)', () => {
    test('output in correct format', () => {
      const data: ContentFontsSchema = {
        system: {
          name: 'System (Sans)',
          stack:
            '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
          styles: [400, '400i', 700]
        }
      };

      interface FontsOutput {
        [index: string]: {
          metadata: { name: string; styles: (string | number)[] };
          value: string;
        };
      }

      const schema: FontsOutput = {
        system: {
          metadata: {
            name: expect.any(String),
            styles: expect.any(Array)
          },
          value: expect.any(String)
        }
      };

      expect(tokenize.fonts(data)).toMatchObject<FontsOutput>(schema);
    });
    test('can input more than one font', () => {
      const data: ContentFontsSchema = {
        system: {
          name: 'System (Sans)',
          stack:
            '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
          styles: [400, '400i', 700]
        },
        secondary: {
          name: 'Nunito',
          stack: ['Nunito', 'sans-serif'],
          styles: [200, 900]
        }
      };

      interface FontsOutput {
        [index: string]: {
          metadata: { name: string; styles: (string | number)[] };
          value: string;
        };
      }

      const schema: FontsOutput = {
        system: {
          metadata: {
            name: expect.any(String),
            styles: expect.any(Array)
          },
          value: expect.any(String)
        },
        secondary: {
          metadata: {
            name: expect.any(String),
            styles: expect.any(Array)
          },
          value: expect.any(String)
        }
      };

      expect(tokenize.fonts(data)).toMatchObject<FontsOutput>(schema);
    });
  });
});
