import chroma from 'chroma-js';
import { ColorCustomSwatchSchema, ColorCustomPaletteSchema } from '../schema';
import { variants, tokenize } from '../toolkit/colors';

/**
 * Outputs a collection of swatch tokens from a custom color palette.
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const { swatches } = quarks.colors.custom;
 *
 * const data = {
 *   red: '#f00000',
 *   green: '#00f000',
 *   blue: '#0000f0'
 * };
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
 * import quarks from '@quarksilver/core';
 *
 * const { palette } = quarks.colors.custom;
 *
 * const data = {
 *   red: { base: '#f00000'},
 *   green: { base: '#00f000' }
 *   blue: { base: '#0000f0' }
 * };
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
