import { ColorCustomSwatchSchema, ColorCustomPaletteSchema } from '../utils/interfaces';
import {loadPalette} from '../utils/colors';

export const createSwatches = (data: ColorCustomSwatchSchema): object => {
  return Object.keys(data).reduce((container, color) => {
    const value = data[color];
    return { ...container, ...{ [color]: { value } } }
  }, {})
}

export const createPalette = (data: ColorCustomPaletteSchema): object => {
  return Object.keys(data).reduce((container, category) => {
    const { value, options = {} } = data[category];
    return { ...container, ...{ [category]: loadPalette(value, options) } };
  }, {});
} 
