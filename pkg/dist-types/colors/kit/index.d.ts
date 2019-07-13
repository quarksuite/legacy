/**
 * A set of utilities to streamline color token generation and modification.
 * Made available in case you require baremetal manipulation of colors.
 */
import { ColorOptions } from './schema';
/**
 * Merges a color with a target to blend. Strips
 * color from output to avoid redundancy.
 *
 * ```ts
 * import {blend} from '@quarksilver/core';
 *
 * blend('#f00', '#00f');
 * ```
 */
export declare const blend: (
  color: string,
  target: string,
  options?: ColorOptions
) => string[];
/**
 * Returns a collection of tints for a color
 *
 * ```ts
 * import {tints} from '@quarksilver/core';
 *
 * tints('#f00');
 * ```
 * */
export declare const tints: (color: string, options?: ColorOptions) => string[];
/**
 * Returns a collection of tones for a color
 *
 * ```ts
 * import {tones} from '@quarksilver/core';
 *
 * tones('#f00');
 * ```
 * */
export declare const tones: (color: string, options?: ColorOptions) => string[];
/**
 * Returns a collection of shades for a color
 *
 * ```ts
 * import {shades} from '@quarksilver/core';
 *
 * shades('#f00');
 * ```
 * */
export declare const shades: (
  color: string,
  options?: ColorOptions
) => string[];
/**
 * Fetches the complement (opposite) of a color.
 *
 * ```ts
 * import {complement} from '@quarksilver/core';
 *
 * complement('#f00') // #0ff;
 * ```
 */
export declare const complement: (color: string) => string;
/**
 * Neutralizes a color with its complement;
 *
 * ```ts
 * import {neutralize} from '@quarksilver/core';
 *
 * neutralize('#f00') // #aaa
 * ```
 */
export declare const neutralize: (color: string) => string;
/**
 * Splits a color on either side. Tuple represents [leftOfTarget, rightOfTarget]
 * @param color - any valid CSS color
 * @param distance - angular distance to split from target
 *
 * ```ts
 * import {split} from '@quarksilver/core';
 *
 * split('#f00', 60) // ['#f0f', '#ff0']
 * ```
 */
export declare const split: (
  color: string,
  degrees?: number
) => [string, string];
/**
 * Spreads a range of colors on either side of target

 * ```ts
 * import {spread} from '@quarksilver/core';
 *
 * spread('#f00');
 * ```
 */
export declare const spread: (
  color: string,
  degrees?: number,
  range?: number
) => string[];
/**
 * Inscribes a triangle of colors.
 *
 * A = origin, BC = Equidistant points split from A
 *
 * degrees = 120 is an equilateral triad
 *
 * degrees = 90 is an isosceles clash
 *
 * ```ts
 * import {triad} from '@quarksilver/core';
 *
 * triad('f00'); // ['#f00', '#00f', '#0f0']
 * ```
 */
export declare const triad: (
  color: string,
  degrees?: number
) => [string, string, string];
/**
 * Inscribes a rectangle of colors
 *
 * A = origin, B = degrees right of a
 *
 * C = complement of a, D = complement of b
 *
 * degrees = 90 is a perfect square
 *
 * degrees = 60 is a tetrad
 *
 * ```ts
 * import {tetrad} from '@quarksilver/core';
 *
 * tetrad('#f00'); // ['#f00', '#0ff', '#ff0', '#f0f']
 * ```
 */
export declare const tetrad: (
  color: string,
  degrees?: number
) => [string, string, string, string];
/**
 * Transforms a collection of colors into tokens consumable by Style Dictionary
 *
 * `palette` outputs a scale, otherwise it assumes a swatch
 *
 * ```ts
 * import {tokenize, blend} from '@quarksilver/core';
 *
 * tokenize(blend('#f00', '#ff0'), 'main', true)
 * ```
 */
export declare const tokenize: (
  data: string[],
  key: string,
  palette?: boolean
) => object;
