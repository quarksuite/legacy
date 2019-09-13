import { checkFormat, Formats } from './convert/helpers';

import { hex2Rgb, hex82Rgba, hex2Hsl, hex82Hsla } from './convert/hex';
import { hsl2Hex, hsla2Hex8, hsl2Rgb, hsla2Rgba } from './convert/hsl';
import { named2Rgb, named2Hsl } from './convert/named';
import { rgb2Hex, rgba2Hex8, rgb2Hsl, rgba2Hsla } from './convert/rgb';

import tinycolor from 'tinycolor2';

/** Color utilities */

/* color.convert */

const hexConvert = (color: string, to: string) => {
  if (to === 'rgb') return hex2Rgb(color);
  if (to === 'rgba') return hex82Rgba(color);
  if (to === 'hsl') return hex2Hsl(color);
  if (to === 'hsla') return hex82Hsla(color);
};

const rgbConvert = (color: string, to: string) => {
  if (to === 'hex') return rgb2Hex(color);
  if (to === 'hex8') return rgba2Hex8(color);
  if (to === 'hsl') return rgb2Hsl(color);
  if (to === 'hsla') return rgba2Hsla(color);
};

const hslConvert = (color: string, to: string) => {
  if (to === 'hex') return hsl2Hex(color);
  if (to === 'hex8') return hsla2Hex8(color);
  if (to === 'rgb') return hsl2Rgb(color);
  if (to === 'rgba') return hsla2Rgba(color);
};

const namedConvert = (color: string, to: string) => {
  if (to === 'rgb') return named2Rgb(color);
  if (to === 'hsl') return named2Hsl(color);
};

export const convert = (color: string, to: Formats) => {
  const hex = checkFormat(color, 'hex') || checkFormat(color, 'hex8');
  const rgb = checkFormat(color, 'rgb') || checkFormat(color, 'rgba');
  const hsl = checkFormat(color, 'hsl') || checkFormat(color, 'hsla');
  const name = checkFormat(color as string, 'named');

  if (hex) return hexConvert(color, to);
  if (rgb) return rgbConvert(color, to);
  if (hsl) return hslConvert(color, to);
  if (name) return namedConvert(color, to);

  throw Error('Not a valid CSS color.');
};

// Blend utilities built for speed
// Adapted from: https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#micro-functions-version-4

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

const setHue = (color: string, rotation: number) =>
  tinycolor(color)
    .spin(rotation)
    .toHexString();

const complement = (color: string) => setHue(color, 180);

const mix = (color: string, target: string, amount?: number) =>
  tinycolor.mix(color, target, amount).toHexString();

const neutralize = (color: string) => mix(color, complement(color));

export const swatch = {
  complement,
  neutralize,
  mix
};

const tints = (color: string, count = 4, contrast = 100) =>
  Array.from(Array(count).fill(color), (color, index) =>
    tinycolor(color)
      .lighten(contrast / 2.15 / ++index)
      .toHexString()
  ).reverse();

const tones = (color: string, count = 4, contrast = 100) =>
  Array.from(Array(count).fill(color), (color, index) =>
    tinycolor(color)
      .desaturate(contrast / 2 / ++index)
      .toHexString()
  ).reverse();

const shades = (color: string, count = 4, contrast = 100) =>
  Array.from(Array(count).fill(color), (color, index) =>
    tinycolor(color)
      .darken(contrast / 2.5 / ++index)
      .toHexString()
  ).reverse();

export const palette = {
  tints,
  tones,
  shades
};

const complementary = (color: string) => [
  tinycolor(color).toHexString(),
  complement(color)
];

const splitComplementary = (color: string, distance = 15, accented = false) => {
  const a = tinycolor(color).toHexString();
  const opposite = complement(a);
  const b = setHue(opposite, -distance);
  const c = setHue(opposite, distance);

  return accented ? [a, opposite, b, c] : [a, b, c];
};

const analogous = (color: string, distance = 15) =>
  Array.from(Array(3).fill(color), (value, index) =>
    setHue(value, distance * index)
  );

const dual = (color: string, distance = 15) => {
  const a = tinycolor(color).toHexString();
  const b = setHue(a, distance);
  const c = complement(a);
  const d = complement(b);

  return [a, b, c, d];
};

export const scheme = {
  complementary,
  splitComplementary,
  triadic: (color: string) => splitComplementary(color, 60),
  analogous,
  dual,
  tetradic: (color: string) => dual(color, 90)
};
