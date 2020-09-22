import {
  Channel,
  HexFragment,
  ColorValues,
  Saturation,
  Hue,
  Lightness,
  Alpha,
  CSSColor,
} from "./data/types";

// hex, rgb, hsl
export const matchValues = (s: CSSColor): ColorValues =>
  s.startsWith("#")
    ? (s.match(/[\da-f]{2}/g) as ColorValues)
    : (s.match(/(-?[\d.]((?:%|deg|turn|g?rad)?))+/g) as ColorValues);

// hex
export const intToHex = (n: Channel): HexFragment =>
  n.toString(16).padStart(2, "0");
export const hexToInt = (s: HexFragment): Channel => parseInt(s, 16);

// rgb, hsl
export const extractNumber = (
  s: CSSColor
): Hue | Saturation | Lightness | Alpha => parseFloat(s);
