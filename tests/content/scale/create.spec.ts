import { create, build } from '../../../src/content/scale';

describe('Utilities for content', () => {
  describe('create(value, limit)', () => {
    test('perfect4th', () => {
      const decimals = (v: number, precision: number) =>
        parseFloat(v.toPrecision(precision));
      const perfect4th = (limit: number) => create(1.333, limit);
      const data = build(perfect4th).map((v: number) => decimals(v, 4));

      expect(data).toStrictEqual([
        1,
        1.333,
        1.777,
        2.369,
        3.157,
        4.209,
        5.61,
        7.478
      ]);
    });
    test('major6th', () => {
      const decimals = (v: number, precision: number) =>
        parseFloat(v.toPrecision(precision));
      const major6th = (limit: number) => create(1.667, limit);
      const data = build(major6th).map((v: number) => decimals(v, 4));

      expect(data).toStrictEqual([
        1,
        1.667,
        2.779,
        4.632,
        7.722,
        12.87,
        21.46,
        35.77
      ]);
    });
  });
  describe('build(type, limit?)', () => {
    test('default values', () => {
      const decimals = (v: number, precision: number) =>
        parseFloat(v.toPrecision(precision));
      const perfectFourth = (limit: number) => create(1.333, limit);
      const data = build(perfectFourth).map((v: number) => decimals(v, 4));

      expect(data).toStrictEqual([
        1,
        1.333,
        1.777,
        2.369,
        3.157,
        4.209,
        5.61,
        7.478
      ]);
    });
    test('when limit = 4', () => {
      const decimals = (v: number, precision: number) =>
        parseFloat(v.toPrecision(precision));
      const perfect4th = (limit: number) => create(1.333, limit);
      const data = build(perfect4th, 4).map((v: number) => decimals(v, 4));

      expect(data).toStrictEqual([1, 1.333, 1.777, 2.369]);
    });
  });
});
