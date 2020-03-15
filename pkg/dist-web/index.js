import _defineProperty from '@babel/runtime/helpers/defineProperty';

/**
	X11 color names
	http://www.w3.org/TR/css3-color/#svg-color
*/
var w3cx11 = {
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

var d2Hex = s => (+s).toString(16).padStart(2, '0');
var checkFormat = (test, format) => {
  var list = {
    hex: /^#([\da-f]{3}){1,2}$/i,
    rgb: /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i,
    hsl: /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i
  };
  if (format === 'named') return w3cx11[test] !== undefined;
  return list[format].test(test);
};
var convertPercentage = percentage => {
  return percentage / 100;
}; // CSS RGB & HSL formats can be separated with commas or spaces

var parseSep = str => str.includes(',') ? ',' : ' ';
var hslData = hsl => {
  // First check the format
  if (!checkFormat(hsl, 'hsl')) throw Error('Not a valid hsl format'); // Split values from string

  var data = hsl.substr(4).split(')')[0].split(parseSep(hsl));
  var hValue = +data[0];
  var sValue = convertPercentage(+data[1].substr(0, data[1].length - 1));
  var lValue = convertPercentage(+data[2].substr(0, data[2].length - 1)); // Strip label from hue and convert to degrees (if needed)

  if (data[0].includes('deg')) hValue = +data[0].substr(0, data[0].length - 3);else if (data[0].includes('rad')) hValue = Math.round(+data[0].substr(0, data[0].length - 3) * (180 / Math.PI));else if (data[0].includes('turn')) hValue = Math.round(+data[0].substr(0, data[0].length - 4) * 360);
  if (hValue >= 360) hValue %= 360;
  return [hValue, sValue, lValue];
};
var rgbCalc = (h, s, l) => {
  // Calculate chroma
  var c = (1 - Math.abs(2 * l - 1)) * s;
  var x = c * (1 - Math.abs(h / 60 % 2 - 1));
  var m = l - c / 2; // Assign channels

  var r = 0;
  var g = 0;
  var b = 0;

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
var rgbData = rgb => {
  // First, check the format
  if (!checkFormat(rgb, 'rgb')) throw Error('Not a valid RGB format'); // Perform additional data transformations

  return rgb.substr(4).split(')')[0].split(parseSep(rgb)).map(v => {
    // Convert from percentage, else leave untouched
    var value = v.includes('%') ? Math.round(convertPercentage(+v.substr(0, v.length - 1)) * 255).toString() : v;
    return value;
  });
};
var hslCalc = (r, g, b) => {
  // Find minimum and maximum channel values
  var cmin = Math.min(r, g, b);
  var cmax = Math.max(r, g, b);
  var delta = cmax - cmin; // Set hsl

  var h = 0;
  var s = 0;
  var l = 0; // Calculate hue

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

var hex2Rgb = hex => {
  // Check the format
  if (!checkFormat(hex, 'hex')) throw Error('Not a valid hex color format');
  var [r, g, b] = Array.from(Array(3).fill('')); // #RGB || #RRGGBB

  if (hex.length == 4) {
    var rv = hex[1];
    var gv = hex[2];
    var bv = hex[3];
    r = parseInt(rv + rv, 16);
    g = parseInt(gv + gv, 16);
    b = parseInt(bv + bv, 16);
  } else if (hex.length == 7) {
    var r1 = hex[1];
    var r2 = hex[2];
    var g1 = hex[3];
    var g2 = hex[4];
    var b1 = hex[5];
    var b2 = hex[6];
    r = parseInt(r1 + r2, 16);
    g = parseInt(g1 + g2, 16);
    b = parseInt(b1 + b2, 16);
  }

  return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
}; // RGB -> Hex

var rgb2Hex = rgb => {
  var [r, g, b] = rgbData(rgb);
  r = d2Hex(r);
  g = d2Hex(g);
  b = d2Hex(b);
  return ['#', r, g, b].join('');
}; // RGB -> HSL

var rgb2Hsl = rgb => {
  var data = rgbData(rgb); // Make RGB channels fractions of 1

  var r = +data[0] / 255;
  var g = +data[1] / 255;
  var b = +data[2] / 255;
  var hsl = hslCalc(r, g, b);
  return "hsl(".concat(isNaN(hsl[0]) ? 0 : hsl[0], ", ").concat(hsl[1], "%, ").concat(hsl[2], "%)");
}; // Hex -> HSL

var hex2Hsl = hex => rgb2Hsl(hex2Rgb(hex)); // Hex -> Named

var hex2Named = hex => {
  // #RGB || #RRGGBB
  if (hex.length == 4) {
    var rv = hex[1];
    var gv = hex[2];
    var bv = hex[3];
    hex = "#".concat(rv).concat(rv).concat(gv).concat(gv).concat(bv).concat(bv);
  }

  var color = Object.keys(w3cx11).filter(v => {
    return hex === w3cx11[v];
  })[0];
  if (!color) throw Error("".concat(hex, " is not defined on the W3C named colors list"));
  return color;
}; // RGB to Named

var rgb2Named = rgb => hex2Named(rgb2Hex(rgb)); // HSL -> RGB

var hsl2Rgb = hsl => {
  var data = hslData(hsl);
  var h = data[0];
  var s = data[1];
  var l = data[2];
  var rgb = rgbCalc(h, s, l);
  return "rgb(".concat(rgb[0], ", ").concat(rgb[1], ", ").concat(rgb[2], ")");
}; // HSL -> Hex

var hsl2Hex = hsl => rgb2Hex(hsl2Rgb(hsl)); // HSL -> Named

var hsl2Named = hsl => hex2Named(rgb2Hex(hsl2Rgb(hsl))); // Named -> RGB

var named2Rgb = name => hex2Rgb(w3cx11[name]); // Named -> HSL

var named2Hsl = name => hex2Hsl(w3cx11[name]); // Named -> Hex

var named2Hex = name => w3cx11[name];

var calculateDifference = (origin, target, p) => Math.round(((1 - p) * origin ** 2 + p * target ** 2) ** 0.5);

var calculateMix = (origin, target, amount) => {
  var [O_RED, O_GREEN, O_BLUE] = origin.split(', ');
  var [T_RED, T_GREEN, T_BLUE] = target.split(', ');
  var RGB_STORE = new Map([[O_RED, T_RED], [O_GREEN, T_GREEN], [O_BLUE, T_BLUE]]);
  return Array.from(RGB_STORE).map((_ref) => {
    var [origin, target] = _ref;
    var matchChars = /\D/g;

    var getValueOf = s => parseInt(s.replace(matchChars, ''));

    return calculateDifference(getValueOf(origin), getValueOf(target), amount);
  });
};

var hexConvert = (color, to) => {
  if (to === 'rgb') return hex2Rgb(color);
  if (to === 'hsl') return hex2Hsl(color);
  if (to === 'named') return hex2Named(color);
  return color;
};

var rgbConvert = (color, to) => {
  if (to === 'hex') return rgb2Hex(color);
  if (to === 'hsl') return rgb2Hsl(color);
  if (to === 'named') return rgb2Named(color);
  return color;
};

var hslConvert = (color, to) => {
  if (to === 'hex') return hsl2Hex(color);
  if (to === 'rgb') return hsl2Rgb(color);
  if (to === 'named') return hsl2Named(color);
  return color;
};

var namedConvert = (color, to) => {
  if (to === 'hex') return named2Hex(color);
  if (to === 'rgb') return named2Rgb(color);
  if (to === 'hsl') return named2Hsl(color);
  return color;
};

var convert = function convert(color) {
  var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb';
  var hex = checkFormat(color, 'hex');
  var rgb = checkFormat(color, 'rgb');
  var hsl = checkFormat(color, 'hsl');
  var name = checkFormat(color, 'named');
  if (hex) return hexConvert(color, to);
  if (rgb) return rgbConvert(color, to);
  if (hsl) return hslConvert(color, to);
  if (name) return namedConvert(color, to);
  return color;
};
var spin = function spin(color) {
  var rotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 180;
  var counterClockwise = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var [h, s, l] = hslData(convert(color, 'hsl'));
  var calculatedHue = counterClockwise ? h - rotation : h + rotation;
  h = calculatedHue < 0 ? (calculatedHue + 360) % 360 : calculatedHue % 360;
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return convert("hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)"));
};
var blend = function blend(color, target) {
  var amount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  // Convert arguments to RGB as required by blend function
  color = convert(color);
  target = convert(target);
  amount = convertPercentage(amount);
  var [R, G, B] = calculateMix(color, target, amount);
  return "rgb(".concat(R, ", ").concat(G, ", ").concat(B, ")");
};

var complementOf = color => spin(color);
var negationOf = color => blend(color, complementOf(color));
var mix = function mix(color, withTarget) {
  var byAmount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  return blend(color, withTarget, byAmount);
};
var spinHueFrom = function spinHueFrom(color, toDegrees) {
  var counterClockwise = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return spin(color, toDegrees, counterClockwise);
};
var changeFormatOf = function changeFormatOf(color) {
  var toTargetFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb';
  return convert(color, toTargetFormat);
};
var analogousFrom = function analogousFrom(color) {
  var spreadBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 45;
  color = convert(color);
  var rightOfOrigin = convert(spin(color, spreadBy));
  var leftOfOrigin = convert(spin(color, spreadBy, true));
  return [leftOfOrigin, color, rightOfOrigin];
};
var complementaryFrom = color => [convert(color), convert(complementOf(color))];
var triadFrom = function triadFrom(color) {
  var complementSplitBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
  color = convert(color);
  var complement = convert(complementOf(color));
  var rightOfComplement = convert(spin(complement, complementSplitBy));
  var leftOfComplement = convert(spin(complement, complementSplitBy, true));
  return [color, leftOfComplement, rightOfComplement];
};
var tetradFrom = function tetradFrom(color) {
  var spreadBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 90;
  color = convert(color);
  var complement = convert(complementOf(color));
  var shiftFromOrigin = convert(spin(color, spreadBy));
  var shiftFromComplement = convert(spin(complement, spreadBy));
  return [color, complement, shiftFromOrigin, shiftFromComplement];
};
var createBlendFrom = function createBlendFrom(color, toTarget) {
  var withContrast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 97;
  var upToRange = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3;
  color = convert(color);
  toTarget = convert(toTarget);
  return Array.from(Array(upToRange).fill(color)).map((origin, step) => {
    var target = toTarget;
    var contrast = withContrast;
    var range = upToRange;
    var currentContrast = contrast - contrast / range * step;
    return mix(origin, target, currentContrast);
  }).reverse();
};
var createTintsFrom = function createTintsFrom(color) {
  var withContrast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 97;
  var upToRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
  return createBlendFrom(color, convert('#fff'), withContrast, upToRange);
};
var createTonesFrom = function createTonesFrom(color) {
  var withContrast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 97;
  var upToRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
  return createBlendFrom(color, convert('#aaa'), withContrast, upToRange);
};
var createShadesFrom = function createShadesFrom(color) {
  var withContrast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 97;
  var upToRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
  return createBlendFrom(color, convert('#111'), withContrast, upToRange);
};
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
    var {
      origin,
      current,
      scheme,
      variation,
      palette
    } = this.data;

    var read = data => JSON.stringify(data, null, 2);

    console.log("\ncolor.originalValue: ".concat(origin, "\n---------------------------------------------------------------\ncolor.value: ").concat(current, "\n===============================================================\ncolor.schemes: ").concat(read(scheme), ";\n===============================================================\ncolor.variations: ").concat(read(variation), ";\n===============================================================\ncolor.palettes: ").concat(read(palette), ";\n===============================================================\n    "));
  }

  formatSwatch(format) {
    this.current = changeFormatOf(this.current, format);
    return this;
  }

  shiftHue(toDegrees) {
    var counterClockwise = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
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

  mix(withTarget) {
    var byAmount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    this.current = mix(this.current, withTarget, byAmount);
    return this;
  }

  createComplementary() {
    this.scheme = [...this.scheme, ...complementaryFrom(this.current)];
    return this;
  }

  createAnalogous() {
    var withSpread = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 45;
    this.scheme = [...this.scheme, ...analogousFrom(this.current, withSpread)];
    return this;
  }

  createTriad() {
    var withComplementSplit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60;
    this.scheme = [...this.scheme, ...triadFrom(this.current, withComplementSplit)];
    return this;
  }

  createTetrad() {
    var withSpread = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 90;
    this.scheme = [...this.scheme, ...tetradFrom(this.current, withSpread)];
    return this;
  } // variant operations


  createBlend(toTarget) {
    var withContrast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 97;
    var upToRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
    this.variation = [...this.variation, ...createBlendFrom(this.current, toTarget, withContrast, upToRange)];
    return this;
  }

  createTints() {
    var withContrast = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 97;
    var upToRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    this.variation = [...this.variation, ...createTintsFrom(this.current, withContrast, upToRange)];
    return this;
  }

  createTones() {
    var withContrast = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 97;
    var upToRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    this.variation = [...this.variation, ...createTonesFrom(this.current, withContrast, upToRange)];
    return this;
  }

  createShades() {
    var withContrast = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 97;
    var upToRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    this.variation = [...this.variation, ...createShadesFrom(this.current, withContrast, upToRange)];
    return this;
  }

}
var color = color => new Color(color);
var colour = color => new Color(color);
var c = color => new Color(color);

var index = {
  Color,
  color,
  colour,
  c
};

export default index;
