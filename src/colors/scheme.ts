import chroma from 'chroma-js';
import { swatch, variants, palette, tokenize } from '../toolkit/colors';
import { ColorBasicPaletteSchema, ColorOptions } from '../schema';

/** Load tokens by category */
const tokens = (data: string[][]): object => ({
  ...tokenize(data[0], 'main'),
  ...tokenize(data[1], 'accent'),
  ...tokenize(data[2], 'spot'),
  ...tokenize(data[3], 'flourish')
});

/** Output full palette with variants */
const output = (color: string, options: ColorOptions = {}): string[] => [
  ...variants.shades(color, options).reverse(),
  chroma(color).hex(),
  ...variants.tints(color, options)
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

  return tokens([output(base, options)]);
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
  const opposite = swatch.complement(base);

  return tokens([output(base, options), output(opposite, options)]);
};

/**
 * Generates a analogous scheme from basic color configuration.
 *
 * ```ts
 * import {analogous} from '@quarksilver/core';
 *
 * const data = {
 *   base: '#f00'
 * }
 *
 * analogous(data)
 * ```
 */
export const analogous = (data: ColorBasicPaletteSchema): object => {
  const { base, options } = data;
  const analogues = palette.spread(base, 30);

  return tokens([
    output(base, options),
    output(analogues[0], options),
    output(analogues[1], options),
    output(analogues[2], options)
  ]);
};

/** A helper function for building triadic color palettes */
const triColorScheme = (
  data: ColorBasicPaletteSchema,
  degrees: number = 120
): object => {
  const { base, options } = data;
  const colors = palette.triad(base, degrees);

  return tokens([
    output(colors[0], options),
    output(colors[1], options),
    output(colors[2], options)
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
  const colors = palette.tetrad(base, degrees);

  return tokens([
    output(colors[0], options),
    output(colors[1], options),
    output(colors[2], options),
    output(colors[3], options)
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
