import {
  hue,
  saturation,
  lightness,
  mix,
  complement,
  negate,
  complementary,
  analogous,
  triad,
  tetrad,
  create,
  tints,
  tones,
  shades
} from './color';

import * as typographyUtils from './typography';
import * as scaleUtils from './scale';

export const color = {
  hue,
  saturation,
  lightness,
  mix,
  complement,
  negate
};

export const scheme = {
  complementary,
  analogous,
  triad,
  tetrad
};

export const variant = {
  create,
  tints,
  tones,
  shades
};

export const typography = {
  ...typographyUtils
};

export const scale = {
  ...scaleUtils
};
