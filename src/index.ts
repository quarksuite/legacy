import { clrs as a11y } from "./color/data/clrs";
import { Color, CSSColor } from "./color/data/types";
import { validateColor } from "./color/validate";
import { toHex, toRGB, toHSL, preserveFormat } from "./color/convert";

export { compose as pipe, curryN as init } from "./fn";
export { hue, saturation, lightness, alpha } from "./color/adjust";
export { mix } from "./color/mix";
export { complementary, analogous, triad, tetrad, custom } from "./scheme";
export { tints, tones, shades } from "./variant";

export const hex = (color: CSSColor): Color =>
  validateColor("Invalid color format: cannot convert to hexadecimal", color) &&
  toHex(color);

export const rgb = (color: CSSColor): Color =>
  validateColor("Invalid color format: cannot convert to RGB", color) &&
  toRGB(color);

export const hsl = (color: CSSColor): Color =>
  validateColor("Invalid color format: cannot convert to HSL", color) &&
  toHSL(color);

export const clrs = (color: CSSColor): Color => {
  validateColor("Invalid color format: cannot be read", color);

  if (a11y[color]) return preserveFormat(a11y[color], color);
  throw Error("Color not defined in accessibility table");
};
