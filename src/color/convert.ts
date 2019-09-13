import { checkFormat, Formats } from '../convert/helpers';

import {
  hex2Rgb,
  hex82Rgba,
  hex2Hsl,
  hex82Hsla,
  hex2Named
} from '../convert/hex';
import {
  hsl2Hex,
  hsla2Hex8,
  hsl2Rgb,
  hsla2Rgba,
  hsl2Named
} from '../convert/hsl';
import { named2Rgb, named2Hsl, named2Hex } from '../convert/named';
import {
  rgb2Hex,
  rgba2Hex8,
  rgb2Hsl,
  rgba2Hsla,
  rgb2Named
} from '../convert/rgb';

const hexConvert = (color: string, to: string) => {
  if (to === 'rgb') return hex2Rgb(color);
  if (to === 'rgba') return hex82Rgba(color);
  if (to === 'hsl') return hex2Hsl(color);
  if (to === 'hsla') return hex82Hsla(color);
  if (to === 'named') return hex2Named(color);
};

const rgbConvert = (color: string, to: string) => {
  if (to === 'hex') return rgb2Hex(color);
  if (to === 'hex8') return rgba2Hex8(color);
  if (to === 'hsl') return rgb2Hsl(color);
  if (to === 'hsla') return rgba2Hsla(color);
  if (to === 'named') return hsl2Named(color);
};

const hslConvert = (color: string, to: string) => {
  if (to === 'hex') return hsl2Hex(color);
  if (to === 'hex8') return hsla2Hex8(color);
  if (to === 'rgb') return hsl2Rgb(color);
  if (to === 'rgba') return hsla2Rgba(color);
  if (to === 'named') return rgb2Named(color);
};

const namedConvert = (color: string, to: string) => {
  if (to === 'hex') return named2Hex(color);
  if (to === 'rgb') return named2Rgb(color);
  if (to === 'hsl') return named2Hsl(color);
};

/** color.convert - Utility for converting colors */
export default (color: string, to: Formats) => {
  const hex = checkFormat(color, 'hex') || checkFormat(color, 'hex8');
  const rgb = checkFormat(color, 'rgb') || checkFormat(color, 'rgba');
  const hsl = checkFormat(color, 'hsl') || checkFormat(color, 'hsla');
  const name = checkFormat(color as string, 'named');

  if (hex) return hexConvert(color, to);
  if (rgb) return rgbConvert(color, to);
  if (hsl) return hslConvert(color, to);
  if (name) return namedConvert(color, to);

  return color;
};
