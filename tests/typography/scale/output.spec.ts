import { scale } from '../../../src/typography';

describe('quarks.typography.scale modules', () => {
  describe('output(scale, { precision?, unit? })', () => {
    test('outputs a scale with units', () => {
      const data = scale.output(scale.build(scale.ratios.golden));

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
      const data = scale.output(scale.build(scale.ratios.octave, 4), {
        unit: 'vw'
      });

      expect(data).toStrictEqual(['1vw', '2vw', '4vw', '8vw']);
    });
    test('can change precision', () => {
      const data = scale.output(scale.build(scale.ratios.golden, 4), {
        precision: 5
      });

      expect(data).toStrictEqual(['1rem', '1.618rem', '2.618rem', '4.2361rem']);
    });
  });
});
