/**
 * A set of utilities to streamline color token generation and modification.
 * Made available in case you require baremetal manipulation of colors.
 */

import chroma, { InterpolationMode } from 'chroma-js';
import { ColorOptions } from '../schema';

/**
 * Maps a color palette to hex format.
 */
const maptoCSS = (palette: string[]): string[] =>
  palette.map((c): string => chroma(c).hex());

/** Converts a percentage to a ratio */
const convert = (percent: number): number =>
  parseFloat((percent / 100).toPrecision(2));

/** Parses the named contrast options into something usable by chroma */
const setContrast = (contrast: number | 'low' | 'med' | 'high'): number => {
  if (contrast === 'low') return convert(30);
  if (contrast === 'med') return convert(60);
  if (contrast === 'high') return convert(95);

  // Limit input from 0 to 100 (percent)
  if (contrast < 0 || contrast > 100)
    throw Error(
      `contrast: expected value 0 < x < 100 but received ${contrast}`
    );

  return convert(contrast);
};

/**
 * Generates a range of colors.
 */
const generate = (
  colorRange: string[],
  options: ColorOptions = {}
): string[] => {
  const { mode = 'lab' as InterpolationMode, range = 'material' } = options;
  const colorScale = chroma.scale(colorRange).mode(mode);

  // If named range, set output colors explicitly
  if (range === 'minimal') return colorScale.colors(2 + 1);
  if (range === 'material') return colorScale.colors(4 + 1);

  // Otherwise numeric range
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
export const blend = (
  color: string,
  target: string,
  options: ColorOptions = {}
): string[] => {
  const { contrast = 'high', mode } = options;

  const base = chroma(color).hex();

  // blend color with target
  const blend = chroma.mix(color, target, setContrast(contrast), mode).hex();

  // Generate variants
  const [, ...variants] = generate([base, blend], options);

  return variants;
};

/**
 * Alters the hue of a color
 */
const setHue = (color: string, rotation: string): string =>
  chroma(color)
    .set('hsl.h', rotation)
    .hex();

/**
 * Returns a collection of tints for a color
 *
 * ```ts
 * import {tints} from '@quarksilver/core';
 *
 * tints('#f00');
 * ```
 * */
export const tints = (color: string, options: ColorOptions = {}): string[] =>
  blend(color, '#fff', options);

/**
 * Returns a collection of tones for a color
 *
 * ```ts
 * import {tones} from '@quarksilver/core';
 *
 * tones('#f00');
 * ```
 * */
export const tones = (color: string, options: ColorOptions = {}): string[] =>
  blend(color, '#aaa', options);

/**
 * Returns a collection of shades for a color
 *
 * ```ts
 * import {shades} from '@quarksilver/core';
 *
 * shades('#f00');
 * ```
 * */
export const shades = (color: string, options: ColorOptions = {}): string[] =>
  blend(color, '#111', options);

/**
 * Fetches the complement (opposite) of a color.
 *
 * ```ts
 * import {complement} from '@quarksilver/core';
 *
 * complement('#f00') // #0ff;
 * ```
 */
export const complement = (color: string): string => setHue(color, '+180');

/**
 * Neutralizes a color with its complement;
 *
 * ```ts
 * import {neutralize} from '@quarksilver/core';
 *
 * neutralize('#f00') // #aaa
 * ```
 */
export const neutralize = (color: string): string =>
  chroma.mix(color, complement(color), 0.5).hex();

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
export const split = (
  color: string,
  degrees: number = 60
): [string, string] => [
  setHue(color, `-${degrees}`),
  setHue(color, `+${degrees}`)
];

/**
 * Spreads a range of colors on either side of target

 * ```ts
 * import {spread} from '@quarksilver/core';
 *
 * spread('#f00');
 * ```
 */
export const spread = (
  color: string,
  degrees: number = 60,
  range: number = 2
): string[] => {
  const terminals = split(color, degrees);
  return maptoCSS(generate(terminals, { range, mode: 'lab' }));
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
export const triad = (
  color: string,
  degrees: number = 120
): [string, string, string] => {
  const a = color;
  const b = split(a, degrees)[0],
    c = split(a, degrees)[1];

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
export const tetrad = (
  color: string,
  degrees: number = 60
): [string, string, string, string] => {
  const a = color;
  const b = split(a, degrees)[1];
  const c = complement(a);
  const d = complement(b);

  return [a, c, b, d];
};

const scale = (data: string[]): object =>
  data.reduce((container, value, i) => {
    const indexToOne = ++i;
    const scaleKey =
      indexToOne < 10
        ? indexToOne.toString().padEnd(3, '0')
        : indexToOne.toString().padEnd(4, '0');
    return { ...container, [scaleKey]: { value } };
  }, {});

const format = (data: string[], key: string): object => {
  return data.reduce(
    (container, _value, _i, array) => ({
      ...container,
      ...{ [key]: scale(array) }
    }),
    {}
  );
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
export const tokenize = (data: string[] | string, key: string) => {
  // Can't create an object without a key
  if (!key) throw Error(`key: expected a string, received ${key}`);
  // Can't populate a palette without data
  if (!data) return {};
  // Check the type of input. String indicates swatch, array indicates palette
  return typeof data === 'string'
    ? { [key]: { value: data } }
    : format(data, key);
};
