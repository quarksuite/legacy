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
  | 'clash'
  | 'dual'
  | 'tetradic';

export interface PaletteConfig {
  contrast?: number;
  limit?: number;
  mode?: 'logarithmic' | 'linear';
  format?: 'rgb' | 'hex' | 'hsl';
  scheme?: {
    type?: Schemes;
    distance?: number;
    accented?: false;
  };
}

const generate = (color: string, config: PaletteConfig = {}) => {
  const {
    contrast = 97,
    limit = 4,
    mode = 'logarithmic',
    format = 'rgb'
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

  return {
    base: convert(base, format),
    tints: palette[0],
    tones: palette[1],
    shades: palette[2]
  };
};

const complementary = (color: string) => [
  convert(color, 'rgb'),
  convert(complement(color), 'rgb')
];

const splitComplementary = (color: string, distance = 15, accented = false) => {
  const a = convert(color, 'rgb');
  const opposite = convert(complement(a), 'rgb');
  const b = spin(opposite, -distance);
  const c = spin(opposite, distance);

  return accented ? [a, opposite, b, c] : [a, b, c];
};

const analogous = (color: string, distance = 15, accented = false) => {
  const origin = convert(color, 'rgb');
  const opposite = convert(complement(origin), 'rgb');
  const scheme = Array.from(
    Array(3).fill(convert(color, 'rgb')),
    (value, index) => spin(value, distance * index)
  );

  return accented ? [...scheme, opposite] : scheme;
};

const dual = (color: string, distance = 15) => {
  const a = convert(color, 'rgb');
  const b = spin(color, distance);
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
 *  contrast: 97, // amount of contrast in the palette (0-100)
 *  limit: 4, // number of variants each
 *  mode: 'logarithmic', // sets the blend mode for palette
 *  format: 'rgb', // change the output format of palette
 *  scheme: {
 *    type: 'monochromatic', // type of scheme to generate
 *    // analogous and split complementary options
 *    distance: 15, // distance from origin
 *    accented: false // whether to include complement as accent
 *  }
 * }
 *
 * // Outputs triadic scheme with all other defaults
 * color.output('#348ec9', {
 *   scheme: { type: 'split complementary', distance: 60 }
 * })
 *
 * @param color - The base color to generate from
 * @param config? - configuration to modify the palette (uses all defaults if undefined)
 * @returns The generated palette as an array of objects
 * ```
 **/
export const output = (
  color: string,
  config: PaletteConfig = {}
): Record<string, any>[] => {
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
    case 'clash':
      palette = splitComplementary(base, 90);
      break;
    case 'analogous':
      palette = analogous(base, distance, accented);
      break;
    case 'dual':
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
