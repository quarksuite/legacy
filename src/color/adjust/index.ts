import { compose } from "../../fn";
import {
  cwHueCorrection,
  ccwHueCorrection,
  percentAsFraction,
  percentAsFloat,
  normalization,
} from "../math";
import { validateColor } from "../validate";
import { extractHSL } from "../convert/hsl";
import { toHSL, preserveFormat } from "../convert";
import { AdjustmentValue, Color } from "../data/types";

/**
 * Allows hue adjustment of any color.
 *
 * ## Usage
 * ```ts
 * // positive values adjust clockwise
 * color.hue(30, 'red');
 *
 * // negative values adjust counterclockwise
 * color.hue(-45, 'lime');
 *
 * // aliased
 * color.h(90, 'blue');
 * ```
 *
 * @remarks
 * The output format of an adjustment matches its input. No need to explicitly convert.
 *
 * The hue is bound by modular arithmetic to one full revolution in either direction.
 *
 * The hue adjustment is **relative** to the input color. So a value of `0` or one
 * equal to a full revolution will return the input color
 *
 * If the resulting hue is > 360, it'll be adjusted left to the correct value
 * If the resulting hue is negative, it'll be adjusted right to the correct value
 *
 * @param n - the value for adjustment
 * @param color - the color to adjust
 * @returns The adjust color or an error if invalid
 *
 */
export const hue = (n: AdjustmentValue, color: Color): Color | Error => {
  // Reject invalid color
  validateColor("Cannot adjust hue of an invalid color", color);

  const [h, s, l, a] = compose(toHSL, extractHSL)(color);
  const hue = h + n;

  // secondary hue correction
  let H;
  if (hue > 360) {
    H = cwHueCorrection(hue);
  } else if (Math.sign(hue) === -1) {
    H = compose(cwHueCorrection, ccwHueCorrection)(hue);
  } else {
    H = hue;
  }

  const [S, L] = [s, l].map((value) => `${percentAsFloat(value)}%`);
  const A = a != null ? a : 1;

  const target =
    A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`;

  return preserveFormat(target, color);
};

/**
 * Allows saturation adjustment of any color.
 *
 * ## Usage
 * ```ts
 * // positive values increase
 * color.saturation(30, 'red');
 *
 * // negative values decrease
 * color.saturation(-45, 'lime');
 * ```
 *
 * @remarks
 * The output format of an adjustment matches its input. No need to explicitly convert.
 *
 * The saturation is bound between minimum and maximum values by linear normalization.
 *
 * This means any adjustment that would result in a negative value will return the
 * minimum of `0` and any that exceeds the maximum will instead return `100`
 *
 * @param n - the value for adjustment
 * @param color - the color to adjust
 * @returns The adjust color or an error if invalid
 *
 */
export const saturation = (n: AdjustmentValue, color: Color): Color | Error => {
  // Reject invalid color
  validateColor("Cannot adjust saturation of an invalid color", color);

  const [h, s, l, a] = compose(toHSL, extractHSL)(color);

  const H = h;
  const S = `${normalization(0, 100, percentAsFloat(s) + n)}%`;
  const L = `${percentAsFloat(l)}%`;
  const A = a != null ? a : 1;

  const target =
    A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`;

  return preserveFormat(target, color) as Color;
};

/**
 * Allows lightness adjustment of any color.
 *
 * ## Usage
 * ```ts
 * // positive values increase
 * color.lightness(30, 'red');
 *
 * // negative values decrease
 * color.lightness(-45, 'lime');
 * ```
 *
 * @remarks
 * The output format of an adjustment matches its input. No need to explicitly convert.
 *
 * The lightness is bound between minimum and maximum values by linear normalization.
 *
 * This means any adjustment that would result in a negative value will return the
 * minimum of `0` and any that exceeds the maximum will instead return `100`
 *
 * @param n - the value for adjustment
 * @param color - the color to adjust
 * @returns The adjust color or an error if invalid
 *
 */
export const lightness = (n: AdjustmentValue, color: Color): Color | Error => {
  // Reject invalid color
  validateColor("Cannot adjust lightness of an invalid color", color);

  const [h, s, l, a] = compose(toHSL, extractHSL)(color);

  const H = h;
  const S = `${percentAsFloat(s)}%`;
  const L = `${normalization(0, 100, percentAsFloat(l) + n)}%`;
  const A = a != null ? a : 1;

  const target =
    A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`;

  return preserveFormat(target, color) as Color;
};

/**
 * Allows alpha transparency adjustment of any color.
 *
 * ## Usage
 * ```ts
 * // positive values increase
 * color.saturation(30, 'red');
 *
 * // negative values decrease
 * color.saturation(-45, 'lime');
 * ```
 *
 * @remarks
 * The lightness is bound between minimum and maximum values by linear normalization.
 *
 * This means any adjustment that would result in a negative value will return the
 * minimum of `0` and any that exceeds the maximum will instead return `100`
 *
 * Following the spec, an alpha adjustment `>= 100` means a solid color. So the alpha
 * is removed.
 *
 * @param n - the value for adjustment
 * @param color - the color to adjust
 * @returns The adjust color or an error if invalid
 *
 */
export const alpha = (n: AdjustmentValue, color: Color): Color | Error => {
  // Reject invalid color
  validateColor("Cannot adjust transparency of an invalid color", color);

  const [h, s, l, a] = compose(toHSL, extractHSL)(color);

  const H = h;
  const [S, L] = [s, l].map((value) => `${percentAsFloat(value)}%`);
  const A = percentAsFraction(
    normalization(0, 100, a != null ? percentAsFloat(a) + n : 100 + n)
  );

  const target =
    A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`;

  return preserveFormat(target, color) as Color;
};
