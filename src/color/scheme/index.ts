import { adjust } from '../';
import { curry } from '../../toolbox';

const assemble = (scheme: Function[], color: string): string[] =>
  scheme.map((fn: Function) => fn(color));

const scheme = curry(2, assemble);

const splitOrigin = (offset: number): string[] =>
  scheme([
    adjust('hue', (h: number) => h - offset),
    adjust('hue', (h: number) => h),
    adjust('hue', (h: number) => h + offset)
  ]);

const splitComplement = (offset: number): string[] =>
  scheme([
    adjust('hue', (h: number) => h),
    adjust('hue', (h: number) => h + 180 - offset),
    adjust('hue', (h: number) => h + 180 + offset)
  ]);

const spreadOC = (offset: number): string[] =>
  scheme([
    adjust('hue', (h: number) => h),
    adjust('hue', (h: number) => h + 180),
    adjust('hue', (h: number) => h + offset),
    adjust('hue', (h: number) => h + 180 + offset)
  ]);

export const complementary = scheme([
  adjust('hue', (h: number) => h),
  adjust('hue', (h: number) => h + 180)
]);

export const analogous = curry(1, splitOrigin);
export const triad = curry(1, splitComplement);
export const tetrad = curry(1, spreadOC);
