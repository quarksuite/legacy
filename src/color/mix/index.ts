import { compose } from "../../fn";
import {
  calculateDifference,
  normalization,
  percentAsFraction,
  percentAsFloat,
} from "../math";
import { validateColor } from "../validate";
import { toRGB, preserveFormat } from "../convert";
import { extractRGB } from "../convert/rgb";
import { BlendValue, Color, CSSColor, RGBData } from "../data/types";

const calculateMix = (
  original: RGBData,
  target: RGBData,
  amount: number
): number[] => {
  // Isolate the channel values
  const [OR, OG, OB] = original;
  const [TR, TG, TB] = target;

  // Store each corresponding channel with its counterpart.
  const RGB_STORE = [
    [OR, TR],
    [OG, TG],
    [OB, TB],
  ];

  // Calculate new RGB
  return RGB_STORE.map(([OC, TC]): number =>
    Math.round(calculateDifference(OC, TC, amount))
  );
};

/**
 * A function that allows you to mix colors.
 *
 * ## Usage
 * ```ts
 * // evenly
 * color.mix(50, 'red', 'blue');
 *
 * // less
 * color.mix(34, 'green', 'blue');
 *
 * // more
 * color.mix(75, 'blue', 'white');
 * ```
 *
 * @remarks
 * The amount should be passed in as an integer or float.
 *
 * `79` rather than '0.79'
 *
 * @param amount - the percentage to blend with target
 * @param target - the color you want to blend
 * @param color - the input color
 */
export const mix = (
  amount: BlendValue,
  target: CSSColor,
  color: CSSColor
): Color => {
  // If either color is invalid, reject
  validateColor("Cannot mix invalid target with color", target);
  validateColor("Input color is invalid and cannot be mixed", color);

  const pickRGB = compose(toRGB, extractRGB);
  const p = percentAsFraction(amount);

  // Extract RGB[A]
  const [OR, OG, OB, OA] = pickRGB(color);
  const [TR, TG, TB, TA] = pickRGB(target);

  // Mix the colors
  const [R, G, B] = calculateMix([OR, OG, OB], [TR, TG, TB], p);

  // If one or both colors has transparency add the values together
  const A1 = OA != null ? percentAsFloat(OA) : 100;
  const A2 = TA != null ? percentAsFloat(TA) : 100;

  const A = percentAsFraction(
    normalization(0, 100, calculateDifference(A1, A2, p))
  );

  return preserveFormat(
    A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`,
    color
  ) as Color;
};
