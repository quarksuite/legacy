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

export const scale = (
  n: number,
  settings: { base: string; ratio: string | number }
) => {
  const { base, ratio } = settings;

  return ms(n, {
    base: base.replace(/[a-z]+/g, ''),
    ratio: typeof ratio === 'string' ? namedRatios(ratio) : ratio
  });
};
