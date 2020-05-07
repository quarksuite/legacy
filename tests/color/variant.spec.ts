import { variant } from "../../src";

describe("Variant functions", () => {
  const input = "#348ec9";
  describe("variant.blend(): Variant", () => {
    test("can create blends", () => {
      const blend = variant.blend("coral", 64, 3);
      expect(blend(input)).toStrictEqual(["#7e8bb6", "#ab88a1", "#ce8589"]);
    });
  });
  describe("variant.tints(): Variant", () => {
    test("can create tints", () => {
      const tints = variant.tints(95, 3);
      expect(tints(input)).toStrictEqual(["#96b9dc", "#cddced", "#f9fbfd"]);
    });
  });
  describe("variant.tones(): Variant", () => {
    test("can create tones", () => {
      const tones = variant.tones(95, 3);
      expect(tones(input)).toStrictEqual(["#6997c0", "#8ba0b6", "#a6a9ac"]);
    });
  });
  describe("variant.shades(): Variant", () => {
    test("can create shades", () => {
      const shades = variant.shades(95, 3);
      expect(shades(input)).toStrictEqual(["#2c76a6", "#22577a", "#142430"]);
    });
  });
});
