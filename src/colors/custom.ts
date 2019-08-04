import chroma from 'chroma-js';
import { ColorCustomSwatchSchema, ColorCustomPaletteSchema } from '../schema';
import { variants, tokenize } from '../toolkit/colors';

/**
 * Outputs a collection of swatch tokens from a custom color palette.
 *
 * ```ts
 * import {swatches} from '@quarksilver/core';
 *
 * const data = {
 *   red: '#f00',
 *   green: '#0f0',
 *   blue: '#00f'
 * }
 *
 * swatches(data);
 * ```
 */
export const swatches = (data: ColorCustomSwatchSchema): object =>
  Object.keys(data).reduce((container, key: string): object => {
    const color = chroma(data[key]).hex();
    return { ...container, ...tokenize(color, key) };
  }, {});

/**
 * Outputs palette tokens from color category objects
 *
 * ```ts
 * import {palette} from '@quarksilver/core';
 *
 * const data = {
 *   red: {
 *     base: '#f00'
 *   }
 *   green: {
 *     base: '#0f0'
 *   }
 *   blue: {
 *     base: '#00f'
 *   }
 * }
 *
 * palette(data);
 * ```
 */
export const palette = (data: ColorCustomPaletteSchema) =>
  Object.keys(data).reduce((container, category: string) => {
    const { base, options } = data[category];
    const withVariants = [
      ...variants.shades(base, options).reverse(),
      chroma(base).hex(),
      ...variants.tints(base, options)
    ];
    return { ...container, ...tokenize(withVariants, category) };
  }, {});