/**
 * A set of utilities to streamline color token generation and modification.
 */

import chroma, { InterpolationMode } from 'chroma-js';
import { ColorOptionAdjustments } from './interfaces';

const maptoCSS = (palette: string[]): string[] => palette.map(c => chroma(c).hex());

const removeBaseColor = (palette: string[]): string[] => {
  const [, ...colors] = palette;
  return maptoCSS(colors);
};

/**
 * Generates a range of colors.
 */
const generateColors = (colorRange: string[], options: ColorOptionAdjustments = {}): string[] => {
  const { mode = <InterpolationMode>'lab', range = 'material' } = options
  const colorScale = chroma.scale(colorRange).mode(mode);

  // If named range, set output colors explicitly
  if (range === 'minimal') return removeBaseColor(colorScale.colors(2));
  if (range === 'material') return removeBaseColor(colorScale.colors(5));

  // Otherwise numeric range 
  return removeBaseColor(colorScale.colors(range));
}

const convertPercent = (percent: number): number => parseFloat((percent / 100).toPrecision(2))
const setContrast = (contrast: number | 'low' | 'med' | 'high'): number => {
  if (contrast === 'low') return convertPercent(30);
  if (contrast === 'med') return convertPercent(50);
  if (contrast === 'high') return convertPercent(95);

  if (contrast < 0 || contrast > 100) throw Error(`contrast: expected value 0 < x < 100 but received ${contrast}`);

  return convertPercent(contrast);
}

/**
 * Merges tints and shades for a complete palette.
 */
const mergeVariants = (target: string, options: ColorOptionAdjustments = {}): string[] => {
  const { contrast = 'high', mode } = options;

  const baseHue = chroma(target).hex();
  const black = chroma.mix(target, '#111111', setContrast(contrast), mode).hex();
  const white = chroma.mix(target, '#FFFFFF', setContrast(contrast), mode).hex();

  const shades = generateColors([baseHue, black], options).reverse();
  const tints = generateColors([baseHue, white], options);

  return [...shades, baseHue, ...tints];
}

const setHue = (color: string, angle: string): string => chroma(color).set('hsl.h', angle).hex();

/**
 * Outputs color tokens in a form that can be consumed by Style Dictionary.
 */
const formatColorTokens = (palette: string[]): object => palette
  .reduce((container, value, index) => {
    const indexToOne = ++index;
    return { ...container, ...{ [indexToOne.toString().padEnd(3, '0')]: { value } } }
  }, {});

export const loadPalette = (color: string, options: ColorOptionAdjustments = {}): object =>
  formatColorTokens(mergeVariants(color, options))

export const getComplement = (color: string): string => setHue(color, '+180')

export const split = (color: string, distance: number = 30): [string, string] => [
  setHue(color, `-${distance}`),
  setHue(color, `+${distance}`)
]

export const spread = (color: string): string[] =>
  generateColors([color, setHue(color, '+60')], { range: 4 })
