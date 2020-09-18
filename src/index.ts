import { hue, saturation, lightness, alpha } from "@color/adjust";
import { toHex, toRGB, toHSL } from "@color/convert";
import { mix } from "@color/mix";

export const color = {
  // adjustment
  hue,
  h: hue,
  saturation,
  s: saturation,
  lightness,
  l: lightness,
  alpha,
  a: alpha,

  // conversion
  toHex,
  toRGB,
  toHSL,

  // mixing
  mix
};
