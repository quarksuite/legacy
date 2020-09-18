import { curry } from "@architecture/toolbox";
import { validateColor, InvalidColorError } from "@color/validate";
import { toRGB as hex2RGB, toHSL as hex2HSL } from "@color/convert/hex";
import { toHex as r2Hex, toHSL as r2HSL } from "@color/convert/rgb";
import { toRGB as hsl2RGB, toHex as hsl2Hex } from "@color/convert/hsl";
import {
  toHex as n2Hex,
  toRGB as n2RGB,
  toHSL as n2HSL
} from "@color/convert/named";

const queryConversionDict = curry(2, (target: string, color: string):
  | string
  | Error => {
  interface ConversionDict {
    [index: string]: { [index: string]: Function };
  }

  const format = validateColor(color);
  const convert: ConversionDict = {
    hex: { rgb: hex2RGB, hsl: hex2HSL },
    rgb: { hex: r2Hex, hsl: r2HSL },
    hsl: { hex: hsl2Hex, rgb: hsl2RGB },
    named: { hex: n2Hex, rgb: n2RGB, hsl: n2HSL }
  };

  if (format === target) return color;
  if (!format) return InvalidColorError(color);

  return convert[format][target](color);
});

export const toHex = queryConversionDict("hex");
export const toRGB = queryConversionDict("rgb");
export const toHSL = queryConversionDict("hsl");

export const preserveFormat = (target: string, color: string): string => {
  const format = validateColor(color);

  if (format === "rgb") return toRGB(target);
  if (format === "hsl") return toHSL(target);
  return toHex(target);
};
