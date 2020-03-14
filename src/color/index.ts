import { CSSColorFormats } from './convert/helpers';
import { spin, blend, convert as format } from './helpers';

/**
 * Grab the complement of a given color.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * color.complementOf('#348ec9')
 * ```
 *
 * @param color - the color to transform
 * @returns The color complement as RGB
 **/
const complementOf = (color: string): string => spin(color);

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
const neutralize = (color: string): string => blend(color, complementOf(color));

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
 * @param baseColor - The color to transform
 * @param targetColor - The color to mix
 * @param byAmount? - percentage to mix baseColor with targetColor  (0-100)
 * @returns A mix of two colors as RGB
 **/
const mix = (baseColor: string, targetColor: string, byAmount = 50): string =>
  blend(baseColor, targetColor, byAmount);

/**
 * Returns a color converted to another format
 *
 * @remarks
 * Usage:
 * ```ts
 * // default
 * color.convert('#348ec9');
 *
 * // pass in another format
 * color.convert('#348ec9', 'hsl');
 * ```
 *
 * @param color - The color to transform
 * @param format - the CSS color format to output (`rgb` by default)
 * @returns A newly formatted color
 **/
const convert = (color: string, output: CSSColorFormats = 'rgb'): string =>
  format(color, output);

type ColorScheme =
  | [string, string]
  | [string, string, string]
  | [string, string, string, string];

const complementary = (color: string): ColorScheme => [
  convert(color),
  convert(complementOf(color))
];

const splitComplementary = (
  color: string,
  spreadFromOrigin: number = 15
): ColorScheme => {
  const main = convert(color);
  const opposite = convert(complementOf(main));
  const rightOfComplement = convert(spin(opposite, spreadFromOrigin));
  const leftOfComplement = convert(spin(opposite, spreadFromOrigin, true));

  return [main, leftOfComplement, rightOfComplement];
};

const analogous = (
  color: string,
  spreadFromOrigin: number = 15
): ColorScheme => {
  const origin = convert(color);
  const rightOfOrigin = convert(spin(origin, spreadFromOrigin));
  const leftOfOrigin = convert(spin(origin, spreadFromOrigin, true));

  return [leftOfOrigin, origin, rightOfOrigin];
};

const dualColor = (
  color: string,
  spreadFromOrigin: number = 15
): ColorScheme => {
  const main = convert(color);
  const opposite = convert(complementOf(main));
  const adjacentMain = convert(spin(main, spreadFromOrigin));
  const adjacentOpposite = convert(spin(opposite, spreadFromOrigin));

  return [main, opposite, adjacentMain, adjacentOpposite];
};

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
 * ```
 *
 * @param baseColor - The base color to generate variants for
 * @param targetColor - The color to blend for variants
 * @param paletteContrast - the overall contrast of the blend
 * @param colorsToGenerate - The number of colors to generate
 * @returns The generated variants as an array of RGB values
 **/
const variants = (
  baseColor: string,
  targetColor: string,
  paletteContrast: number = 97,
  colorsToGenerate: number = 3
): string[] => {
  // Initialize the options
  // Convert colors to format accepted by blend function
  baseColor = convert(baseColor, 'rgb');
  targetColor = convert(targetColor, 'rgb');

  // Generate the variants
  return Array.from(Array(colorsToGenerate).fill(baseColor))
    .map((value: string, index: number): string => {
      const amount =
        paletteContrast - (paletteContrast / colorsToGenerate) * index;
      return blend(value, targetColor, amount);
    })
    .reverse();
};

type SwatchStore = string;
type SchemeStore = string[];
type PaletteStore = (string | string[])[];

export default class Color {
  private color: string;
  private swatch: SwatchStore = '';
  private scheme: SchemeStore = [];
  private palette: PaletteStore = [];

  public constructor(color: string) {
    this.color = convert(color);
    this.swatch = convert(color);
  }

  public get baseState(): string {
    return this.color;
  }

  public get swatchState(): SwatchStore {
    return this.swatch;
  }

  public get schemeState(): SchemeStore {
    return [...new Set(this.scheme)];
  }

  public get paletteState(): PaletteStore {
    return [this.color, ...this.palette];
  }

  public get currentAttributes() {
    return `
      instantiated with: ${this.color}
      current swatch state: ${this.swatch}
      current scheme state: ${this.scheme}
      current palette state ${this.palette}
    `;
  }

  public formatSwatchTo(cssFormat: CSSColorFormats) {
    this.swatch = convert(this.swatch, cssFormat);
    return this;
  }

  public shiftHue(
    degreesOfRotation: number,
    counterClockwise: boolean = false
  ): Color {
    this.swatch = spin(this.color, degreesOfRotation, counterClockwise);
    return this;
  }

  public fetchComplement(): Color {
    this.swatch = complementOf(this.color);
    return this;
  }

  public neutralize(): Color {
    this.swatch = neutralize(this.color);
    return this;
  }

  public mix(withTarget: string, byAmount: number = 50): Color {
    this.swatch = mix(this.swatch, withTarget, byAmount);
    return this;
  }

  public createComplementaryScheme(): Color {
    this.scheme = [...this.scheme, ...complementary(this.swatch)];
    return this;
  }

  public createAnalogousScheme(spreadFromOrigin: number = 45): Color {
    this.scheme = [...this.scheme, ...analogous(this.swatch, spreadFromOrigin)];
    return this;
  }

  public createTriadicScheme(spreadFromOrigin: number = 60): Color {
    this.scheme = [
      ...this.scheme,
      ...splitComplementary(this.swatch, spreadFromOrigin)
    ];
    return this;
  }

  public createTetradicScheme(spreadFromOrigin: number = 90): Color {
    this.scheme = [...this.scheme, ...dualColor(this.swatch, spreadFromOrigin)];
    return this;
  }

  // variant operations
  public createBlend(
    targetColor: string,
    paletteContrast: number = 97,
    colorsToGenerate: number = 3
  ): Color {
    this.palette = [
      ...this.palette,
      ...[variants(this.swatch, targetColor, paletteContrast, colorsToGenerate)]
    ];
    return this;
  }

  public createTints(
    paletteContrast: number = 97,
    colorsToGenerate: number = 3
  ): Color {
    this.palette = [
      ...this.palette,
      ...[variants(this.swatch, '#fff', paletteContrast, colorsToGenerate)]
    ];
    return this;
  }

  public createTones(
    paletteContrast: number = 97,
    colorsToGenerate: number = 3
  ): Color {
    this.palette = [
      ...this.palette,
      ...[variants(this.swatch, '#aaa', paletteContrast, colorsToGenerate)]
    ];
    return this;
  }

  public createShades(
    paletteContrast: number = 97,
    colorsToGenerate: number = 3
  ): Color {
    this.palette = [
      ...this.palette,
      ...[variants(this.swatch, '#111', paletteContrast, colorsToGenerate)]
    ];
    return this;
  }
}
