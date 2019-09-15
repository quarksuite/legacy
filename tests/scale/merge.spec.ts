import { create, merge } from '../../src/scale';

describe('Scale creation and modification', () => {
  describe('scale.merge(scales)', () => {
    test('merges two scales', () => {
      const first = create();
      const second = create(2);

      const data = merge(first, second);

      expect(data).toStrictEqual([
        1,
        1.61804,
        2,
        2.61804,
        3.23607,
        4.23609,
        5.23609,
        6.85416,
        8.47219,
        11.0903,
        13.7083,
        22.1806
      ]);
    });
  });
});
