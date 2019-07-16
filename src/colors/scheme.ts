import chroma from 'chroma-js';
import {
  tints,
  shades,
  complement,
  triad,
  tetrad,
  tokenize
} from '../toolkit/colors';
import { ColorBasicPaletteSchema, ColorOptions } from '../schema';

/** Helper function to load tokens by category */
const tokens = (data: string[][]): object => ({
  ...tokenize(data[0], 'main'),
  ...tokenize(data[1], 'accent'),
  ...tokenize(data[2], 'spot'),
  ...tokenize(data[3], 'flourish')
});

/** Helper function to build full palette with variants */
const palette = (color: string, options: ColorOptions = {}): string[] => [
  ...shades(color, options).reverse(),
  chroma(color).hex(),
  ...tints(color, options)
];

/**
 * Generates a monochromatic scheme from basic color configuration.
 *
 * ```ts
 * import {monochromatic} from '@quarksilver/core';
 *
 * const data = {
 *   base: '#f00'
 * }
 *
 * monochromatic(data)
 * ```
 */
export const monochromatic = (data: ColorBasicPaletteSchema): object => {
  const { base, options } = data;

  return tokens([palette(base, options)]);
};

/**
 * Generates a complementary scheme from basic color configuration.
 *
 * ```ts
 * import {complementary} from '@quarksilver/core';
 *
 * const data = {
 *   base: '#f00'
 * }
 *
 * complementary(data)
 * ```
 */
export const complementary = (data: ColorBasicPaletteSchema): object => {
  const { base, options } = data;
  const opposite = complement(base);

  return tokens([palette(base, options), palette(opposite, options)]);
};

/** A helper function for building triadic color palettes */
const triColorScheme = (
  data: ColorBasicPaletteSchema,
  degrees: number = 120
): object => {
  const { base, options } = data;
  const colors = triad(base, degrees);

  return tokens([
    palette(colors[0], options),
    palette(colors[1], options),
    palette(colors[2], options)
  ]);
};

/**
 * Generates a splitComplementary scheme from basic color configuration.
 *
 * ```ts
 * import {splitComplementary} from '@quarksilver/core';
 *
 * const data = {
 *   base: '#f00'
 * }
 *
 * splitComplementary(data)
 * ```
 */
export const splitComplementary = (data: ColorBasicPaletteSchema): object =>
  triColorScheme(data, 150);

/**
 * Generates a triadic scheme from basic color configuration.
 *
 * ```ts
 * import {triadic} from '@quarksilver/core';
 *
 * const data = {
 *   base: '#f00'
 * }
 *
 * triadic(data)
 * ```
 */
export const triadic = (data: ColorBasicPaletteSchema): object =>
  triColorScheme(data);

/**
 * Generates a clash scheme from basic color configuration.
 *
 * ```ts
 * import {clash} from '@quarksilver/core';
 *
 * const data = {
 *   base: '#f00'
 * }
 *
 * clash(data)
 * ```
 */
export const clash = (data: ColorBasicPaletteSchema): object =>
  triColorScheme(data, 90);

/** Helper function to build tetradic schemes */
const quadColorScheme = (
  data: ColorBasicPaletteSchema,
  degrees: number = 60
): object => {
  const { base, options } = data;
  const colors = tetrad(base, degrees);

  return tokens([
    palette(colors[0], options),
    palette(colors[1], options),
    palette(colors[2], options),
    palette(colors[3], options)
  ]);
};

/**
 * Generates a tetradic scheme from basic color configuration.
 *
 * ```ts
 * import {tetradic} from '@quarksilver/core';
 *
 * const data = {
 *   base: '#f00'
 * }
 *
 * tetradic(data)
 * ```
 */
export const tetradic = (data: ColorBasicPaletteSchema): object =>
  quadColorScheme(data);
/**
 * Generates a square scheme from basic color configuration.
 *
 * ```ts
 * import {square} from '@quarksilver/core';
 *
 * const data = {
 *   base: '#f00'
 * }
 *
 * square(data)
 * ```
 */
export const square = (data: ColorBasicPaletteSchema): object =>
  quadColorScheme(data, 90);
