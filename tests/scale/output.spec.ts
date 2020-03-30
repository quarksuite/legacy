import { scale } from "../../src";

describe("Scale creation and modification", () => {
  const base = 1;
  describe("scale.output()", () => {
    test("outputs a system ready scale with units", () => {
      const orig = scale.create("golden", 6);
      const updated = scale.update((v: number) => 2 * v);
      const asRem = scale.output("rem");
      const input = scale.pipe(orig, updated, asRem);
      expect(input(base)).toStrictEqual([
        "2rem",
        "3.236rem",
        "5.236rem",
        "8.472rem",
        "13.71rem",
        "22.18rem"
      ]);
    });
    test("can change output units", () => {
      const orig = scale.create("golden", 6);
      const updated = scale.update((v: number) => v * 0.5);
      const asEms = scale.output("em");
      const input = scale.pipe(orig, updated, asEms);
      expect(input(base)).toStrictEqual([
        "0.5em",
        "0.809em",
        "1.309em",
        "2.118em",
        "3.427em",
        "5.545em"
      ]);
    });
  });
});
