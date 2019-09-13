import { hslData, convertPercentage } from '../convert/helpers';
import { logBlend, linBlend } from './helpers';
import convert from './convert';

const spin = (color: string, rotation: number = 180) => {
  let [h, s, l] = hslData(convert(color, 'hsl') as string);

  h = (h + rotation) % 360;
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return convert(`hsl(${h}, ${s}%, ${l}%)`, 'hex');
};

const blend = (
  color: string,
  target: string,
  amount: number = 50,
  type: 'logarithmic' | 'linear' = 'logarithmic'
) => {
  const c = convert(color, 'rgb') as string;
  const t = convert(target, 'rgb') as string;
  const a = convertPercentage(amount);

  if (type === 'linear') return linBlend(c, t, a);
  return logBlend(c, t, a);
};

/** color.complement - grabs the complement of a color */

export const complement = (color: string) => spin(color);

/** color.neutralize - negates a color with its complement */
export const neutralize = (color: string) =>
  convert(blend(color, complement(color) as string), 'hex');

/** color.mix - mixes a color with a second color by a given amount */
export const mix = (color: string, target: string, amount?: number) =>
  convert(blend(color, target, amount), 'hex');
