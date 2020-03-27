import { modify, mixColors } from './utils';
import { format } from './convert';
import { curry } from '../toolbox';
import { a11y as clrs } from './clrs-list';

export const a11y = (color: string): string | (() => never) =>
  clrs[color]
    ? clrs[color]
    : () => {
        throw Error(`Color ${color} is not defined (See http://clrs.cc)`);
      };

export const adjust = curry(3, modify);
export const mix = curry(3, mixColors);
export const complement = adjust('hue', (h: number) => h + 180);
const neutralize = (color: string): string => mix(complement(color), 50)(color);
export const negate = curry(1, neutralize);
export const convert = curry(2, format);
