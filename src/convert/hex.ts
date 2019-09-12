import { checkFormat } from './helpers';

// Hex -> RGB
export const hex2Rgb = (hex: string) => {
  // Check the format
  if (!checkFormat(hex, 'hex')) throw Error('Not a valid hex color format');

  let [r, g, b] = Array.from(Array(3).fill(''));

  // #RGB || #RRGGBB
  if (hex.length == 4) {
    r = +('0x' + hex[1] + hex[1]);
    g = +('0x' + hex[2] + hex[2]);
    b = +('0x' + hex[3] + hex[3]);
  } else if (hex.length == 7) {
    r = +('0x' + hex[1] + hex[2]);
    g = +('0x' + hex[3] + hex[4]);
    b = +('0x' + hex[5] + hex[6]);
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
    r = +('0x' + hex[1] + hex[1]);
    g = +('0x' + hex[2] + hex[2]);
    b = +('0x' + hex[3] + hex[3]);
    a = +('0x' + hex[4] + hex[4]);
  } else if (hex.length == 9) {
    r = +('0x' + hex[1] + hex[2]);
    g = +('0x' + hex[3] + hex[4]);
    b = +('0x' + hex[5] + hex[6]);
    a = +('0x' + hex[7] + hex[8]);
  }

  a = parseFloat((a / 255).toPrecision(3));

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
