import { Color, Variant, Percent, Limit } from '../types';
import { createBlend } from '../utils';
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
