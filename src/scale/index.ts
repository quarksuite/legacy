import { ratios } from './ratio-lookup';
import { Scale, Output, Ratio, Units } from './types';

/**
 * Create a modular `Scale`.
 *
 * @remarks
 * This function outputs a {@link Scale}.
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
 * // With a value limit
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
 * @returns Raw values of a modular scale
 **/
export const create = (
  base = 1,
  ratio: Ratio = 'golden',
  limit = 6,
  invert = false
): Scale => {
  let r = 0;

  // Check if ratio is a named ratio or custom one
  if (ratios[ratio]) {
    r = ratios[ratio];
  } else if (typeof ratio === 'number') {
    r = ratio;
  } else {
    throw Error('Not a valid ratio arg, exiting');
  }

  return Array.from(Array(limit).fill(0), (_, n: number) => {
    const multiplied = parseFloat((base * r ** n).toPrecision(6));
    const divided = parseFloat((base / r ** n).toPrecision(6));

    return invert ? divided : multiplied;
  });
};

/**
 * Updates the values of an existing `Scale` with a modifier function
 *
 * @remarks
 * This function outputs a {@link Scale}.
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
): Scale =>
  scale.map((value: number) => parseFloat(modifier(n, value).toPrecision(6)));

/**
 * Merges modular scales and removes duplicate values.
 *
 * Use to create multithreaded scales.
 *
 * @remarks
 * This function outputs a {@link Scale}.
 *
 * ```ts
 * scale.merge(scale.create(), scale.create(1.25), scale.create(2))
 * ```
 *
 * @param scales - The scales to merge (recommend no more than three)
 * @return - a new scale containing all unique values of source scales
 **/
export const merge = (...scales: Scale[]): Scale => {
  return Array.prototype
    .concat(...scales)
    .sort((a: number, b: number) => a - b)
    .filter((v, i, a) => a.indexOf(v) === i);
};

/**
 * Outputs a scale with the desired `unit`.
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
 * ```
 *
 * @param scale - the scale to output
 * @param unit? - the units for output (does not convert values)
 * @returns A modular scale with units
 **/
export const output = (scale: number[], unit: Units = 'rem'): Output => {
  return scale.map(v => parseFloat(v.toPrecision(4)) + unit);
};
