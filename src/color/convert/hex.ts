import { Channel, CSSColor, HexData, HexFragment, RawColor } from "../types";
import { compose } from "../../fn";
import { hexToInt, matchValues } from "../formatting";
import { channelAsFraction } from "../math";
import { toHSL as hsl } from "./rgb";

export const extractHexChannels = (hex: CSSColor): HexData => {
  // #RGB(A)
  if (hex.length === 4 || hex.length === 5) {
    const [, ...values] = hex;
    return values.map(
      (channel: HexFragment): HexFragment => channel.repeat(2)
    ) as HexData;
  }

  // #RRGGBB(AA)
  return matchValues(hex);
};

export const toRGB = (hex: CSSColor): RawColor => {
  const [r, g, b, a] = extractHexChannels(hex);
  const [R, G, B] = [r, g, b].map(
    (channel: HexFragment): Channel => hexToInt(channel)
  );
  const A = a != null ? channelAsFraction(hexToInt(a)) : 1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
};

export const toHSL = compose(toRGB, hsl);
