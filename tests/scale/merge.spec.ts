import { scale } from "../../src";

describe("Scale creation and modification", () => {
  const base = 1;
  describe("merge(): Scale", () => {
    test("merges two scales", () => {
      const baseScale = scale.create("golden", 6);
      const first = baseScale(base);
      const second = baseScale(base * 2);

      const input = scale.merge;

      expect(input(first, second)).toStrictEqual([
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
