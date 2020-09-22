import {
  Channel,
  HexFragment,
  Color,
  ColorValues,
  Saturation,
  Hue,
  Lightness,
  Alpha,
} from "./data/types";

// hex, rgb, hsl
export const matchValues = (s: Color): ColorValues =>
  s.startsWith("#")
    ? (s.match(/[\da-f]{2}/g) as ColorValues)
    : (s.match(/(-?[\d.]((?:%|deg|turn|g?rad)?))+/g) as ColorValues);

// hex
export const intToHex = (n: Channel): HexFragment =>
  n.toString(16).padStart(2, "0");
export const hexToInt = (s: HexFragment): Channel => parseInt(s, 16);

// rgb, hsl
export const extractNumber = (s: Color): Hue | Saturation | Lightness | Alpha =>
  parseFloat(s);
