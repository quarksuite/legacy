import { scale } from '../../src';

describe('Scale creation and modification', () => {
  const base = 1;
  describe('scale.output(scale, unit?, precision?)', () => {
    test('outputs a system ready scale with units', () => {
      const baseScale = scale.create('golden', 6);
      const updated = scale.update(2, (n: number, value: number) => n * value);
      const input = scale.output('rem', updated(baseScale(base)));
      expect(input).toStrictEqual([
        '2rem',
        '3.236rem',
        '5.236rem',
        '8.472rem',
        '13.71rem',
        '22.18rem'
      ]);
    });
    test('can change output units', () => {
      const baseScale = scale.create('golden', 6);
      const updated = scale.update(0.5, (n: number, v: number) => n * v);
      const input = scale.output('em', updated(baseScale(base)));
      expect(input).toStrictEqual([
        '0.5em',
        '0.809em',
        '1.309em',
        '2.118em',
        '3.427em',
        '5.545em'
      ]);
    });
  });
});
