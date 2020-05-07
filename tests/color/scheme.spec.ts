import { scheme } from "../../src";

describe("Scheme functions", () => {
  const input = "#348ec9";
  describe("scheme.complementary(): Scheme", () => {
    test("can create complementary schemes", () => {
      expect(scheme.complementary(input)).toStrictEqual(["#348fcb", "#cb7034"]);
    });
  });
  describe("scheme.analogous(): Scheme", () => {
    test("can create analogous schemes", () => {
      const midContrastAnalogous = scheme.analogous(30);
      expect(midContrastAnalogous(input)).toStrictEqual([
        "#34cbbc",
        "#348fcb",
        "#3443cb"
      ]);
    });
    test("low contrast analogous", () => {
      const lowContrast = scheme.analogous(15);
      expect(lowContrast(input)).toStrictEqual([
        "#34b4cb",
        "#348fcb",
        "#3469cb"
      ]);
    });
    test("high contrast analogous", () => {
      const highContrast = scheme.analogous(45);
      expect(highContrast(input)).toStrictEqual([
        "#34cb96",
        "#348fcb",
        "#4b34cb"
      ]);
    });
  });
  describe("scheme.triad(): Scheme", () => {
    test("can create triads", () => {
      const pureTriad = scheme.triad(60);
      expect(pureTriad(input)).toStrictEqual(["#348fcb", "#cb348f", "#8fcb34"]);
    });
    test("imperfect triads", () => {
      const imperfectTriad = scheme.triad(30);
      expect(imperfectTriad(input)).toStrictEqual([
        "#348fcb",
        "#cb3443",
        "#cbbc34"
      ]);
    });
  });
  describe("scheme.tetrad(): Scheme", () => {
    test("can create tetrad", () => {
      const pureTetrad = scheme.tetrad(90);
      expect(pureTetrad(input)).toStrictEqual([
        "#348fcb",
        "#cb7034",
        "#bc34cb",
        "#43cb34"
      ]);
    });
    test("imperfect tetrads", () => {
      const imperfectTetrad = scheme.tetrad(45);
      expect(imperfectTetrad(input)).toStrictEqual([
        "#348fcb",
        "#cb7034",
        "#4b34cb",
        "#b4cb34"
      ]);
    });
  });
});
