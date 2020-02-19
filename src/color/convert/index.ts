import { rgbCalc, hslData, rgbData, hslCalc, d2Hex } from './helpers';
import { checkFormat } from './helpers';
import { w3cx11 } from './named-lookup';

// Hex -> RGB
export const hex2Rgb = (hex: string) => {
  // Check the format
  if (!checkFormat(hex, 'hex')) throw Error('Not a valid hex color format');

  let [r, g, b] = Array.from(Array(3).fill(''));

  // #RGB || #RRGGBB
  if (hex.length == 4) {
    let rv = hex[1];
    let gv = hex[2];
    let bv = hex[3];
    r = parseInt(rv + rv, 16);
    g = parseInt(gv + gv, 16);
    b = parseInt(bv + bv, 16);
  } else if (hex.length == 7) {
    let r1 = hex[1];
    let r2 = hex[2];
    let g1 = hex[3];
    let g2 = hex[4];
    let b1 = hex[5];
    let b2 = hex[6];
    r = parseInt(r1 + r2, 16);
    g = parseInt(g1 + g2, 16);
    b = parseInt(b1 + b2, 16);
  }

  return `rgb(${r}, ${g}, ${b})`;
};

// RGB -> Hex
export const rgb2Hex = (rgb: string) => {
  let [r, g, b] = rgbData(rgb);

  r = d2Hex(r);
  g = d2Hex(g);
  b = d2Hex(b);

  return ['#', r, g, b].join('');
};

// RGB -> HSL
export const rgb2Hsl = (rgb: string) => {
  const data = rgbData(rgb);
  // Make RGB channels fractions of 1
  let r = +data[0] / 255;
  let g = +data[1] / 255;
  let b = +data[2] / 255;

  const hsl = hslCalc(r, g, b);

  return `hsl(${isNaN(hsl[0]) ? 0 : hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

// Hex -> HSL
export const hex2Hsl = (hex: string) => rgb2Hsl(hex2Rgb(hex));

// Hex -> Named
export const hex2Named = (hex: string) => {
  // #RGB || #RRGGBB
  if (hex.length == 4) {
    let rv = hex[1];
    let gv = hex[2];
    let bv = hex[3];
    hex = `#${rv}${rv}${gv}${gv}${bv}${bv}`;
  }

  const color = Object.keys(w3cx11).filter(v => {
    return hex === w3cx11[v];
  })[0];

  if (!color) throw Error(`${hex} is not defined on the W3C named colors list`);

  return color;
};

// RGB to Named
export const rgb2Named = (rgb: string) => hex2Named(rgb2Hex(rgb));

// HSL -> RGB
export const hsl2Rgb = (hsl: string) => {
  const data = hslData(hsl);

  let h = data[0];
  let s = data[1];
  let l = data[2];

  const rgb = rgbCalc(h, s, l);

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

// HSL -> Hex
export const hsl2Hex = (hsl: string) => rgb2Hex(hsl2Rgb(hsl));

// HSL -> Named
export const hsl2Named = (hsl: string) => hex2Named(rgb2Hex(hsl2Rgb(hsl)));

// Named -> RGB
export const named2Rgb = (name: string) => hex2Rgb(w3cx11[name]);

// Named -> HSL
export const named2Hsl = (name: string) => hex2Hsl(w3cx11[name]);

// Named -> Hex
export const named2Hex = (name: string) => w3cx11[name];
