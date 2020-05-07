import { modify, mixColors } from "./utils";
import * as convert from "./convert";
import { curry } from "../toolbox";
import { a11y as clrs } from "./clrs-list";

export const a11y = (color: string): string | Error => {
  if (clrs[color]) return convert.toRGB(clrs[color]);
  throw new Error("Color not defined in accessibility table");
};

export const adjust = curry(3, modify);

const h = adjust("hue");
const s = adjust("saturation");
const l = adjust("lightness");

export const hue = curry(2, (degrees: number, color: string): string =>
  h((h: number) => h + degrees, color)
);

export const saturation = curry(2, (amount: number, color: string): string =>
  s((s: number) => s + amount, color)
);

export const lightness = curry(2, (amount: number, color: string): string =>
  l((l: number) => l + amount, color)
);

export const mix = curry(3, mixColors);

export const complement = adjust("hue", (h: number) => h + 180);
export const negate = (color: string): string =>
  mix(complement(color), 50)(color);

export const toHex = convert.toHex;
export const toHSL = convert.toHSL;
export const toRGB = convert.toRGB;
export const toW3C = convert.toW3C;
