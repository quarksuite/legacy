import { w3c } from "./w3c-colors";
import { compose } from "../toolbox";

// Conversion helpers
const intToHex = (x: number): string => x.toString(16).padStart(2, "0");
const hexToInt = (s: string, s2: string): number => parseInt(s + s2, 16);
const extractValue = (s: string): number => parseInt(s.replace(/\D+/g, ""));

export const parseColor = (color: string): string => {
  interface Categories {
    [index: string]: RegExp | boolean;
  }

  const formats: Categories = {
    hex: /^#([\da-f]{3}){1,2}$/i,
    rgb: /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i,
    hsl: /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i,
    w3c: !!w3c[color]
  };

  return Object.keys(formats)
    .filter((category: string) => {
      if (category === "w3c") return formats[category];
      return (formats[category] as RegExp).test(color);
    })
    .join("");
};

export const toFraction = (v: number): number => v / 100;
export const toPercentage = (v: number): number => v * 100;

const parsePercent = compose(toFraction, extractValue);

export const parseHSL = (hsl: string): number[] => {
  // TypeScript requires a double assertion in this case
  // because null can't overlap with other types.
  const values = (hsl.toString().match(/[^hsl(,)]+/g) as unknown) as string[];

  let [H] = values.map((value: string): number => {
    if (value.includes("deg")) return extractValue(value);
    if (value.includes("rad"))
      return Math.round(extractValue(value) * (180 / Math.PI));
    if (value.includes("turn")) return Math.round(extractValue(value)) * 360;
    return extractValue(value);
  });

  if (H >= 360) H %= 360;

  const [, S, L] = values.map((value: string): number => {
    return parsePercent(value);
  });

  return [H, S, L];
};

// https://www.rapidtables.com/convert/color/hsl-to-rgb.html
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

const calcRGB = (h: number, s: number, l: number): number[] => {
  // Calculate chroma
  const C = (1 - Math.abs(2 * l - 1)) * s;
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - C / 2;

  // Evaluate channels
  const [R, G, B] = Array.from(calcChannels(C, X, h))
    .filter(([, condition]: [number[], boolean]): boolean => condition)
    .flatMap(([evaluation]: [number[], boolean]): number[] => evaluation)
    .map((channel: number): number => Math.round((channel + m) * 255));

  return [R, G, B];
};

const parseRGB = (rgb: string): number[] => {
  // TypeScript requires a double assertion in this case
  // because null can't overlap with other types.
  const values = (rgb.match(/[^rgb(,)]+/g) as unknown) as string[];

  return values.map((channel: string): number => {
    if (channel.includes("%")) return Math.round(parsePercent(channel) * 255);
    return extractValue(channel);
  });
};

const calcHSL = (r: number, g: number, b: number): number[] => {
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

const formatHexValues = (hex: string): (string | string[])[] => {
  const [, ...values] = hex;

  return values.length === 3
    ? values.map((C: string): string[] => C.repeat(2).split(""))
    : values
        .map((C: string, i: number, a: string[]): string[] | string => {
          switch (i) {
            case 0:
            case 2:
            case 4:
              return [C, a[i + 1]];
          }
          return C;
        })
        .filter((v: string[] | string): boolean => Array.isArray(v));
};

const parseHex = (hex: string): number[] =>
  formatHexValues(hex).map(([x, y]: string | string[]): number =>
    hexToInt(x, y)
  );

// Hex -> RGB
const hexToRGB = (hex: string): string => {
  const [R, G, B] = parseHex(hex);
  return `rgb(${R}, ${G}, ${B})`;
};

// RGB -> Hex
const rgbToHex = (rgb: string): string => {
  const hexValues = parseRGB(rgb).map((channel: number): string => {
    return intToHex(channel);
  });

  return ["#", ...hexValues].join("");
};

// RGB -> HSL
const rgbToHSL = (rgb: string): string => {
  const [R, G, B] = parseRGB(rgb);
  const [H, S, L] = calcHSL(R, G, B);

  return `hsl(${isNaN(H) ? 0 : H}, ${Math.round(
    toPercentage(S)
  )}%, ${Math.round(toPercentage(L))}%)`;
};

// HSL -> RGB
const hslToRGB = (hsl: string): string => {
  const [H, S, L] = parseHSL(hsl);
  const [R, G, B] = calcRGB(H, S, L);

  return `rgb(${R}, ${G}, ${B})`;
};

// Hex -> HSL
const hexToHSL = compose(rgbToHSL, hexToRGB);

// HSL -> Hex
const hslToHex = compose(rgbToHex, hslToRGB);

// W3C -> RGB
const w3cToRGB = (name: string): string => hexToRGB(w3c[name]);

// W3C -> HSL
const w3cToHSL = (name: string): string => hexToHSL(w3c[name]);

// W3C -> Hex
const w3cToHex = (name: string): string => w3c[name];

const ColorError = (format: string): Error => {
  return new Error("Invalid format: cannot be converted");
};

export const toHex = (color: string): string | Error => {
  const format = parseColor(color);

  if (format === "rgb") return rgbToHex(color);
  if (format === "hsl") return hslToHex(color);
  if (format === "w3c") return w3cToHex(color);
  if (format === "hex") return color;

  throw ColorError(format);
};

export const toHSL = (color: string): string | Error => {
  const format = parseColor(color);

  if (format === "hex") return hexToHSL(color);
  if (format === "rgb") return rgbToHSL(color);
  if (format === "w3c") return w3cToHSL(color);
  if (format === "hsl") return color;

  throw ColorError(format);
};

export const toRGB = (color: string): string | Error => {
  const format = parseColor(color);

  if (format === "hex") return hexToRGB(color);
  if (format === "hsl") return hslToRGB(color);
  if (format === "w3c") return w3cToRGB(color);
  if (format === "rgb") return color;

  throw ColorError(format);
};
