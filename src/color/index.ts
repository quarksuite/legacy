import {
  Color,
  Hue,
  Saturation,
  Lightness,
  Degrees,
  Percent,
  CSSFormat
} from './types';
import { modify, spin, mixColors } from './utils';
import { format } from './convert';

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
 * Converts a color to another CSS format.
 *
 * @remarks
 * This function outputs a {@link Color}.
 *
 * ```ts
 * // default converts to RGB
 * color.convert('#348ec9');
 *
 * // convert to HSL
 * color.convert('#348ec9', 'hsl');
 * ```
 *
 * @param color - Your input color
 * @param toFormat? - the output format
 * @returns Input color converted to new format
 */
export const convert = (color: Color, toFormat: CSSFormat = 'rgb'): Color =>
  format(color, toFormat);
