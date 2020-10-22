import { curry2 } from "../../fn";
import { queryFormat, validateColor } from "../validate";
import { toRGB as hex2RGB, toHSL as hex2HSL } from "./hex";
import { toHex as r2Hex, toHSL as r2HSL } from "./rgb";
import { toRGB as hsl2RGB, toHex as hsl2Hex } from "./hsl";
import { toHex as n2Hex, toRGB as n2RGB, toHSL as n2HSL } from "./named";
import { CSSColor, RawColor } from "../types";

const queryConversionDict = curry2(
  (target: CSSColor, color: CSSColor): RawColor => {
    interface ConversionDict {
      [index: string]: { [index: string]: (color: CSSColor) => RawColor };
    }

    // If invalid, reject
    validateColor("Invalid color: cannot convert", color);

    const format = queryFormat(color);
    const convert: ConversionDict = {
      hex: { rgb: hex2RGB, hsl: hex2HSL },
      rgb: { hex: r2Hex, hsl: r2HSL },
      hsl: { hex: hsl2Hex, rgb: hsl2RGB },
      named: { hex: n2Hex, rgb: n2RGB, hsl: n2HSL },
    };

    if (format === target) return color;

    return convert[format][target](color);
  }
);

export const toHex = queryConversionDict("hex");
export const toRGB = queryConversionDict("rgb");
export const toHSL = queryConversionDict("hsl");

export const preserveFormat = (target: CSSColor, color: CSSColor): RawColor => {
  const format = queryFormat(color);

  if (format === "rgb") return toRGB(target);
  if (format === "hsl") return toHSL(target);
  return toHex(target);
};
