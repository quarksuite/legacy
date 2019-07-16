import { ContentFontsSchema } from '../schema';

/**
 * Formats fonts for consumption by Style Dictionary.
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const tokenizeFonts = quarks.content.fonts.tokenize;
 *
 * const data = {
 *   primary: {
 *     name: 'Nunito',
 *     stack: 'Nunito, sans-serif',
 *     styles: [200, 900]
 *   }
 * }
 *
 * tokenizeFonts(data)
 * ```
 */
export const tokenize = (data: ContentFontsSchema): object =>
  Object.keys(data).reduce((container, key: string): object => {
    const { name, stack, styles } = data[key];
    const formatStack = typeof stack === 'string' ? stack : stack.join(', ');
    return {
      ...container,
      ...{
        [key]: {
          metadata: { name, styles },
          value: formatStack
        }
      }
    };
  }, {});
