import { extractRGBChannels, calcHSL, toHex, toHSL } from "@color/convert/rgb";

describe("RGB formatting", () => {
  describe("extractRGBChannels :: string -> number[]", () => {
    test("rgb[a](R[%], G[%], B[%][, A]) -> [R, G, B[, A]]", () => {
      expect(extractRGBChannels("rgb(0, 0, 0)")).toStrictEqual([0, 0, 0]);
      expect(extractRGBChannels("rgb(170, 170, 170)")).toStrictEqual([
        170,
        170,
        170
      ]);
      expect(extractRGBChannels("rgb(255, 255, 255)")).toStrictEqual([
        255,
        255,
        255
      ]);
      expect(extractRGBChannels("rgb(20, 55, 5)")).toStrictEqual([20, 55, 5]);
      expect(extractRGBChannels("rgb(120, 120, 0)")).toStrictEqual([
        120,
        120,
        0
      ]);
      expect(extractRGBChannels("rgb(10%, 55%, 80%)")).toStrictEqual([
        26,
        140,
        204
      ]);
      expect(extractRGBChannels("rgba(120, 74, 200, 0.1)")).toStrictEqual([
        120,
        74,
        200,
        0.1
      ]);
    });
  });
});

describe("RGB calculations", () => {
  describe("calcHSL :: (number, number, number) -> number[]", () => {
    test("(R, G, B) -> raw [H, S, L]", () => {
      expect(calcHSL(0, 0, 0)).toStrictEqual([0, 0, 0]);
      expect(calcHSL(170, 170, 170)).toStrictEqual([0, 0, 0.667]);
      expect(calcHSL(255, 255, 255)).toStrictEqual([0, 0, 1]);
      expect(calcHSL(120, 64, 100)).toStrictEqual([
        358,
        0.3047091412742382,
        0.361
      ]);
      expect(calcHSL(81, 95, 120)).toStrictEqual([
        342,
        0.19391634980988592,
        0.39449999999999996
      ]);
    });
  });
});

describe("RGB color conversion", () => {
  describe("toHex :: string -> string", () => {
    test("rgb[a](R[%], G[%], B[%][, A]) -> #RRGGBB[AA]", () => {
      expect(toHex("rgb(0, 0, 0)")).toBe("#000000");
      expect(toHex("rgb(170, 170, 170)")).toBe("#aaaaaa");
      expect(toHex("rgb(255, 255, 255)")).toBe("#ffffff");
      expect(toHex("rgb(30, 200, 155)")).toBe("#1ec89b");
      expect(toHex("rgb(50%, 80%, 75%)")).toBe("#80ccbf");
      expect(toHex("rgba(85, 100, 120, 0.5)")).toBe("#55647880");
    });
  });
  describe("toHSL :: string -> string", () => {
    test("rgb[a](R[%], G[%], B[%][, A]) -> #RRGGBB[AA]", () => {
      expect(toHSL("rgb(0, 0, 0)")).toBe("hsl(0, 0%, 0%)");
      expect(toHSL("rgb(170, 170, 170)")).toBe("hsl(0, 0%, 66.7%)");
      expect(toHSL("rgb(255, 255, 255)")).toBe("hsl(0, 0%, 100%)");
      expect(toHSL("rgb(200, 20, 155)")).toBe("hsl(357, 81.8%, 43.1%)");
      expect(toHSL("rgb(25%, 20%, 45%)")).toBe("hsl(16, 38.6%, 32.6%)");
      expect(toHSL("rgba(8, 100, 120, 0.5)")).toBe(
        "hsla(315, 87.5%, 25.1%, 0.5)"
      );
    });
  });
});
