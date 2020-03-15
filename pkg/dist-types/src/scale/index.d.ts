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
export declare const create: (base?: number, ratio?: number | "min2nd" | "maj2nd" | "min3rd" | "maj3rd" | "perf4th" | "dim5th" | "perf5th" | "min6th" | "golden" | "maj6th" | "min7th" | "octave" | "maj10th" | "maj12th" | "x2octave", limit?: number, invert?: boolean) => number[];
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
export declare const modify: (scale: number[], n: number, modifier: (n: number, scaleValue: number) => number) => number[];
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
export declare const merge: (...scales: number[][]) => number[];
export declare type CSSUnits = 'ch' | 'em' | 'ex' | 'rem' | 'vh' | 'vw' | 'vmin' | 'vmax' | 'px';
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
 * @param precision? - how many decimal places for output
 * @returns A modular scale with units
 **/
export declare const output: (scale: number[], unit?: CSSUnits, precision?: number) => string[];
