import { bind, pipe, hex, rgb, hsl, clrs, systemfonts } from "@utilities/index";
import {
  hue,
  saturation,
  lightness,
  alpha,
  ms,
  update,
  units,
} from "@api/index";

describe("Functional utilities", () => {
  const h = bind(hue, 75);
  const s = bind(saturation, -30);
  const l = bind(lightness, 25);
  const a = bind(alpha, -8);

  describe("bind", () => {
    test("allows binding of initial arguments", () => {
      const swatch = hex("dodgerblue");
      expect(h(swatch)).toBe("#c71eff");
      expect(s(swatch)).toBe("#408fdd");
      expect(l(swatch)).toBe("#9ecfff");
      expect(a(swatch)).toBe("#1e8fffeb");
    });
  });
  describe("pipe", () => {
    test("executes consecutive operations on a value", () => {
      const swatch = pipe("blue", clrs, rgb);
      const color = pipe(swatch, h, s, l);
      expect(color).toBe("rgb(198, 117, 230)");
    });
    test("the return type of these operations can change", () => {
      const scale = ms(8, 2, 1);
      const invert = bind(update, (v: number) => 1 / v);
      const rem = bind(units, 4, "rem");
      const output = pipe(scale, invert, rem);

      expect(output).toStrictEqual([
        "1rem",
        "0.5rem",
        "0.25rem",
        "0.125rem",
        "0.0625rem",
        "0.03125rem",
        "0.01563rem",
        "0.007813rem",
      ]);
    });
  });
});

describe("Color utilities", () => {
  describe("hex :: string -> string", () => {
    test("correctly converts color of any format to a hex color", () => {
      expect(hex("rgb(253, 128, 254)")).toBe("#fd80fe");
      expect(hex("springgreen")).toBe("#00ff7f");
      expect(hex("hsl(230, 100%, 70%)")).toBe("#667fff");
    });
    test("throws with invalid format", () => {
      expect(() => hex("rgb(257, 128, 254)")).toThrow();
    });
  });
  describe("rgb :: string -> string", () => {
    test("correctly converts color of any format to a RGB color", () => {
      expect(rgb("#face")).toBe("rgba(255, 170, 204, 0.933)");
      expect(rgb("springgreen")).toBe("rgb(0, 255, 127)");
      expect(rgb("hsl(190, 80%, 40%)")).toBe("rgb(20, 156, 184)");
    });
    test("throws with invalid format", () => {
      expect(() => rgb("#deader")).toThrow();
    });
  });
  describe("hsl :: string -> string", () => {
    test("correctly converts color of any format to a RGB color", () => {
      expect(hsl("#aced")).toBe("hsla(210, 66.5%, 80%, 0.867)");
      expect(hsl("springgreen")).toBe("hsl(150, 100%, 50%)");
      expect(hsl("rgb(48, 64, 128)")).toBe("hsl(228, 45.5%, 34.5%)");
    });
    test("throws with invalid format", () => {
      expect(() => hsl("tigerstripe")).toThrow();
    });
  });
  describe("clrs :: string -> string", () => {
    test("correctly matches a web default with its clrs.cc equivalent", () => {
      expect(clrs("red")).toBe("#ff4136");
      expect(clrs("lime")).toBe("#01ff70");
      expect(clrs("blue")).toBe("#0074d9");
    });
  });
});

describe("systemfonts :: [string] -> [string]", () => {
  test("correctly matches system font stacks to the defined keys", () => {
    expect(systemfonts()).toStrictEqual([]);
    expect(systemfonts("sans-serif", "serif", "monospace")).toStrictEqual([
      "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
      "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
      "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
    ]);
  });
});
