import { Color } from './types';
import { modify, spin, mixColors } from './utils';
import { format } from './convert';
import { compose, composeAll, curry } from '../utils';

export const color = (...operations: Function[]): Function =>
  composeAll(...operations);

export const adjust = curry(3, modify);
export const mix = curry(3, mixColors);
export const convert = curry(2, format);
