import chroma from 'chroma-js';
import { ColorCustomSwatchSchema, ColorCustomPaletteSchema } from '../schema';
import { tokenize, shades, tints } from './kit';

export const swatches = (data: ColorCustomSwatchSchema): object =>
  Object.keys(data).reduce((container, key: string): object => {
    const color = chroma(data[key]).hex();
    return { ...container, ...tokenize(color, key) };
  }, {});

export const palette = (data: ColorCustomPaletteSchema) =>
  Object.keys(data).reduce((container, category: string) => {
    const { base, options } = data[category];
    const withVariants = [
      ...shades(base, options).reverse(),
      chroma(base).hex(),
      ...tints(base, options)
    ];
    return { ...container, ...tokenize(withVariants, category) };
  }, {});
