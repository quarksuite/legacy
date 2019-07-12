/**
 * A set of utilities to streamline color token generation and modification.
 * Made available in case you require baremetal manipulation of colors.
 */

import chroma, { InterpolationMode } from 'chroma-js';
import { ColorOptions } from './schema';

/**
 * Maps a color palette to hex format.
 */
const maptoCSS = (palette: string[]): string[] =>
  palette.map((c): string => chroma(c).hex());

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
  if (range === 'minimal') return colorScale.colors(2);
  if (range === 'material') return colorScale.colors(4);

  // Otherwise numeric range
  return colorScale.colors(range);
};

/** Converts a percentage to a ratio */
const convert = (percent: number): number =>
  parseFloat((percent / 100).toPrecision(2));

/** Parses the named contrast options into something usable by chroma */
const setContrast = (contrast: number | 'low' | 'med' | 'high'): number => {
  if (contrast === 'low') return convert(30);
  if (contrast === 'med') return convert(50);
  if (contrast === 'high') return convert(95);

  // Limit input from 0 to 100 (percent)
  if (contrast < 0 || contrast > 100)
    throw Error(
      `contrast: expected value 0 < x < 100 but received ${contrast}`
    );

  return convert(contrast);
};

/**
 * Merges a base color with a target to blend
 */
const blend = (
  color: string,
  target: string,
  options: ColorOptions = {}
): string[] => {
  const { contrast = 'high', mode } = options;

  const base = chroma(color).hex();

  // blend color with target
  const blend = chroma.mix(color, target, setContrast(contrast), mode).hex();

  // Generate variants
  const variants = generate([base, blend], options);

  // Format them for consumption
  return [...variants];
};

/**
 * Alters the hue of a color
 */
const setHue = (color: string, rotation: string): string =>
  chroma(color)
    .set('hsl.h', rotation)
    .hex();

/** Returns a collection of tints for a color */
const tints = (color: string, options: ColorOptions = {}): string[] =>
  blend(color, '#fff', options);

/** Returns a collection of tones for a color */
const tones = (color: string, options: ColorOptions = {}): string[] =>
  blend(color, '#aaa', options);

/** Returns a collection of shades for a color */
const shades = (color: string, options: ColorOptions = {}): string[] =>
  blend(color, '#111', options);

type TokenizeFormat = (color: {}, category: string, index: number) => {};

/**
 * Transforms a collection of colors into tokens consumable by Style Dictionary
 */
const tokenize = (format: TokenizeFormat, palette: string[]): object =>
  palette.reduce(format, {});

/**
 * Fetches the complement (opposite) of a color.
 *
 * ```ts
 * import {complement} from '@quarksilver/core';
 *
 * complement('#f00') // #0ff;
 * ```
 */
const complement = (color: string): string => setHue(color, '+180');

/**
 * Neutralizes a color with its complement
 */
const neutralize = (color: string): string =>
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
const split = (color: string, distance: number = 30): [string, string] => [
  setHue(color, `-${distance}`),
  setHue(color, `+${distance}`)
];

/**
 * Spreads a range of colors on either side of target
 *
 * ```ts
 * import {spread} from '@quarksilver/core';
 *
 * spread('#f00');
 * ```
 */
const spread = (color: string, range: number = 3): string[] => {
  const terminals = split(color, 60);
  return maptoCSS(
    chroma
      .scale([...terminals])
      .mode('lab')
      .colors(range)
  );
};

/**
 * Inscribes a triangle of colors.
 * A = origin
 * BC = Equidistant points split from A
 * degrees = 120 is an equilateral triad
 * degrees = 90 is an isosceles clash
 */
const inscribeTriad = (
  color: string,
  degrees: number = 60
): [string, ...string[]] => {
  const a = color;
  const bc = split(color, degrees);

  return [a, ...bc];
};

/**
 * Inscribes a rectangle of colors
 * A = origin
 * B = degrees right of a
 * C = complement of a
 * D = complement of b
 *
 * degrees = 90 is a perfect square
 * degrees = 60 is tetradic
 */
const inscribeTetrad = (
  color: string,
  degrees: number = 60
): [string, string, string, string] => {
  const a = color;
  const b = split(a, degrees)[1];
  const c = complement(a);
  const d = complement(b);

  return [a, c, b, d];
};

export const swatch = {
  neutralize,
  complement
};

export const variant = {
  tints,
  tones,
  shades
};

export const palette = {
  triad: inscribeTriad,
  tetrad: inscribeTetrad,
  split,
  spread
};

export const format = { tokenize };
