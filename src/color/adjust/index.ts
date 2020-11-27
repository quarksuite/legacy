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
import { AdjustmentValue, Color, CSSColor } from "../types";

/**
 * Adjust the hue of any valid CSS color.
 *
 * ## Usage
 * ```ts
 * // positive values adjust clockwise
 * hue(30, 'red');
 *
 * // negative values adjust counterclockwise
 * hue(-45, 'lime');
 *
 * ```
 *
 * @remarks
 * The adjusted color matches the input format. No need to explicitly convert.
 *
 * @param n - the value for adjustment
 * @param color - the color to adjust
 * @returns The adjusted color or an error if invalid
 *
 */
export const hue = (n: AdjustmentValue, color: CSSColor): Color => {
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
 * Adjust the saturation of any valid CSS color.
 *
 * ## Usage
 * ```ts
 * // positive values increase
 * saturation(30, 'red');
 *
 * // negative values decrease
 * saturation(-45, 'lime');
 * ```
 *
 * @remarks
 * The adjusted color matches the input format. No need to explicitly convert.
 *
 * The output range is locked at minimum or maximum saturation.
 *
 * @param n - the value for adjustment
 * @param color - the color to adjust
 * @returns The adjusted color or an error if invalid
 *
 */
export const saturation = (n: AdjustmentValue, color: CSSColor): Color => {
  // Reject invalid color
  validateColor("Cannot adjust saturation of an invalid color", color);

  const [h, s, l, a] = compose(toHSL, extractHSL)(color);

  const H = h;
  const S = `${normalization(0, 100, percentAsFloat(s) + n)}%`;
  const L = `${percentAsFloat(l)}%`;
  const A = a != null ? a : 1;

  const target =
    A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`;

  return preserveFormat(target, color);
};

/**
 * Adjust the lightness of any valid CSS color.
 *
 * ## Usage
 * ```ts
 * // positive values increase
 * lightness(30, 'red');
 *
 * // negative values decrease
 * lightness(-45, 'lime');
 * ```
 *
 * @remarks
 * The adjusted color matches the input format. No need to explicitly convert.
 *
 * The output range is bound at minimum or maximum lightness.
 *
 * @param n - the value for adjustment
 * @param color - the color to adjust
 * @returns The adjusted color or an error if invalid
 *
 */
export const lightness = (n: AdjustmentValue, color: CSSColor): Color => {
  // Reject invalid color
  validateColor("Cannot adjust lightness of an invalid color", color);

  const [h, s, l, a] = compose(toHSL, extractHSL)(color);

  const H = h;
  const S = `${percentAsFloat(s)}%`;
  const L = `${normalization(0, 100, percentAsFloat(l) + n)}%`;
  const A = a != null ? a : 1;

  const target =
    A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`;

  return preserveFormat(target, color);
};

/**
 * Adjust the transparency of any valid CSS color.
 *
 * ## Usage
 * ```ts
 * // positive values increase
 * alpha(30, 'red');
 *
 * // negative values decrease
 * alpha(-45, 'lime');
 * ```
 *
 * @remarks
 * The adjusted color matches the input format. No need to explicitly convert.
 *
 * The output range is bound at fully transparent or fully solid.
 *
 * @param n - the value for adjustment
 * @param color - the color to adjust
 * @returns The adjust color or an error if invalid
 *
 */
export const alpha = (n: AdjustmentValue, color: CSSColor): Color => {
  // Reject invalid color
  validateColor("Cannot adjust transparency of an invalid color", color);

  const [h, s, l, a] = compose(toHSL, extractHSL)(color);

  const H = h;
  const [S, L] = [s, l].map((value) => `${percentAsFloat(value)}%`);
  const A = percentAsFraction(
    normalization(0, 100, percentAsFloat(a != null ? a : 1) + n)
  );

  const target =
    A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`;

  return preserveFormat(target, color);
};
