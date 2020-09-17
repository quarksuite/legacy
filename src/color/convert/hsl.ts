import { compose } from "@architecture/toolbox";
import { extractNumber, matchValues } from "@color/formatting";
import {
  percentAsFraction,
  radToDeg,
  gradToDeg,
  fractionToDeg,
  cwHueCorrection,
  ccwHueCorrection
} from "@color/math";
import { toHex as hex } from "@color/convert/rgb";

// https://www.rapidtables.com/convert/color/hsl-to-rgb.html
const calcChannels = (
  C: number,
  X: number,
  H: number
): Map<[number, number, number], boolean> =>
  new Map([
    [[C, X, 0], 0 <= H && H < 60],
    [[X, C, 0], 60 <= H && H < 120],
    [[0, C, X], 120 <= H && H < 180],
    [[0, X, C], 180 <= H && H < 240],
    [[X, 0, C], 240 <= H && H < 300],
    [[C, 0, X], 300 <= H && H < 360]
  ]);

export const extractHSL = (hsl: string): number[] => {
  const values = matchValues(hsl);

  const [H] = values.map((value: string): number => {
    // if gradian, radian, or turn, nothing else happens
    const n = extractNumber(value);
    const isNegative = (n: number): boolean => Math.sign(n) === -1;
    let hue;

    // Set hue based on unit
    if (value.endsWith("grad")) {
      hue = isNegative(n) ? gradToDeg(n + 400) : gradToDeg(n);
    } else if (value.endsWith("rad")) {
      hue = isNegative(n) ? radToDeg(n + 6.28319) : radToDeg(n);
    } else if (value.endsWith("turn")) {
      hue = isNegative(n) ? fractionToDeg(n + 1) : fractionToDeg(n);
    } else {
      hue = n;
    }

    // hue correction
    let degrees;
    if (hue >= 360) {
      degrees = cwHueCorrection(hue);
    } else if (isNegative(hue)) {
      degrees = ccwHueCorrection(hue);
    } else {
      degrees = hue;
    }

    return degrees;
  });

  const [, S, L] = values.map((value: string): number => {
    const n = extractNumber(value);
    return percentAsFraction(n);
  });

  const [, , , A] = values;

  return A ? [H, S, L, extractNumber(A)] : [H, S, L];
};

export const calcRGB = (h: number, s: number, l: number): number[] => {
  // Calculate chroma
  const C = (1 - Math.abs(2 * l - 1)) * s;
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - C / 2;

  // Evaluate channels
  const [R, G, B] = Array.from(calcChannels(C, X, h))
    .filter(([, condition]: [number[], boolean]): boolean => condition)
    .flatMap(([evaluation]: [number[], boolean]): number[] => evaluation)
    .map((channel: number): number => Math.round((channel + m) * 255));

  return [R, G, B];
};

export const toRGB = (hsl: string): string => {
  const [H, S, L, A] = extractHSL(hsl);
  const [R, G, B] = calcRGB(H, S, L);

  return A ? `rgba(${R}, ${G}, ${B}, ${A})` : `rgb(${R}, ${G}, ${B})`;
};

export const toHex = compose(toRGB, hex);
