import { extractHSL, calcRGB, toRGB, toHex } from "@color/convert/hsl";

describe("HSL formatting", () => {
  describe("extractHSL :: string -> number[]", () => {
    test("hsl[a](H, S%, L%[, A]) -> [H, S, L[, A]]", () => {
      expect(extractHSL("hsl(0, 0%, 0%)")).toStrictEqual([0, 0, 0]);
      expect(extractHSL("hsl(0, 0%, 66.7%)")).toStrictEqual([0, 0, 0.667]);
      expect(extractHSL("hsl(0, 0%, 100%)")).toStrictEqual([0, 0, 1]);
      expect(extractHSL("hsl(120deg, 50%, 68%)")).toStrictEqual([
        120,
        0.5,
        0.68
      ]);
      expect(extractHSL("hsl(3.4rad, 31%, 80%)")).toStrictEqual([
        195,
        0.31,
        0.8
      ]);
      expect(extractHSL("hsl(0.25turn, 64%, 30%)")).toStrictEqual([
        90,
        0.64,
        0.3
      ]);
      expect(extractHSL("hsla(220, 64%, 30%, 0.37)")).toStrictEqual([
        220,
        0.64,
        0.3,
        0.37
      ]);
    });
  });
});

describe("HSL calculations", () => {
  describe("calcRGB :: (number, number, number) -> number[]", () => {
    test("(H, S, L) -> raw [R, G, B]", () => {
      expect(calcRGB(0, 0, 0)).toStrictEqual([0, 0, 0]);
      expect(calcRGB(0, 0, 0.667)).toStrictEqual([170, 170, 170]);
      expect(calcRGB(0, 0, 1)).toStrictEqual([255, 255, 255]);
      expect(calcRGB(148, 0.75, 0.293)).toStrictEqual([19, 131, 71]);
      expect(calcRGB(148, 0.42, 0.318)).toStrictEqual([47, 115, 79]);
    });
  });
});

describe("HSL color conversion", () => {
  describe("toRGB :: string -> string", () => {
    test("hsl[a](H, S% L%[, A]) -> rgb[a](R, G, B[, A])", () => {
      expect(toRGB("hsl(0, 0, 0)")).toBe("rgb(0, 0, 0)");
      expect(toRGB("hsl(0, 0% 66.7%)")).toBe("rgb(170, 170, 170)");
      expect(toRGB("hsl(0, 0%, 100%)")).toBe("rgb(255, 255, 255)");
      expect(toRGB("hsl(30, 60%, 90%)")).toBe("rgb(245, 230, 214)");
      expect(toRGB("hsl(195deg, 30%, 27.5%)")).toBe("rgb(49, 81, 91)");
      expect(toRGB("hsl(2.5rad, 10%, 7.5%)")).toBe("rgb(17, 21, 19)");
      expect(toRGB("hsl(0.42turn, 40%, 55.5%)")).toBe("rgb(96, 187, 143)");
    });
  });
  describe("toHSL :: string -> string", () => {
    test("hsl[a](H, S%, L%[, A]) -> #RRGGBB[AA]", () => {
      expect(toHex("hsl(0, 0, 0)")).toBe("#000000");
      expect(toHex("hsl(0, 0% 66.7%)")).toBe("#aaaaaa");
      expect(toHex("hsl(0, 0%, 100%)")).toBe("#ffffff");
      expect(toHex("hsl(79, 68%, 78%)")).toBe("#d5eda1");
      expect(toHex("hsl(128deg, 8%, 32%)")).toBe("#4b584d");
      expect(toHex("hsl(1.5rad, 78%, 52%)")).toBe("#91e425");
    });
  });
});
