/* eslint-disable @typescript-eslint/no-explicit-any */

import { Unary, Variadic } from "../fn";
import { clrs as a11y } from "../color/data/clrs";
import { Color, CSSColor, Clrs } from "../color/types";
import { validateColor } from "../color/validate";
import { toHex, toRGB, toHSL, preserveFormat } from "../color/convert";

/**
 * A higher order function that accepts a utility and allows you to bind
 * some initial arguments.
 *
 * ## Usage
 * ```ts
 * const mixWithGreen = bind(mix, 32, 'lime');
 * mixWithGreen('skyblue');
 *
 * // chaining allows reuse of multiple modifiers
 * const scale = ms(5, 2, 1);
 * const significantDigits = bind(units, 3);
 * const rems = bind(significantDigits, "rem");
 * rems(scale);
 * ```
 *
 * @param utility - the utility to set
 * @param initial - initial arguments to apply
 * @param pending - remaining arguments
 * @returns a function with the remaining args as parameters
 *
 */
export const bind = <T extends unknown[], U extends unknown[], R>(
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

// Get the type and return of piped fns through inference
type Parse<Fn extends (x: any) => any> = Fn extends (x: infer P) => infer R
  ? [...Parameters<Unary<P, R>>, ReturnType<Unary<P, R>>]
  : never;

// Read the types captured
type ReadTypes<Fn extends (x: any) => any, Index extends number> = Parse<
  Fn
>[Index];

type Result<Fns extends ((x: any) => any)[]> = Extract<
  ReadTypes<Last<Fns>, 1>,
  ReadTypes<Fns[number], 1>
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
  Input extends unknown,
  Sequence extends ((x: any) => any)[],
  Output extends Result<Sequence>
>(
  value: Input,
  ...fns: Sequence
): Output => {
  // Trusting that this output is always correct. Submit an issue if you notice
  // any bugs. Thanks

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return fns.reduce((y, f) => f(y), value) as Output;
};

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
