import { ContentFontsSchema } from '../schema';
import { ContentScaleSchema } from '../schema';
import { scaleValues } from './content';

const colorScale = (data: string[]): object =>
  data.reduce((container, value, i) => {
    const indexToOne = ++i;
    const scaleKey =
      indexToOne < 10
        ? indexToOne.toString().padEnd(3, '0')
        : indexToOne.toString().padEnd(4, '0');
    return { ...container, [scaleKey]: { value } };
  }, {});

const formatColors = (data: string[], key: string): object => {
  return data.reduce(
    (container, _value, _i, array) => ({
      ...container,
      ...{ [key]: colorScale(array) }
    }),
    {}
  );
};

/**
 * Transforms a collection of colors into tokens consumable by Style Dictionary
 *
 * Swatch will be translated directly, palette will be formatted
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const { tokenize, colors: { variants } } = quarks.toolkit;
 *
 * tokenize.colors('#f00000', 'red');
 * tokenize.colors(variants.tints('#f00000'), 'tints')
 * ```
 */
export const colors = (data: string[] | string, key: string) => {
  // Can't create an object without a key
  if (!key) throw Error(`key: expected a string, received ${key}`);
  // Can't populate a palette without data
  if (!data) return {};
  // Check the type of input. String indicates swatch, array indicates palette
  return typeof data === 'string'
    ? { [key]: { value: data } }
    : formatColors(data, key);
};

/**
 * Formats font data for consumption by Style Dictionary.
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const { tokenize } = quarks.toolkit;
 *
 * const data = {
 *   primary: {
 *     name: 'Nunito',
 *     stack: 'Nunito, sans-serif',
 *     styles: [200, 900]
 *   }
 * }
 *
 * tokenize.fonts(data)
 * ```
 */
export const fonts = (data: ContentFontsSchema): object =>
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

/**
 * Processes modular scale data to output layout, sizing,
 * and spacing units
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const { tokenize } = quarks.toolkit;
 *
 * const data = {
 *   base: '1em',
 *   ratio: 1.25
 * }
 *
 * tokenize.scale(data)
 * ```
 */
export const scale = (data: ContentScaleSchema): object => {
  const { base, ratio, limit = 'full' } = data;
  let count = 0;
  let collection = [];

  if (limit === 'full') count = 17;
  if (limit === 'half') count = 9;
  if (typeof limit === 'number') count = limit;

  for (let i = 0; i < count; i++)
    collection.push(scaleValues(i, { base, ratio }));

  return collection
    .map((value: number) =>
      [parseFloat(value.toPrecision(4)), base.replace(/[0-9.]+/g, '')].join('')
    )
    .reduce((container, value: string, i: number) => {
      return { ...container, ...{ [i]: { value } } };
    }, {});
};
