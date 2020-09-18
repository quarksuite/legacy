import { toHex, toRGB, toHSL } from "@color/convert";
import { hue, saturation, lightness, alpha } from "@color/adjust";

export const color = {
  toHex,
  toRGB,
  toHSL,
  hue,
  h: hue,
  saturation,
  s: saturation,
  lightness,
  l: lightness,
  alpha,
  a: alpha
};
