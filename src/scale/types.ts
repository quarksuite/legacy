/**
 * A `Scale` is a type representing a modular scale.
 *
 * @remarks
 * A scale is an array of raw values
 *
 * The functions that output a `Scale` are:
 * - {@link create}
 * - {@link modify}
 * - {@link merge}
 * - {@link output}
 */
export type Scale = number[];

/** A type representing a final output `Scale`. */
export type Output = string[];

/** A type representing all available named ratios that allows custom values */
export type Ratio =
  | 'min2nd'
  | 'maj2nd'
  | 'min3rd'
  | 'maj3rd'
  | 'perf4th'
  | 'dim5th'
  | 'perf5th'
  | 'min6th'
  | 'golden'
  | 'maj6th'
  | 'min7th'
  | 'octave'
  | 'maj10th'
  | 'maj12th'
  | 'x2octave'
  | number;

/** A type representing defined CSS units with the option to pass in your own */
export type Units =
  | 'ch'
  | 'em'
  | 'ex'
  | 'rem'
  | 'vh'
  | 'vw'
  | 'vmin'
  | 'vmax'
  | 'px'
  | string;
