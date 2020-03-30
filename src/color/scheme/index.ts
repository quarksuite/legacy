import { adjust } from "../";
import { curry } from "../../toolbox";

const assemble = (scheme: Function[], color: string): string[] =>
  scheme.map((fn: Function) => fn(color));

const scheme = curry(2, assemble);

const splitOrigin = (offset: number, color: string): string[] =>
  scheme([
    adjust("hue", (h: number) => h - offset),
    adjust("hue", (h: number) => h),
    adjust("hue", (h: number) => h + offset)
  ])(color);

const splitComplement = (offset: number, color: string): string[] =>
  scheme([
    adjust("hue", (h: number) => h),
    adjust("hue", (h: number) => h + 180 - offset),
    adjust("hue", (h: number) => h + 180 + offset)
  ])(color);

const spreadOC = (offset: number, color: string): string[] =>
  scheme([
    adjust("hue", (h: number) => h),
    adjust("hue", (h: number) => h + 180),
    adjust("hue", (h: number) => h + offset),
    adjust("hue", (h: number) => h + 180 + offset)
  ])(color);

export const complementary = scheme([
  adjust("hue", (h: number) => h),
  adjust("hue", (h: number) => h + 180)
]);

export const analogous = curry(2, splitOrigin);
export const triad = curry(2, splitComplement);
export const tetrad = curry(2, spreadOC);
