import { modify, mixColors } from './utils';
import { format } from './convert';
import { composeAll, curry } from '../toolbox';

export const color = (...operations: Function[]): Function =>
  composeAll(...operations);

export const adjust = curry(3, modify);
export const mix = curry(3, mixColors);
export const convert = curry(2, format);
