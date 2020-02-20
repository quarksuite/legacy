function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

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

var parseSep = str => str.indexOf(',') > -1 ? ',' : ' ';
var hslData = hsl => {
  // First check the format
  if (!checkFormat(hsl, 'hsl')) throw Error('Not a valid hsl format'); // Split values from string

  var data = hsl.substr(4).split(')')[0].split(parseSep(hsl));
  var hValue = +data[0];
  var sValue = convertPercentage(+data[1].substr(0, data[1].length - 1));
  var lValue = convertPercentage(+data[2].substr(0, data[2].length - 1)); // Strip label from hue and convert to degrees (if needed)

  if (data[0].indexOf('deg') > -1) hValue = +data[0].substr(0, data[0].length - 3);else if (data[0].indexOf('rad') > -1) hValue = Math.round(+data[0].substr(0, data[0].length - 3) * (180 / Math.PI));else if (data[0].indexOf('turn') > -1) hValue = Math.round(+data[0].substr(0, data[0].length - 4) * 360);
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
    var value = v.indexOf('%') > -1 ? Math.round(convertPercentage(+v.substr(0, v.length - 1)) * 255).toString() : v;
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

var linBlend = (c0, c1, p) => {
  var i = parseInt,
      r = Math.round,
      P = 1 - p,
      [a, b, c, d] = c0.split(','),
      [e, f, g, h] = c1.split(','),
      x = d || h,
      d = x ? ',' + (!d ? h : !h ? d : r((parseFloat(d) * P + parseFloat(h) * p) * 1000) / 1000 + ')') : ')';
  return 'rgb' + (x ? 'a(' : '(') + r(i(a[3] == 'a' ? a.slice(5) : a.slice(4)) * P + i(e[3] == 'a' ? e.slice(5) : e.slice(4)) * p) + ',' + r(i(b) * P + i(f) * p) + ',' + r(i(c) * P + i(g) * p) + d;
};

var logBlend = (c0, c1, p) => {
  var i = parseInt,
      r = Math.round,
      P = 1 - p,
      [a, b, c, d] = c0.split(','),
      [e, f, g, h] = c1.split(','),
      x = d || h,
      d = x ? ',' + (!d ? h : !h ? d : r((parseFloat(d) * P + parseFloat(h) * p) * 1000) / 1000 + ')') : ')';
  return 'rgb' + (x ? 'a(' : '(') + r((P * i(a[3] == 'a' ? a.slice(5) : a.slice(4)) ** 2 + p * i(e[3] == 'a' ? e.slice(5) : e.slice(4)) ** 2) ** 0.5) + ',' + r((P * i(b) ** 2 + p * i(f) ** 2) ** 0.5) + ',' + r((P * i(c) ** 2 + p * i(g) ** 2) ** 0.5) + d;
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
  var [h, s, l] = hslData(convert(color, 'hsl'));
  h = (h + rotation) % 360;
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return convert("hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)"));
};
var blend = function blend(color, target) {
  var amount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'logarithmic';
  // Convert arguments to RGB as required by blend function
  color = convert(color);
  target = convert(target);
  amount = convertPercentage(amount); // Set linear and logarithmic blends

  var linear = linBlend(color, target, amount);
  var logarithmic = logBlend(color, target, amount); // Set the formatting of result

  var format = c => convert(spin(c, 0));

  return mode === 'linear' ? format(linear) : format(logarithmic);
};

/**
 * Grab the complement of a given color.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * color.complement('#348ec9')
 * ```
 *
 * @param color - the color to transform
 * @returns The color opposite in hue as RGB
 **/

var complement = color => spin(color);
/**
 * Negate a color with its complement. Great for neutral palettes.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * color.neutralize('#348ec9')
 * ```
 *
 * @param color - the color to transform
 * @returns An even mix of the color and and its complement (neutral) as RGB
 **/

var neutralize = color => blend(color, complement(color));
/**
 * Returns the mix of two colors by a given amount.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * color.mix('#348ec9', 'orange')
 *
 * // with amount
 * color.mix('#348ec9', 'orange', 30)
 * ```
 *
 * @param color - The color to transform
 * @param target - The color to mix
 * @param amount? - how much you want to mix a with b (0-100)
 * @returns A mix of two colors as RGB
 **/

var mix = function mix(color, target) {
  var amount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  return blend(color, target, amount);
};
/**
 * Returns a color converted to another format
 *
 * @remarks
 * Usage:
 * ```ts
 * // default
 * color.format('#348ec9');
 *
 * // pass in another format
 * color.format('#348ec9', 'hsl');
 * ```
 *
 * @param color - The color to transform
 * @param format - the CSS color format to output (`rgb` by default)
 * @returns A newly formatted color
 **/

var format = function format(color) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb';
  return convert(color, format);
};

var complementary = color => [convert(color), convert(complement(color))];

var splitComplementary = function splitComplementary(color) {
  var distance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
  var accented = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var a = convert(color);
  var opposite = convert(complement(a)); // right of complement

  var b = convert(spin(opposite, 360 + distance)); // left of complement

  var c = convert(spin(opposite, 360 - distance));
  return accented ? [a, opposite, b, c] : [a, b, c];
};

var analogous = function analogous(color) {
  var distance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
  var accented = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var a = convert(color, 'rgb');
  var opposite = convert(complement(a));
  var b = convert(spin(a, 360 + distance));
  var c = convert(spin(a, 360 + distance * 2));
  return accented ? [a, b, c, opposite] : [a, b, c];
};

var dualColor = function dualColor(color) {
  var distance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
  var a = convert(color, 'rgb');
  var b = convert(spin(color, 360 + distance), 'rgb');
  var c = convert(complement(a), 'rgb');
  var d = convert(complement(b), 'rgb');
  return [a, b, c, d];
};
/**
 * Returns a basic color scheme.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // Set a complementary scheme
 * color.scheme('#348ec9', 'complementary');
 *
 * // split, analogous, dual allow setting a distance
 * color.scheme('#348ec9', 'split', { distance: 45 });
 *
 * // split, analogous, also allow setting the complement as an accent
 * color.scheme('#348ec9', 'analogous', { accented: true });
 * ```
 *
 * @param color - The base color to generate a scheme from
 * @param type - The type of scheme to generate
 * @param options - Additional options to modify the generated scheme
 * @returns The generated scheme as an array of RGB values
 **/


var scheme = function scheme(color, type) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // Initialize the options
  var {
    distance = 15,
    accented = false
  } = options; // Check the type and generate the appropriate scheme

  switch (type) {
    case 'complementary':
      return complementary(color);

    case 'analogous':
      return analogous(color, distance, accented);

    case 'split':
      return splitComplementary(color, distance, accented);

    case 'triadic':
      return splitComplementary(color, 60);

    case 'dual':
      return dualColor(color, distance);

    case 'tetradic':
      return dualColor(color, 90);

    default:
      throw Error('You must define a scheme from the available values (complementary, analogous, split, triadic, dual, tetradic)');
  }
};
/**
 * Generate a set of variants from a base color.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // Generate two tints (97% contrast, logarithmic blend)
 * color.variants('#348ec9', '#ffffff');
 *
 * // Generate one tone
 * color.variants('#348ec9', '#aaaaaa', { limit: 1 });
 *
 * // Generate four shades with a linear blend mode
 * color.variants('#348ec9', '#111111', { limit: 4, mode: 'linear' });
 * ```
 *
 * @param color - The base color to generate variants for
 * @param target - The color to blend for variants
 * @param options - Additional options to modify the generated variants
 * @returns The generated variants as an array of RGB values
 **/

var variants = function variants(color, target) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // Initialize the options
  var {
    contrast = 97,
    limit = 2,
    mode = 'logarithmic'
  } = options; // Convert colors to format accepted by blend function

  color = convert(color, 'rgb');
  target = convert(target, 'rgb'); // Generate the variants

  return Array.from(Array(limit).fill(color)).map((value, index) => {
    var amount = contrast - contrast / limit * index;
    return blend(value, target, amount, mode);
  }).reverse();
};

var colorUtils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  complement: complement,
  neutralize: neutralize,
  mix: mix,
  format: format,
  scheme: scheme,
  variants: variants
});

var fonts = {
  sans: '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
  serif: 'Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
  monospace: 'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace'
};
/**
 * Fetches a system font stack to help with quick prototyping;
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // for sans
 * typography.system('sans');
 *
 * // for serif
 * typography.system('serif');
 *
 * // for monospace
 * typography.system('monospace');
 * ```
 *
 * @param family - the system family to output
 * @returns A system font stack
 **/

var system = family => fonts[family];

var typographyUtils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  system: system
});

// A collection of ratios for building modular scales.
// src: https://modularscale.com

/** Generates a fibonacci sequence for calculating the golden mean */
function* fibonacci(n) {
  if (n <= 1) yield n;
  yield fibonacci(n - 1).next().value + fibonacci(n - 2).next().value;
}

function goldenRatio() {
  var f = Array.from(Array(16).fill(0), (_value, n) => {
    return fibonacci(n).next().value;
  });
  var a = f[f.length - 2];
  var b = f[f.length - 1]; // Divide the largest numbers for accurate ratio.

  return b / a;
}

var golden = goldenRatio();
var ratios = {
  min2nd: 1.067,
  maj2nd: 1.125,
  min3rd: 1.2,
  maj3rd: 1.25,
  perf4th: 1.333,
  dim5th: 1.414,
  perf5th: 1.5,
  min6th: 1.6,
  golden,
  maj6th: 1.667,
  min7th: 1.778,
  maj7th: 1.875,
  octave: 2,
  maj10th: 2.5,
  maj12th: 3,
  x2octave: 4
};

/**
 * Create a modular scale.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // No args
 * scale.create();
 *
 * // Just a base
 * scale.create(1.25);
 *
 * // With a named ratio
 * scale.create(1, 'maj3rd');
 *
 * // With a custom ratio
 * scale.create(1, 1.72);
 *
 * // With a custom limit
 * scale.create(1, 'octave', 4);
 *
 * // Invert the scale
 * scale.create(1, 'octave', 4, true);
 * ```
 *
 * @param base? - The value to generate from
 * @param ratio? - The scale ratio
 * @param limit? - Number of values to output
 * @param invert? - reverse the scale (divide by the ratio)
 * @returns A modular scale
 **/

var create = function create() {
  var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'golden';
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;
  var invert = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var r = 0; // Check if ratio is a named ratio or custom one

  if (ratios[ratio]) {
    r = ratios[ratio];
  } else if (typeof ratio === 'number') {
    r = ratio;
  } else {
    throw Error('Not a valid ratio arg, exiting');
  }

  return Array.from(Array(limit).fill(0), (_value, n) => {
    var multiplied = parseFloat((base * r ** n).toPrecision(6));
    var divided = parseFloat((base / r ** n).toPrecision(6));
    return invert ? divided : multiplied;
  });
};
/**
 * Modifies an existing `scale` from `n` value and a `modifier` function.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * scale.modify(scale.create(), 10, (n, v) => n + v)
 * ```
 *
 * @param scale - a new or existing scale to transform
 * @param n - a value to pass through the scale
 * @param modifier - the function that will transform the scale values
 **/

var modify = (scale, n, modifier) => scale.map(value => parseFloat(modifier(n, value).toPrecision(6)));
/**
 * Merges modular scales and removes duplicate values.
 *
 * Use to create multithreaded scales.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * scale.merge(scale.create(), scale.create(1.25), scale.create(2))
 * ```
 *
 * @param scales - The scales to merge (recommend no more than three)
 * @return - a new scale containing all unique values of sources
 **/

var merge = function merge() {
  return Array.prototype.concat(...arguments).sort((a, b) => a - b).filter((v, i, a) => a.indexOf(v) === i);
};
/**
 * Outputs a scale with the desired `unit` and `precision`.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // default
 * scale.output(scale.create(1.25, 'maj3rd', 8))
 *
 * // With a unit
 * scale.output(scale.create(), 'em')
 *
 * // And precision
 * scale.output(scale.create(), 'em', 3)
 * ```
 *
 * @param scale - the scale to output
 * @param unit? - the units for output (does not convert values)
 * @param precision? - how many decimal places for output
 * @returns A modular scale with units
 **/

var output = function output(scale) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rem';
  var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  return scale.map(v => parseFloat(v.toPrecision(precision)) + unit);
};

var scaleUtils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create,
  modify: modify,
  merge: merge,
  output: output
});

var color = _objectSpread2({}, colorUtils);
var typography = _objectSpread2({}, typographyUtils);
var scale = _objectSpread2({}, scaleUtils);

export { color, scale, typography };
