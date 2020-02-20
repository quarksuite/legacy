import { w3cx11 } from "./named-lookup.js";
export const d2Hex = s => (+s).toString(16).padStart(2, '0');
export const checkFormat = (test, format) => {
  const list = {
    hex: /^#([\da-f]{3}){1,2}$/i,
    rgb: /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i,
    hsl: /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i
  };
  if (format === 'named') return w3cx11[test] !== undefined;
  return list[format].test(test);
};
export const convertPercentage = percentage => {
  return percentage / 100;
}; // CSS RGB & HSL formats can be separated with commas or spaces

export const parseSep = str => str.indexOf(',') > -1 ? ',' : ' ';
export const hslData = hsl => {
  // First check the format
  if (!checkFormat(hsl, 'hsl')) throw Error('Not a valid hsl format'); // Split values from string

  let data = hsl.substr(4).split(')')[0].split(parseSep(hsl));
  let hValue = +data[0];
  let sValue = convertPercentage(+data[1].substr(0, data[1].length - 1));
  let lValue = convertPercentage(+data[2].substr(0, data[2].length - 1)); // Strip label from hue and convert to degrees (if needed)

  if (data[0].indexOf('deg') > -1) hValue = +data[0].substr(0, data[0].length - 3);else if (data[0].indexOf('rad') > -1) hValue = Math.round(+data[0].substr(0, data[0].length - 3) * (180 / Math.PI));else if (data[0].indexOf('turn') > -1) hValue = Math.round(+data[0].substr(0, data[0].length - 4) * 360);
  if (hValue >= 360) hValue %= 360;
  return [hValue, sValue, lValue];
};
export const rgbCalc = (h, s, l) => {
  // Calculate chroma
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(h / 60 % 2 - 1));
  let m = l - c / 2; // Assign channels

  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = (r + m) * 255;
  g = (g + m) * 255;
  b = (b + m) * 255;
  return [Math.round(r), Math.round(g), Math.round(b)];
};
export const rgbData = rgb => {
  // First, check the format
  if (!checkFormat(rgb, 'rgb')) throw Error('Not a valid RGB format'); // Perform additional data transformations

  return rgb.substr(4).split(')')[0].split(parseSep(rgb)).map(v => {
    // Convert from percentage, else leave untouched
    let value = v.indexOf('%') > -1 ? Math.round(convertPercentage(+v.substr(0, v.length - 1)) * 255).toString() : v;
    return value;
  });
};
export const hslCalc = (r, g, b) => {
  // Find minimum and maximum channel values
  let cmin = Math.min(r, g, b);
  let cmax = Math.max(r, g, b);
  let delta = cmax - cmin; // Set hsl

  let h = 0;
  let s = 0;
  let l = 0; // Calculate hue

  if (delta == 0) h = 0;
  if (cmax == r) h = (g - b) / delta % 6;
  if (cmax == g) h = (b - r) / delta + 2;
  if (cmax == b) h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360; // Calculate lightness

  l = (cmax + cmin) / 2; // calculate saturation

  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1)); // multiply s, l by 100

  s = +(s * 100).toPrecision(3);
  l = +(l * 100).toPrecision(3);
  return [h, s, l];
};