import { ContentScaleSchema } from '../../src/schema';
import { tokenize } from '../../src/content/scale';

describe('Content scale module', () => {
  describe('tokenize(data)', () => {
    test('outputs the correct format', () => {
      const data: ContentScaleSchema = {
        base: '1em',
        ratio: 'major2nd'
      };

      interface ScaleOutput {
        [index: string]: { value: string };
      }

      const schema: ScaleOutput = {
        0: { value: expect.any(String) },
        1: { value: expect.any(String) },
        2: { value: expect.any(String) },
        3: { value: expect.any(String) },
        4: { value: expect.any(String) },
        5: { value: expect.any(String) },
        6: { value: expect.any(String) },
        7: { value: expect.any(String) },
        8: { value: expect.any(String) },
        9: { value: expect.any(String) },
        10: { value: expect.any(String) },
        11: { value: expect.any(String) },
        12: { value: expect.any(String) },
        13: { value: expect.any(String) },
        14: { value: expect.any(String) },
        15: { value: expect.any(String) },
        16: { value: expect.any(String) }
      };

      expect(tokenize(data)).toMatchObject<ScaleOutput>(schema);
    });
    test('outputs half the scale', () => {
      const data: ContentScaleSchema = {
        base: '1em',
        ratio: 'major2nd',
        limit: 'half'
      };

      interface ScaleOutput {
        [index: string]: { value: string };
      }

      const schema: ScaleOutput = {
        0: { value: expect.any(String) },
        1: { value: expect.any(String) },
        2: { value: expect.any(String) },
        3: { value: expect.any(String) },
        4: { value: expect.any(String) },
        5: { value: expect.any(String) },
        6: { value: expect.any(String) },
        7: { value: expect.any(String) },
        8: { value: expect.any(String) }
      };

      expect(tokenize(data)).toMatchObject<ScaleOutput>(schema);
    });
    test('works with a numeric limit', () => {
      const data: ContentScaleSchema = {
        base: '1em',
        ratio: 'major2nd',
        limit: 5
      };

      interface ScaleOutput {
        [index: string]: { value: string };
      }

      const schema: ScaleOutput = {
        0: { value: expect.any(String) },
        1: { value: expect.any(String) },
        2: { value: expect.any(String) },
        3: { value: expect.any(String) },
        4: { value: expect.any(String) }
      };

      expect(tokenize(data)).toMatchObject<ScaleOutput>(schema);
    });
  });
});
