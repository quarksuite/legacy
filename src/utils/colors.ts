/**
 * A set of utilities to streamline color token generation and modification.
 * Made available in case you require baremetal manipulation of colors.
 */

import chroma, { InterpolationMode } from 'chroma-js';
import { ColorOptionAdjustments } from './interfaces';

/** 
 * Maps a color palette to hex format.
 */
const maptoCSS = (palette: string[]): string[] => palette.map(c => chroma(c).hex());

/**
 * Removes base color from a palette so it isn't needless repeated in color manipulations
 */
const removeBaseColor = (palette: string[]): string[] => {
  const [, ...colors] = palette;
  return maptoCSS(colors);
};

/**
 * Generates a range of colors.
 */
const generateColors = (colorRange: string[], options: ColorOptionAdjustments = {}): string[] => {
  const { mode = <InterpolationMode>'lab', range = 'material' } = options;
  const colorScale = chroma.scale(colorRange).mode(mode);
  let rangePlus = 0;

  // If named range, set output colors explicitly
  if (range === 'minimal') return removeBaseColor(colorScale.colors(3));
  if (range === 'material') return removeBaseColor(colorScale.colors(5));

  // Range must be incremented to fill removed base color
  if (typeof range === 'number') rangePlus += range + 1;

  // Otherwise numeric range 
  return removeBaseColor(colorScale.colors(rangePlus));
}

const convertPercent = (percent: number): number => parseFloat((percent / 100).toPrecision(2))
const setContrast = (contrast: number | 'low' | 'med' | 'high'): number => {
  if (contrast === 'low') return convertPercent(30);
  if (contrast === 'med') return convertPercent(50);
  if (contrast === 'high') return convertPercent(95);

  // Limit input from 0 to 100 (percent)
  if (contrast < 0 || contrast > 100) throw Error(`contrast: expected value 0 < x < 100 but received ${contrast}`);

  return convertPercent(contrast);
}

/**
 * Merges tints and shades for a complete palette.
 */
const mergeVariants = (target: string, options: ColorOptionAdjustments = {}): string[] => {
  const { contrast = 'high', mode } = options;

  const baseHue = chroma(target).hex();

  // Deepest shade and lightest tint of target
  const black = chroma.mix(target, '#111111', setContrast(contrast), mode).hex();
  const white = chroma.mix(target, '#FFFFFF', setContrast(contrast), mode).hex();

  // Generate full range of variants
  const shades = generateColors([baseHue, black], options).reverse();
  const tints = generateColors([baseHue, white], options);

  // Format them for consumption
  return [...shades, baseHue, ...tints];
}

/**
 * Alters the hue of a color a relative distance from origin ('+45' degrees from #f00000 )
 */
const setHue = (color: string, angle: string): string => chroma(color).set('hsl.h', angle).hex();

/**
 * Outputs color tokens in a form that can be consumed by Style Dictionary.
 */
const formatColorTokens = (palette: string[]): object => palette
  .reduce((container, value, index) => {
    const indexToOne = ++index;
    return { ...container, ...{ [indexToOne.toString().padEnd(3, '0')]: { value } } }
  }, {});

/**
 * Loads a full color palette with options from a QuarksilverConfigSchema interface
 * @param color - any valid CSS color
 *
 * ```ts
 * import {loadPalette} from '@quarksilver/core';
 *
 * loadPalette('#f00', { range: 'minimal' })
 * ```
 */
export const loadPalette = (color: string, options: ColorOptionAdjustments = {}): object =>
  formatColorTokens(mergeVariants(color, options));

/**
 * Fetches the complement (opposite) of a color.
 *
 * ```ts
 * import {getComplement} from '@quarksilver/core';
 *
 * getComplement('#f00') // #0ff;
 * ```
 */
export const getComplement = (color: string): string => setHue(color, '+180');

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
export const split = (color: string, distance: number = 30): [string, string] => [
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
export const spread = (color: string): string[] => {
  const terminals = split(color, 60);
  return maptoCSS(chroma.scale([...terminals]).mode('lab').colors(3))
}
