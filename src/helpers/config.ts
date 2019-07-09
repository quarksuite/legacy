import {QuarksilverConfigSchema} from '../helpers/interfaces';

const defaultConfig: QuarksilverConfigSchema = {
  colors: {
    base: '#aaaaaa',
    options: {
      contrast: 'high',
      mode: 'lab',
      range: 'material'
    }
  },
  content: {
    fonts: {
      system: {
        name: 'System (Sans)',
        stack: [
          '-apple-system',
          'BlinkMacSystemFont',
          'avenir next',
          'avenir',
          'helvetica neue',
          'helvetica',
          'Ubuntu',
          'roboto',
          'noto',
          'segoe ui',
          'arial',
          'sans-serif'
        ],
        styles: [400, '400i', 700]
      }
    },
    scale: {
      base: '1em',
      ratio: 'major3rd',
      range: 'fullScale'
    }
  }
};

/**
 * A configuration module that exposes [[QuarksilverConfigSchema]] types.
 * Either created on the fly or passed from `.quarksrc[.json,.yaml]` files
 * 
 * Namedspaced under [[Helpers]].
 *
 */
export const Config = {
  /**
   * Loads Quarksilver config to pass along to [[Colors]] and [[Content]] modules.
   *
   * Usage:
   * ```ts
   * import {Helpers, Colors} from '@quarksilver/core';
   *
   * const data: QuarksilverConfigSchema = {
   *   colors: {
   *     base: '#f00',
   *     options: {
   *       range: 'minimal',
   *       mode: 'lch'
   *     }
   *   },
   *   content: {
   *     fonts: {
   *       body: {
   *         name: 'Nunito Sans',
   *         stack: 'Nunito Sans, sans-serif',
   *         styles: [400, '400i', 700]
   *       }
   *     },
   *     scale: {
   *       base: '1em',
   *       ratio: 'perfect5th',
   *       range: 'half'
   *     }
   *   }
   * }
   *
   * const { colors } = Helpers.Config.loadConfig(data);
   *
   * const palette = Colors.Scheme.complementary(colors)
   * ```
   */
  loadConfig: (data: QuarksilverConfigSchema): object => data ? data : defaultConfig
}
