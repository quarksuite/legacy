import { calcScaleValues, modify, build } from './utils';
import { curry } from '../toolbox';

export const create = curry(3, calcScaleValues);
export const update = curry(3, modify);

export const merge = (...scales: number[][]): number[] => {
  const unique = new Set([...scales]);
  return Array.prototype
    .concat(...unique)
    .sort((a: number, b: number) => a - b);
};

export const output = curry(2, build);
