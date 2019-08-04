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
 */
const blend = (
  color: string,
  target: string,
  options: ColorOptions = {}
): string[] => {
  const { contrast = 'high', mode } = options;

  const base = chroma(color).hex();

  // blend color with target
  const blend = chroma.mix(base, target, setContrast(contrast), mode).hex();

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
 * import quarks from '@quarksilver/core';
 *
 * const { variants } = quarks.toolkit.colors;
 *
 * variants.tints('#f00000');
 * ```
 * */
const tints = (color: string, options: ColorOptions = {}): string[] =>
  blend(color, '#fff', options);

/**
 * Returns a collection of tones for a color
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const { variants } = quarks.toolkit.colors;
 *
 * variants.tones('#f00000');
 * ```
 * */
const tones = (color: string, options: ColorOptions = {}): string[] =>
  blend(color, '#aaa', options);

/**
 * Returns a collection of shades for a color
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const { variants } = quarks.toolkit.colors;
 *
 * variants.shades('#f00000');
 * ```
 * */
const shades = (color: string, options: ColorOptions = {}): string[] =>
  blend(color, '#111', options);

/**
 * Fetches the complement (opposite) of a color.
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const { swatch } = quarks.toolkit.colors;
 *
 * swatch.complement('#f00')
 * ```
 */
const complement = (color: string): string => setHue(color, '+180');

/**
 * Neutralizes a color with its complement;
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const { swatch } = quarks.toolkit.colors;
 *
 * swatch.neutralize('#f00');
 * ```
 */
const neutralize = (color: string): string =>
  chroma.mix(color, complement(color), 0.5).hex();

/**
 * Splits a color on either side. Tuple represents [leftOfTarget, rightOfTarget]
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const { palette } = quarks.toolkit.colors;
 *
 * palette.split('#f00')
 * ```
 */
const split = (color: string, degrees: number = 60): [string, string] => [
  setHue(color, `-${degrees}`),
  setHue(color, `+${degrees}`)
];

/**
 * Spreads a range of colors on either side of target
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const { palette } = quarks.toolkit.colors;
 *
 * palette.spread('#f00')
 * ```
 */
const spread = (
  color: string,
  degrees: number = 45,
  range: number = 4
): string[] => {
  const terminals = split(color, degrees);
  return maptoCSS(generate(terminals, { range, mode: 'lch' })).filter(
    (_value, index, array) => {
      return index !== 0 && index !== array.length - 1;
    }
  );
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
 * import quarks from '@quarksilver/core';
 *
 * const { palette } = quarks.toolkit.colors;
 *
 * palette.triad('#f00')
 * ```
 */
const triad = (
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
 * import quarks from '@quarksilver/core';
 *
 * const { palette } = quarks.toolkit.colors;
 *
 * palette.tetrad('#f00')
 * ```
 */
const tetrad = (
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
 * Swatch will be translated directly, palette will be formatted
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const { tokenize, variants } = quarks.toolkit.colors;
 *
 * tokenize('#f00', 'red');
 * tokenize(variants.tints('#f00'), 'tints')
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

export const swatch = {
  complement,
  neutralize
};

export const variants = {
  tints,
  tones,
  shades
};

export const palette = {
  split,
  spread,
  triad,
  tetrad
};
