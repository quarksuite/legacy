import {
  Channel,
  ColorFragment,
  CSSColor,
  HSLData,
  Hue,
  Lightness,
  RawColor,
  Saturation,
} from "../data/types";
import { compose } from "../../fn";
import { extractNumber, matchValues } from "../formatting";
import {
  percentAsFraction,
  radToDeg,
  gradToDeg,
  fractionOfCircle,
  cwHueCorrection,
  ccwHueCorrection,
} from "../math";
import { toHex as hex } from "./rgb";

// https://www.rapidtables.com/convert/color/hsl-to-rgb.html
const calcChannels = (
  C: number,
  X: number,
  H: number
): Map<[Channel, Channel, Channel], boolean> =>
  new Map([
    [[C, X, 0], 0 <= H && H < 60],
    [[X, C, 0], 60 <= H && H < 120],
    [[0, C, X], 120 <= H && H < 180],
    [[0, X, C], 180 <= H && H < 240],
    [[X, 0, C], 240 <= H && H < 300],
    [[C, 0, X], 300 <= H && H < 360],
  ]);

export const extractHSL = (hsl: CSSColor): HSLData => {
  const [h, s, l, a] = matchValues(hsl);

  const [H] = [h].map(
    (value: ColorFragment): Hue => {
      // if gradian, radian, or turn, nothing else happens
      const n = extractNumber(value);
      const isNegative = (n: Hue): boolean => Math.sign(n) === -1;
      let hue;

      // Set hue based on unit
      if (value.endsWith("grad")) {
        hue = isNegative(n) ? gradToDeg(n + 400) : gradToDeg(n);
      } else if (value.endsWith("rad")) {
        hue = isNegative(n) ? radToDeg(n + 6.28319) : radToDeg(n);
      } else if (value.endsWith("turn")) {
        hue = isNegative(n) ? fractionOfCircle(n + 1) : fractionOfCircle(n);
      } else {
        hue = n;
      }

      // hue correction
      let degrees;
      if (hue >= 360) {
        degrees = cwHueCorrection(hue);
      } else if (isNegative(hue)) {
        degrees = compose(cwHueCorrection, ccwHueCorrection)(hue);
      } else {
        degrees = hue;
      }

      return degrees;
    }
  );

  const [S, L] = [s, l].map((value: ColorFragment): Saturation | Lightness => {
    const n = extractNumber(value);
    return percentAsFraction(n);
  });

  const A =
    a != null
      ? extractNumber(a) > 1
        ? percentAsFraction(extractNumber(a))
        : extractNumber(a)
      : 1;

  return A === 1 ? [H, S, L] : [H, S, L, A];
};

export const calcRGB = (h: Hue, s: Saturation, l: Lightness): HSLData => {
  // Calculate chroma
  const C = (1 - Math.abs(2 * l - 1)) * s;
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - C / 2;

  // Evaluate channels
  const [R, G, B] = Array.from(calcChannels(C, X, h))
    .filter(([, condition]: [Channel[], boolean]): boolean => condition)
    .flatMap(([evaluation]: [Channel[], boolean]): Channel[] => evaluation)
    .map((channel: Channel): Channel => Math.round((channel + m) * 255));

  return [R, G, B];
};

export const toRGB = (hsl: CSSColor): RawColor => {
  const [h, s, l, a] = extractHSL(hsl);

  const [R, G, B] = calcRGB(h, s, l);
  const A = a != null ? a : 1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
};

export const toHex = compose(toRGB, hex);
