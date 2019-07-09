import {InterpolationMode} from 'chroma-js';

/**
 * Represents the valid config schema for Quarksilver. Consumed by [[Config]].
 *
 * ```ts
 * const defaultConfig: QuarksilverConfigSchema = {
 *   colors: {
 *     base: '#aaaaaa',
 *     options: {
 *       contrast: 'high',
 *       mode: 'lab',
 *       range: 'material'
 *     }
 *   },
 *   content: {
 *     fonts: {
 *       system: {
 *         name: 'System (Sans)',
 *         stack: [
 *           '-apple-system',
 *           'BlinkMacSystemFont',
 *           'avenir next',
 *           'avenir',
 *           'helvetica neue',
 *           'helvetica',
 *           'Ubuntu',
 *           'roboto',
 *           'noto',
 *           'segoe ui',
 *           'arial',
 *           'sans-serif'
 *         ],
 *         styles: [400, '400i', 700]
 *       }
 *     },
 *     scale: {
 *       base: '1em',
 *       ratio: 'major3rd',
 *       range: 'fullScale'
 *     }
 *   }
 * };
 * ```
 */
export interface QuarksilverConfigSchema {
  colors: ColorCustomSwatchSchema | ColorCustomPaletteSchema | ColorBasicPaletteSchema,
  content: ContentSchema
}

export interface ContentSchema {
  fonts: ContentFontsSchema,
  scale: ContentScaleSchema
}

/**
 * The custom mode color swatch schema. Consumed by [[Custom]].
 * ```ts
 * const data: ColorCustomSwatchSchema = {
 *   red: '#f00',
 *   green: '#0f0',
 *   blue: '#00f'
 * }
 * ```
 */
export interface ColorCustomSwatchSchema {
  [index: string]: string
}

/**
 * The custom mode palette schema. Consumed by [[Custom]].
 * ```ts
 * const data: ColorCustomPaletteSchema = {
 *   red: {
 *     value: '#f00',
 *     options: {
 *       range: 'material',
 *       contrast: 'med'
 *     }
 *   }
 * }
 * ```
 */
export interface ColorCustomPaletteSchema {
  [index: string]: {
    value: string,
    options?: ColorOptionAdjustments
  }
}

/**
 * The basic palette config schema. Consumed by [[Scheme]].
 *
 * _Note: The `scheme` property is unnecessary for using Quarksilver
 * as a module. Its real purpose is to make scheme config easy to
 * build and consume for CLI and GUI tools._
 */
export interface ColorBasicPaletteSchema {
  base: string,
  scheme?: 'monochromatic' | 'complementary' | 'split complement' | 'triadic' | 'clash' | 'analogous',
  options?: ColorOptionAdjustments,
  neutral?: boolean
}

export interface ColorOptionAdjustments {
  range?: number | 'minimal' | 'material',
  mode?: InterpolationMode,
  contrast?: number | 'low' | 'med' | 'high'
}

export interface ContentFontsSchema {
  [index: string]: {
    name: string,
    stack: string | string[],
    styles: Array<string | number>
  }
}

export interface ContentScaleSchema {
  base: string,
  ratio: number |  'augmented4th' | 'goldenRatio' | 'minor2nd' | 'minor3rd' | 'major2nd' | 'major3rd' | 'perfect4th' | 'perfect5th',
  range: number | [number, number] | 'fullScale' | 'half' | 'minimal'
}
