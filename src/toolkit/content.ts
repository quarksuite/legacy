import ms from 'modularscale-js';
import { ContentScaleSchema } from '../schema';

/** Translate named ratios to numeric value */
const namedRatios = (name: string): number | undefined =>
  new Map([
    ['minor2nd', 1.067],
    ['major2nd', 1.125],
    ['minor3rd', 1.2],
    ['major3rd', 1.25],
    ['perfect4th', 1.333],
    ['augmented4th', 1.414],
    ['perfect5th', 1.5],
    ['goldenSection', 1.6180339875]
  ]).get(name);

/**
 * Outputs a value at index `i`.
 */
const scaleValues = (
  i: number,
  settings: { base: string; ratio: string | number }
) => {
  const { base, ratio } = settings;

  return ms(i, {
    base: base.replace(/[a-z]+/g, ''),
    ratio: typeof ratio === 'string' ? namedRatios(ratio) : ratio
  });
};

/**
 * Processes data to output a modular scale.
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
 * scale(data)
 * ```
 */
export const scale = (data: ContentScaleSchema): string[] => {
  const { base, ratio, limit = 'full' } = data;
  let count = 0;

  // translate named limit to corresponding number
  if (limit === 'full') count = 17;
  if (limit === 'half') count = 9;
  if (typeof limit === 'number') count = limit;

  // Fill an array with the output
  return Array.from(Array(count).fill(0))
    .map((_value, index: number) => scaleValues(index, { base, ratio }))
    .map((value: number) =>
      [parseFloat(value.toPrecision(4)), base.replace(/[0-9.]+/g, '')].join('')
    );
};
