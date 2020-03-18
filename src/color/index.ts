import { modify, spin, createBlend, mixColors } from './utils';
import { format } from './convert';

/**
 * As of v2.3.x, Quarksuite's color functions are organized by domain.
 * They follow a logical pipeline as follows:
 *
 * `Color -> Scheme | Variant -> Palette`
 *
 * Each domain is exported as an object containing its own functions
 * - {@link color}
 * - {@link scheme}
 * - {@link variant}
 * - {@link palette}
 *
 * It's also important to know that the color functions uniformly output RGB
 */

/**
 * A `Color` is a standalone color.
 *
 * @remarks
 * This type is your starting point; your primitive value. In the
 * context of this library, you can't reduce a `Color` any further.
 *
 * The functions that output a `Color` are:
 * - {@link hue}
 * - {@link saturation}
 * - {@link lightness}
 * - {@link mix}
 * - {@link complement}
 * - {@link neutralize}
 *
 * @typeparam Color - A type representing a CSS color
 */
export type Color = string;

/**
 * A `Scheme` represents a array of {@link Color}
 *
 * @remarks
 * This is the next step if you're making a multi-color {@link Palette}.
 * Otherwise, you would create your {@link Variant} next.
 *
 * The functions that output a `Scheme` are:
 * - {@link complementary}
 * - {@link analogous}
 * - {@link triad}
 * - {@link tetrad}
 *
 * @typeparam Scheme - An array of `Color` containing a created scheme
 */
export type Scheme = Color[];

/**
 * A `Variant` represents an array of {@link Color}
 *
 * @remarks
 * This is your next step. In a complete palette, the `Variant` functions create
 * your tints, tones, shades and/or gradients as well as other custom blends.
 *
 * Functions that output a `Variant` are:
 * - {@link create}
 * - {@link tints}
 * - {@link tones}
 * - {@link shades}
 *
 * @typeparam Variant - An array of `Color` containing variants
 */
export type Variant = Color[];

/**
 * A collection of contextual types used by all fuctions
 *
 * @remarks
 * As of v2.3.x Quarksuite also includes contextual types for all color
 * functions. This is to aid in both the comprehension and structure of the
 * program. Especially for those of you using TypeScript.
 *
 * @typeparam Format - valid CSS color formats for conversion functions
 * @typeparam Degrees - a number type for hue and scheme functions
 * @typeparam Percent - a number type for mixing, saturation, lightness and variants
 * @typeparam Limit - a number type for setting max output on variants
 * @typeparam Hue - a number type for the hue modification function
 * @typeparam Saturation - a number type for the satuation modification function
 * @typeparam Lightness - a number type for the lightness modification function
 */
export type Format = 'hex' | 'rgb' | 'hsl' | 'w3c';
export type Degrees = number;
export type Percent = number;
export type Limit = number;
export type Hue = number;
export type Saturation = number;
export type Lightness = number;

/**
 * Adjusts the hue of a color with a modifier.
 *
 * @remarks
 * This function outputs a {@link Color}.
 *
 * If your adjustment is invalid, the hue will default to 0 or 360 (red)
 *
 * ```ts
 * // Double the value of current hue, then nudge 25 degrees left
 * color.hue('#348ec9', (current: number) => (current * 2) - 25);
 * ```
 *
 * @param color - The color to transform
 * @param withModifier - Your modifier function to adjust the current value
 * @returns The input color adjusted by your modifier
 */
export const hue = (
  color: Color,
  withModifier: (current: Hue) => Degrees
): Color => modify(color, 'hue', withModifier);

/**
 * Adjusts the saturation of a color with a modifier.
 *
 * @remarks
 * This function outputs a {@link Color}.
 *
 * If your adjustment results in a value below 0, it will return gray.
 * If your adjustment results a value above 100%, it will return a
 * fully saturated color
 *
 * ```ts
 * // Increase saturation by 30%
 * color.saturation('#348ec9', (current: number) => current + 30);
 * ```
 *
 * @param color - The color to transform
 * @param withModifier - Your modifier function to adjust the current value
 * @returns The input color adjusted by your modifier
 */
export const saturation = (
  color: Color,
  withModifier: (current: Saturation) => Percent
): Color => modify(color, 'saturation', withModifier);

/**
 * Adjusts the lightness of a color with a modifier.
 *
 * @remarks
 * This function outputs a {@link Color}
 *
 * If your adjustment results in a value `<= 0`, you'll get black.
 * If your adjustment results in a value `>= 100`, you'll get white.
 *
 * ```ts
 * // Darken by 10%
 * color.lightness('#348ec9', (current: number) => current - 10);
 * ```
 *
 * @param color - The color to transform
 * @param withModifier - Your modifier function to adjust the current value
 * @returns The input color adjusted by your modifier
 */
export const lightness = (
  color: Color,
  withModifier: (current: Lightness) => Percent
): Color => modify(color, 'lightness', withModifier);

/**
 * Mixes a color with a target color.
 *
 * @remarks
 * This function outputs a {@link Color}.
 *
 * ```ts
 * // Mixes a color evenly
 * color.mix('#348ec9', 'coral')
 *
 * // Mixes more with the target
 * color.mix('#348ec9', 'coral', 72);
 *
 * // Mixes less with the target
 * color.mix('#348ec9', 'coral', 30);
 * ```
 *
 * *The way I usually use color mixing is to balance complex palettes.
 * If you mix your accents judiciously with your main color, it's a good way
 * to reduce the tension pure hues might otherwise cause. Another good way to
 * mix colors is for adding warmth or coolness to colors that need it.*
 *
 * @param color - Your input color
 * @param withTarget - your blend target
 * @param byAmount? - how much to blend with target
 * @returns The result of mixing color with your target
 */
export const mix = (
  color: Color,
  withTarget: Color,
  byAmount: Percent = 50
): Color => mixColors(color, withTarget, byAmount);

/**
 * Fetches the complement of a color.
 *
 * @remarks
 * This function outputs a {@link Color}.
 *
 *  ```ts
 *  color.complement('#348ec9');
 *  ```
 *
 *  *The complement is the color opposite your input color.
 *  If your input color is red, then your complement would be cyan*
 *
 *  @param color - Your input color
 *  @returns The complement of your input color
 */
export const complement = (color: Color): Color => spin(color, 180);

/**
 * Negates a color with its complement.
 *
 * @remarks
 * This function outputs a {@link Color}.
 *
 * ```ts
 * color.negate('#348ec9');
 * ```
 *
 * *Negation is a good base for a neutral palette.  An advantage of
 * this type of palette is the contrast it creates with bolder hues.*
 *
 * @param color - Your input color
 * @returns The negation of your input color
 */
export const negate = (color: Color): Color =>
  mixColors(color, complement(color));

/**
 * Creates a complementary scheme from input `Color`.
 *
 * @remarks
 * This function outputs a {@link Scheme}.
 *
 * ```ts
 * scheme.complementary('#348ec9')
 * ```
 *
 * *A complementary scheme is a very high contrast scheme type. Recommended
 * you choose one of the hues as your main color and use the other sparingly
 * as an accent color. Unless a bold clash of opposites is in fact your
 * design goal.*
 *
 * @param color - Your scheme base color
 * @returns A complementary color scheme as an array
 */
export const complementary = (color: Color): Scheme => [
  format(color),
  complement(color)
];

/**
 * Creates an analogous scheme from input `Color`
 *
 * @remarks
 * This function outputs a {@link Scheme};
 *
 * ```ts
 * // spread is 30 by default
 * scheme.analogous('#348ec9')
 *
 * // low contrast analogous
 * scheme.analogous('#348ec9', 15);
 *
 * // high contrast analogous
 * scheme.analogous('#348ec9', 45);
 * ```
 *
 * *Analogous schemes are a good bet if your color palette requires more harmony
 * than tension. Using the colors spread on either side of your main color makes
 * them less troublesome to coordinate in a palette.
 *
 * Be aware that setting the spread beyond 45 degrees forfeits that perk.*
 *
 * @param color - your input color
 * @param spreadBy? - degrees to spread adjacent colors from origin
 * @returns An analogous scheme as array `[leftOfColor, color, rightOfColor]`
 */
export const analogous = (color: Color, spreadBy: Degrees = 30): Scheme => [
  spin(color, spreadBy, true),
  format(color),
  spin(color, spreadBy)
];

/**
 * Creates a triad from input `Color`.
 *
 * @remarks
 * This function outputs a {@link Scheme}.
 *
 * ```ts
 * // defaults to a perfect triad (complement split by 60 degrees)
 * scheme.triad('#348ec9');
 *
 * // You can also adjust the split
 * scheme.triad('#348ec9', 32);
 * ```
 *
 * *A perfect triad is spread evenly around the color wheel. It's the most
 * balanced scheme type. You can also create a little a discord in a triad
 * by splitting from your color's complement. Balance is delicate and can be
 * quickly upset in a tri-color scheme, so it does require some thought.*
 *
 * @param color - your input color
 * @param splitComplementBy? - degrees to split from the complement
 * @returns A triad as an array `[color, leftOfComplement, rightOfComplement]`
 *
 */
export const triad = (
  color: Color,
  splitComplementBy: Degrees = 60
): Scheme => [
  format(color),
  spin(complement(color), splitComplementBy, true),
  spin(complement(color), splitComplementBy)
];

/**
 * Creates a tetrad from input `Color`.
 *
 * @remarks
 * This function outputs a {@link Scheme}.
 *
 * ```ts
 * // Perfect tetrad by default (90 degree spread from origin and complement)
 * scheme.tetrad('#348c9')
 *
 * // Allows you to reduce the spread
 * scheme.tetrad('#348ec9', 45)
 * ```
 *
 * *Tetrads can become busy unless you balance them by showcasing one of the colors,
 * and letting the others be backup. Another good way to balance tetrads is splashing
 * them around a neutral palette. They'll pop out more from the backdrop.*
 *
 * @param color - your input color
 * @param spreadBy? - degrees to spread from color and its complement `[color, complement, rightOfColor, rightOfComplement]`
 */
export const tetrad = (color: Color, spreadBy: Degrees = 90): Scheme => [
  format(color),
  complement(color),
  spin(color, spreadBy),
  spin(complement(color), spreadBy)
];

/**
 * Creates a blend from an input `Color` and a target `Color`.
 *
 * @remarks
 * This function outputs a {@link Variant}.
 *
 * ```ts
 * // default contrast = 97 default range = 3
 * variant.create('#348ec9', coral);
 *
 * // can change the contrast
 * variant.create('#348ec9', coral, 72);
 *
 * // can change the range
 * variant.create('#348ec9', coral, 72, 5);
 * ```
 *
 * @param color - your input color
 * @param fromTarget - target color to blend
 * @param withContrast? - contrast between variant values
 * @param upToRange? - variant output limit
 * @returns A range of blends from the input color and target with adjustments
 */
export const create = (
  color: Color,
  fromTarget: Color,
  withContrast: Percent = 97,
  upToRange: Limit = 3
): Variant => createBlend(color, fromTarget, withContrast, upToRange);

/**
 * Creates tints from input `Color`.
 *
 * @remarks
 * This function outputs a {@link Variant}.
 *
 * ```ts
 * // default contrast = 97 default range = 3
 * variant.tints('#348ec9');
 *
 * // can change the contrast
 * variant.tints('#348ec9', 80);
 *
 * // can change the range
 * variant.tints('#348ec9', 90, 5);
 * ```
 * @param color - your input color
 * @param withContrast? - contrast between variant values
 * @param upToRange? - variant output limit
 * @returns A range of tints from the input color with adjustments
 */
export const tints = (
  color: Color,
  withContrast: Percent = 97,
  upToRange: Limit = 3
): Variant => createBlend(color, '#fff', withContrast, upToRange);

/**
 * Creates tones from input `Color`.
 *
 * @remarks
 * This function outputs a {@link Variant}.
 *
 * ```ts
 * // default contrast = 97 default range = 3
 * variant.tones('#348ec9');
 *
 * // can change the contrast
 * variant.tones('#348ec9', 80);
 *
 * // can change the range
 * variant.tones('#348ec9', 90, 5);
 * ```
 * @param color - your input color
 * @param withContrast? - contrast between variant values
 * @param upToRange? - variant output limit
 * @returns A range of tones from the input color with adjustments
 */
export const tones = (
  color: Color,
  withContrast: Percent = 97,
  upToRange: Limit = 3
): Variant => createBlend(color, '#aaa', withContrast, upToRange);

/**
 * Creates shades from input `Color`.
 *
 * @remarks
 * This function outputs a {@link Variant}.
 *
 * ```ts
 * // default contrast = 97 default range = 3
 * variant.shades('#348ec9');
 *
 * // can change the contrast
 * variant.shades('#348ec9', 80);
 *
 * // can change the range
 * variant.shades('#348ec9', 90, 5);
 * ```
 * @param color - your input color
 * @param withContrast? - contrast between variant values
 * @param upToRange? - variant output limit
 * @returns A range of shades from the input color with adjustments
 */
export const shades = (
  color: Color,
  withContrast: Percent = 97,
  upToRange: Limit = 3
): Variant => createBlend(color, '#111', withContrast, upToRange);
