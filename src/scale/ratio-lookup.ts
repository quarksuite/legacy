// A collection of ratios for building modular scales.
// src: https://modularscale.com

/** Generates a fibonacci sequence for calculating the golden mean */
function* fibonacci(n: number): Generator {
  if (n <= 1) yield n;
  yield fibonacci(n - 1).next().value + fibonacci(n - 2).next().value;
}

interface RatioFormat {
  [index: string]: number;
}

function goldenRatio(): number {
  const f = Array.from(Array(16).fill(0), (_value, n) => {
    return fibonacci(n).next().value;
  });

  const a = f[f.length - 2];
  const b = f[f.length - 1];

  // Divide the largest numbers for accurate ratio.
  return b / a;
}

const golden = goldenRatio();

export type NamedRatios =
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
  | 'x2octave';

export const ratios: RatioFormat = {
  min2nd: 1.067,
  maj2nd: 1.125,
  min3rd: 1.2,
  maj3rd: 1.25,
  perf4th: 1.333,
  dim5th: 1.414,
  perf5th: 1.5,
  min6th: 1.6,
  golden,
  maj6th: 1.667,
  min7th: 1.778,
  maj7th: 1.875,
  octave: 2,
  maj10th: 2.5,
  maj12th: 3,
  x2octave: 4
};
