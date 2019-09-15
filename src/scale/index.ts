import { ratios, NamedRatios } from './ratio-lookup';

const order = (arr: number[]) => arr.sort((a: number, b: number) => a - b);

export const create = (
  base: number,
  ratio: number | NamedRatios,
  limit: number = 6
) => {
  let r = 0;

  // Check if ratio is a named ratio or custom one
  if (ratios[ratio] as number) {
    r = ratios[ratio];
  } else if (typeof ratio === 'number') {
    r = ratio as number;
  } else {
    throw Error('Not a valid ratio arg, exiting');
  }

  return Array.from(Array(limit).fill(0), (_value, n) => {
    return parseFloat((base * r ** n).toPrecision(6));
  });
};

export const modify = (
  scale: number[],
  n: number,
  modifier: (n: number, scaleValue: number) => number
) => scale.map(value => parseFloat(modifier(n, value).toPrecision(6)));

export const merge = (source: number[], target: number[]) => {
  return order(source.concat(target)).filter((v, i, a) => a.indexOf(v) === i);
};

export const output = (
  scale: number[],
  unit: string = 'rem',
  precision: number = 4
): string[] => {
  return scale.map(v => parseFloat(v.toPrecision(precision)) + unit);
};
