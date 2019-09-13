import { rgbData, rgbaData, hslCalc, d2Hex } from './helpers';
import { hex2Named } from './hex';

// RGB -> Hex
export const rgb2Hex = (rgb: string) => {
  let [r, g, b] = rgbData(rgb);

  r = d2Hex(r);
  g = d2Hex(g);
  b = d2Hex(b);

  return ['#', r, g, b].join('');
};

// RGBA -> Hex8 (w/ alpha)
export const rgba2Hex8 = (rgba: string) => {
  let [r, g, b, a] = rgbaData(rgba);

  r = d2Hex(r);
  g = d2Hex(g);
  b = d2Hex(b);
  a = d2Hex(a);

  return ['#', r, g, b, a].join('');
};

// RGB -> HSL
export const rgb2Hsl = (rgb: string) => {
  const data = rgbData(rgb);
  // Make RGB channels fractions of 1
  let r = +data[0] / 255;
  let g = +data[1] / 255;
  let b = +data[2] / 255;

  const hsl = hslCalc(r, g, b);

  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

// RGBA -> HSLA
export const rgba2Hsla = (rgba: string) => {
  const data = rgbaData(rgba);
  // Make RGB channels fractions of 1
  let r = +data[0] / 255;
  let g = +data[1] / 255;
  let b = +data[2] / 255;
  let a = +data[3];

  // a is integer
  if (+a > 1) a = a / 255;

  const hsl = hslCalc(r, g, b);

  return `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${parseFloat(
    a.toPrecision(2)
  )})`;
};

// RGB to Named
export const rgb2Named = (rgb: string) => hex2Named(rgb2Hex(rgb));
