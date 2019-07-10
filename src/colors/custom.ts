/**
 * The [[ColorsCustom]] module implements manual mode for Quarksilver color tokens.
 * Parses data of types [[ColorCustomSwatchSchema]] and [[ColorCustomPaletteSchema]]
 */

import * as Utility from '../../helpers/utility';
import { ColorCustomSwatchSchema, ColorCustomPaletteSchema } from '../../helpers/interfaces';

export const createSwatches = (data: ColorCustomSwatchSchema): object => {
  return Object.keys(data).reduce((container, color) => {
    const value = data[color];
    return { ...container, ...{ [color]: { value } } }
  }, {})
}

export const createPalette = (data: ColorCustomPaletteSchema): object => {
  return Object.keys(data).reduce((container, category) => {
    const { value, options = {} } = data[category];
    return { ...container, ...{ [category]: Utility.loadColorPalette(value, options) } };
  }, {});
} 
