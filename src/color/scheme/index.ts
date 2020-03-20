import { Color, Scheme, Degrees } from '../types';
import { format } from '../convert';
import { spin } from '../utils';

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
  spin(color, 180)
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
  spin(spin(color, 180), splitComplementBy, true),
  spin(spin(color, 180), splitComplementBy)
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
 * @param spreadBy? - degrees to spread from color and its complement
 * @returns an array of `Color` as [color, complement, rightOfColor, rightOfComplement]
 */
export const tetrad = (color: Color, spreadBy: Degrees = 90): Scheme => [
  format(color),
  spin(color, 180),
  spin(color, spreadBy),
  spin(spin(color, 180), spreadBy)
];
