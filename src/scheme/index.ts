import {
  Angle,
  CSSColor,
  PaletteRange,
  BasicScheme,
  CustomScheme,
} from "../color/data/types";
import { hue } from "../color/adjust";

export const complementary = (color: CSSColor): BasicScheme => [
  hue(0, color),
  hue(180, color),
];

export const analogous = (offset: Angle, color: CSSColor): BasicScheme => [
  hue(0, color),
  hue(-offset, color),
  hue(offset, color),
];

export const triad = (offset: Angle, color: CSSColor): BasicScheme => [
  hue(0, color),
  hue(180 + -offset, color),
  hue(180 + offset, color),
];

export const tetrad = (offset: Angle, color: CSSColor): BasicScheme => [
  hue(0, color),
  hue(180, color),
  hue(offset, color),
  hue(180 + offset, color),
];

export const custom = (
  range: PaletteRange,
  offset: Angle,
  color: CSSColor
): CustomScheme =>
  Array(range)
    .fill(offset)
    .map((value: number, i: number): string | Error => hue(value * i, color));
