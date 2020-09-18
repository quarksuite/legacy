import { compose } from "@architecture/toolbox";
import { hexToInt, matchValues } from "@color/formatting";
import { channelAsFraction } from "@color/math";
import { toHSL as hsl } from "@color/convert/rgb";

export const extractHexChannels = (hex: string): string[] => {
  // #RGB(A)
  if (hex.length === 4 || hex.length === 5) {
    const [, ...values] = hex;
    return values.map((channel: string): string => channel.repeat(2));
  }

  // #RRGGBB(AA)
  return matchValues(hex);
};

export const toRGB = (hex: string): string => {
  const [r, g, b, a] = extractHexChannels(hex);
  const [R, G, B] = [r, g, b].map((channel: string): number =>
    hexToInt(channel)
  );
  const A = a != null ? channelAsFraction(hexToInt(a)) : 1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
};

export const toHSL = compose(toRGB, hsl);
