/**
 * The [[Custom]] module implements manual mode for Quarksilver color tokens.
 */

import {Utility} from '../../utils';
import {CustomPaletteSchema, CustomSwatchSchema} from '../../utils/interfaces';

/**
 * A module namespaced under [[Colors]].
 * 
 * Contains the [[createColors]] and [[createPalette]] methods.
 *
 * Usage:
 * ```ts
 * import {Colors} from '@quarksilver/core';
 *
 * Colors.Custom.createColors({
 *   red: '#f00',
 *   green: '#0f0',
 *   blue: '#00f'
 * })
 *
 * Colors.Custom.createColors({
 *   red: {
 *     value: '#f00',
 *     options: {
 *       contrast: 0.8
 *     }
 *   },
 * })
 * ```
 */
export const Custom = {
  createColors(data: CustomSwatchSchema): object {
    return Object.keys(data).reduce((container, color) => {
      const value = data[color];
      return { ...container, ...{ [color]: { value } } }
    }, {})
  },
  createPalette(data: CustomPaletteSchema): object {
    return Object.keys(data).reduce((container, category) => {
      const { value, options = {} } = data[category];
      return { ...container, ...{ [category]: Utility.loadPalette(value, options) } };
    }, {});
  } 
}

