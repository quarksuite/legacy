/**
 * A set of utilities to streamline color token generation and modification.
 */

import chroma, {InterpolationMode} from 'chroma-js';
import {ColorOptionAdjustments} from './interfaces';

const maptoCSS = (palette: string[]): string[] => palette.map(c => chroma(c).css());
const removeBaseColor = (palette: string[]): string[] => {
  const [, ...colors] = palette;
  return maptoCSS(colors);
};

/**
 * Generates a range of colors.
 * @param colorRange A range of valid css colors to build variants from.
 * @param options Settings to pass along to chroma-js
 * @return An array of generated color swatches
 */ 
const generateColors = (colorRange: string[], options: ColorOptionAdjustments = {}): string[] => {
  const { mode = <InterpolationMode>'lab', range = 'material' } = options
  const colorScale = chroma.scale(colorRange).mode(mode);

  // If named range, set output colors explicitly
  if (range === 'minimal') return removeBaseColor(colorScale.colors(2));
  if (range === 'material') return removeBaseColor(colorScale.colors(4));

  // Otherwise numeric range 
  return removeBaseColor(colorScale.colors(range));
}

const convertPercent = (percent: number): number => parseFloat((percent / 100).toPrecision(2))
const setContrast = (contrast: number | 'low' | 'med' | 'high'): number => {
  if (contrast === 'low') return convertPercent(30);
  if (contrast === 'med') return convertPercent(50);
  if (contrast === 'high') return convertPercent(95);

  if ( contrast < 0 || contrast > 100 ) throw Error(`contrast: expected value 0 < x < 100 but received ${contrast}`);

  return convertPercent(contrast);
}

/**
 * Merges tints and shades for a complete palette.
 * @param target A valid CSS color to create variants for
 * @param options See [[generateVariants]]
 * @return A full palette of `target`
 */
const mergeVariants = (target: string, options: ColorOptionAdjustments = {}): string[] => {
  const { contrast = 'high', mode } = options;

  const baseHue = chroma(target).css();
  const black = chroma.mix(target, '#111111', setContrast(contrast), mode).css();
  const white = chroma.mix(target, '#FFFFFF', setContrast(contrast), mode).css();

  const shades = generateColors([baseHue, black], options).reverse();
  const tints = generateColors([baseHue, white], options);

  return [ ...shades, baseHue, ...tints];
}

const setHue = (color: string, angle: string): string => chroma(color).set('hsl.h', angle).css();

/**
 * Outputs color tokens in a form that can be consumed by Style Dictionary.
 * @param palette A palette to transform. Generate from [[mergeVariants]]
 * @return A formatted object ready for consumption
 */
const outputColorTokens = (palette: string[]): object => palette
  .reduce((container, value, index) => {
    const indexToOne = ++index;
    return { ...container, ...{ [indexToOne.toString().padEnd(3, '0')]: { value } } }
  }, {});

/**
 * A utility module exposing helper methods 
 *
 * Colors: [[loadColorPalette]], [[getColorComplement]],
 * [[splitColor]], [[spreadColor]].
 * 
 * Namedspaced under [[Helpers]].
 *
 * Exported for convenience. Prefer [[Custom]] and [[Scheme]] modules
 * for typical color operations.
 *
 */
export const Utility = {
  /**
   * A helper for building color palettes. Used by [[Custom]] and [[Scheme]].
   * Not meant for standalone use, but you can.
   */
  loadColorPalette: (color: string, options: ColorOptionAdjustments): object => 
    outputColorTokens(mergeVariants(color, options)),

  /**
   * Fetches the complement of a color. Used by all [[Scheme]] methods, but may be helpful
   * for modifying colors in place.
   */
  getColorComplement: (color: string): string => setHue(color, '+180'),

  /**
   * Fetches the colors adjacent to a color by a range. Used
   * to output `split complement`, `triadic`, `clash`, `tetradic` schemes.
   *
   * *Note: tuple maps to `[leftOfColor, rightOfColor]`*
   */
  splitColor: (color: string, distance: number = 30): [string, string] => [
    setHue(color, `-${distance}`), 
    setHue(color, `+${distance}`)
  ],

  /**
   * Captures a range between a color and the hue at the target `rotation`.
   * Used to output `analogous` schemes.
   */
  spreadColor: (color: string, rotation: string = '+45'): string[] =>
    generateColors([color, setHue(color, rotation)], { range: 4 })
}
