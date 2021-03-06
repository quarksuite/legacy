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
        0.68,
      ]);
      expect(extractHSL("hsl(3.4rad, 31%, 80%)")).toStrictEqual([
        195,
        0.31,
        0.8,
      ]);
      expect(extractHSL("hsl(0.25turn, 64%, 30%)")).toStrictEqual([
        90,
        0.64,
        0.3,
      ]);
      expect(extractHSL("hsla(220, 64%, 30%, 0.37)")).toStrictEqual([
        220,
        0.64,
        0.3,
        0.37,
      ]);
      expect(extractHSL("hsl(-45, 74%, 88%)")).toStrictEqual([315, 0.74, 0.88]);
      expect(extractHSL("hsla(-4rad, 74%, 88%, 0)")).toStrictEqual([
        131,
        0.74,
        0.88,
        0,
      ]);
    });
    test("hsl[a](H S% L%[/ A%]) -> [H, S, L[, A]]", () => {
      expect(extractHSL("hsla(220 64% 30% / 37%)")).toStrictEqual([
        220,
        0.64,
        0.3,
        0.37,
      ]);
      expect(extractHSL("hsl(-45 74% 88%)")).toStrictEqual([315, 0.74, 0.88]);
      expect(extractHSL("hsla(-4rad 74% 88% / 0%)")).toStrictEqual([
        131,
        0.74,
        0.88,
        0,
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
      expect(calcRGB(255, 0.32, 0.318)).toStrictEqual([68, 55, 107]);
      expect(calcRGB(309, 0.22, 0.48)).toStrictEqual([149, 95, 141]);
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
      expect(toRGB("hsl(100grad, 30%, 27%)")).toBe("rgb(69, 90, 48)");
      expect(toRGB("hsl(2.5rad, 10%, 7.5%)")).toBe("rgb(17, 21, 19)");
      expect(toRGB("hsl(0.42turn, 40%, 55.5%)")).toBe("rgb(96, 187, 143)");
      expect(toRGB("hsla(199, 36%, 65%, 0.4881)")).toBe(
        "rgba(134, 178, 198, 0.4881)"
      );
    });
    test("correctly adjusts the hue when < 360", () => {
      expect(toRGB("hsl(-30, 60%, 90%)")).toBe("rgb(245, 214, 230)");
      expect(toRGB("hsl(-270grad, 60%, 69%)")).toBe("rgb(133, 223, 129)");
      expect(toRGB("hsl(-2.5rad, 60%, 69%)")).toBe("rgb(129, 165, 223)");
      expect(toRGB("hsl(-0.42turn, 40%, 59%)")).toBe("rgb(109, 152, 192)");
      expect(toRGB("hsla(-48, 40%, 59%, 0.35)")).toBe(
        "rgba(192, 109, 176, 0.35)"
      );
    });
    test("correctly adjusts the hue when > 360", () => {
      expect(toRGB("hsl(451, 39%, 80%)")).toBe("rgb(203, 224, 184)");
      expect(toRGB("hsl(760, 69%, 30%)")).toBe("rgb(129, 94, 24)");
      expect(toRGB("hsla(660, 69%, 30%, 0.5)")).toBe("rgba(129, 24, 129, 0.5)");
      expect(toRGB("hsl(720grad, 69%, 30%)")).toBe("rgb(108, 24, 129)");
      expect(toRGB("hsl(10rad, 69%, 30%)")).toBe("rgb(24, 71, 129)");
      expect(toRGB("hsl(2.25turn, 69%, 30%)")).toBe("rgb(77, 129, 24)");
    });
    test("respects zero transparency", () => {
      expect(toRGB("hsla(420, 23%, 42%, 0)")).toBe("rgba(132, 132, 82, 0)");
    });
    test("removes alpha for opaque color", () => {
      expect(toRGB("hsla(420, 23%, 42%, 1)")).toBe("rgb(132, 132, 82)");
    });
  });
  describe("toHex :: string -> string", () => {
    test("hsl[a](H, S%, L%[, A]) -> #RRGGBB[AA]", () => {
      expect(toHex("hsl(0, 0, 0)")).toBe("#000000");
      expect(toHex("hsl(0, 0% 66.7%)")).toBe("#aaaaaa");
      expect(toHex("hsl(0, 0%, 100%)")).toBe("#ffffff");
      expect(toHex("hsl(79, 68%, 78%)")).toBe("#d5eda1");
      expect(toHex("hsl(128deg, 8%, 32%)")).toBe("#4b584d");
      expect(toHex("hsl(1.5rad, 78%, 52%)")).toBe("#91e425");
      expect(toHex("hsla(5.7rad, 78%, 32%, 0.1011)")).toBe("#9112581a");
    });
    test("correctly adjusts the hue when < 360", () => {
      expect(toHex("hsl(-30, 60%, 90%)")).toBe("#f5d6e6");
      expect(toHex("hsl(-270grad, 60%, 69%)")).toBe("#85df81");
      expect(toHex("hsl(-2.5rad, 60%, 69%)")).toBe("#81a5df");
      expect(toHex("hsl(-0.42turn, 40%, 59%)")).toBe("#6d98c0");
      expect(toHex("hsla(-48, 40%, 59%, 0.35)")).toBe("#c06db059");
    });
    test("correctly adjusts the hue when > 360", () => {
      expect(toHex("hsl(451, 39%, 80%)")).toBe("#cbe0b8");
      expect(toHex("hsl(760, 69%, 30%)")).toBe("#815e18");
      expect(toHex("hsla(660, 69%, 30%, 0.5)")).toBe("#81188180");
      expect(toHex("hsl(720grad, 69%, 30%)")).toBe("#6c1881");
      expect(toHex("hsl(10rad, 69%, 30%)")).toBe("#184781");
      expect(toHex("hsl(2.25turn, 69%, 30%)")).toBe("#4d8118");
    });
    test("respects zero transparency", () => {
      expect(toHex("hsla(20, 23%, 42%, 0)")).toBe("#84635200");
    });
    test("removes alpha for opaque color", () => {
      expect(toHex("hsla(42, 23%, 42%, 1)")).toBe("#847552");
    });
  });
});
