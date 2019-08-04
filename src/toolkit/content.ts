import ms from 'modularscale-js';

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
 * Outputs a value at index `i` from settings.
 *
 * ```ts
 * import quarks from '@quarksilver/core';
 *
 * const { scaleValues } = quarks.toolkit.content;
 *
 * scaleValues(1, { base: '1em', ratio: 'perfect4th' });
 * scaleValues(1, { base: '1em', ratio: 2 });
 * ```
 */
export const scaleValues = (
  i: number,
  settings: { base: string; ratio: string | number }
) => {
  const { base, ratio } = settings;

  return ms(i, {
    base: base.replace(/[a-z]+/g, ''),
    ratio: typeof ratio === 'string' ? namedRatios(ratio) : ratio
  });
};
