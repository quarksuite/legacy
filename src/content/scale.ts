import { ContentScaleSchema } from '../schema';
import { scale } from '../toolkit/content';

/**
 * Processes modular scale data to output layout, sizing,
 * and spacing units
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const { scale } = quarks.content;
 *
 * const data = {
 *   base: '1em',
 *   ratio: 1.25
 * }
 *
 * scale.tokenize(data)
 * ```
 */
export const tokenize = (data: ContentScaleSchema): object => {
  const { base, ratio, limit = 'full' } = data;
  let count = 0;
  let collection = [];

  if (limit === 'full') count = 17;
  if (limit === 'half') count = 9;
  if (typeof limit === 'number') count = limit;

  for (let i = 0; i < count; i++) collection.push(scale(i, { base, ratio }));

  return collection
    .map((value: number) =>
      [parseFloat(value.toPrecision(4)), base.replace(/[0-9.]+/g, '')].join('')
    )
    .reduce((container, value: string, i: number) => {
      return { ...container, ...{ [i]: { value } } };
    }, {});
};
