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
 * - {@link negate}
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
 * @typeparam Degrees - a number type for hue and scheme functions
 * @typeparam Percent - a number type for mixing, saturation, lightness and variants
 * @typeparam Limit - a number type for setting max output on variants
 * @typeparam Hue - a number type for the hue modification function
 * @typeparam Saturation - a number type for the satuation modification function
 * @typeparam Lightness - a number type for the lightness modification function
 */
export type Degrees = number;
export type Percent = number;
export type Limit = number;
export type Hue = number;
export type Saturation = number;
export type Lightness = number;
