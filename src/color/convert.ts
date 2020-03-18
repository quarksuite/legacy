import { w3c } from './w3c-colors';

// Conversion helpers
export const intToHex = (x: number): string => x.toString(16).padStart(2, '0');
export const hexToInt = (s: string, s2: string): number => parseInt(s + s2, 16);
export const extractValue = (s: string): number =>
  parseInt(s.replace(/\D+/g, ''));
export const toFraction = (v: number): number => v / 100;
export const toPercentage = (v: number): number => v * 100;

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
  // Since the function does a check for valid HSL beforehand, this will
  // always match. TypeScript requires a double assertion in this case
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
    return toFraction(extractValue(value));
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
  // Since the function does a check for valid RGB beforehand, this will
  // always match. TypeScript requires a double assertion in this case
  // because null can't overlap with other types.
  const values = (rgb.match(/[^rgb(,)]+/g) as unknown) as string[];

  return values.map((channel: string): number => {
    if (channel.includes('%'))
      return Math.round(toFraction(extractValue(channel)) * 255);
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

// Hex -> HSL
export const hexToHSL = (hex: string): string => rgbToHSL(hexToRGB(hex));

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

// RGB -> W3C
export const rgbToW3C = (rgb: string): string => hexToW3C(rgbToHex(rgb));

// HSL -> RGB
export const hslToRGB = (hsl: string): string => {
  const [H, S, L] = parseHSL(hsl);
  const [R, G, B] = calcRGB(H, S, L);

  return `rgb(${R}, ${G}, ${B})`;
};

// HSL -> Hex
export const hslToHex = (hsl: string): string => rgbToHex(hslToRGB(hsl));

// HSL -> W3C
export const hslToW3C = (hsl: string): string => hexToW3C(hslToHex(hsl));

// W3C -> RGB
export const w3cToRGB = (name: string): string => hexToRGB(w3c[name]);

// W3C -> HSL
export const w3cToHSL = (name: string): string => hexToHSL(w3c[name]);

// W3C -> Hex
export const w3cToHex = (name: string): string => w3c[name];

export const format = (color: string, to = 'rgb'): string => {
  switch (to) {
    case 'rgb':
      if (checkFormat(color, 'hex')) return hexToRGB(color);
      if (checkFormat(color, 'hsl')) return hslToRGB(color);
      if (checkFormat(color, 'w3c')) return w3cToRGB(color);
      if (checkFormat(color, 'rgb')) return color;
      break;
    case 'hex':
      if (checkFormat(color, 'rgb')) return rgbToHex(color);
      if (checkFormat(color, 'hsl')) return hslToHex(color);
      if (checkFormat(color, 'w3c')) return w3cToHex(color);
      if (checkFormat(color, 'hex')) return color;
      break;
    case 'hsl':
      if (checkFormat(color, 'hex')) return hexToHSL(color);
      if (checkFormat(color, 'rgb')) return rgbToHSL(color);
      if (checkFormat(color, 'w3c')) return w3cToHSL(color);
      if (checkFormat(color, 'hsl')) return color;
      break;
    case 'w3c':
      if (checkFormat(color, 'hex')) return hexToW3C(color);
      if (checkFormat(color, 'rgb')) return rgbToW3C(color);
      if (checkFormat(color, 'hsl')) return hslToW3C(color);
      if (checkFormat(color, 'w3c')) return color;
      break;
  }

  throw Error(`Invalid: ${color} is not a CSS color`);
};
