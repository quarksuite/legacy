/**
 * The [[Custom]] module implements manual mode for Quarksilver color tokens.
 * Parses data of types [[ColorCustomSwatchSchema]] and [[ColorCustomPaletteSchema]]
 */

import {Utility} from '../../helpers/utility';
import {ColorCustomSwatchSchema, ColorCustomPaletteSchema} from '../../helpers/interfaces';

/**
 * A module namespaced under [[Colors]].
 * 
 * Contains the [[createSwatches]] and [[createPalette]] methods.
 */
export const Custom = {
  /**
   * Outputs a formatted collection of swatches from color data.
   * Data typed with [[ColorCustomSwatchSchema]].
   *
   * Usage:
   * ```ts
   * import {Colors} from '@quarksilver/core';
   *
   * const data: ColorCustomSwatchSchema = {
   *   red: '#f00',
   *   green: '#0f0',
   *   blue: '#00f'
   * }
   *
   * const swatches = Colors.Custom.createColors(data)
   * ```
   */
  createSwatches(data: ColorCustomSwatchSchema): object {
    return Object.keys(data).reduce((container, color) => {
      const value = data[color];
      return { ...container, ...{ [color]: { value } } }
    }, {})
  },
  /**
   * Outputs a formatted palette from color objects.
   * Data typed with [[ColorCustomPaletteSchema]].
   *
   * Usage:
   * ```ts
   * import {Colors} from '@quarksilver/core';
   *
   * const data: ColorCustomPaletteSchema = {
   *   red: { 
   *    value: '#f00', 
   *    options: { contrast: 80, range: 5, mode: 'hsi' } 
   *  },
   * }
   *
   * const palette = Colors.Custom.createPalette(data)
   * ```
   */
  createPalette(data: ColorCustomPaletteSchema): object {
    return Object.keys(data).reduce((container, category) => {
      const { value, options = {} } = data[category];
      return { ...container, ...{ [category]: Utility.loadColorPalette(value, options) } };
    }, {});
  } 
}
