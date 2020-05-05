import { color } from "../../src/";

describe("Color functions", () => {
  const input = "#348ec9";
  describe("color.a11y(): Color", () => {
    test("can grab accessible defaults", () => {
      expect(color.a11y("teal")).toBe("rgb(57, 204, 204)");
    });
    test("rejects unlisted colors", () => {
      const error = (): string | Error => color.a11y("wheat");
      expect(error).toThrowError("accessibility table");
    });
  });
  describe("color.adjust(): Color", () => {
    test("Double the value of current hue, then nudge 25 degrees left", () => {
      const hue = color.adjust("hue", (h: number) => h * 2 - 25);
      expect(hue(input)).toBe("rgb(203, 110, 52)");
    });
    test("Increase saturation by 30%", () => {
      const saturation = color.adjust("saturation", (s: number) => s + 30);
      expect(saturation(input)).toBe("rgb(14, 150, 241)");
    });
    test("Darken by 10%", () => {
      const lightness = color.adjust("lightness", (l: number) => l - 10);
      expect(lightness(input)).toBe("rgb(42, 114, 162)");
    });
  });
  describe("color.mix(): Color", () => {
    test("Mix a color evenly", () => {
      const evenly = color.mix("coral", 50);
      expect(evenly(input)).toBe("rgb(184, 135, 153)");
    });
    test("Mix a color more with target", () => {
      const moreOfTarget = color.mix("coral", 72);
      expect(moreOfTarget(input)).toBe("rgb(218, 131, 126)");
    });
    test("Mix a color less with target", () => {
      const lessOfTarget = color.mix("coral", 30);
      expect(lessOfTarget(input)).toBe("rgb(146, 138, 174)");
    });
  });
  describe("color.complement(): Color", () => {
    test("Grab the complement of a color", () => {
      expect(color.complement(input)).toBe("rgb(203, 112, 52)");
    });
  });
  describe("color.negate(): Color", () => {
    test("Negate a color", () => {
      expect(color.negate(input)).toBe("rgb(148, 128, 147)");
    });
  });
  describe("color.toHex(): Color", () => {
    test("fails with invalid format", () => {
      const error = (): string | Error => color.toHex("#banana");
      expect(error).toThrow("cannot be converted");
    });
    test("does nothing with same format", () => {
      expect(color.toHex("#348ec9")).toBe("#348ec9");
    });
    test("converts RGB colors", () => {
      expect(color.toHex("rgb(30, 220, 180)")).toBe("#1edcb4");
      expect(color.toHex("rgb(66%, 60%, 45%)")).toBe("#a89973");
    });
    test("converts HSL colors", () => {
      expect(color.toHex("hsl(10, 40%, 60%)")).toBe("#c27e70");
      expect(color.toHex("hsl(10deg, 40%, 60%)")).toBe("#c27e70");
      expect(color.toHex("hsl(5rad, 40%, 60%)")).toBe("#af70c2");
      expect(color.toHex("hsl(0.49turn, 40%, 80%)")).toBe("#e0b8b8");
    });
    test("converts w3c colors", () => {
      expect(color.toHex("wheat")).toBe("#f5deb3");
      expect(color.toHex("dodgerblue")).toBe("#1e90ff");
      expect(color.toHex("orchid")).toBe("#da70d6");
    });
  });
  describe("color.toHSL(): Color", () => {
    test("fails with invalid format", () => {
      const error = (): string | Error => color.toHSL("rgb(30a, 339, 0)");
      expect(error).toThrow("cannot be converted");
    });
    test("does nothing with same format", () => {
      expect(color.toHSL("hsl(330, 25%, 75%)")).toBe("hsl(330, 25%, 75%)");
    });
    test("converts Hex colors", () => {
      expect(color.toHSL("#40c00a")).toBe("hsl(102, 90%, 40%)");
      expect(color.toHSL("#bad")).toBe("hsl(260, 43%, 77%)");
    });
    test("converts RGB colors", () => {
      expect(color.toHSL("rgb(10, 150, 100)")).toBe("hsl(159, 88%, 31%)");
      expect(color.toHSL("rgb(32%, 48%, 68%)")).toBe("hsl(214, 36%, 50%)");
    });
    test("converts w3c colors", () => {
      expect(color.toHSL("wheat")).toBe("hsl(39, 77%, 83%)");
      expect(color.toHSL("dodgerblue")).toBe("hsl(210, 100%, 56%)");
      expect(color.toHSL("orchid")).toBe("hsl(302, 59%, 65%)");
    });
  });
  describe("color.toRGB(): Color", () => {
    test("fails with invalid format", () => {
      const error = (): string | Error => color.toRGB("hsl(100%, 10p, 5c)");
      expect(error).toThrow("cannot be converted");
    });
    test("does nothing with same format", () => {
      expect(color.toRGB("rgb(15, 151, 115)")).toBe("rgb(15, 151, 115)");
    });
    test("converts Hex colors", () => {
      expect(color.toRGB("#3030aa")).toBe("rgb(48, 48, 170)");
      expect(color.toRGB("#a51")).toBe("rgb(170, 85, 17)");
    });
    test("converts HSL colors", () => {
      expect(color.toRGB("hsl(30, 100%, 50%)")).toBe("rgb(255, 128, 0)");
      expect(color.toRGB("hsl(30deg, 100%, 50%)")).toBe("rgb(255, 128, 0)");
      expect(color.toRGB("hsl(2.25rad, 100%, 50%)")).toBe("rgb(221, 0, 255)");
      expect(color.toRGB("hsl(0.32turn, 48%, 68%)")).toBe("rgb(213, 134, 134)");
    });
    test("converts w3c colors", () => {
      expect(color.toRGB("wheat")).toBe("rgb(245, 222, 179)");
      expect(color.toRGB("dodgerblue")).toBe("rgb(30, 144, 255)");
      expect(color.toRGB("orchid")).toBe("rgb(218, 112, 214)");
    });
  });

  describe("color.toW3C(): Color", () => {
    test("fails with invalid format", () => {
      const error = (): string | Error => color.toRGB("redis");
      expect(error).toThrow("cannot be converted");
    });
    test("does nothing with same format", () => {
      expect(color.toW3C("firebrick")).toBe("firebrick");
    });
    test("fails when color is not found in w3c definitions", () => {
      const error = (): string | Error => color.toW3C("#400acc");
      expect(error).toThrow("does not map");
    });

    test("converts Hex colors", () => {
      expect(color.toW3C("#f5deb3")).toBe("wheat");
    });
    test("bug: does not map W3C -> HSL accurately", () => {
      const error = (): string | Error => color.toW3C("hsl(302, 59%, 65%)");
      expect(error).toThrow("does not map");
    });
    test("converts RGB colors", () => {
      expect(color.toW3C("rgb(30, 144, 255)")).toBe("dodgerblue");
    });
  });
});

describe("color.pipe(): Color", () => {
  test("scenario: begin with red, rotate hue 150deg, decrease saturation by quarter", () => {
    const base = "red";
    const turnQuarterCircle = color.adjust("hue", (h: number) => h + 150);
    const reduceSat = color.adjust("saturation", (s: number) => s - s / 4);
    const input = color.pipe(reduceSat, turnQuarterCircle);

    expect(input(base)).toBe("rgb(32, 223, 128)");
  });
  test("scenario: begin with dodgerblue, mix 60% with lime, fetch complement of result, raise lightness by half", () => {
    const base = "dodgerblue";
    const withLime = color.mix("lime", 60);
    const setLightness = color.adjust("lightness", (l: number) => l + l / 2);
    const input = color.pipe(setLightness, color.complement, withLime);

    expect(input(base)).toBe("rgb(161, 239, 109)");
  });
  test("scenario: begin with goldenrod, negate, raise saturation by 23%", () => {
    const base = "goldenrod";
    const setSaturation = color.adjust("saturation", (v: number) => v + 23);
    const input = color.pipe(setSaturation, color.negate);

    expect(input(base)).toBe("rgb(174, 135, 174)");
  });
  test("scenario: begin with goldenrod, consecutively mix with red, yellow", () => {
    const base = "goldenrod";
    const withRed = color.mix("red", 75);
    const withYellow = color.mix("yellow", 50);
    const input = color.pipe(withYellow, withRed);

    expect(input(base)).toBe("rgb(251, 108, 12)");
  });
});
