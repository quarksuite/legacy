import { ms, update, merge, units } from "@scale/index";

describe("Modular scale functions", () => {
  const content = ms(4, 2, 1);
  describe("ms :: number -> number -> number -> [number]", () => {
    test("correctly generates modular scale values", () => {
      expect(ms(4, 2, 1)).toStrictEqual([1, 2, 4, 8]);
    });
  });
  describe("update :: (number -> number) -> [number]", () => {
    test("correctly updates the values in a scale", () => {
      expect(update((n: number) => n + 10, content)).toStrictEqual([
        11,
        12,
        14,
        18,
      ]);
    });
  });
  describe("merge :: [number] -> [number] -> [number]", () => {
    test("correctly merges scales into one", () => {
      const b = ms(8, 1.5, 1);
      expect(merge(content, b)).toStrictEqual([
        1,
        1.5,
        2,
        2.25,
        3.375,
        4,
        5.0625,
        7.59375,
        8,
        11.390625,
        17.0859375,
      ]);
    });
  });
  describe("units :: number -> string -> [number] -> [string]", () => {
    expect(units(5, "rem", content)).toStrictEqual([
      "1rem",
      "2rem",
      "4rem",
      "8rem",
    ]);
  });
});
