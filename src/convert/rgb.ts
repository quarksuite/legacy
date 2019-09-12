import { rgbData, rgbaData, d2Hex, zeroPad, hslCalc } from './helpers';

// RGB -> Hex
export const rgb2Hex = (rgb: string) =>
  [
    '#',
    ...rgbData(rgb).map(v => {
      return d2Hex(+v);
    })
  ]
    .map(v => (v === '0' ? zeroPad(v) : v))
    .join('');

// RGBA -> Hex8 (w/ alpha)
export const rgba2Hex8 = (rgba: string) =>
  [
    '#',
    ...rgbaData(rgba).map((v, i) => {
      if (i === 3 && +v < 1) return d2Hex(+v * 255);
      return d2Hex(+v);
    })
  ]
    .map(v => (v === '0' ? zeroPad(v) : v))
    .join('');

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
