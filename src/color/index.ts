import { modify, mixColors } from './utils';
import { format } from './convert';
import { curry, composeAll } from '../toolbox';

export const pipe = composeAll;

export const adjust = curry(3, modify);
export const mix = curry(3, mixColors);

export const complement = adjust('hue', (h: number) => h + 180);

const neutralize = (color: string): string => mix(complement(color), 50, color);
export const negate = curry(1, neutralize);

export const convert = curry(2, format);
