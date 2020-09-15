import { compose } from "@architecture/toolbox";
import {
  hexToInt,
  channelAsFraction,
  matchValues
} from "@color/convert/helpers";
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

export const mapToRGB = (hex: string): number[] => {
  const [R, G, B, A] = extractHexChannels(hex).map((channel: string): number =>
    hexToInt(channel)
  );

  return A ? [R, G, B, channelAsFraction(A)] : [R, G, B];
};

export const toRGB = (hex: string): string => {
  const [R, G, B, A] = mapToRGB(hex);

  return A ? `rgba(${R}, ${G}, ${B}, ${A})` : `rgb(${R}, ${G}, ${B})`;
};

export const toHSL = compose(toRGB, hsl);
