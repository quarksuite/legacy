import { w3c } from './w3c-colors';
import * as convert from './convert';
import { compose } from '../utils';

// Conversion utils
export const intToHex = (n: number): string => n.toString(16).padStart(2, '0');
export const hexToInt = (x: string, y: string): number => parseInt(x + y, 16);
export const extractValue = (s: string): number =>
  parseInt(s.replace(/\D+/g, ''));
export const toFraction = (value: number): number => value / 100;
export const toPercentage = (value: number): number => Math.round(value * 100);

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
  // First check the format
  if (!checkFormat(hsl, 'hsl')) throw Error('Not a valid hsl format');

  // Since the function does a check for valid HSL beforehand, this will
  // always match. TypeScript requires a double assertion in this case
  // because null can't overlap with other types.
  const values = (hsl.match(/[^hsl(,)]+/g) as unknown) as string[];

  let [H] = values.map((value: string): number => {
    if (value.includes('deg')) return extractValue(value);
    if (value.includes('rad'))
      return Math.round(extractValue(value) * (180 / Math.PI));
    if (value.includes('turn')) return Math.round(extractValue(value)) * 360;
    if (value.includes('%'))
      return compose(value, extractValue, toFraction) as number;
    return extractValue(value);
  });

  if (H >= 360) H %= 360;

  const [, S, L] = values.map((value: string): number => {
    return compose(value, extractValue, toFraction) as number;
  });

  return [H, S, L];
};

export const calcRGB = (h: number, s: number, l: number): number[] => {
  // Calculate chroma
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  // Assign channels
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  }

  if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  }

  if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  }

  if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  }

  if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  }

  if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = (r + m) * 255;
  g = (g + m) * 255;
  b = (b + m) * 255;

  return [Math.round(r), Math.round(g), Math.round(b)];
};

export const parseRGB = (rgb: string): number[] => {
  // First, check the format
  if (!checkFormat(rgb, 'rgb')) throw Error('Not a valid RGB format');

  // Since the function does a check for valid RGB beforehand, this will
  // always match. TypeScript requires a double assertion in this case
  // because null can't overlap with other types.
  const values = (rgb.match(/[^rgb(,)]+/g) as unknown) as string[];

  return values.map((channel: string): number => {
    if (channel.includes('%'))
      return Math.round(
        (compose(channel, extractValue, toFraction) as number) * 255
      );
    return extractValue(channel);
  });
};

export const calcHSL = (r: number, g: number, b: number): number[] => {
  // Find minimum and maximum channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  // Set hsl
  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue
  if (delta == 0) h = 0;
  if (cmax == r) h = ((g - b) / delta) % 6;
  if (cmax == g) h = (b - r) / delta + 2;
  if (cmax == b) h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // multiply s, l by 100
  s = toPercentage(s);
  l = toPercentage(l);

  return [h, s, l];
};

// Color modification utils
const calculateDifference = (
  origin: number,
  target: number,
  p: number
): number => Math.round(((1 - p) * origin ** 2 + p * target ** 2) ** 0.5);

const calculateMix = (
  origin: string,
  target: string,
  amount: number
): number[] => {
  const [O_RED, O_GREEN, O_BLUE] = origin.split(', ');
  const [T_RED, T_GREEN, T_BLUE] = target.split(', ');
  const RGB_STORE: Map<string, string> = new Map([
    [O_RED, T_RED],
    [O_GREEN, T_GREEN],
    [O_BLUE, T_BLUE]
  ]);
  return Array.from(RGB_STORE).map(([origin, target]): number => {
    const matchChars = /\D/g;
    const getValueOf = (s: string): number =>
      parseInt(s.replace(matchChars, ''));
    return calculateDifference(getValueOf(origin), getValueOf(target), amount);
  });
};

export const format = (color: string, to = 'rgb'): string => {
  switch (to) {
    case 'rgb':
      if (checkFormat(color, 'hex')) return convert.rgbToHex(color);
      if (checkFormat(color, 'hsl')) return convert.rgbToHSL(color);
      if (checkFormat(color, 'w3c')) return convert.hexToRGB(color);
      if (checkFormat(color, 'rgb'))
        throw Error("You can't convert a color to its own format");
      break;
    case 'hex':
      if (checkFormat(color, 'rgb')) return convert.hexToRGB(color);
      if (checkFormat(color, 'hsl')) return convert.hexToHSL(color);
      if (checkFormat(color, 'w3c')) return convert.hexToW3C(color);
      if (checkFormat(color, 'hex'))
        throw Error("You can't convert a color to its own format");
      break;
    case 'hsl':
      if (checkFormat(color, 'hex')) return convert.hslToHex(color);
      if (checkFormat(color, 'rgb')) return convert.hslToRGB(color);
      if (checkFormat(color, 'w3c')) return convert.hslToW3C(color);
      if (checkFormat(color, 'hsl'))
        throw Error("You can't convert a color to its own format");
      break;
    case 'w3c':
      if (checkFormat(color, 'hex')) return convert.w3CToHex(color);
      if (checkFormat(color, 'rgb')) return convert.w3cToRGB(color);
      if (checkFormat(color, 'hsl')) return convert.w3CToHSL(color);
      if (checkFormat(color, 'w3c'))
        throw Error("You can't convert a color to its own format");
      break;
  }

  throw Error('Not a valid CSS color');
};

export const spin = (
  color: string,
  rotation = 180,
  counterClockwise = false
): string => {
  let [H, S, L] = parseHSL(format(color, 'hsl'));
  const calculatedHue = counterClockwise ? H - rotation : H + rotation;

  H = calculatedHue < 0 ? (calculatedHue + 360) % 360 : calculatedHue % 360;
  S = toPercentage(S);
  L = toPercentage(L);

  return format(`hsl(${H}, ${S}%, ${L}%)`);
};

export const modify = (
  color: string,
  property: string,
  modifier: (currentValue: number) => number
): string => {
  const values = parseHSL(format(color, 'hsl'));
  const [H] = values;
  let [, S, L] = values;

  // Putting S, L in a box to allow the modifier function to access
  // the currentValue feels a little hacky, but it'll do for now
  if (property === 'saturation')
    S = toPercentage(
      [S].map((currentValue: number) => modifier(currentValue))[0]
    );

  if (S < 0 || S > 100)
    throw Error(`Invalid operation: ${S} has dropped below 0% or exceeds 100%`);

  if (property === 'lightness')
    L = toPercentage(
      [L].map((currentValue: number) => modifier(currentValue))[0]
    );

  if (L < 0 || L > 100)
    throw Error(`Invalid operation: ${L} has dropped below 0% or exceeds 100%`);

  return format(`hsl(${H}, ${S}%, ${L}%)`);
};

export const createBlend = (
  color: string,
  target: string,
  amount = 50
): string => {
  // Convert arguments to RGB as required by blend function
  const [R, G, B] = calculateMix(
    format(color),
    format(target),
    toFraction(amount)
  );
  return `rgb(${R}, ${G}, ${B})`;
};
