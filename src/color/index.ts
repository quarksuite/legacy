import { Color } from './types';
import { modify, spin, mixColors } from './utils';
import { format } from './convert';
import { composeAll, curry } from '../utils';

export const color = (...operations: Function[]): Function =>
  composeAll(...operations);
export const adjust = curry(3, modify);
export const mix = curry(3, mixColors);
export const complement = (color: Color): Color => spin(180, false, color);

export const negate = (color: Color): Color =>
  mixColors(complement(color), 50, color);

export const convert = curry(2, format);
