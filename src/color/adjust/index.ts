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
 * The hue is locked by modular arithmetic to one full revolution in either direction.
 *
 * If the resulting hue is > 360, it'll be adjusted left to the correct value
 * If the resulting hue is < 0, it'll be adjusted right to the correct value
 *
 * @param n - the value for adjustment
 * @param color - the color to adjust
 * @returns The adjust color or an error if invalid
 *
 */
export const hue = (n: number, color: string): string | Error => {
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
 * // positive values adjust clockwise
 * color.saturation(30, 'red');
 *
 * // negative values adjust counterclockwise
 * color.saturation(-45, 'lime');
 * ```
 *
 * @param n - the value for adjustment
 * @param color - the color to adjust
 * @returns The adjust color or an error if invalid
 *
 */
export const saturation = (n: number, color: string): string | Error => {
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

export const lightness = (n: number, color: string): string | Error => {
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

export const alpha = (n: number, color: string): string | Error => {
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

  return preserveFormat(target, color);
};
