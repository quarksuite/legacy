/**
 * A set of utilities for colors and schemes.
 */

import chroma, { InterpolationMode } from 'chroma-js';

/** Options available when modifying variants */
export interface VariantOptions {
  /** How many variants to output */
  range?: number;
  /** The color space (lab is the default) */
  mode?: InterpolationMode;
  /** Sets the contrast */
  contrast?: number;
}
/**
 * Maps a color palette to hex format.
 */
const maptoCSS = (palette: string[]): string[] =>
  palette.map((c): string => chroma(c).hex());

/** Converts a percentage to a ratio */
const convert = (percent: number): number =>
  parseFloat((percent / 100).toPrecision(2));

/**
 * Generates a range of colors.
 */
const generate = (
  colorRange: string[],
  options: VariantOptions = {}
): string[] => {
  const { mode = 'lab' as InterpolationMode, range = 4 } = options;
  const colorScale = chroma.scale(colorRange).mode(mode);

  // Otherwise numeric range
  return colorScale.colors(range + 1);
};

/**
 * Merges a color with a target to blend. Strips
 * color from output to avoid redundancy.
 */
const blend = (
  color: string,
  target: string,
  options: VariantOptions = {}
): string[] => {
  const { contrast = 95, mode } = options;

  const base = chroma(color).hex();

  // blend color with target
  const blend = chroma.mix(base, target, convert(contrast), mode).hex();

  // Generate variants
  const [, ...variants] = generate([base, blend], options);

  return variants;
};

/**
 * Alters the hue of a color
 */
const setHue = (color: string, rotation: string): string =>
  chroma(color)
    .set('hsl.h', rotation)
    .hex();

/**
 * Fetches the complement (opposite) of a color.
 */
const complement = (color: string): string => setHue(color, '+180');

/**
 * Neutralizes a color with its complement;
 */
const neutralize = (color: string): string =>
  chroma.mix(color, complement(color), 0.5).hex();

/** Outputs a collection of colors derived from temparture */
const temperature = (
  color: string,
  kelvin: number = 3500,
  options: VariantOptions = {}
): string[] => blend(color, chroma.temperature(kelvin).hex(), options);
/**
 * Returns a collection of tints for a color
 * */
const tints = (color: string, options: VariantOptions = {}): string[] =>
  blend(color, '#fff', options);

/**
 * Returns a collection of tones for a color
 **/
const tones = (color: string, options: VariantOptions = {}): string[] =>
  blend(color, '#aaa', options);

/**
 * Returns a collection of shades for a color
 **/
const shades = (color: string, options: VariantOptions = {}): string[] =>
  blend(color, '#111', options);

/**
 * Splits a color on either side. Tuple represents [leftOfTarget, rightOfTarget]
 */
const split = (color: string, degrees: number = 60): [string, string] => [
  setHue(color, `-${degrees}`),
  setHue(color, `+${degrees}`)
];

/** Used to create tri color schemes */
const triad = (
  color: string,
  degrees: number = 120
): [string, string, string] => {
  const a = color;
  const b = split(a, degrees)[0],
    c = split(a, degrees)[1];

  return [a, b, c];
};

/** Used to create quad color schemes */
const tetrad = (
  color: string,
  degrees: number = 60
): [string, string, string, string] => {
  const a = color;
  const b = split(a, degrees)[1];
  const c = complement(a);
  const d = complement(b);

  return [a, c, b, d];
};

/** Creates analogous schemes */
const analogous = (
  color: string,
  degrees: number = 60,
  range: number = 3
): string[] => {
  const terminals = [color, setHue(color, `+${degrees}`)];
  return maptoCSS(generate(terminals, { range })).filter((_value, index) => {
    return index !== 0;
  });
};

/** Exposes swatch features */
export const swatch = {
  complement,
  neutralize
};

/** Exposes palette features */
export const palette = {
  tints,
  tones,
  shades,
  temperature
};

/** Exposes scheme features */
export const scheme = {
  triad,
  tetrad,
  analogous
};
