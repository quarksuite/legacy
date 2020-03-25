import { modify, mixColors } from './utils';
import { format } from './convert';
import { curry } from '../toolbox';

export const adjust = curry(3, modify);

const prep = curry(3, mixColors);
const assemble = (target: string, amount: number): Function =>
  prep(target, amount);
export const mix = curry(2, assemble);

export const complement = adjust('hue', (h: number) => h + 180);

const neutralize = (color: string): string =>
  mixColors(complement(color), 50, color);
export const negate = curry(1, neutralize);

export const convert = curry(2, format);
