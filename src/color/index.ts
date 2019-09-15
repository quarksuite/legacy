import { CSSColorFormats } from './convert/helpers';
import { spin, blend, convert } from './helpers';

/**
 * Returns the complement of a color.
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
 * Returns the negation of a color. For neutral palettes.
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
export const mix = (color: string, target: string, amount?: number): string =>
  convert(blend(color, target, amount), 'hex');

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
  format?: CSSColorFormats;
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
  const opposite = complement(a);
  const b = spin(opposite, -distance);
  const c = spin(opposite, distance);

  return accented ? [a, opposite, b, c] : [a, b, c];
};

const analogous = (color: string, distance = 15, accented = false) => {
  const origin = convert(color, 'rgb');
  const opposite = complement(origin);
  const scheme = Array.from(
    Array(3).fill(convert(color, 'rgb')),
    (value, index) => spin(value, distance * index)
  );

  return accented ? [...scheme, opposite] : scheme;
};

const dual = (color: string, distance = 15) => {
  const a = convert(color, 'rgb');
  const b = spin(color, distance);
  const c = complement(a);
  const d = complement(b);

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
 * // Outputs triadic scheme with all other defaults
 * color.palette('#348ec9', {
 *   scheme: { type: 'split complementary', distance: 60 }
 * })
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

/** color.output - A utility for transforming color formats */
export const output = (color: string, format: CSSColorFormats) =>
  convert(color, format);
