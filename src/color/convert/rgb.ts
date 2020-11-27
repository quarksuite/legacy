import {
  Channel,
  ColorFragment,
  CSSColor,
  HexFragment,
  HSLData,
  Hue,
  Lightness,
  RawColor,
  RGBData,
  Saturation,
} from "../types";
import { matchValues, extractNumber, intToHex } from "../formatting";
import {
  percentAsFraction,
  percentAsFloat,
  channelAsFraction,
  percentChannelAsInt,
  ccwHueCorrection,
  alphaAsHex,
} from "../math";

export const extractRGB = (rgb: CSSColor): RGBData => {
  const [r, g, b, a] = matchValues(rgb);
  const [R, G, B] = [r, g, b].map(
    (channel: ColorFragment): Channel => {
      const n = extractNumber(channel);
      if (channel.endsWith("%")) return percentChannelAsInt(n);
      return n;
    }
  );

  const A =
    a != null
      ? extractNumber(a) > 1
        ? percentAsFraction(extractNumber(a))
        : extractNumber(a)
      : 1;

  return A === 1 ? [R, G, B] : [R, G, B, A];
};

// https://www.rapidtables.com/convert/color/rgb-to-hsl.html
const calcHue = (
  R: Channel,
  G: Channel,
  B: Channel,
  cmax: number,
  delta: number
): Map<Hue, boolean> =>
  new Map([
    [0, delta === 0],
    [60 * (((G - B) / delta) % 6), cmax === R],
    [60 * ((B - R) / delta + 2), cmax === G],
    [60 * ((R - G) / delta + 4), cmax === B],
  ]);

const calcSat = (delta: number, L: Lightness): Saturation =>
  delta === 0 ? 0 : delta / (1 - Math.abs(2 * L - 1));

const calcLightness = (cmin: number, cmax: number): Lightness =>
  (cmax + cmin) / 2;

export const calcHSL = (r: Channel, g: Channel, b: Channel): HSLData => {
  const [R, G, B] = [r, g, b].map(
    (channel: Channel): Channel => channelAsFraction(channel)
  );

  const cmin = Math.min(R, G, B);
  const cmax = Math.max(R, G, B);
  const delta = cmax - cmin;

  const [H] = Array.from(calcHue(R, G, B, cmax, delta))
    .filter(([, condition]: [Hue, boolean]): boolean => condition)
    .flatMap(([value]: [Hue, boolean]): number => Math.round(value));

  const L = calcLightness(cmin, cmax);

  const S = calcSat(delta, L);

  return [Math.sign(H) === -1 ? ccwHueCorrection(H) : H, S, L];
};

export const toHex = (rgb: CSSColor): RawColor => {
  const [r, g, b, a] = extractRGB(rgb);

  const [R, G, B] = [r, g, b].map((n: Channel): HexFragment => intToHex(n));
  const A = alphaAsHex(a != null ? a : 1);

  return A === "ff" ? ["#", R, G, B].join("") : ["#", R, G, B, A].join("");
};

export const toHSL = (rgb: CSSColor): RawColor => {
  const [r, g, b, a] = extractRGB(rgb);
  const [h, s, l] = calcHSL(r, g, b);

  const [H, S, L] = [h, `${percentAsFloat(s)}%`, `${percentAsFloat(l)}%`];
  const A = a != null ? a : 1;

  return A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`;
};
