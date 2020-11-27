import { toHex, preserveFormat } from "../color/convert/index";
import {
  Color,
  Contrast,
  CSSColor,
  NumOfVariants,
  Tints,
  Tones,
  Shades,
  Variants,
} from "../color/types";
import { mix } from "../color/mix";

const generate = (
  limit: number,
  contrast: number,
  target: CSSColor,
  color: CSSColor
): Variants =>
  Array.from(Array(limit).fill(color)).map(
    (base: string, index: number): Color => {
      const amount = contrast - (contrast / limit) * index;
      return mix(amount, target, base);
    }
  );

/**
 * Generates tints from any valid CSS color.
 *
 * ## Usage
 * ```ts
 * tints(4, 98, 'royalblue');
 * ```
 *
 * @param count - the number of tints you want
 * @param contrast - the percent of contrast between tints
 * @param color - any valid CSS color
 * @returns an array of tints up the lightest
 */
export const tints = (
  count: NumOfVariants,
  contrast: Contrast,
  color: CSSColor
): Tints =>
  generate(count, contrast, "white", color)
    .map((tint) => toHex(tint))
    .sort()
    .map((tint) => preserveFormat(tint, color));

/**
 * Generates tones from any valid CSS color.
 *
 * ## Usage
 * ```ts
 * tones(4, 98, 'royalblue');
 * ```
 *
 * @param count - the number of tones you want
 * @param contrast - the percent of contrast between tones
 * @param color - any valid CSS color
 * @returns an array of tones up the most muted
 */
export const tones = (
  count: NumOfVariants,
  contrast: Contrast,
  color: CSSColor
): Tones => generate(count, contrast, "gray", color).reverse();

/**
 * Generates shades from any valid CSS color.
 *
 * ## Usage
 * ```ts
 * shades(4, 98, 'royalblue');
 * ```
 *
 * @param count - the number of shades you want
 * @param contrast - the percent of contrast between shades
 * @param color - any valid CSS color
 * @returns an array of shades up the darkest
 */
export const shades = (
  count: NumOfVariants,
  contrast: Contrast,
  color: CSSColor
): Shades =>
  generate(count, contrast, "black", color)
    .map((shade) => toHex(shade))
    .sort((a, b) => b.localeCompare(a))
    .map((shade) => preserveFormat(shade, color));
