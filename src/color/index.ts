import { CSSColorFormats } from './convert/helpers';
import { spin, blend, convert } from './helpers';

/** color.complement - grabs the complement of a color */
export const complement = (color: string) => spin(color);

/** color.neutralize - negates a color with its complement */
export const neutralize = (color: string) =>
  convert(blend(color, complement(color)), 'hex');

/** color.mix - mixes a color with a second color by a given amount */
export const mix = (color: string, target: string, amount?: number) =>
  convert(blend(color, target, amount), 'hex');

export type Schemes =
  | 'monochromatic'
  | 'complementary'
  | 'split complementary'
  | 'analogous'
  | 'dual';

export interface PaletteConfig {
  contrast?: number;
  limit?: number;
  mode?: 'logarithmic' | 'linear';
  format?: CSSColorFormats;
  output?: 'all' | 'none' | 'tints, tones' | 'tints, shades' | 'tones, shades';
  scheme?: Schemes;
  accented?: false;
  distance?: number;
}

const generate = (color: string, config: PaletteConfig = {}) => {
  const {
    contrast = 97,
    limit = 4,
    mode = 'logarithmic',
    format = 'rgb',
    output = 'all'
  } = config;

  // Convert to RGB for blending
  let base = convert(color, 'rgb');
  const white = convert('#fff', 'rgb');
  const gray = convert('#aaa', 'rgb');
  const black = convert('#111', 'rgb');

  // Returns all types
  const palette = [white, gray, black].map(target => {
    return Array.from(Array(limit).fill(''))
      .map((_value, index) => {
        const amount = contrast - (contrast / limit) * index;
        return convert(blend(base, target, amount, mode), format);
      })
      .reverse();
  });

  // Creates objects to filter

  base = convert(base, format);
  const tints = palette[0];
  const tones = palette[1];
  const shades = palette[2];

  if (output === 'none')
    return {
      base
    };

  if (output === 'tints, shades')
    return {
      base,
      tints,
      shades
    };

  if (output === 'tints, tones')
    return {
      base,
      tints,
      tones
    };

  if (output === 'tones, shades')
    return {
      base,
      tones,
      shades
    };

  return {
    base,
    tints,
    tones,
    shades
  };
};

const complementary = (color: string) => [
  convert(color, 'rgb'),
  convert(complement(color), 'rgb')
];

const splitComplementary = (color: string, distance = 15, accented = false) => {
  const a = convert(color, 'rgb');
  const opposite = complement(a);
  const b = spin(opposite, -distance);
  const c = spin(opposite, distance);

  return accented ? [a, opposite, b, c] : [a, b, c];
};

const analogous = (color: string, distance = 15) =>
  Array.from(Array(3).fill(convert(color, 'rgb')), (value, index) =>
    spin(value, distance * index)
  );

const dual = (color: string, distance = 15) => {
  const a = convert(color, 'rgb');
  const b = spin(color, distance);
  const c = complement(a);
  const d = complement(b);

  return [a, b, c, d];
};

/** color.palette - Utility for creating and modifying palettes */
export const palette = (color: string, config: PaletteConfig = {}) => {
  const { distance, accented, scheme = 'monochromatic' } = config;
  let palette;
  const base = convert(color, 'rgb');

  // First figure out what scheme is requested
  switch (scheme) {
    case 'monochromatic':
      palette = [base];
      break;
    case 'complementary':
      palette = complementary(base);
      break;
    case 'split complementary':
      palette = splitComplementary(base, distance, accented);
      break;
    case 'analogous':
      palette = analogous(base, distance);
      break;
    case 'dual':
      palette = dual(base, distance);
      break;
    default:
      throw Error(`${scheme}: Missing or invalid. Try again`);
  }

  return palette.map(color => generate(color, config));
};

/** color.output - A utility for transforming color formats */
export const output = (color: string, format: CSSColorFormats) =>
  convert(color, format);
