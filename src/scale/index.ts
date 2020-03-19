import { ratios, NamedRatios } from './ratio-lookup';

/**
 * Create a modular scale.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // No args
 * scale.create();
 *
 * // Just a base
 * scale.create(1.25);
 *
 * // With a named ratio
 * scale.create(1, 'maj3rd');
 *
 * // With a custom ratio
 * scale.create(1, 1.72);
 *
 * // With a custom limit
 * scale.create(1, 'octave', 4);
 *
 * // Invert the scale
 * scale.create(1, 'octave', 4, true);
 * ```
 *
 * @param base? - The value to generate from
 * @param ratio? - The scale ratio
 * @param limit? - Number of values to output
 * @param invert? - reverse the scale (divide by the ratio)
 * @returns A modular scale
 **/
export const create = (
  base = 1,
  ratio: number | NamedRatios = 'golden',
  limit = 6,
  invert = false
): number[] => {
  let r = 0;

  // Check if ratio is a named ratio or custom one
  if (ratios[ratio]) {
    r = ratios[ratio];
  } else if (typeof ratio === 'number') {
    r = ratio;
  } else {
    throw Error('Not a valid ratio arg, exiting');
  }

  return Array.from(Array(limit).fill(0), (_value, n) => {
    const multiplied = parseFloat((base * r ** n).toPrecision(6));
    const divided = parseFloat((base / r ** n).toPrecision(6));

    return invert ? divided : multiplied;
  });
};

/**
 * Modifies an existing `scale` from `n` value and a `modifier` function.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * scale.modify(scale.create(), 10, (n, v) => n + v)
 * ```
 *
 * @param scale - a new or existing scale to transform
 * @param n - a value to pass through the scale
 * @param modifier - the function that will transform the scale values
 **/
export const modify = (
  scale: number[],
  n: number,
  modifier: (n: number, scaleValue: number) => number
): number[] =>
  scale.map(value => parseFloat(modifier(n, value).toPrecision(6)));

/**
 * Merges modular scales and removes duplicate values.
 *
 * Use to create multithreaded scales.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * scale.merge(scale.create(), scale.create(1.25), scale.create(2))
 * ```
 *
 * @param scales - The scales to merge (recommend no more than three)
 * @return - a new scale containing all unique values of sources
 **/
export const merge = (...scales: number[][]): number[] => {
  return Array.prototype
    .concat(...scales)
    .sort((a: number, b: number) => a - b)
    .filter((v, i, a) => a.indexOf(v) === i);
};

export type CSSUnits =
  | 'ch'
  | 'em'
  | 'ex'
  | 'rem'
  | 'vh'
  | 'vw'
  | 'vmin'
  | 'vmax'
  | 'px';

/**
 * Outputs a scale with the desired `unit` and `precision`.
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // default
 * scale.output(scale.create(1.25, 'maj3rd', 8))
 *
 * // With a unit
 * scale.output(scale.create(), 'em')
 *
 * // And precision
 * scale.output(scale.create(), 'em', 3)
 * ```
 *
 * @param scale - the scale to output
 * @param unit? - the units for output (does not convert values)
 * @returns A modular scale with units
 **/
export const output = (scale: number[], unit: CSSUnits = 'rem'): string[] => {
  return scale.map(v => parseFloat(v.toPrecision(4)) + unit);
};
