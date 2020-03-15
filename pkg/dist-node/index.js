'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));

/**
	X11 color names
	http://www.w3.org/TR/css3-color/#svg-color
*/
const w3cx11 = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflower: '#6495ed',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  laserlemon: '#ffff54',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrod: '#fafad2',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  maroon2: '#7f0000',
  maroon3: '#b03060',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  purple2: '#7f007f',
  purple3: '#a020f0',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
};

const d2Hex = s => (+s).toString(16).padStart(2, '0');
const checkFormat = (test, format) => {
  const list = {
    hex: /^#([\da-f]{3}){1,2}$/i,
    rgb: /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i,
    hsl: /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i
  };
  if (format === 'named') return w3cx11[test] !== undefined;
  return list[format].test(test);
};
const convertPercentage = percentage => {
  return percentage / 100;
}; // CSS RGB & HSL formats can be separated with commas or spaces

const parseSep = str => str.includes(',') ? ',' : ' ';
const hslData = hsl => {
  // First check the format
  if (!checkFormat(hsl, 'hsl')) throw Error('Not a valid hsl format'); // Split values from string

  const data = hsl.substr(4).split(')')[0].split(parseSep(hsl));
  let hValue = +data[0];
  const sValue = convertPercentage(+data[1].substr(0, data[1].length - 1));
  const lValue = convertPercentage(+data[2].substr(0, data[2].length - 1)); // Strip label from hue and convert to degrees (if needed)

  if (data[0].includes('deg')) hValue = +data[0].substr(0, data[0].length - 3);else if (data[0].includes('rad')) hValue = Math.round(+data[0].substr(0, data[0].length - 3) * (180 / Math.PI));else if (data[0].includes('turn')) hValue = Math.round(+data[0].substr(0, data[0].length - 4) * 360);
  if (hValue >= 360) hValue %= 360;
  return [hValue, sValue, lValue];
};
const rgbCalc = (h, s, l) => {
  // Calculate chroma
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = l - c / 2; // Assign channels

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
const rgbData = rgb => {
  // First, check the format
  if (!checkFormat(rgb, 'rgb')) throw Error('Not a valid RGB format'); // Perform additional data transformations

  return rgb.substr(4).split(')')[0].split(parseSep(rgb)).map(v => {
    // Convert from percentage, else leave untouched
    const value = v.includes('%') ? Math.round(convertPercentage(+v.substr(0, v.length - 1)) * 255).toString() : v;
    return value;
  });
};
const hslCalc = (r, g, b) => {
  // Find minimum and maximum channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin; // Set hsl

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

const hex2Rgb = hex => {
  // Check the format
  if (!checkFormat(hex, 'hex')) throw Error('Not a valid hex color format');
  let [r, g, b] = Array.from(Array(3).fill('')); // #RGB || #RRGGBB

  if (hex.length == 4) {
    const rv = hex[1];
    const gv = hex[2];
    const bv = hex[3];
    r = parseInt(rv + rv, 16);
    g = parseInt(gv + gv, 16);
    b = parseInt(bv + bv, 16);
  } else if (hex.length == 7) {
    const r1 = hex[1];
    const r2 = hex[2];
    const g1 = hex[3];
    const g2 = hex[4];
    const b1 = hex[5];
    const b2 = hex[6];
    r = parseInt(r1 + r2, 16);
    g = parseInt(g1 + g2, 16);
    b = parseInt(b1 + b2, 16);
  }

  return `rgb(${r}, ${g}, ${b})`;
}; // RGB -> Hex

const rgb2Hex = rgb => {
  let [r, g, b] = rgbData(rgb);
  r = d2Hex(r);
  g = d2Hex(g);
  b = d2Hex(b);
  return ['#', r, g, b].join('');
}; // RGB -> HSL

const rgb2Hsl = rgb => {
  const data = rgbData(rgb); // Make RGB channels fractions of 1

  const r = +data[0] / 255;
  const g = +data[1] / 255;
  const b = +data[2] / 255;
  const hsl = hslCalc(r, g, b);
  return `hsl(${isNaN(hsl[0]) ? 0 : hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
}; // Hex -> HSL

const hex2Hsl = hex => rgb2Hsl(hex2Rgb(hex)); // Hex -> Named

const hex2Named = hex => {
  // #RGB || #RRGGBB
  if (hex.length == 4) {
    const rv = hex[1];
    const gv = hex[2];
    const bv = hex[3];
    hex = `#${rv}${rv}${gv}${gv}${bv}${bv}`;
  }

  const color = Object.keys(w3cx11).filter(v => {
    return hex === w3cx11[v];
  })[0];
  if (!color) throw Error(`${hex} is not defined on the W3C named colors list`);
  return color;
}; // RGB to Named

const rgb2Named = rgb => hex2Named(rgb2Hex(rgb)); // HSL -> RGB

const hsl2Rgb = hsl => {
  const data = hslData(hsl);
  const h = data[0];
  const s = data[1];
  const l = data[2];
  const rgb = rgbCalc(h, s, l);
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}; // HSL -> Hex

const hsl2Hex = hsl => rgb2Hex(hsl2Rgb(hsl)); // HSL -> Named

const hsl2Named = hsl => hex2Named(rgb2Hex(hsl2Rgb(hsl))); // Named -> RGB

const named2Rgb = name => hex2Rgb(w3cx11[name]); // Named -> HSL

const named2Hsl = name => hex2Hsl(w3cx11[name]); // Named -> Hex

const named2Hex = name => w3cx11[name];

const calculateDifference = (origin, target, p) => Math.round(((1 - p) * origin ** 2 + p * target ** 2) ** 0.5);

const calculateMix = (origin, target, amount) => {
  const [O_RED, O_GREEN, O_BLUE] = origin.split(', ');
  const [T_RED, T_GREEN, T_BLUE] = target.split(', ');
  const RGB_STORE = new Map([[O_RED, T_RED], [O_GREEN, T_GREEN], [O_BLUE, T_BLUE]]);
  return Array.from(RGB_STORE).map(([origin, target]) => {
    const matchChars = /\D/g;

    const getValueOf = s => parseInt(s.replace(matchChars, ''));

    return calculateDifference(getValueOf(origin), getValueOf(target), amount);
  });
};

const hexConvert = (color, to) => {
  if (to === 'rgb') return hex2Rgb(color);
  if (to === 'hsl') return hex2Hsl(color);
  if (to === 'named') return hex2Named(color);
  return color;
};

const rgbConvert = (color, to) => {
  if (to === 'hex') return rgb2Hex(color);
  if (to === 'hsl') return rgb2Hsl(color);
  if (to === 'named') return rgb2Named(color);
  return color;
};

const hslConvert = (color, to) => {
  if (to === 'hex') return hsl2Hex(color);
  if (to === 'rgb') return hsl2Rgb(color);
  if (to === 'named') return hsl2Named(color);
  return color;
};

const namedConvert = (color, to) => {
  if (to === 'hex') return named2Hex(color);
  if (to === 'rgb') return named2Rgb(color);
  if (to === 'hsl') return named2Hsl(color);
  return color;
};

const convert = (color, to = 'rgb') => {
  const hex = checkFormat(color, 'hex');
  const rgb = checkFormat(color, 'rgb');
  const hsl = checkFormat(color, 'hsl');
  const name = checkFormat(color, 'named');
  if (hex) return hexConvert(color, to);
  if (rgb) return rgbConvert(color, to);
  if (hsl) return hslConvert(color, to);
  if (name) return namedConvert(color, to);
  return color;
};
const spin = (color, rotation = 180, counterClockwise = false) => {
  let [h, s, l] = hslData(convert(color, 'hsl'));
  const calculatedHue = counterClockwise ? h - rotation : h + rotation;
  h = calculatedHue < 0 ? (calculatedHue + 360) % 360 : calculatedHue % 360;
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return convert(`hsl(${h}, ${s}%, ${l}%)`);
};
const blend = (color, target, amount = 50) => {
  // Convert arguments to RGB as required by blend function
  color = convert(color);
  target = convert(target);
  amount = convertPercentage(amount);
  const [R, G, B] = calculateMix(color, target, amount);
  return `rgb(${R}, ${G}, ${B})`;
};

const complementOf = color => spin(color);
const negationOf = color => blend(color, complementOf(color));
const mix = (color, withTarget, byAmount = 50) => blend(color, withTarget, byAmount);
const spinHueFrom = (color, toDegrees, counterClockwise = false) => spin(color, toDegrees, counterClockwise);
const changeFormatOf = (color, toTargetFormat = 'rgb') => convert(color, toTargetFormat);
const analogousFrom = (color, spreadBy = 45) => {
  color = convert(color);
  const rightOfOrigin = convert(spin(color, spreadBy));
  const leftOfOrigin = convert(spin(color, spreadBy, true));
  return [leftOfOrigin, color, rightOfOrigin];
};
const complementaryFrom = color => [convert(color), convert(complementOf(color))];
const triadFrom = (color, complementSplitBy = 60) => {
  color = convert(color);
  const complement = convert(complementOf(color));
  const rightOfComplement = convert(spin(complement, complementSplitBy));
  const leftOfComplement = convert(spin(complement, complementSplitBy, true));
  return [color, leftOfComplement, rightOfComplement];
};
const tetradFrom = (color, spreadBy = 90) => {
  color = convert(color);
  const complement = convert(complementOf(color));
  const shiftFromOrigin = convert(spin(color, spreadBy));
  const shiftFromComplement = convert(spin(complement, spreadBy));
  return [color, complement, shiftFromOrigin, shiftFromComplement];
};
const createBlendFrom = (color, toTarget, withContrast = 97, upToRange = 3) => {
  color = convert(color);
  toTarget = convert(toTarget);
  return Array.from(Array(upToRange).fill(color)).map((origin, step) => {
    const target = toTarget;
    const contrast = withContrast;
    const range = upToRange;
    const currentContrast = contrast - contrast / range * step;
    return mix(origin, target, currentContrast);
  }).reverse();
};
const createTintsFrom = (color, withContrast = 97, upToRange = 3) => createBlendFrom(color, convert('#fff'), withContrast, upToRange);
const createTonesFrom = (color, withContrast = 97, upToRange = 3) => createBlendFrom(color, convert('#aaa'), withContrast, upToRange);
const createShadesFrom = (color, withContrast = 97, upToRange = 3) => createBlendFrom(color, convert('#111'), withContrast, upToRange);
class Color {
  constructor(color) {
    _defineProperty(this, "color", 'dodgerblue');

    _defineProperty(this, "origin", this.color);

    _defineProperty(this, "current", this.color);

    _defineProperty(this, "scheme", []);

    _defineProperty(this, "variation", []);

    _defineProperty(this, "palette", []);

    this.color = color;
    this.origin = convert(color);
    this.current = convert(color);
  }

  get originalValue() {
    return this.origin;
  }

  get value() {
    return this.current;
  }

  get schemes() {
    return [...new Set(this.scheme)];
  }

  get variations() {
    return this.variation;
  }

  get palettes() {
    return [this.current, [...new Set(this.variation)]];
  }

  get data() {
    return {
      origin: this.origin,
      current: this.current,
      scheme: this.scheme,
      variation: this.variation,
      palette: this.palette
    };
  }

  log() {
    const {
      origin,
      current,
      scheme,
      variation,
      palette
    } = this.data;

    const read = data => JSON.stringify(data, null, 2);

    console.log(`
color.originalValue: ${origin}
---------------------------------------------------------------
color.value: ${current}
===============================================================
color.schemes: ${read(scheme)};
===============================================================
color.variations: ${read(variation)};
===============================================================
color.palettes: ${read(palette)};
===============================================================
    `);
  }

  formatSwatch(format) {
    this.current = changeFormatOf(this.current, format);
    return this;
  }

  shiftHue(toDegrees, counterClockwise = false) {
    this.current = spinHueFrom(this.current, toDegrees, counterClockwise);
    return this;
  }

  fetchComplement() {
    this.current = complementOf(this.current);
    return this;
  }

  neutralize() {
    this.current = negationOf(this.current);
    return this;
  }

  mix(withTarget, byAmount = 50) {
    this.current = mix(this.current, withTarget, byAmount);
    return this;
  }

  createComplementary() {
    this.scheme = [...this.scheme, ...complementaryFrom(this.current)];
    return this;
  }

  createAnalogous(withSpread = 45) {
    this.scheme = [...this.scheme, ...analogousFrom(this.current, withSpread)];
    return this;
  }

  createTriad(withComplementSplit = 60) {
    this.scheme = [...this.scheme, ...triadFrom(this.current, withComplementSplit)];
    return this;
  }

  createTetrad(withSpread = 90) {
    this.scheme = [...this.scheme, ...tetradFrom(this.current, withSpread)];
    return this;
  } // variant operations


  createBlend(toTarget, withContrast = 97, upToRange = 3) {
    this.variation = [...this.variation, ...createBlendFrom(this.current, toTarget, withContrast, upToRange)];
    return this;
  }

  createTints(withContrast = 97, upToRange = 3) {
    this.variation = [...this.variation, ...createTintsFrom(this.current, withContrast, upToRange)];
    return this;
  }

  createTones(withContrast = 97, upToRange = 3) {
    this.variation = [...this.variation, ...createTonesFrom(this.current, withContrast, upToRange)];
    return this;
  }

  createShades(withContrast = 97, upToRange = 3) {
    this.variation = [...this.variation, ...createShadesFrom(this.current, withContrast, upToRange)];
    return this;
  }

}
const color = color => new Color(color);
const colour = color => new Color(color);
const c = color => new Color(color);

var index = {
  Color,
  color,
  colour,
  c
};

exports.default = index;
