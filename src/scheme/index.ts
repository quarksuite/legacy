import { hue } from "../color/adjust";

export const complementary = (color: string): (string | Error)[] => [
  hue(0, color),
  hue(180, color),
];

export const analogous = (
  offset: number,
  color: string
): (string | Error)[] => [
  hue(0, color),
  hue(-offset, color),
  hue(offset, color),
];

export const triad = (offset: number, color: string): (string | Error)[] => [
  hue(0, color),
  hue(180 + -offset, color),
  hue(180 + offset, color),
];

export const tetrad = (offset: number, color: string): (string | Error)[] => [
  hue(0, color),
  hue(180, color),
  hue(offset, color),
  hue(180 + offset, color),
];

export const custom = (
  range: number,
  offset: number,
  color: string
): (string | Error)[] =>
  Array(range)
    .fill(offset)
    .map((value: number, i: number): string | Error => hue(value * i, color));
