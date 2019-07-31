import { ContentScaleSchema } from '../schema';
import { scale } from '../toolkit/composition';

/**
 * Processes modular scale data to output layout, sizing,
 * and spacing tokens
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const tokenizeScale = quarks.composition.tokenize;
 *
 * const data = {
 *   base: '1em',
 *   ratio: 1.25
 * }
 *
 * tokenizeScale(data)
 * ```
 */
export const tokenize = (data: ContentScaleSchema): object => {
  const { base, ratio, limit = 'full' } = data;
  let count = 0;
  let collection = [];

  if (limit === 'full') count = 17;
  if (limit === 'half') count = 9;
  count = limit;

  for (let i = 0; i < count; i++) collection.push(scale(i, { base, ratio }));

  return collection
    .map((value: number) =>
      [parseFloat(value.toPrecision(4)), base.replace(/[0-9.]+/g, '')].join('')
    )
    .reduce((container, value: string, i: number) => {
      return { ...container, ...{ [i]: { value } } };
    }, {});
};
