import { output, build, ratios } from '../../../src/content/scale';

describe('Utilities for content', () => {
  describe('output(scale, precision?, unit?)', () => {
    test('outputs a scale with units', () => {
      const data = output(build(ratios.golden));

      expect(data).toStrictEqual([
        '1rem',
        '1.618rem',
        '2.618rem',
        '4.236rem',
        '6.854rem',
        '11.09rem',
        '17.94rem',
        '29.03rem'
      ]);
    });
    test('can output vw', () => {
      const data = output(build(ratios.octave, 4), 3, 'vw');

      expect(data).toStrictEqual(['1vw', '2vw', '4vw', '8vw']);
    });
    test('can change precision', () => {
      const data = output(build(ratios.golden, 4), 4);

      expect(data).toStrictEqual(['1rem', '1.618rem', '2.618rem', '4.236rem']);
    });
  });
});
