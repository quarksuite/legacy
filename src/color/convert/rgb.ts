import {
  matchValues,
  extractNumber,
  percentAsFloat,
  channelAsFraction,
  percentChannelAsInt,
  intToHex,
  alphaAsHex
} from "@color/convert/helpers";

export const extractRGBChannels = (rgb: string): number[] => {
  const values = matchValues(rgb);
  const [R, G, B] = values.map((channel: string): number => {
    const n = extractNumber(channel);
    if (channel.endsWith("%")) return percentChannelAsInt(n);
    return n;
  });
  const [, , , A] = values;

  return A ? [R, G, B, extractNumber(A)] : [R, G, B];
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

  return [H < 0 ? H + 360 : H, S, L];
};

export const toHex = (rgb: string): string => {
  const values = extractRGBChannels(rgb);
  const [R, G, B] = values.map((n: number): string => intToHex(n));
  const [, , , A] = values;

  return A ? ["#", R, G, B, alphaAsHex(A)].join("") : ["#", R, G, B].join("");
};

export const toHSL = (rgb: string): string => {
  const [R, G, B, A] = extractRGBChannels(rgb);
  const [h, s, l] = calcHSL(R, G, B);
  const [H, S, L] = [h, percentAsFloat(s), percentAsFloat(l)];

  return A ? `hsla(${H}, ${S}%, ${L}%, ${A})` : `hsl(${H}, ${S}%, ${L}%)`;
};
