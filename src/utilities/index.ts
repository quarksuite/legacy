/* eslint-disable @typescript-eslint/no-explicit-any */

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
 * @param utility - the utility to set
 * @param initial - initial arguments to apply
 * @param pending - remaining arguments
 * @returns a function with the remaining args as parameters
 *
 */
export const set = <T extends unknown[], U extends unknown[], R>(
  utility: Variadic<T, U, R>,
  ...initial: T
) => (...pending: U): R => utility(...initial, ...pending);

// Modification by: https://dev.to/menocomp/comment/14l59
type Tail<T extends unknown[]> = T extends [head: unknown, ...tail: infer U]
  ? U
  : T;

// Adapted from: https://dev.to/kjleitz/comment/gb5d
type LengthOf<T extends unknown[]> = T extends { length: infer L } ? L : never;
type Last<T extends unknown[]> = T[LengthOf<Tail<T>>];

// Extracts the final value type after piping
type ResultOf<Fns extends Unary<unknown, unknown>[]> = Extract<
  ReturnType<Last<Fns>>,
  ReturnType<Fns[number]>
>;

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
 * @param value - the value to pipe
 * @param utilities - the functions to process the data
 * @returns the value after consecutive operations
 *
 */
export const pipe = <
  Input,
  Sequence extends Unary<any, any>[],
  Output extends ResultOf<Sequence>
>(
  value: Input,
  ...fns: Sequence
): Output => fns.reduce((y, f) => f(y) as never, value) as never;

/**
 * Converts any valid CSS color to hexadecimal format.
 *
 * ## Usage
 * ```ts
 * hex('rgb(0, 110, 200)');
 * ```
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
