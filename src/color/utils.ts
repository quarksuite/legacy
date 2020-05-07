import { parseHSL, toPercentage, toFraction, toHSL, toRGB } from "./convert";
import { compose } from "../toolbox";

// Color modification utils

// Original algorithm modified from:
// https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#micro-functions-version-4
// Though, with the linear blend function excluded
const calculateDifference = (
  origin: number,
  target: number,
  p: number
): number => Math.round(((1 - p) * origin ** 2 + p * target ** 2) ** 0.5);

const calculateMix = (
  origin: string,
  target: string,
  amount: number
): number[] => {
  const [O_RED, O_GREEN, O_BLUE] = origin.split(", ");
  const [T_RED, T_GREEN, T_BLUE] = target.split(", ");
  const RGB_STORE: Map<string, string> = new Map([
    [O_RED, T_RED],
    [O_GREEN, T_GREEN],
    [O_BLUE, T_BLUE]
  ]);
  return Array.from(RGB_STORE).map(([origin, target]): number => {
    const matchChars = /\D/g;
    const getValueOf = (s: string): number =>
      parseInt(s.replace(matchChars, ""));
    return calculateDifference(getValueOf(origin), getValueOf(target), amount);
  });
};

const normalization = (a: number, b: number, x: number): number =>
  Math.round(Math.min(Math.max(x, a), b));

export const modify = (
  property: "hue" | "saturation" | "lightness",
  modifier: (current: number) => number,
  color: string
): string => {
  const values = compose(parseHSL, toHSL)(color);
  let [H] = values;
  let [, S, L] = values.map((v: number) => toPercentage(v));

  if (property === "hue") {
    // Allow multiple rotations on the color wheel
    const [h] = [H].map((current: number) => modifier(current));
    H = normalization(0, 720, h) % 360;
  }

  if (property === "saturation") {
    const [s] = [S].map((current: number) => Math.round(modifier(current)));
    S = normalization(0, 100, s);
  }

  if (property === "lightness") {
    const [l] = [L].map((current: number) => Math.round(modifier(current)));
    L = normalization(0, 100, l);
  }

  return toRGB(`hsl(${H}, ${S}%, ${L}%)`) as string;
};

export const mixColors = (
  target: string,
  amount: number,
  color: string
): string => {
  const colorToRGB = toRGB(color) as string;
  const targetToRGB = toRGB(target) as string;

  const [R, G, B] = calculateMix(colorToRGB, targetToRGB, toFraction(amount));

  return `rgb(${R}, ${G}, ${B})`;
};

export const createBlend = (
  target: string,
  contrast: number,
  limit: number,
  color: string
): string[] => {
  const colorToRGB = toRGB(color) as string;
  const targetToRGB = toRGB(target) as string;

  return Array.from(Array(limit).fill(colorToRGB))
    .map((value: string, index: number): string => {
      const amount = contrast - (contrast / limit) * index;
      return mixColors(targetToRGB, amount, value);
    })
    .reverse();
};
