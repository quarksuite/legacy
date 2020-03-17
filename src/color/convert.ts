import {
  calcRGB,
  calcHSL,
  parseRGB,
  parseHSL,
  intToHex,
  hexToInt
} from './utils';
import { compose } from '../utils';
import { w3c } from './w3c-colors';

// Hex -> RGB
export const hexToRGB = (hex: string): string => {
  let output = [];
  const [, ...values] = hex;

  if (values.length == 3) {
    output = values.map((x: string): number => hexToInt(x, x));
  }

  const [R, R2, G, G2, B, B2] = values;
  output = [
    [R, R2],
    [G, G2],
    [B, B2]
  ].map(([x, y]: string[]): number => hexToInt(x, y));

  const [r, g, b] = output;

  return `rgb(${r}, ${g}, ${b})`;
};

// RGB -> Hex
export const rgbToHex = (rgb: string): string => {
  const hexValues = parseRGB(rgb).map((channel: number): string =>
    intToHex(channel)
  );
  return ['#', ...hexValues].join('');
};

// RGB -> HSL
export const rgbToHSL = (rgb: string): string => {
  const [R, G, B] = parseRGB(rgb).map(
    (channel: number): number => channel / 255
  );
  const [H, S, L] = calcHSL(R, G, B);

  return `hsl(${isNaN(H) ? 0 : H}, ${S}%, ${L}%)`;
};

// Hex -> HSL
export const hexToHSL = (hex: string): string =>
  compose(hex, hexToRGB, rgbToHSL) as string;

// Hex -> W3C color
export const hexToW3C = (hex: string): string => {
  const [hash, R, G, B] = hex;
  let output: string;

  if (hex.length == 4) {
    output = [hash, R, R, G, G, B, B].join('');
  }

  const found = Object.keys(w3c).filter((named: string) => {
    return output === w3c[named];
  })[0];

  if (!found) throw Error(`${hex} is not defined in the W3C named colors list`);

  return found;
};

// RGB -> W3C
export const rgb2W3C = (rgb: string): string =>
  compose(rgb, rgbToHex, hexToW3C) as string;

// HSL -> RGB
export const hslToRGB = (hsl: string): string => {
  const [H, S, L] = parseHSL(hsl);
  const [R, G, B] = calcRGB(H, S, L);

  return `rgb(${R}, ${G}, ${B})`;
};

// HSL -> Hex
export const hslToHex = (hsl: string): string =>
  compose(hsl, hslToRGB, rgbToHex) as string;

// HSL -> W3C
export const hslToW3C = (hsl: string): string =>
  compose(hsl, hslToHex, hexToW3C) as string;

// W3C -> RGB
export const w3cToRGB = (name: string): string => hexToRGB(w3c[name]);

// W3C -> HSL
export const w3CToHSL = (name: string): string => hexToHSL(w3c[name]);

// W3C -> Hex
export const w3CToHex = (name: string): string => w3c[name];
