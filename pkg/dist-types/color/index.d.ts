import { CSSColorFormats } from './convert/helpers';
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
export declare const complement: (color: string) => string;
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
export declare const neutralize: (color: string) => string;
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
export declare const mix: (color: string, target: string, amount?: number) => string;
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
export declare const format: (color: string, format?: CSSColorFormats) => string;
export declare type SchemeType = 'analogous' | 'complementary' | 'split' | 'triadic' | 'dual' | 'tetradic';
export interface SchemeOptions {
    distance?: number;
    accented?: boolean;
}
export declare type ColorScheme = [string, string] | [string, string, string] | [string, string, string, string];
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
export declare const scheme: (color: string, type: SchemeType, options?: SchemeOptions) => ColorScheme;
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
export declare const variants: (color: string, target: string, options?: VariantOptions) => string[];
