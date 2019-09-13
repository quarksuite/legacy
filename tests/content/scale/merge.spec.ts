import { create, modify, merge } from '../../../src/content/scale';

describe('Scale creation and modification', () => {
  describe('scale.merge(source, target)', () => {
    test('modifies a modular scale', () => {
      const first = create(1, 'maj6th');
      const second = create(2, 'maj6th');

      const data = merge(first, second);

      expect(data).toStrictEqual([
        1,
        1.667,
        2,
        2.77889,
        3.334,
        4.63241,
        5.55778,
        7.72222,
        9.26482,
        12.8729,
        15.4444,
        25.7459
      ]);
    });
  });
});
