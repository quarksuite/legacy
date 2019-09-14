import { spin, blend } from './helpers';
import convert from './convert';

/** color.complement - grabs the complement of a color */

export const complement = (color: string) => spin(color);

/** color.neutralize - negates a color with its complement */
export const neutralize = (color: string) =>
  convert(blend(color, complement(color)), 'hex');

/** color.mix - mixes a color with a second color by a given amount */
export const mix = (color: string, target: string, amount?: number) =>
  convert(blend(color, target, amount), 'hex');
