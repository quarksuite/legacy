import { extractValue, parsePercent } from "@color/convert/helpers";

export const parseHSL = (hsl: string): number[] => {
  // TypeScript requires a double assertion in this case
  // because null can't overlap with other types.
  const values = (hsl.toString().match(/[^hsl(,)]+/g) as unknown) as string[];

  let [H] = values.map((value: string): number => {
    if (value.includes("deg")) return extractValue(value);
    if (value.includes("rad"))
      return Math.round(extractValue(value) * (180 / Math.PI));
    if (value.includes("turn")) return Math.round(extractValue(value)) * 360;
    return extractValue(value);
  });

  if (H >= 360) H %= 360;

  const [, S, L] = values.map((value: string): number => {
    return parsePercent(value);
  });

  return [H, S, L];
};

// https://www.rapidtables.com/convert/color/hsl-to-rgb.html
export const calcChannels = (
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
