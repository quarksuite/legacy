/**
 * A set of utilities to streamline color token generation and modification.
 */

import chroma, {InterpolationMode} from 'chroma-js';
import {ColorAdjustments} from './interfaces';

/**
 * Generates variants for a range of colors.
 * @param colorRange A range of valid css colors to build variants from.
 * @param options Settings to pass along to chroma-js
 * @return An array of generated color swatches
 */ 
const generateVariants = (colorRange: string[], options: ColorAdjustments = {}): string[] => {
  const { mode = <InterpolationMode>'lab', variants = 3 } = options
  const [, ...colors] = chroma.scale(colorRange).mode(mode).colors(variants);
  return colors.map(c => chroma(c).css());
}

/**
 * Merges tints and shades for a complete palette.
 * @param target A valid CSS color to create variants for
 * @param options See [[generateVariants]]
 * @return A full palette of `target`
 */
const mergeVariants = (target: string, options: ColorAdjustments = {}): string[] => {
  const { contrast = 0.95, mode } = options;
  const baseHue = chroma(target).css();
  const black = chroma.mix(target, '#111111', contrast, mode).css();
  const white = chroma.mix(target, '#FFFFFF', contrast, mode).css();

  const shades = generateVariants([baseHue, black], options).reverse();
  const tints = generateVariants([baseHue, white], options);

  return [ ...shades, baseHue, ...tints];
}

/**
 * Outputs color tokens in a form that can be consumed by Style Dictionary.
 * @param palette A palette to transform. Generate from [[mergeVariants]]
 * @return A formatted object ready for consumption
 */
const outputColorTokens = (palette: string[]): object => {
  return palette.reduce((container, value, index) => {
    const indexToOne = ++index;
    return { ...container, ...{ [indexToOne.toString().padEnd(3, '0')]: { value } } }
  }, {});
}

/**
 * Export a utility module including [[loadPalette]] method.
 * 
 * Namedspaced under [[Quarks]].
 *
 * Composes [[mergeVariants]] and [[outputColorTokens]]
 *
 * Exported for convenience. Prefer [[Custom]] and [[Scheme]] modules
 *
 * ```ts
 * import {Quarks} from '@quarksilver/core';
 *
 * Quarks.Utility.loadPalette('red', { contrast: 0.8 })
 * ```
 */
export const Utility = {
  loadPalette(color: string, options: ColorAdjustments): object {
    return outputColorTokens(mergeVariants(color, options))
  } 
}
