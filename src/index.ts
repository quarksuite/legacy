import { compose, curryN } from "./fn";
import { hue, saturation, lightness, alpha } from "./color/adjust";
import { mix } from "./color/mix";
import { toHex, toRGB, toHSL } from "./color/convert";

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
    toHex,
    toRGB,
    toHSL,
  },
};
