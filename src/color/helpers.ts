import {
  hslData,
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

export const hexConvert = (color: string, to: string) => {
  if (to === 'rgb') return transform.hex2Rgb(color);
  if (to === 'rgba') return transform.hex82Rgba(color);
  if (to === 'hsl') return transform.hex2Hsl(color);
  if (to === 'hsla') return transform.hex82Hsla(color);
  if (to === 'named') return transform.hex2Named(color);
  return color;
};

export const rgbConvert = (color: string, to: string) => {
  if (to === 'hex') return transform.rgb2Hex(color);
  if (to === 'hex8') return transform.rgba2Hex8(color);
  if (to === 'hsl') return transform.rgb2Hsl(color);
  if (to === 'hsla') return transform.rgba2Hsla(color);
  if (to === 'named') return transform.hsl2Named(color);
  return color;
};

export const hslConvert = (color: string, to: string) => {
  if (to === 'hex') return transform.hsl2Hex(color);
  if (to === 'hex8') return transform.hsla2Hex8(color);
  if (to === 'rgb') return transform.hsl2Rgb(color);
  if (to === 'rgba') return transform.hsla2Rgba(color);
  if (to === 'named') return transform.rgb2Named(color);
  return color;
};

export const namedConvert = (color: string, to: string) => {
  if (to === 'hex') return transform.named2Hex(color);
  if (to === 'rgb') return transform.named2Rgb(color);
  if (to === 'hsl') return transform.named2Hsl(color);
  return color;
};

export const convert = (color: string, to: CSSColorFormats) => {
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

export const spin = (color: string, rotation: number = 180) => {
  let [h, s, l] = hslData(convert(color, 'hsl'));

  h = (h + rotation) % 360;
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return convert(`hsl(${h}, ${s}%, ${l}%)`, 'hex');
};

export const blend = (
  color: string,
  target: string,
  amount: number = 50,
  type: 'logarithmic' | 'linear' = 'logarithmic'
) => {
  const c = convert(color, 'rgb');
  const t = convert(target, 'rgb');
  const a = convertPercentage(amount);

  if (type === 'linear') return linBlend(c, t, a);
  return logBlend(c, t, a);
};
