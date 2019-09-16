import { create, modify } from '../../src/scale';

describe('Scale creation and modification', () => {
  describe('scale.modify(scale, n, modifier)', () => {
    test('modifies a modular scale', () => {
      const scale = create();
      const data = modify(scale, 2, (n, value) => n * value);
      expect(data).toStrictEqual([
        2,
        3.23608,
        5.23608,
        8.47218,
        13.7083,
        22.1806
      ]);
    });
  });
});
