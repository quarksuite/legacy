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
} from "./types";

/**
 * Creates modular scales you can use for typography, layout viewports
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
 * @param ratio - the number each value in the scale will be multiplied
 * @param base - the initial value of the scale
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
