import {
  hslData,
  rgbData,
  convertPercentage,
  CSSColorFormats,
  checkFormat
} from './convert/helpers';

import * as transform from './convert/';

const linBlend = (c0: string, c1: string, p: number) => {
  var i = parseInt,
    r = Math.round,
    P = 1 - p,
    [a, b, c, d] = c0.split(','),
    [e, f, g, h] = c1.split(','),
    x = d || h,
    d = x
      ? ',' +
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
      i(a[3] == 'a' ? a.slice(5) : a.slice(4)) * P +
        i(e[3] == 'a' ? e.slice(5) : e.slice(4)) * p
    ) +
    ',' +
    r(i(b) * P + i(f) * p) +
    ',' +
    r(i(c) * P + i(g) * p) +
    d
  );
};

const logBlend = (c0: string, c1: string, p: number) => {
  var i = parseInt,
    r = Math.round,
    P = 1 - p,
    [a, b, c, d] = c0.split(','),
    [e, f, g, h] = c1.split(','),
    x = d || h,
    d = x
      ? ',' +
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
    ',' +
    r((P * i(b) ** 2 + p * i(f) ** 2) ** 0.5) +
    ',' +
    r((P * i(c) ** 2 + p * i(g) ** 2) ** 0.5) +
    d
  );
};

const hexConvert = (color: string, to: string) => {
  if (to === 'rgb') return transform.hex2Rgb(color);
  if (to === 'hsl') return transform.hex2Hsl(color);
  if (to === 'named') return transform.hex2Named(color);
  return color;
};

const rgbConvert = (color: string, to: string) => {
  if (to === 'hex') return transform.rgb2Hex(color);
  if (to === 'hsl') return transform.rgb2Hsl(color);
  if (to === 'named') return transform.rgb2Named(color);
  return color;
};

const hslConvert = (color: string, to: string) => {
  if (to === 'hex') return transform.hsl2Hex(color);
  if (to === 'rgb') return transform.hsl2Rgb(color);
  if (to === 'named') return transform.hsl2Named(color);
  return color;
};

const namedConvert = (color: string, to: string) => {
  if (to === 'hex') return transform.named2Hex(color);
  if (to === 'rgb') return transform.named2Rgb(color);
  if (to === 'hsl') return transform.named2Hsl(color);
  return color;
};

export const convert = (color: string, to: CSSColorFormats = 'rgb') => {
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

export const spin = (color: string, rotation: number = 180) => {
  let [h, s, l] = hslData(convert(color, 'hsl'));

  h = (h + rotation) % 360;
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return convert(`hsl(${h}, ${s}%, ${l}%)`);
};

export const blend = (
  color: string,
  target: string,
  amount: number = 50,
  mode: 'logarithmic' | 'linear' = 'logarithmic'
) => {
  // Convert arguments to RGB as required by blend function
  color = convert(color);
  target = convert(target);
  amount = convertPercentage(amount);

  // Set linear and logarithmic blends
  const linear = linBlend(color, target, amount);
  const logarithmic = logBlend(color, target, amount);

  // Set the formatting of result
  const format = (c: string) => convert(spin(c, 0));

  return mode === 'linear' ? format(linear) : format(logarithmic);
};
