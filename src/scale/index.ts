import {
  RawScaleValues,
  Scale,
  AbsoluteUnits,
  RelativeUnits,
  SignificantDigits,
  ValueRange,
  Ratio,
  ScaleBase,
  UpdateCalc,
  PartitionSize,
} from "./types";

/**
 * Creates modular scales you can use for typography, layout,
 * or other composition concerns.
 *
 * ## Usage
 * ```ts
 * ms(6, 1.5, 1);
 * ```
 *
 * @remarks
 * This is your starting point for creating modular scales. From there, you can
 * either directly output a CSS-ready value set with `units` or further modify
 * your scales with `update` and `merge`
 *
 * @param values - the number of values you want in your scale (the range)
 * @param ratio - number raised to the power of a value's index
 * @param base - initial scale value (multiplied by the ratio calculated at each index)
 * @returns an array of raw modular scale values
 */
export const ms = (
  values: ValueRange,
  ratio: Ratio,
  base: ScaleBase
): RawScaleValues => {
  return Array(values)
    .fill(base)
    .map((b: number, n: number) => {
      return b * ratio ** n;
    });
};

/**
 * Update scale with a calculation that maps to each value.
 *
 * ## Usage
 * ```ts
 * const content = ms(4, 2, 1);
 * update(n => n + 10, content);
 * ```
 *
 * @param calc - a function that returns an updated scale value
 * @param scale - the scale you want to update
 * @returns a new scale with the updated values
 */
export const update = (
  calc: UpdateCalc,
  scale: RawScaleValues
): RawScaleValues => scale.map((value: number) => calc(value));

/**
 * Merge two or more scales into one.
 *
 * ## Usage
 * ```ts
 * const a = ms(5, 1.5, 1);
 * const b = ms(8, 1.25, 1);
 * merge(a, b);
 *
 * @remarks
 * Any duplicate values are stripped from the merged scale.
 *
 * This function is lets you create multithreaded scales.
 *
 * @param scales - the scales you want to merge
 * @return a new scale with the merged values
 * ```
 */
export const merge = (...scales: RawScaleValues[]): RawScaleValues => {
  return [
    ...new Set(scales.reduce((acc, scale) => [...acc, ...scale], [])),
  ].sort((a: number, b: number) => a - b);
};

/**
 * Splits a scale into partitions.
 *
 * ## Usage
 * ```ts
 * const content = ms(30, 1.414, 1);
 * partition(6, content);
 * ```
 *
 * @remarks
 * The main use case for this function is when you have a large scale
 * that you want to break into smaller bits.
 *
 * A good example would be for content breakpoints or when you want
 * to stagger over a certain range of values
 *
 * @param size - the number of values in each partition
 * @param scale - the scale you want to break up
 * @returns a new scale split into partitions up to the size
 */
export const partition = (
  size: PartitionSize,
  scale: RawScaleValues
): RawScaleValues[] => {
  const store = Array.from(scale);

  return store.reduceRight(
    (
      acc: RawScaleValues[],
      _v,
      _i,
      array: RawScaleValues
    ): RawScaleValues[] => [...acc, array.splice(0, size)],
    []
  );
};

/**
 * Processes raw scale values into a CSS-ready modular scale.
 *
 * ## Usage
 * ```ts
 * const content = ms(6, 1.5, 1);
 * units(4, 'rem', content);
 * ```
 *
 * @remarks
 * Be aware that this library trusts you to know the scale values you intend.
 * This function does **no** internal conversion of units. No rem -> px.
 * Calculations are for the `update` function
 */
export const units = (
  precision: SignificantDigits,
  unit: AbsoluteUnits | RelativeUnits,
  scale: RawScaleValues
): Scale => {
  return scale.map((value: number) =>
    [parseFloat(value.toPrecision(precision)), unit].join("")
  );
};
