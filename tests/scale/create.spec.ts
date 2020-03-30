import { scale } from "../../src";

describe("Scale creation function", () => {
  const base = 1;
  describe("create(): Scale", () => {
    test("outputs a modular scale", () => {
      const input = scale.create("golden", 6);
      expect(input(base)).toStrictEqual([
        1,
        1.61804,
        2.61804,
        4.23609,
        6.85416,
        11.0903
      ]);
    });
    test("accepts custom ratios", () => {
      const input = scale.create(2.25, 6);
      expect(input(base)).toStrictEqual([
        1,
        2.25,
        5.0625,
        11.3906,
        25.6289,
        57.665
      ]);
    });
  });
});
