// Conversions modified from: https://css-tricks.com/converting-color-spaces-in-javascript/

const d2Hex = (value: number) => value.toString(16);

const checkFormat = (test: string, format: string) => {
  interface Format {
    [index: string]: RegExp;
  }

  const list: Format = {
    hex: /^#([\da-f]{3}){1,2}$/i,
    hex8: /^#([\da-f]{4}){1,2}$/i,
    rgb: /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i,
    rgba: /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i,
    hsl: /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i,
    hsla: /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i
  };

  return list[format].test(test);
};

const convertPercentage = (percentage: number) => {
  return percentage / 100;
};

const zeroPad = (value: string) => value.padStart(2, '0');

// CSS RGB format can be separated with commas or spaces
const parseSep = (str: string) => (str.indexOf(',') > -1 ? ',' : ' ');

const rgbData = (rgb: string) => {
  // First, check the format
  if (!checkFormat(rgb, 'rgb')) throw Error('Not a valid RGB format');

  // Perform additional data transformations
  return rgb
    .substr(4)
    .split(')')[0]
    .split(parseSep(rgb))
    .map(v => {
      // Convert from percentage, else leave untouched
      let value =
        v.indexOf('%') > -1
          ? Math.round(
              convertPercentage(+v.substr(0, v.length - 1)) * 255
            ).toString()
          : v;

      return value.trimStart();
    })
    .map(v => (v === '0' ? zeroPad(v) : v));
};

const rgbaData = (rgba: string) => {
  // First, check the format
  if (!checkFormat(rgba, 'rgba')) throw Error('Not a valid RGBA format');

  let substr = rgba
    .substr(5)
    .split(')')[0]
    .split(parseSep(rgba));

  // Strip slash if using space-separated syntax
  if (substr.indexOf('/') > -1) substr.splice(3, 1);

  // Perform additional data transformations
  return substr
    .map(v => {
      // Convert from percentage, else leave untouched
      let value =
        v.indexOf('%') > -1
          ? Math.round(
              convertPercentage(+v.substr(0, v.length - 1)) * 255
            ).toString()
          : v;

      return value.trimStart();
    })
    .map(v => (v === '0' ? zeroPad(v) : v));
};

const hslCalc = (r: number, g: number, b: number) => {
  // Find minimum and maximum channel values
  let cmin = Math.min(r, g, b);
  let cmax = Math.max(r, g, b);
  let delta = cmax - cmin;

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
  s = +(s * 100).toPrecision(1);
  l = +(l * 100).toPrecision(1);

  return [h, s, l];
};

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

// RGB -> HSL
// Modified from: https://css-tricks.com/converting-color-spaces-in-javascript/
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
// Modified from: https://css-tricks.com/converting-color-spaces-in-javascript/
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
