import { ratios } from './ratio-lookup';

export const calcScaleValues = (
  ratio: string | number,
  limit: number,
  base: number
): number[] => {
  let r = ratios[ratio] ? ratios[ratio] : ratio;

  return Array.from(Array(limit).fill(0), (_, n: number) => {
    r = r as number;
    return parseFloat((base * r ** n).toPrecision(6));
  });
};

export const modify = (
  modifier: (value: number) => number,
  scale: number[]
): number[] =>
  scale.map((value: number) => parseFloat(modifier(value).toPrecision(6)));

export const build = (unit: string, scale: number[]): string[] => {
  return scale.map(v => parseFloat(v.toPrecision(4)) + unit);
};
