import { hue, saturation, lightness, alpha } from "@color/adjust";

describe("Pulblic color adjustment functions", () => {
  describe("hue :: (number, string) -> string | Error", () => {
    test("allows hue adjustment of any valid color", () => {
      expect(hue(60, "#ff0000")).toBe("#ffff00");
      expect(hue(120, "rgb(110, 220, 0)")).toBe("rgb(0, 110, 220)");
      expect(hue(-15, "hsl(340, 40%, 62%)")).toBe("hsl(325, 40%, 62%)");
      expect(hue(-34, "dodgerblue")).toBe("#1efff0");
    });
    test("responds to alpha transparency", () => {
      expect(hue(60, "#abcedef9")).toBe("#bbabdef9");
      expect(hue(120, "rgba(10, 20, 0, 0.4)")).toBe("rgba(0, 10, 20, 0.4)");
      expect(hue(-15, "hsla(30, 40%, 62%, 0.42)")).toBe(
        "hsla(15, 40%, 62%, 0.42)"
      );
    });
    test("corrects for hue adjustments > 360", () => {
      expect(hue(640, "#ff0000")).toBe("#aa00ff");
      expect(hue(390, "rgb(110, 220, 0)")).toBe("rgb(0, 220, 0)");
      expect(hue(1337, "hsl(340, 40%, 62%)")).toBe("hsl(237, 40%, 62%)");
    });
    test("corrects for hue adjustments < 0", () => {
      expect(hue(-131, "#ff0000")).toBe("#002fff");
      expect(hue(-440, "rgb(110, 220, 0)")).toBe("rgb(220, 37, 0)");
      expect(hue(-1337, "hsl(340, 40%, 62%)")).toBe("hsl(83, 40%, 62%)");
    });
    test("rejects invalid colors", () => {
      expect(() => hue(30, "hsa(3311, 330, 1100)")).toThrow();
      expect(() => hue(30, "rgb(339, 11, 999)")).toThrow();
      expect(() => hue(-11, "#ffaa3cz")).toThrow();
    });
  });
  describe("saturation :: (number, string) -> string", () => {
    test("allows saturation adjustment of any valid color", () => {
      expect(saturation(-30, "#ff0000")).toBe("#d92626");
      expect(saturation(-15, "rgb(110, 220, 0)")).toBe("rgb(110, 203, 16)");
      expect(saturation(10, "hsl(340, 40%, 62%)")).toBe("hsl(340, 50%, 62%)");
      expect(saturation(-20, "dodgerblue")).toBe("#358fe9");
    });
    test("responds to alpha transparency", () => {
      expect(saturation(25, "#abcedef9")).toBe("#9cd3edf9");
      expect(saturation(-35, "rgba(175, 150, 0, 0.4)")).toBe(
        "rgba(144, 127, 31, 0.4)"
      );
      expect(saturation(-15, "hsla(30, 40%, 62%, 0.42)")).toBe(
        "hsla(30, 25%, 62%, 0.42)"
      );
    });
    test("locks at minimum saturation", () => {
      expect(saturation(-100, "#ff0000")).toBe("#808080");
      expect(saturation(-100, "rgb(110, 220, 0)")).toBe("rgb(110, 110, 110)");
      expect(saturation(-100, "hsl(340, 40%, 62%)")).toBe("hsl(340, 0%, 62%)");
      expect(saturation(-100, "dodgerblue")).toBe("#8f8f8f");
      expect(saturation(-100, "#abcedef9")).toBe("#c5c5c5f9");
      expect(saturation(-100, "rgba(175, 150, 0, 0.4)")).toBe(
        "rgba(87, 87, 87, 0.4)"
      );
      expect(saturation(-100, "hsla(30, 40%, 62%, 0.42)")).toBe(
        "hsla(30, 0%, 62%, 0.42)"
      );
      expect(saturation(-100, "hotpink")).toBe("#b4b4b4");
    });
    test("locks at maximum saturation", () => {
      expect(saturation(100, "#ff0000")).toBe("#ff0000");
      expect(saturation(100, "rgb(110, 220, 0)")).toBe("rgb(110, 220, 0)");
      expect(saturation(100, "hsl(340, 40%, 62%)")).toBe("hsl(340, 100%, 62%)");
      expect(saturation(100, "dodgerblue")).toBe("#1e8fff");
      expect(saturation(100, "#abcedef9")).toBe("#8adafff9");
      expect(saturation(100, "rgba(175, 150, 0, 0.4)")).toBe(
        "rgba(175, 149, 0, 0.4)"
      );
      expect(saturation(100, "hsla(30, 40%, 62%, 0.42)")).toBe(
        "hsla(30, 100%, 62%, 0.42)"
      );
      expect(saturation(100, "hotpink")).toBe("#ff69b4");
    });
    test("rejects invalid colors", () => {
      expect(() => saturation(30, "hsa(3311, 330, 1100)")).toThrow();
      expect(() => saturation(30, "rgb(339, 11, 999)")).toThrow();
      expect(() => saturation(-11, "#ffaa3cz")).toThrow();
    });
  });
  describe("lightness :: (number, string) -> string", () => {
    test("allows lightness adjustment of any valid color", () => {
      expect(lightness(-30, "#ff0000")).toBe("#660000");
      expect(lightness(-15, "rgb(110, 220, 0)")).toBe("rgb(71, 143, 0)");
      expect(lightness(10, "hsl(340, 40%, 62%)")).toBe("hsl(340, 40%, 72%)");
      expect(lightness(-20, "dodgerblue")).toBe("#005cb8");
    });
    test("responds to alpha transparency", () => {
      expect(lightness(-25, "#abcedef9")).toBe("#4f98baf9");
      expect(lightness(35, "rgba(175, 150, 0, 0.4)")).toBe(
        "rgba(255, 231, 97, 0.4)"
      );
      expect(lightness(15, "hsla(30, 40%, 62%, 0.42)")).toBe(
        "hsla(30, 40%, 77%, 0.42)"
      );
    });
    test("locks at minimum lightness", () => {
      expect(lightness(-100, "#ff0000")).toBe("#000000");
      expect(lightness(-100, "rgb(110, 220, 0)")).toBe("rgb(0, 0, 0)");
      expect(lightness(-100, "hsl(340, 40%, 62%)")).toBe("hsl(340, 40%, 0%)");
      expect(lightness(-100, "dodgerblue")).toBe("#000000");
      expect(lightness(-100, "#abcedef9")).toBe("#000000f9");
      expect(lightness(-100, "rgba(175, 150, 0, 0.4)")).toBe(
        "rgba(0, 0, 0, 0.4)"
      );
      expect(lightness(-100, "hsla(30, 40%, 62%, 0.42)")).toBe(
        "hsla(30, 40%, 0%, 0.42)"
      );
      expect(lightness(-100, "hotpink")).toBe("#000000");
    });
    test("locks at maximum lightness", () => {
      expect(lightness(100, "#ff0000")).toBe("#ffffff");
      expect(lightness(100, "rgb(110, 220, 0)")).toBe("rgb(255, 255, 255)");
      expect(lightness(100, "hsl(340, 40%, 62%)")).toBe("hsl(340, 40%, 100%)");
      expect(lightness(100, "dodgerblue")).toBe("#ffffff");
      expect(lightness(100, "#abcedef9")).toBe("#fffffff9");
      expect(lightness(100, "rgba(175, 150, 0, 0.4)")).toBe(
        "rgba(255, 255, 255, 0.4)"
      );
      expect(lightness(100, "hsla(30, 40%, 62%, 0.42)")).toBe(
        "hsla(30, 40%, 100%, 0.42)"
      );
      expect(lightness(100, "hotpink")).toBe("#ffffff");
    });
    test("rejects invalid colors", () => {
      expect(() => lightness(30, "hsa(3311, 330, 1100)")).toThrow();
      expect(() => lightness(30, "rgb(339, 11, 999)")).toThrow();
      expect(() => lightness(-11, "#ffaa3cz")).toThrow();
    });
  });
  describe("alpha :: (number, string) -> string", () => {
    test("allows alpha transparency adjustment of any valid color", () => {
      expect(alpha(-30, "#ff0000")).toBe("#ff0000b3");
      expect(alpha(-15, "rgb(110, 220, 0)")).toBe("rgba(110, 220, 0, 0.85)");
      expect(alpha(-10, "hsl(340, 40%, 62%)")).toBe("hsla(340, 40%, 62%, 0.9)");
      expect(alpha(-20, "dodgerblue")).toBe("#1e8fffcc");
      expect(alpha(-25, "#abcedef9")).toBe("#abcedeba");
      expect(alpha(35, "rgba(175, 150, 0, 0.4)")).toBe(
        "rgba(175, 149, 0, 0.75)"
      );
      expect(alpha(15, "hsla(30, 40%, 62%, 0.42)")).toBe(
        "hsla(30, 40%, 62%, 0.57)"
      );
    });
    test("locks at minimum alpha", () => {
      expect(alpha(-100, "#ff0000")).toBe("#ff000000");
      expect(alpha(-100, "rgb(110, 220, 0)")).toBe("rgba(110, 220, 0, 0)");
      expect(alpha(-100, "hsl(340, 40%, 62%)")).toBe("hsla(340, 40%, 62%, 0)");
      expect(alpha(-100, "dodgerblue")).toBe("#1e8fff00");
      expect(alpha(-100, "#abcedef9")).toBe("#abcede00");
      expect(alpha(-100, "rgba(175, 150, 0, 0.4)")).toBe(
        "rgba(175, 149, 0, 0)"
      );
      expect(alpha(-100, "hsla(30, 40%, 62%, 0.42)")).toBe(
        "hsla(30, 40%, 62%, 0)"
      );
      expect(alpha(-100, "hotpink")).toBe("#ff69b400");
    });
    test("locks at maximum alpha", () => {
      expect(alpha(100, "#ff000033")).toBe("#ff0000");
      expect(alpha(100, "rgba(110, 220, 0, 0.25)")).toBe("rgb(110, 220, 0)");
      expect(alpha(100, "hsla(340, 40%, 62%, 0)")).toBe("hsl(340, 40%, 62%)");
      expect(alpha(100, "dodgerblue")).toBe("#1e8fff");
      expect(alpha(100, "#abcedef9")).toBe("#abcede");
      expect(alpha(100, "rgba(175, 150, 0, 0.4)")).toBe("rgb(175, 149, 0)");
      expect(alpha(100, "hsla(30, 40%, 62%, 0.42)")).toBe("hsl(30, 40%, 62%)");
      expect(alpha(100, "hotpink")).toBe("#ff69b4");
    });
    test("rejects invalid colors", () => {
      expect(() => alpha(30, "hsa(3311, 330, 1100)")).toThrow();
      expect(() => alpha(30, "rgb(339, 11, 999)")).toThrow();
      expect(() => alpha(-11, "#ffaa3cz")).toThrow();
    });
  });
});
