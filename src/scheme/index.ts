import {
  Analogous,
  Angle,
  Complementary,
  CSSColor,
  CustomSchemeOpts,
  Triadic,
  Tetradic,
  Custom,
} from "../color/data/types";
import { hue } from "../color/adjust";

/**
 * Creates a complementary color scheme.
 *
 * ## Usage
 * ```ts
 * complementary('coral');
 * ```
 *
 * @remarks
 * > Be aware that this library constructs palettes through a two stage process.
 * >
 * > Schemes generate the **base hues** which you then can generate your `tints`,
 * > `tones`, and/or `shades` to complete your palette.
 *
 * A complementary color scheme is a high contrast scheme that combines a warm
 * or cool hue with its opposite.
 *
 * Example: `red` and `cyan` are complements
 *
 * @param color - any valid CSS color
 * @returns complementary scheme base hues
 */
export const complementary = (color: CSSColor): Complementary => [
  hue(0, color),
  hue(180, color),
];

/**
 * Creates an analogous color scheme.
 *
 * ## Usage
 * ```ts
 * // low contrast
 * analogous(15, 'dodgerblue');
 *
 * // mid contrast
 * analogous(30, 'firebrick');
 *
 * // high contrast
 * analogous(45, '#deaded');
 * ```
 *
 * @remarks
 * > Be aware that this library constructs palettes through a two stage process.
 * >
 * > Schemes generate the **base hues** which you then can generate your `tints`,
 * > `tones`, and/or `shades` to complete your palette.
 *
 * An analogous color scheme is a low to high contrast warm or cool scheme. As implied by
 * the name, it's created from an origin color and two hues that are
 * analogous (or next to) the origin.
 *
 * Example: `orange`, `red`, and `yellow` are analogous
 *
 * @param arc - the angular distance split from the origin
 * @param color - any valid CSS color
 * @returns analogous scheme base hues
 */
export const analogous = (arc: Angle, color: CSSColor): Analogous => [
  hue(0, color),
  hue(-arc, color),
  hue(arc, color),
];

/**
 * Creates a triadic color scheme.
 *
 * ## Usage
 * ```ts
 * // split complement
 * triad(30, 'yellowgreen');
 *
 * // pure triad
 * triad(60, 'hsl(33, 85%, 70%)');
 *
 * // clash
 * triad(90, '#deaded');
 * ```
 *
 * @remarks
 * > Be aware that this library constructs palettes through a two stage process.
 * >
 * > Schemes generate the **base hues** which you then can generate your `tints`,
 * > `tones`, and/or `shades` to complete your palette.
 *
 * A triadic scheme is a three color scheme that can be balanced to high contrast.
 *
 * It has a few semantic definitions.
 *
 * A split complement is a triad made of an origin color and two colors next to its
 * complement. An example would be `red`, `aquamarine`, and `turquoise`
 *
 * A pure triad is made of three colors evenly positioned around the color wheel.
 * `red`, `lime`, `blue` is an example
 *
 * A clash triad is made of an origin color and the two hues sitting left and
 * right of the diameter. So, a scheme created from a half circle.
 *
 * Example: `red`, approximately `springgreen`, approximately `blueviolet`
 *
 * @param arc - the angular distance split from the complement
 * @param color - any valid CSS color
 * @returns triadic scheme base hues
 */
export const triad = (arc: Angle, color: CSSColor): Triadic => [
  hue(0, color),
  hue(180 + -arc, color),
  hue(180 + arc, color),
];

/**
 * Creates a tetradic color scheme.
 *
 * ## Usage
 * ```ts
 * // tetradic
 * tetrad(30, 'chartreuse');
 *
 * // pure tetrad/square
 * tetrad(90, 'rgb(33, 120, 75)');
 * ```
 *
 * @remarks
 * > Be aware that this library constructs palettes through a two stage process.
 * >
 * > Schemes generate the **base hues** which you then can generate your `tints`,
 * > `tones`, and/or `shades` to complete your palette.
 *
 * A tetradic scheme is a four color scheme made of the origin, its complement,
 * and two hues between them. You may hear a tetrad also referred to as a dual
 * color scheme.
 *
 * A pure tetrad is also called a square color scheme. Four hues evenly spaced
 * around the wheel.
 *
 * A tetrad is an inherently balanced scheme choice
 *
 * @param rotation - rotation from the origin and complement
 * @param color - any valid CSS color
 * @returns tetradic scheme base hues
 */
export const tetrad = (rotation: Angle, color: CSSColor): Tetradic => [
  hue(0, color),
  hue(180, color),
  hue(rotation, color),
  hue(180 + rotation, color),
];

/**
 * Creates a custom color scheme.
 *
 * ## Usage
 * ```ts
 *
 * // pure pentad
 * custom({ hues: 5, arc: 72 }, '#e33a00');
 *
 * // pure hexad
 * custom({ hues: 6, arc: 60 }, 'hsl(320grad, 75%, 50%)');
 *
 * // pure octad
 * custom({hues: 8, arc: 45}, 'rgb(120, 230, 72)')
 * ```
 *
 * @remarks
 * > Be aware that this library constructs palettes through a two stage process.
 * >
 * > Schemes generate the **base hues** which you then can generate your `tints`,
 * > `tones`, and/or `shades` to complete your palette.
 *
 * The basic schemes will get you going, but they can't account for every possible
 * scheme configuration you may want. So as of v4, this library provides a custom
 * scheme generator.
 *
 * It allows you to set how many hues you want; including the origin. Then set a
 * distance from the origin, and optionally rotate the output from the origin.
 *
 * If any of the adjustments overlap with the origin, the duplicate is removed
 *
 * @param options - a configuration object defining desired points (or hues), spread, and rotation from origin
 * @param color - any valid CSS color
 * @returns custom scheme base hues
 */
export const custom = (
  { hues, arc, rotation = 0 }: CustomSchemeOpts,
  color: CSSColor
): Custom => [
  ...new Set([
    hue(0, color),
    ...(rotation
      ? Array(hues - 1)
          .fill(arc)
          .map((value: number, i: number): string =>
            hue(value * i + rotation, color)
          )
      : Array(hues)
          .fill(arc)
          .map((value: number, i: number): string => hue(value * i, color))),
  ]),
];
