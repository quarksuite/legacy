function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * A set of utilities to streamline color token generation and modification.
 * Made available in case you require baremetal manipulation of colors.
 */
import chroma from 'chroma-js';

/**
 * Maps a color palette to hex format.
 */
var maptoCSS = function maptoCSS(palette) {
  return palette.map(function (c) {
    return chroma(c).hex();
  });
};
/** Converts a percentage to a ratio */


var convert = function convert(percent) {
  return parseFloat((percent / 100).toPrecision(2));
};
/** Parses the named contrast options into something usable by chroma */


var setContrast = function setContrast(contrast) {
  if (contrast === 'low') return convert(30);
  if (contrast === 'med') return convert(50);
  if (contrast === 'high') return convert(95); // Limit input from 0 to 100 (percent)

  if (contrast < 0 || contrast > 100) throw Error("contrast: expected value 0 < x < 100 but received ".concat(contrast));
  return convert(contrast);
};
/**
 * Generates a range of colors.
 */


var generate = function generate(colorRange) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$mode = options.mode,
      mode = _options$mode === void 0 ? 'lab' : _options$mode,
      _options$range = options.range,
      range = _options$range === void 0 ? 'material' : _options$range;
  var colorScale = chroma.scale(colorRange).mode(mode); // If named range, set output colors explicitly

  if (range === 'minimal') return colorScale.colors(2 + 1);
  if (range === 'material') return colorScale.colors(4 + 1); // Otherwise numeric range

  return colorScale.colors(range + 1);
};
/**
 * Merges a color with a target to blend. Strips
 * color from output to avoid redundancy.
 *
 * ```ts
 * import {blend} from '@quarksilver/core';
 *
 * blend('#f00', '#00f');
 * ```
 */


export var blend = function blend(color, target) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$contrast = options.contrast,
      contrast = _options$contrast === void 0 ? 'high' : _options$contrast,
      mode = options.mode;
  var base = chroma(color).hex(); // blend color with target

  var blend = chroma.mix(color, target, setContrast(contrast), mode).hex(); // Generate variants

  var _generate = generate([base, blend], options),
      _generate2 = _toArray(_generate),
      variants = _generate2.slice(1);

  return variants;
};
/**
 * Alters the hue of a color
 */

var setHue = function setHue(color, rotation) {
  return chroma(color).set('hsl.h', rotation).hex();
};
/**
 * Returns a collection of tints for a color
 *
 * ```ts
 * import {tints} from '@quarksilver/core';
 *
 * tints('#f00');
 * ```
 * */


export var tints = function tints(color) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return blend(color, '#fff', options);
};
/**
 * Returns a collection of tones for a color
 *
 * ```ts
 * import {tones} from '@quarksilver/core';
 *
 * tones('#f00');
 * ```
 * */

export var tones = function tones(color) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return blend(color, '#aaa', options);
};
/**
 * Returns a collection of shades for a color
 *
 * ```ts
 * import {shades} from '@quarksilver/core';
 *
 * shades('#f00');
 * ```
 * */

export var shades = function shades(color) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return blend(color, '#111', options);
};
/**
 * Fetches the complement (opposite) of a color.
 *
 * ```ts
 * import {complement} from '@quarksilver/core';
 *
 * complement('#f00') // #0ff;
 * ```
 */

export var complement = function complement(color) {
  return setHue(color, '+180');
};
/**
 * Neutralizes a color with its complement;
 *
 * ```ts
 * import {neutralize} from '@quarksilver/core';
 *
 * neutralize('#f00') // #aaa
 * ```
 */

export var neutralize = function neutralize(color) {
  return chroma.mix(color, complement(color), 0.5).hex();
};
/**
 * Splits a color on either side. Tuple represents [leftOfTarget, rightOfTarget]
 * @param color - any valid CSS color
 * @param distance - angular distance to split from target
 *
 * ```ts
 * import {split} from '@quarksilver/core';
 *
 * split('#f00', 60) // ['#f0f', '#ff0']
 * ```
 */

export var split = function split(color) {
  var degrees = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
  return [setHue(color, "-".concat(degrees)), setHue(color, "+".concat(degrees))];
};
/**
 * Spreads a range of colors on either side of target

 * ```ts
 * import {spread} from '@quarksilver/core';
 *
 * spread('#f00');
 * ```
 */

export var spread = function spread(color) {
  var degrees = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
  var range = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var terminals = split(color, degrees);
  return maptoCSS(generate(terminals, {
    range: range,
    mode: 'lab'
  }));
};
/**
 * Inscribes a triangle of colors.
 *
 * A = origin, BC = Equidistant points split from A
 *
 * degrees = 120 is an equilateral triad
 *
 * degrees = 90 is an isosceles clash
 *
 * ```ts
 * import {triad} from '@quarksilver/core';
 *
 * triad('f00'); // ['#f00', '#00f', '#0f0']
 * ```
 */

export var triad = function triad(color) {
  var degrees = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 120;
  var a = color;
  var targets = split(color, degrees);
  var b = targets[0];
  var c = targets[1];
  return [a, b, c];
};
/**
 * Inscribes a rectangle of colors
 *
 * A = origin, B = degrees right of a
 *
 * C = complement of a, D = complement of b
 *
 * degrees = 90 is a perfect square
 *
 * degrees = 60 is a tetrad
 *
 * ```ts
 * import {tetrad} from '@quarksilver/core';
 *
 * tetrad('#f00'); // ['#f00', '#0ff', '#ff0', '#f0f']
 * ```
 */

export var tetrad = function tetrad(color) {
  var degrees = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
  var a = color;
  var b = split(a, degrees)[1];
  var c = complement(a);
  var d = complement(b);
  return [a, c, b, d];
};

var scale = function scale(array) {
  return array.reduce(function (container, value, i) {
    var indexToOne = ++i;
    var scaleKey = indexToOne < 10 ? indexToOne.toString().padEnd(3, '0') : indexToOne.toString().padEnd(4, '0');
    return _objectSpread({}, container, _defineProperty({}, scaleKey, {
      value: value
    }));
  }, {});
};

var transform = function transform(collection, key, palette) {
  return collection.reduce(function (container, value, _, array) {
    // If index, then we've got a palette
    if (palette) {
      return _objectSpread({}, container, {}, _defineProperty({}, key, scale(array)));
    } // otherwise, it's a swatch


    return _objectSpread({}, container, {}, _defineProperty({}, key, {
      value: value
    }));
  }, {});
};
/**
 * Transforms a collection of colors into tokens consumable by Style Dictionary
 *
 * `palette` outputs a scale, otherwise it assumes a swatch
 *
 * ```ts
 * import {tokenize, blend} from '@quarksilver/core';
 *
 * tokenize(blend('#f00', '#ff0'), 'main', true)
 * ```
 */


export var tokenize = function tokenize(data, key) {
  var palette = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!key) throw Error("key: expected a string, received ".concat(key));
  return palette ? transform(data, key, palette) : transform(data, key);
};