import { create, modify, output } from '../../src/scale';

describe('Scale creation and modification', () => {
  describe('scale.output(scale, unit?, precision?)', () => {
    test('outputs a system ready scale with units', () => {
      const scale = create(1, 'golden');
      const data = output(modify(scale, 2, (n, value) => n * value));
      expect(data).toStrictEqual([
        '2rem',
        '3.236rem',
        '5.236rem',
        '8.472rem',
        '13.71rem',
        '22.18rem'
      ]);
    });
  });
});
