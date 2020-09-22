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

const calculateMix = (
  original: number[],
  target: number[],
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

export const mix = (
  amount: number,
  target: string,
  color: string
): string | Error => {
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
  );
};
