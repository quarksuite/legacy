/**
 * A set of utilities responsible for creating and modifying modular scales.
 */

/** Sorts an array in ascending order */
const order = (arr: number[]): number[] =>
  arr.sort((a: number, b: number) => a - b);

/** Sums all the values in an array */
const sum = (arr: number[]): number => arr.reduce((acc, v) => acc + v, 0);

/** Calculates the mean of values in array */
const mean = (arr: number[]): number => sum(arr) / arr.length;

/** Calculates the median of values in array */
const median = (arr: number[]): number => {
  const sorted = order(arr);
  const midpoint = sorted.length / 2;

  if (sorted.length % 2 === 0)
    return mean([sorted[midpoint], sorted[midpoint - 1]]);

  return midpoint;
};

/** Generates a fibonacci sequence for calculating the golden mean */
function* fibonacci(n: number): Generator {
  if (n <= 1) yield n;
  yield fibonacci(n - 1).next().value + fibonacci(n - 2).next().value;
}

/**
 * A utility for creating new ratios.
 */
export function* create(value: number, limit: number) {
  yield value ** limit;
}

/**
 * A utility for building scales.
 */
export function build(type: (limit: number) => Generator, limit = 8): number[] {
  return Array.from(
    Array(limit).fill(0),
    (_, index) => type(index).next().value
  );
}

/**
 * A helper for multistranding scales.
 */
const fragment = (scale: number[], ratio = 2): number[] => {
  const internal = (r: number) => scale.map((v, _, a) => v * median(a) * r);
  const combined = order([...scale, ...internal(ratio)]).filter(
    v => v <= scale[scale.length - 1]
  );

  return combined;
};

/** Includes intermediate values between a scale with multiple internal ratios */
export const multistrand = (scale: number[], ratios: number[]): number[] => {
  const values = ratios.map(r => fragment(scale, r));

  return order(
    values
      .flat()
      .filter((v: number, i: number, a: number[]) => a.indexOf(v) === i)
  );
};

// Some common scales are included already, you can always add your own

const major3rd = (limit: number) => create(1.25, limit);
const perfect4th = (limit: number) => create(1.333, limit);
const perfect5th = (limit: number) => create(1.5, limit);
const golden = (limit: number) => {
  const f = build(fibonacci, 16);
  const a = f[f.length - 2];
  const b = f[f.length - 1];

  return create(b / a, limit);
};
const major6th = (limit: number) => create(1.667, limit);
const octave = (limit: number) => create(2, limit);

/** Applies a transformation to the scale */
export const augment = (
  value: number,
  scale: number[],
  transform: (value: number, scaleValue: number) => number
) =>
  scale.map(scaleValue =>
    parseFloat(transform(value, scaleValue).toPrecision())
  );

/** Outputs the scale with units and value precision */
export const output = (
  scale: number[],
  precision: number = 4,
  unit: string = 'rem'
): string[] => {
  return scale.map(v => parseFloat(v.toPrecision(precision)) + unit);
};

/** Exposes popular common ratios used in design and art */
export const ratios = {
  major3rd,
  perfect4th,
  perfect5th,
  golden,
  major6th,
  octave
};
