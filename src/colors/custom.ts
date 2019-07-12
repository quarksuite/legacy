import { ColorCustomSwatchSchema, ColorCustomPaletteSchema } from '../utils/interfaces';
import {loadPalette} from '../utils/colors';

/**
 * Creates a 1:1 output of color tokens from a collection.
 *
 * ```ts
 * import {createSwatches} from '@quarksilver/core';
 *
 * const data = {
 *  red: '#f00',
 *  green: '#0f0',
 *  blue: '#00f'
 * }
 * 
 * createSwatches(data)
 * ```
 */
export const createSwatches = (data: ColorCustomSwatchSchema): object => {
  return Object.keys(data).reduce((container, color) => {
    const value = data[color];
    return { ...container, ...{ [color]: { value } } }
  }, {})
}

/**
 * Creates a user defined palette with tints and shades from color objects.
 *
 * ```ts
 * import {createPalette} from '@quarksilver/core';
 *
 * const data = {
 *   red: {
 *     value: '#f00',
 *     options: {
 *       range: 'minimal'
 *     }
 *   },
 *   green: {
 *     value: '#0f0',
 *     options: {
 *       range: 'minimal',
 *       contrast: 'med',
 *     }
 *   },
 *   blue: {
 *     value: '#00f',
 *     options: {
 *       range: 'minimal',
 *       mode: 'lrgb'
 *     }
 *   }
 * }
 *
 * createPalette(data);
 * ```
 */
export const createPalette = (data: ColorCustomPaletteSchema): object => {
  return Object.keys(data).reduce((container, category) => {
    const { value, options = {} } = data[category];
    return { ...container, ...{ [category]: loadPalette(value, options) } };
  }, {});
} 
