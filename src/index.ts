import { compose, curryN } from "./fn";
import { clrs } from "./color/data/clrs";
import { Color, CSSColor } from "./color/data/types";
import { validateColor } from "./color/validate";
import { hue, saturation, lightness, alpha } from "./color/adjust";
import { mix } from "./color/mix";
import { toHex, toRGB, toHSL, preserveFormat } from "./color/convert";
import { complementary, analogous, triad, tetrad, custom } from "./scheme";
import { tints, tones, shades } from "./variant";

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
    a11y: (color: CSSColor): Color => {
      validateColor("Invalid color format: cannot be read", color);

      if (clrs[color]) return preserveFormat(clrs[color], color);
      throw Error("Color not defined in accessibility table");
    },
    toHex: (color: CSSColor): Color =>
      validateColor(
        "Invalid color format: cannot convert to hexadecimal",
        color
      ) && toHex(color),
    toRGB: (color: CSSColor): Color =>
      validateColor("Invalid color format: cannot convert to RGB", color) &&
      toRGB(color),
    toHSL: (color: CSSColor): Color =>
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

export const variant = {
  tints,
  tones,
  shades,
};
