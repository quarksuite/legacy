import { clrs as a11y } from "./color/data/clrs";
import { Color, CSSColor, Clrs, Stack } from "./color/data/types";
import { validateColor } from "./color/validate";
import { toHex, toRGB, toHSL, preserveFormat } from "./color/convert";

// color, scheme, and variant functions
export { compose as pipe, curryN as set } from "./fn";
export { hue, saturation, lightness, alpha } from "./color/adjust";
export { mix } from "./color/mix";
export { complementary, analogous, triad, tetrad, custom } from "./scheme";
export { tints, tones, shades } from "./variant";

// color utilities

/**
 * Converts any valid CSS color to hexadecimal format.
 *
 * ## Usage
 * ```ts
 * hex('rgb(0, 110, 200)');
 * ```
 *
 * @remarks
 * The main use of conversion functions with this library is to **coerce** a
 * change to the desired format.
 *
 * All color, scheme, and variant functions output their data in the same format
 * of their input color, so if you convert your base color, it will update everywhere.
 *
 * @param color - the color to convert
 * @returns input color in hex format
 */
export const hex = (color: CSSColor): Color =>
  validateColor("Invalid color format: cannot convert to hexadecimal", color) &&
  toHex(color);

/**
 * Converts any valid CSS color to RGB format.
 *
 * ## Usage
 * ```ts
 * rgb('#face');
 * ```
 *
 * @remarks
 * The main use of conversion functions with this library is to **coerce** a
 * change to the desired format.
 *
 * All color, scheme, and variant functions output their data in the same format
 * of their input color, so if you convert your base color, it will update everywhere.
 *
 * @param color - the color to convert
 * @returns input color in rgb format
 */
export const rgb = (color: CSSColor): Color =>
  validateColor("Invalid color format: cannot convert to RGB", color) &&
  toRGB(color);

/**
 * Converts any valid CSS color to HSL format.
 *
 * ## Usage
 * ```ts
 * hsl('papayawhip');
 * ```
 *
 * @remarks
 * The main use of conversion functions with this library is to **coerce** a
 * change to the desired format.
 *
 * All color, scheme, and variant functions output their data in the same format
 * of their input color, so if you convert your base color, it will update everywhere.
 *
 * @param color - the color to convert
 * @returns input color in hsl format
 */
export const hsl = (color: CSSColor): Color =>
  validateColor("Invalid color format: cannot convert to HSL", color) &&
  toHSL(color);

/**
 * Allows you to use the {@link https://clrs.cc | clrs.cc} color definitions
 * for accessible color defaults.
 *
 * ## Usage
 * ```ts
 * clrs('aqua');
 * ```
 *
 *
 * @param color - one of the defined clrs.cc defaults
 * @returns the hex color matching the lookup string
 */
export const clrs = (color: Clrs): Color => {
  validateColor("Invalid color format: cannot be read", color);

  if (a11y[color]) return preserveFormat(a11y[color], color);
  throw Error("Color not defined in accessibility table");
};

// system font stacks

/**
 * Allows you use system font stacks for quick prototyping or lending a more native
 * OS feel to your web project.
 *
 * ## Usage
 * ```ts
 * // Will output all by default
 * systemfonts()
 *
 * // Otherwise will output system font stacks of the matched keys
 * systemfonts(['sans-serif', 'serif']);
 * ```
 *
 * @param fonts - an array of "serif", "sans-serif", and/or "monospace",
 * @returns array of font stacks matching the defined keys or a string if only one matched key
 */
export const systemfonts = (...fonts: Stack[]): string | string[] => {
  interface SystemStack {
    [index: string]: string;
  }

  const families: SystemStack = {
    "sans-serif":
      "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
    serif:
      "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
    monospace:
      "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
  };

  // No arguments outputs all stacks by default
  if (!fonts.length)
    return ["sans", "serif", "monospace"].map(
      (stack: string): string => families[stack]
    );

  // Output a string if only one family
  if (fonts.length === 1) {
    const [font] = fonts;
    return families[font];
  }

  // Output an array otherwise
  return fonts.map((stack: string) => families[stack]);
};
