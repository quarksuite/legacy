import { matchValues, extractNumber, intToHex } from "@color/formatting";
import {
  percentAsFloat,
  channelAsFraction,
  percentChannelAsInt,
  ccwHueCorrection,
  alphaAsHex
} from "@color/math";

export const extractRGBChannels = (rgb: string): number[] => {
  const [r, g, b, a] = matchValues(rgb);
  const [R, G, B] = [r, g, b].map((channel: string): number => {
    const n = extractNumber(channel);
    if (channel.endsWith("%")) return percentChannelAsInt(n);
    return n;
  });

  const A = a != null ? extractNumber(a) : 1;

  return A === 1 ? [R, G, B] : [R, G, B, A];
};

// https://www.rapidtables.com/convert/color/rgb-to-hsl.html
const calcHue = (
  R: number,
  G: number,
  B: number,
  cmax: number,
  delta: number
): Map<number, boolean> =>
  new Map([
    [0, delta === 0],
    [60 * (((G - B) / delta) % 6), cmax === R],
    [60 * ((B - R) / delta + 2), cmax === G],
    [60 * ((R - G) / delta + 4), cmax === B]
  ]);

const calcSat = (delta: number, L: number): number =>
  delta === 0 ? 0 : delta / (1 - Math.abs(2 * L - 1));

const calcLightness = (cmin: number, cmax: number): number => (cmax + cmin) / 2;

export const calcHSL = (r: number, g: number, b: number): number[] => {
  const [R, G, B] = [r, g, b].map((channel: number): number =>
    channelAsFraction(channel)
  );
  const cmin = Math.min(R, G, B);
  const cmax = Math.max(R, G, B);
  const delta = cmax - cmin;

  const [H] = Array.from(calcHue(R, G, B, cmax, delta))
    .filter(([, condition]: [number, boolean]): boolean => condition)
    .flatMap(([value]: [number, boolean]): number => Math.round(value));

  const L = calcLightness(cmin, cmax);

  const S = calcSat(delta, L);

  return [Math.sign(H) === -1 ? ccwHueCorrection(H) : H, S, L];
};

export const toHex = (rgb: string): string => {
  const [r, g, b, a] = extractRGBChannels(rgb);

  const [R, G, B] = [r, g, b].map((n: number): string => intToHex(n));
  const A = a != null ? alphaAsHex(a) : alphaAsHex(1);

  return A === "ff" ? ["#", R, G, B].join("") : ["#", R, G, B, A].join("");
};

export const toHSL = (rgb: string): string => {
  const [r, g, b, a] = extractRGBChannels(rgb);
  const [h, s, l] = calcHSL(r, g, b);

  const [H, S, L] = [h, `${percentAsFloat(s)}%`, `${percentAsFloat(l)}%`];
  const A = a != null ? a : 1;

  return A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`;
};
