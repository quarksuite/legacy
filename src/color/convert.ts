import { checkFormat, Formats } from '../convert/helpers';

import * as transform from '../convert';

const hexConvert = (color: string, to: string) => {
  if (to === 'rgb') return transform.hex2Rgb(color);
  if (to === 'rgba') return transform.hex82Rgba(color);
  if (to === 'hsl') return transform.hex2Hsl(color);
  if (to === 'hsla') return transform.hex82Hsla(color);
  if (to === 'named') return transform.hex2Named(color);
  return color;
};

const rgbConvert = (color: string, to: string) => {
  if (to === 'hex') return transform.rgb2Hex(color);
  if (to === 'hex8') return transform.rgba2Hex8(color);
  if (to === 'hsl') return transform.rgb2Hsl(color);
  if (to === 'hsla') return transform.rgba2Hsla(color);
  if (to === 'named') return transform.hsl2Named(color);
  return color;
};

const hslConvert = (color: string, to: string) => {
  if (to === 'hex') return transform.hsl2Hex(color);
  if (to === 'hex8') return transform.hsla2Hex8(color);
  if (to === 'rgb') return transform.hsl2Rgb(color);
  if (to === 'rgba') return transform.hsla2Rgba(color);
  if (to === 'named') return transform.rgb2Named(color);
  return color;
};

const namedConvert = (color: string, to: string) => {
  if (to === 'hex') return transform.named2Hex(color);
  if (to === 'rgb') return transform.named2Rgb(color);
  if (to === 'hsl') return transform.named2Hsl(color);
  return color;
};

/** color.convert - Utility for converting colors */
export default (color: string, to: Formats) => {
  const hex = checkFormat(color, 'hex') || checkFormat(color, 'hex8');
  const rgb = checkFormat(color, 'rgb') || checkFormat(color, 'rgba');
  const hsl = checkFormat(color, 'hsl') || checkFormat(color, 'hsla');
  const name = checkFormat(color, 'named');

  if (hex) return hexConvert(color, to);
  if (rgb) return rgbConvert(color, to);
  if (hsl) return hslConvert(color, to);
  if (name) return namedConvert(color, to);

  return color;
};
