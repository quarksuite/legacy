import chroma from 'chroma-js';
import { tints, shades, complement, triad, tetrad, tokenize } from './kit';
import { ColorBasicPaletteSchema, ColorOptions } from '../schema';

const tokens = (data: string[][]): object => ({
  ...tokenize(data[0], 'main'),
  ...tokenize(data[1], 'accent'),
  ...tokenize(data[2], 'spot'),
  ...tokenize(data[3], 'flourish')
});

const palette = (color: string, options: ColorOptions = {}): string[] => [
  ...shades(color, options),
  chroma(color).hex(),
  ...tints(color, options)
];

export const monochromatic = (data: ColorBasicPaletteSchema): object => {
  const { base, options } = data;

  return tokens([palette(base, options)]);
};

export const complementary = (data: ColorBasicPaletteSchema): object => {
  const { base, options } = data;
  const opposite = complement(base);

  return tokens([palette(base, options), palette(opposite, options)]);
};

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

export const splitComplementary = (data: ColorBasicPaletteSchema): object =>
  triColorScheme(data, 150);
export const triadic = (data: ColorBasicPaletteSchema): object =>
  triColorScheme(data);
export const clash = (data: ColorBasicPaletteSchema): object =>
  triColorScheme(data, 90);

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

export const tetradic = (data: ColorBasicPaletteSchema): object =>
  quadColorScheme(data);
export const square = (data: ColorBasicPaletteSchema): object =>
  quadColorScheme(data, 90);
