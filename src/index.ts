import {
  a11y,
  adjust,
  hue,
  saturation,
  lightness,
  mix,
  complement,
  negate,
  toHex,
  toRGB,
  toHSL,
  toW3C
} from "./color";
import { complementary, analogous, triad, tetrad } from "./color/scheme";
import { blend, tints, tones, shades } from "./color/variant";
import { system } from "./typography";
import { create, update, merge, output } from "./scale";
import { composeAll } from "./toolbox";

export const color = {
  pipe: composeAll,
  a11y,
  adjust,
  hue,
  h: hue,
  saturation,
  s: saturation,
  lightness,
  luminance: lightness,
  l: lightness,
  mix,
  complement,
  negate,
  toHex,
  toHSL,
  toRGB,
  toW3C
};

export const scheme = {
  complementary,
  analogous,
  triad,
  tetrad
};

export const variant = {
  blend,
  tints,
  tones,
  shades
};

export const typography = {
  system
};

export const scale = {
  pipe: composeAll,
  create,
  update,
  merge,
  output
};
