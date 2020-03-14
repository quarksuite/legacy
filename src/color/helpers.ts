import {
  hslData,
  convertPercentage,
  CSSColorFormats,
  checkFormat
} from './convert/helpers';

import * as transform from './convert/';

const swatchBlend = (c0: string, c1: string, p: number): string => {
  var i = parseInt,
    r = Math.round,
    P = 1 - p,
    [a, b, c, d] = c0.split(','),
    [e, f, g, h] = c1.split(','),
    x = d || h,
    d = x
      ? ', ' +
        (!d
          ? h
          : !h
          ? d
          : r((parseFloat(d) * P + parseFloat(h) * p) * 1000) / 1000 + ')')
      : ')';
  return (
    'rgb' +
    (x ? 'a(' : '(') +
    r(
      (P * i(a[3] == 'a' ? a.slice(5) : a.slice(4)) ** 2 +
        p * i(e[3] == 'a' ? e.slice(5) : e.slice(4)) ** 2) **
        0.5
    ) +
    ', ' +
    r((P * i(b) ** 2 + p * i(f) ** 2) ** 0.5) +
    ', ' +
    r((P * i(c) ** 2 + p * i(g) ** 2) ** 0.5) +
    d
  );
};

const hexConvert = (color: string, to: string): string => {
  if (to === 'rgb') return transform.hex2Rgb(color);
  if (to === 'hsl') return transform.hex2Hsl(color);
  if (to === 'named') return transform.hex2Named(color);
  return color;
};

const rgbConvert = (color: string, to: string): string => {
  if (to === 'hex') return transform.rgb2Hex(color);
  if (to === 'hsl') return transform.rgb2Hsl(color);
  if (to === 'named') return transform.rgb2Named(color);
  return color;
};

const hslConvert = (color: string, to: string): string => {
  if (to === 'hex') return transform.hsl2Hex(color);
  if (to === 'rgb') return transform.hsl2Rgb(color);
  if (to === 'named') return transform.hsl2Named(color);
  return color;
};

const namedConvert = (color: string, to: string): string => {
  if (to === 'hex') return transform.named2Hex(color);
  if (to === 'rgb') return transform.named2Rgb(color);
  if (to === 'hsl') return transform.named2Hsl(color);
  return color;
};

export const convert = (color: string, to: CSSColorFormats = 'rgb'): string => {
  const hex = checkFormat(color, 'hex');
  const rgb = checkFormat(color, 'rgb');
  const hsl = checkFormat(color, 'hsl');
  const name = checkFormat(color, 'named');

  if (hex) return hexConvert(color, to);
  if (rgb) return rgbConvert(color, to);
  if (hsl) return hslConvert(color, to);
  if (name) return namedConvert(color, to);

  return color;
};

export const spin = (
  color: string,
  rotation: number = 180,
  counterClockwise = false
): string => {
  let [h, s, l] = hslData(convert(color, 'hsl'));
  const calculatedHue = counterClockwise ? h - rotation : h + rotation;

  h = calculatedHue < 0 ? (calculatedHue + 360) % 360 : calculatedHue % 360;
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return convert(`hsl(${h}, ${s}%, ${l}%)`);
};

export const blend = (
  color: string,
  target: string,
  amount: number = 50
): string => {
  // Convert arguments to RGB as required by blend function
  color = convert(color);
  target = convert(target);
  amount = convertPercentage(amount);

  const blend = swatchBlend(color, target, amount);

  return blend;
};
