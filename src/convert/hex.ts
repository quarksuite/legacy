import { checkFormat } from './helpers';
import { rgb2Hsl, rgba2Hsla } from './rgb';

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

// Hex8 (w/ alpha) -> RGBA
export const hex82Rgba = (hex: string) => {
  // Check the format
  if (!checkFormat(hex, 'hex8')) throw Error('Not a valid hex8 color format');

  let [r, g, b, a] = Array.from(Array(4).fill(''));

  // #RGBA || #RRGGBBAA
  if (hex.length == 5) {
    let rv = hex[1];
    let gv = hex[2];
    let bv = hex[3];
    let av = hex[4];
    r = parseInt(rv + rv, 16);
    g = parseInt(gv + gv, 16);
    b = parseInt(bv + bv, 16);
    a = parseInt(av + av, 16);
  } else if (hex.length == 9) {
    let r1 = hex[1];
    let r2 = hex[2];
    let g1 = hex[3];
    let g2 = hex[4];
    let b1 = hex[5];
    let b2 = hex[6];
    let a1 = hex[7];
    let a2 = hex[8];
    r = parseInt(r1 + r2, 16);
    g = parseInt(g1 + g2, 16);
    b = parseInt(b1 + b2, 16);
    a = parseInt(a1 + a2, 16);
  }

  a = parseFloat((a / 255).toPrecision(1));

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

// Hex -> HSL
export const hex2Hsl = (hex: string) => rgb2Hsl(hex2Rgb(hex));

// Hex8 -> HSLA
export const hex82Hsla = (hex: string) => rgba2Hsla(hex82Rgba(hex));
