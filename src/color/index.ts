import { CSSColorFormats } from './convert/helpers';
import { spin, blend, convert } from './helpers';

/**
 * Grab the complement of a given color.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * color.complement('#348ec9')
 * ```
 *
 * @param color - the color to transform
 * @returns The color opposite in hue
 **/
export const complement = (color: string): string => spin(color);

/**
 * Negate a color with its complement. Great for neutral palettes.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * color.neutralize('#348ec9')
 * ```
 *
 * @param color - the color to transform
 * @returns An even mix of the color and and its complement (neutral)
 **/
export const neutralize = (color: string): string =>
  convert(blend(color, complement(color)), 'hex');

/**
 * Returns the mix of two colors by a given amount.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * color.mix('#348ec9', 'orange')
 *
 * // with amount
 * color.mix('#348ec9', 'orange', 30)
 * ```
 *
 * @param color - The color to transform
 * @param target - The color to mix
 * @param amount? - how much you want to mix a with b (0-100)
 * @returns A mix of two colors
 **/
export const mix = (color: string, target: string, amount = 50): string =>
  convert(blend(color, target, amount), 'hex');

/**
 * Returns a color converted to another format
 *
 * @remarks
 * Usage:
 * ```ts
 * // default
 * color.format('#348ec9');
 *
 * // pass in another format
 * color.format('#348ec9', 'hsl');
 * ```
 *
 * @param color - The color to transform
 * @param format - the CSS color format to output (`rgb` by default)
 * @returns A newly formatted color
 **/
export const format = (
  color: string,
  format: CSSColorFormats = 'rgb'
): string => convert(color, format);

export type Schemes =
  | 'monochromatic'
  | 'analogous'
  | 'complementary'
  | 'split complementary'
  | 'triadic'
  | 'dual color'
  | 'tetradic';

export interface VariantConfig {
  contrast?: number;
  limit?: number;
  mode?: 'logarithmic' | 'linear';
}

export interface PaletteConfig {
  scheme?: {
    type?: Schemes;
    distance?: number;
    accented?: boolean;
  };
  tints?: VariantConfig;
  tones?: VariantConfig;
  shades?: VariantConfig;
  format?: 'rgb' | 'hex' | 'hsl';
}

const variants = (
  color: string,
  type: 'tint' | 'tone' | 'shade',
  contrast = 97,
  limit = 3,
  mode: 'logarithmic' | 'linear' = 'logarithmic',
  format: CSSColorFormats = 'rgb'
) => {
  let base = convert(color, 'rgb');
  const white = convert('#fff', 'rgb');
  const gray = convert('#aaa', 'rgb');
  const black = convert('#111', 'rgb');

  if (type === 'tint')
    return Array.from(Array(limit).fill(base))
      .map((c, index) => {
        const amount = contrast - (contrast / limit) * index;
        return convert(blend(c, white, amount, mode), format);
      })
      .reverse();
  if (type === 'tone')
    return Array.from(Array(limit).fill(base))
      .map((c, index) => {
        const amount = contrast - (contrast / limit) * index;
        return convert(blend(c, gray, amount, mode), format);
      })
      .reverse();
  if (type === 'shade')
    return Array.from(Array(limit).fill(base))
      .map((c, index) => {
        const amount = contrast - (contrast / limit) * index;
        return convert(blend(c, black, amount, mode), format);
      })
      .reverse();

  return color;
};

const generate = (color: string, config: PaletteConfig = {}) => {
  const tints = config.tints || {};
  const tones = config.tones || {};
  const shades = config.shades || {};
  let collection = {};

  const { format = 'rgb' } = config;

  // Build collection if variant config exists
  if (config.tints)
    collection = {
      ...collection,
      tint: variants(
        color,
        'tint',
        tints.contrast,
        tints.limit,
        tints.mode,
        format
      )
    };

  if (config.tones)
    collection = {
      ...collection,
      tone: variants(
        color,
        'tone',
        tones.contrast,
        tones.limit,
        tones.mode,
        format
      )
    };

  if (config.shades)
    collection = {
      ...collection,
      shade: variants(
        color,
        'shade',
        shades.contrast,
        shades.limit,
        shades.mode,
        format
      )
    };

  return {
    base: convert(color, format),
    ...collection
  };
};

const complementary = (color: string) => [
  convert(color, 'rgb'),
  convert(complement(color), 'rgb')
];

const splitComplementary = (
  color: string,
  distance: number = 15,
  accented: boolean = false
) => {
  const a = convert(color, 'rgb');
  const opposite = convert(complement(a), 'rgb');
  // right of complement
  const b = convert(spin(opposite, 360 + distance), 'rgb');
  // left of complement
  const c = convert(spin(opposite, 360 - distance), 'rgb');

  return accented ? [a, opposite, b, c] : [a, b, c];
};

const analogous = (
  color: string,
  distance: number = 15,
  accented: boolean = false
) => {
  const a = convert(color, 'rgb');
  const opposite = convert(complement(a), 'rgb');
  const b = convert(spin(a, 360 + distance), 'rgb');
  const c = convert(spin(a, 360 + distance * 2), 'rgb');

  return accented ? [a, b, c, opposite] : [a, b, c];
};

const dual = (color: string, distance: number = 15) => {
  const a = convert(color, 'rgb');
  const b = convert(spin(color, 360 + distance), 'rgb');
  const c = convert(complement(a), 'rgb');
  const d = convert(complement(b), 'rgb');

  return [a, b, c, d];
};

/**
 * Returns a generated palette for a color from configuration.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // all defaults
 * const defaultConfig: PaletteConfig = {
 *  scheme: {
 *    type: 'monochromatic', // type of scheme to generate
 *    // analogous and split complementary options
 *    distance: 15, // distance from origin
 *    accented: false // whether to include complement as accent
 *  }
 * }
 * format: 'rgb', // change the output format of palette
 *
 * // Outputs triadic scheme with all other defaults
 * color.palette('#348ec9', {
 *   scheme: { type: 'triadic' }
 * })
 *
 * @param color - The base color to generate from
 * @param config? - configuration to modify the palette (uses all defaults if undefined)
 * @returns The generated palette as an array of objects
 * ```
 **/
export const palette = (color: string, config: PaletteConfig = {}) => {
  const { type = 'monochromatic', distance = 15, accented = false } =
    config.scheme || {};
  let palette;
  const base = convert(color, 'rgb');

  // First figure out what scheme is requested
  switch (type) {
    case 'monochromatic':
      palette = [base];
      break;
    case 'complementary':
      palette = complementary(base);
      break;
    case 'split complementary':
      palette = splitComplementary(base, distance, accented);
      break;
    case 'triadic':
      palette = splitComplementary(base, 60);
      break;
    case 'analogous':
      palette = analogous(base, distance, accented);
      break;
    case 'dual color':
      palette = dual(base, distance);
      break;
    case 'tetradic':
      palette = dual(base, 90);
      break;
    default:
      throw Error(`${type}: Missing or invalid. Try again`);
  }

  return palette.map(color => generate(color, config));
};
