import { Unary, Variadic } from "../fn";
import { clrs as a11y } from "../color/data/clrs";
import { Color, CSSColor, Clrs } from "../color/types";
import { validateColor } from "../color/validate";
import { toHex, toRGB, toHSL, preserveFormat } from "../color/convert";

/**
 * A higher order function that accepts a utility and allows partial application
 * of its modifiers.
 *
 * ## Usage
 * ```ts
 * const mixWithGreen = set(mix, 32, 'lime');
 * mixWithGreen('skyblue');
 *
 * // chaining allows reuse of multiple modifiers
 * const scale = ms(5, 2, 1);
 * const significantDigits = set(units, 3);
 * const rems = set(significantDigits, "rem");
 * rems(scale);
 * ```
 *
 * @param fn - the function to curry
 * @param applied - initial arguments
 * @param remaining - remaining arguments
 * @returns the args of `fn` as a sequence of two calls of its arguments
 *
 */
export const set = <T extends unknown[], U extends unknown[], R>(
  fn: Variadic<T, U, R>,
  ...applied: T
) => (...remaining: U): R => fn(...applied, ...remaining);

/**
 * Pipes data through consecutive calls of utilities.
 *
 * ## Usage
 * ```ts
 * const thirdOfCircle = set(hue, 120);
 * const muteByHalf = set(saturation, -50);
 *
 * pipe('royalblue', thirdOfCircle, muteByHalf);
 * ```
 *
 * @param x - the data to be piped
 * @param fns - the functions to process the data
 * @returns the value after consecutive operations
 *
 */
export const pipe = <T extends unknown, R extends unknown>(
  x: T,
  ...fns: Unary<T, R>[]
): R => fns.reduce((y, f) => f(y) as T, x) as R;

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
export const hex = (color: CSSColor): Color => {
  validateColor("Invalid color format: cannot convert to hexadecimal", color);
  return toHex(color);
};

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
export const rgb = (color: CSSColor): Color => {
  validateColor("Invalid color format: cannot convert to hexadecimal", color);
  return toRGB(color);
};

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
export const hsl = (color: CSSColor): Color => {
  validateColor("Invalid color format: cannot convert to hexadecimal", color);
  return toHSL(color);
};

/**
 * Allows you to use the {@link https://clrs.cc | clrs.cc} color definitions
 * for accessible color defaults.
 *
 * ## Usage
 * ```ts
 * clrs('aqua');
 * ```
 *
 * @param color - one of the defined clrs.cc defaults
 * @returns the hex color matching the lookup string
 */
export const clrs = (color: Clrs): Color => {
  return preserveFormat(a11y[color], color);
};

// system font stacks

/**
 * Allows you use {@link https://systemfontstack.com | system font stacks} for quick prototyping or lending a more native
 * OS feel to your web project.
 *
 * ## Usage
 * ```ts
 * // Will output system font stacks of the matched keys
 * systemfonts('sans-serif', 'serif');
 * ```
 *
 * @param fonts - "serif", "sans-serif", and/or "monospace",
 * @returns array of font stacks matching the defined keys
 */
export const systemfonts = (...fonts: string[]): string[] => {
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

  return fonts.map((stack: string) => families[stack]);
};
