import { w3c } from './w3c-colors';
import { compose } from '../toolbox';

// Conversion helpers
export const intToHex = (x: number): string => x.toString(16).padStart(2, '0');
export const hexToInt = (s: string, s2: string): number => parseInt(s + s2, 16);
export const extractValue = (s: string): number =>
  parseInt(s.replace(/\D+/g, ''));
export const toFraction = (v: number): number => v / 100;
export const toPercentage = (v: number): number => v * 100;

const parsePercent = compose(toFraction, extractValue);

export const checkFormat = (color: string, format: string): boolean => {
  interface Format {
    [index: string]: RegExp;
  }

  const list: Format = {
    hex: /^#([\da-f]{3}){1,2}$/i,
    rgb: /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i,
    hsl: /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i
  };

  if (format === 'w3c') return w3c[color] !== undefined;

  return list[format].test(color);
};

export const parseHSL = (hsl: string): number[] => {
  // TypeScript requires a double assertion in this case
  // because null can't overlap with other types.
  const values = (hsl.toString().match(/[^hsl(,)]+/g) as unknown) as string[];

  let [H] = values.map((value: string): number => {
    if (value.includes('deg')) return extractValue(value);
    if (value.includes('rad'))
      return Math.round(extractValue(value) * (180 / Math.PI));
    if (value.includes('turn')) return Math.round(extractValue(value)) * 360;
    return extractValue(value);
  });

  if (H >= 360) H %= 360;

  const [, S, L] = values.map((value: string): number => {
    return parsePercent(value);
  });

  return [H, S, L];
};

// When there's an axiomatic way to represent an equation,
// why not let that be the model?
const calcChannels = (
  C: number,
  X: number,
  H: number
): Map<[number, number, number], boolean> =>
  new Map([
    [[C, X, 0], 0 <= H && H < 60],
    [[X, C, 0], 60 <= H && H < 120],
    [[0, C, X], 120 <= H && H < 180],
    [[0, X, C], 180 <= H && H < 240],
    [[X, 0, C], 240 <= H && H < 300],
    [[C, 0, X], 300 <= H && H < 360]
  ]);

export const calcRGB = (h: number, s: number, l: number): number[] => {
  // Calculate chroma
  const C = (1 - Math.abs(2 * l - 1)) * s;
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - C / 2;

  // Evaluate channels
  const [R, G, B] = Array.from(calcChannels(C, X, h))
    .filter(([axiom, condition]): number[] | null => {
      if (condition) return axiom;
      return null;
    })[0][0]
    .map((channel: number) => (channel + m) * 255);

  return [Math.round(R), Math.round(G), Math.round(B)];
};

export const parseRGB = (rgb: string): number[] => {
  // TypeScript requires a double assertion in this case
  // because null can't overlap with other types.
  const values = (rgb.match(/[^rgb(,)]+/g) as unknown) as string[];

  return values.map((channel: string): number => {
    if (channel.includes('%')) return Math.round(parsePercent(channel) * 255);
    return extractValue(channel);
  });
};

export const calcHSL = (r: number, g: number, b: number): number[] => {
  // Convert each channel to a fraction
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;

  // Find minimum and maximum channel values
  const cmin = Math.min(R, G, B);
  const cmax = Math.max(R, G, B);
  const delta = cmax - cmin;

  // Set hsl
  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue
  if (delta == 0) h = 0;
  if (cmax == R) h = ((G - B) / delta) % 6;
  if (cmax == G) h = (B - R) / delta + 2;
  if (cmax == B) h = (R - G) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +s.toPrecision(3);
  l = +l.toPrecision(3);

  return [h, s, l];
};

// Hex -> RGB
export const hexToRGB = (hex: string): string => {
  let output = [];
  const [, ...values] = hex;

  if (values.length == 3) {
    const [R, G, B] = values;
    output = [
      [R, R],
      [G, G],
      [B, B]
    ].map(([x, y]: string[]): number => hexToInt(x, y));
  } else {
    const [R, R2, G, G2, B, B2] = values;
    output = [
      [R, R2],
      [G, G2],
      [B, B2]
    ].map(([x, y]: string[]): number => hexToInt(x, y));
  }

  const [r, g, b] = output;

  return `rgb(${r}, ${g}, ${b})`;
};

// RGB -> Hex
export const rgbToHex = (rgb: string): string => {
  const hexValues = parseRGB(rgb).map((channel: number): string => {
    return intToHex(channel);
  });

  return ['#', ...hexValues].join('');
};

// RGB -> HSL
export const rgbToHSL = (rgb: string): string => {
  const [R, G, B] = parseRGB(rgb);
  const [H, S, L] = calcHSL(R, G, B);

  return `hsl(${isNaN(H) ? 0 : H}, ${Math.round(
    toPercentage(S)
  )}%, ${Math.round(toPercentage(L))}%)`;
};

// Hex -> W3C color
export const hexToW3C = (hex: string): string => {
  let output: string;

  if (hex.length == 4) {
    const [hash, R, G, B] = hex;
    output = [hash, R, R, G, G, B, B].join('');
  } else {
    output = hex;
  }

  const found = Object.keys(w3c).filter((named: string) => {
    return output === w3c[named];
  })[0];

  if (!found) throw Error(`${output} is not a w3c named color`);

  return found;
};

// HSL -> RGB
export const hslToRGB = (hsl: string): string => {
  const [H, S, L] = parseHSL(hsl);
  const [R, G, B] = calcRGB(H, S, L);

  return `rgb(${R}, ${G}, ${B})`;
};

// Hex -> HSL
export const hexToHSL = compose(rgbToHSL, hexToRGB);

// HSL -> Hex
export const hslToHex = compose(rgbToHex, hslToRGB);

// RGB -> W3C
export const rgbToW3C = compose(hexToW3C, rgbToHex);

// HSL -> W3C
export const hslToW3C = compose(hexToW3C, hslToHex);

// W3C -> RGB
export const w3cToRGB = (name: string): string => hexToRGB(w3c[name]);

// W3C -> HSL
export const w3cToHSL = (name: string): string => hexToHSL(w3c[name]);

// W3C -> Hex
export const w3cToHex = (name: string): string => w3c[name];

export const format = (to: string, input: string): string => {
  switch (to) {
    case 'rgb':
      if (checkFormat(input, 'hex')) return hexToRGB(input);
      if (checkFormat(input, 'hsl')) return hslToRGB(input);
      if (checkFormat(input, 'w3c')) return w3cToRGB(input);
      if (checkFormat(input, 'rgb')) return input;
      break;
    case 'hex':
      if (checkFormat(input, 'rgb')) return rgbToHex(input);
      if (checkFormat(input, 'hsl')) return hslToHex(input);
      if (checkFormat(input, 'w3c')) return w3cToHex(input);
      if (checkFormat(input, 'hex')) return input;
      break;
    case 'hsl':
      if (checkFormat(input, 'hex')) return hexToHSL(input);
      if (checkFormat(input, 'rgb')) return rgbToHSL(input);
      if (checkFormat(input, 'w3c')) return w3cToHSL(input);
      if (checkFormat(input, 'hsl')) return input;
      break;
    case 'w3c':
      if (checkFormat(input, 'hex')) return hexToW3C(input);
      if (checkFormat(input, 'rgb')) return rgbToW3C(input);
      if (checkFormat(input, 'hsl')) return hslToW3C(input);
      if (checkFormat(input, 'w3c')) return input;
      break;
  }

  throw Error(`Invalid: ${input} is not a CSS color`);
};
