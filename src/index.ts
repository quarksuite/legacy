import { compose, curryN } from "./fn";
import { clrs } from "./color/data/clrs";
import { validateColor } from "./color/validate";
import { hue, saturation, lightness, alpha } from "./color/adjust";
import { mix } from "./color/mix";
import { toHex, toRGB, toHSL, preserveFormat } from "./color/convert";
import { complementary, analogous, triad, tetrad, custom } from "./scheme";

export const color = {
  // advanced setup
  settings: curryN,
  create: compose,

  // adjustment
  hue,
  h: hue,

  saturation,
  s: saturation,

  lightness,
  luminance: lightness,
  l: lightness,

  alpha,
  transparency: alpha,
  a: alpha,

  // mixing
  mix,

  // utilities
  utilities: {
    a11y: (color: string): string | Error => {
      validateColor("Invalid color format: cannot be read", color);

      if (clrs[color]) return preserveFormat(clrs[color], color);
      throw Error("Color not defined in accessibility table");
    },
    toHex: (color: string): string | Error =>
      validateColor(
        "Invalid color format: cannot convert to hexadecimal",
        color
      ) && toHex(color),
    toRGB: (color: string): string | Error =>
      validateColor("Invalid color format: cannot convert to RGB", color) &&
      toRGB(color),
    toHSL: (color: string): string | Error =>
      validateColor("Invalid color format: cannot convert to HSL", color) &&
      toHSL(color),
  },
};

export const scheme = {
  // advanced setup
  settings: curryN,
  create: compose,

  // available schemes
  complementary,
  analogous,
  triad,
  tetrad,
  custom,
};
