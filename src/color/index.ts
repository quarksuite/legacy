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
 * @returns The color opposite in hue as RGB
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
 * @returns An even mix of the color and and its complement (neutral) as RGB
 **/
export const neutralize = (color: string): string =>
  blend(color, complement(color));

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
 * @returns A mix of two colors as RGB
 **/
export const mix = (color: string, target: string, amount = 50): string =>
  blend(color, target, amount);

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

export type SchemeType =
  | 'analogous'
  | 'complementary'
  | 'split'
  | 'triadic'
  | 'dual'
  | 'tetradic';

export interface SchemeOptions {
  distance?: number;
  accented?: boolean;
}

export type ColorScheme =
  | [string, string]
  | [string, string, string]
  | [string, string, string, string];

const complementary = (color: string): ColorScheme => [
  convert(color),
  convert(complement(color))
];

const splitComplementary = (
  color: string,
  distance: number = 15,
  accented: boolean = false
): ColorScheme => {
  const a = convert(color);
  const opposite = convert(complement(a));
  // right of complement
  const b = convert(spin(opposite, 360 + distance));
  // left of complement
  const c = convert(spin(opposite, 360 - distance));

  return accented ? [a, opposite, b, c] : [a, b, c];
};

const analogous = (
  color: string,
  distance: number = 15,
  accented: boolean = false
): ColorScheme => {
  const a = convert(color, 'rgb');
  const opposite = convert(complement(a));
  const b = convert(spin(a, 360 + distance));
  const c = convert(spin(a, 360 + distance * 2));

  return accented ? [a, b, c, opposite] : [a, b, c];
};

const dualColor = (color: string, distance: number = 15): ColorScheme => {
  const a = convert(color, 'rgb');
  const b = convert(spin(color, 360 + distance), 'rgb');
  const c = convert(complement(a), 'rgb');
  const d = convert(complement(b), 'rgb');

  return [a, b, c, d];
};

/**
 * Returns a basic color scheme.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // Set a complementary scheme
 * color.scheme('#348ec9', 'complementary');
 *
 * // split, analogous, dual allow setting a distance
 * color.scheme('#348ec9', 'split', { distance: 45 });
 *
 * // split, analogous, also allow setting the complement as an accent
 * color.scheme('#348ec9', 'analogous', { accented: true });
 * ```
 *
 * @param color - The base color to generate a scheme from
 * @param type - The type of scheme to generate
 * @param options - Additional options to modify the generated scheme
 * @returns The generated scheme as an array of RGB values
 **/
export const scheme = (
  color: string,
  type: SchemeType,
  options: SchemeOptions = {}
): ColorScheme => {
  // Initialize the options
  const { distance = 15, accented = false } = options;

  // Check the type and generate the appropriate scheme
  switch (type) {
    case 'complementary':
      return complementary(color);
    case 'analogous':
      return analogous(color, distance, accented);
    case 'split':
      return splitComplementary(color, distance, accented);
    case 'triadic':
      return splitComplementary(color, 60);
    case 'dual':
      return dualColor(color, distance);
    case 'tetradic':
      return dualColor(color, 90);
    default:
      throw Error(
        'You must define a scheme from the available values (complementary, analogous, split, triadic, dual, tetradic)'
      );
  }
};

export interface VariantOptions {
  contrast?: number;
  limit?: number;
  mode?: 'logarithmic' | 'linear';
}

/**
 * Generate a set of variants from a base color.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // Generate two tints (97% contrast, logarithmic blend)
 * color.variants('#348ec9', '#ffffff');
 *
 * // Generate one tone
 * color.variants('#348ec9', '#aaaaaa', { limit: 1 });
 *
 * // Generate four shades with a linear blend mode
 * color.variants('#348ec9', '#111111', { limit: 4, mode: 'linear' });
 * ```
 *
 * @param color - The base color to generate variants for
 * @param target - The color to blend for variants
 * @param options - Additional options to modify the generated variants
 * @returns The generated variants as an array of RGB values
 **/
export const variants = (
  color: string,
  target: string,
  options: VariantOptions = {}
): string[] => {
  // Initialize the options
  const { contrast = 97, limit = 2, mode = 'logarithmic' } = options;

  // Convert colors to format accepted by blend function
  color = convert(color, 'rgb');
  target = convert(target, 'rgb');

  // Generate the variants
  return Array.from(Array(limit).fill(color))
    .map((value, index) => {
      const amount = contrast - (contrast / limit) * index;
      return blend(value, target, amount, mode);
    })
    .reverse();
};
