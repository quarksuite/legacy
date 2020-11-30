import {
  Analogous,
  Angle,
  Complementary,
  CSSColor,
  CustomSchemeOpts,
  Triadic,
  Tetradic,
  Custom,
} from "../color/types";
import { hue } from "../color/adjust";

/**
 * Creates a complementary color scheme from any valid CSS color.
 *
 * ## Usage
 * ```ts
 * complementary('coral');
 * ```
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
 *
 *  // shifted
 *  custom({ hues: 4, arc: 25, offset: 15 }, "royalblue")
 * ```
 *
 * @param options - a configuration object defining desired hues, spread, and offset
 * @param color - any valid CSS color
 * @returns custom scheme base hues
 */
export const custom = (
  { hues, arc, offset = 0 }: CustomSchemeOpts,
  color: CSSColor
): Custom => [
  ...new Set([
    hue(0, color),
    ...(offset
      ? Array(hues - 1)
          .fill(arc)
          .map((value: number, i: number): string =>
            hue(value * i + offset, color)
          )
      : Array(hues)
          .fill(arc)
          .map((value: number, i: number): string => hue(value * i, color))),
  ]),
];
