import { compose, curryN } from "./fn";
import { validateColor } from "./color/validate";
import { hue, saturation, lightness, alpha } from "./color/adjust";
import { mix } from "./color/mix";
import { toHex, toRGB, toHSL } from "./color/convert";
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
  l: lightness,
  alpha,
  a: alpha,

  // mixing
  mix,

  // utilities
  utilities: {
    toHex: (color: string) =>
      validateColor(
        "Invalid color format: cannot convert to hexadecimal",
        color
      ) && toHex(color),
    toRGB: (color: string) =>
      validateColor("Invalid color format: cannot convert to RGB", color) &&
      toRGB(color),
    toHSL: (color: string) =>
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
