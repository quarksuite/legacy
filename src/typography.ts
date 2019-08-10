/**
 * A set of utilities responsible for generating and modifying content and composition;
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
 * Ratio generator.
 * @param value - generate from this value
 * @param limit - number of values to generate
 */
function* ratio(value = 2, limit = 8): Generator {
  yield value ** limit;
}

/**
 * Runs the generator passed in up to a given limit
 *
 * @param type - the kind of ratio to process
 * @param limit - number of values to generate
 */
function scale(type: (limit: number) => Generator, limit = 8): number[] {
  return Array.from(
    Array(limit).fill(0),
    (_, index) => type(index).next().value
  );
}

/**
 * Threads a scale through an internal ratio
 */
const fragment = (scale: number[], ratio = 2): number[] => {
  const internal = (r: number) => scale.map((v, _, a) => v * median(a) * r);
  const combined = order([...scale, ...internal(ratio)]).filter(
    v => v <= scale[scale.length - 1]
  );

  return combined;
};

/**
 * Creates a multithreaded scale
 */
const segment = (scale: number[], ratio = [2, 1.618]): number[] => {
  const values = ratio.map(r => fragment(scale, r));

  return order(
    values
      .flat()
      .filter((v: number, i: number, a: number[]) => a.indexOf(v) === i)
  );
};

/** Generates an octave scale */
const octave = (limit: number = 4): Generator => ratio(2, limit);

/** Generates a golden ratio scale */
const golden = (limit: number = 6): Generator => {
  const f = scale(fibonacci, 16);
  const a = f[f.length - 2];
  const b = f[f.length - 1];

  return ratio(b / a, limit);
};

export const build = {
  scale,
  ratio
};

export const modify = {
  thread: fragment,
  multithread: segment
};

export const use = {
  golden,
  octave
};

export const output = (
  scale: number[],
  { unit = 'rem', precision = 3 }
): string[] => scale.map(v => parseFloat(v.toPrecision(precision)) + unit);
