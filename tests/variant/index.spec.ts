import { tints, tones, shades } from "@variant/index";

describe("Public color variant generator functions", () => {
  describe("tints :: number -> number -> string -> [string]", () => {
    test("can generate tints from any valid CSS color", () => {
      expect(tints(4, 100, "red")).toStrictEqual([
        "#ff8080",
        "#ffb4b4",
        "#ffdddd",
        "#ffffff",
      ]);
      expect(tints(4, 100, "lime")).toStrictEqual([
        "#80ff80",
        "#b4ffb4",
        "#ddffdd",
        "#ffffff",
      ]);
      expect(tints(4, 100, "blue")).toStrictEqual([
        "#8080ff",
        "#b4b4ff",
        "#ddddff",
        "#ffffff",
      ]);
    });
  });
  describe("tones :: number -> number -> string -> [string]", () => {
    test("can generate tones from any valid CSS color", () => {
      expect(tones(4, 100, "red")).toStrictEqual([
        "#e64040",
        "#ca5b5b",
        "#a96f6f",
        "#808080",
      ]);
      expect(tones(4, 100, "lime")).toStrictEqual([
        "#40e640",
        "#5bca5b",
        "#6fa96f",
        "#808080",
      ]);
      expect(tones(4, 100, "blue")).toStrictEqual([
        "#4040e6",
        "#5b5bca",
        "#6f6fa9",
        "#808080",
      ]);
    });
  });
  describe("shades :: number -> number -> string -> [string]", () => {
    test("can generate shades from any valid CSS color", () => {
      expect(shades(4, 100, "red")).toStrictEqual([
        "#dd0000",
        "#b40000",
        "#800000",
        "#000000",
      ]);
      expect(shades(4, 100, "lime")).toStrictEqual([
        "#00dd00",
        "#00b400",
        "#008000",
        "#000000",
      ]);
      expect(shades(4, 100, "blue")).toStrictEqual([
        "#0000dd",
        "#0000b4",
        "#000080",
        "#000000",
      ]);
    });
  });
});
