import { scale } from '../../../src/typography';

describe('quarks.typography.scale modules', () => {
  describe('ratios.major3rd', () => {
    test('default values', () => {
      const decimals = (v: number, precision: number) =>
        parseFloat(v.toPrecision(precision));
      const data = scale
        .build(scale.ratios.major3rd)
        .map((v: number) => decimals(v, 4));

      expect(data).toStrictEqual([
        1,
        1.25,
        1.563,
        1.953,
        2.441,
        3.052,
        3.815,
        4.768
      ]);
    });
  });
  describe('ratios.perfect4th', () => {
    test('default values', () => {
      const decimals = (v: number, precision: number) =>
        parseFloat(v.toPrecision(precision));
      const data = scale
        .build(scale.ratios.perfect4th)
        .map((v: number) => decimals(v, 4));

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
  });
  describe('ratios.perfect5th', () => {
    test('default values', () => {
      const decimals = (v: number, precision: number) =>
        parseFloat(v.toPrecision(precision));
      const data = scale
        .build(scale.ratios.perfect5th)
        .map((v: number) => decimals(v, 4));

      expect(data).toStrictEqual([
        1,
        1.5,
        2.25,
        3.375,
        5.063,
        7.594,
        11.39,
        17.09
      ]);
    });
  });
  describe('ratios.major6th', () => {
    test('default values', () => {
      const decimals = (v: number, precision: number) =>
        parseFloat(v.toPrecision(precision));
      const data = scale
        .build(scale.ratios.major6th)
        .map((v: number) => decimals(v, 4));

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
  describe('ratios.octave', () => {
    test('default values', () => {
      const decimals = (v: number, precision: number) =>
        parseFloat(v.toPrecision(precision));
      const data = scale
        .build(scale.ratios.octave)
        .map((v: number) => decimals(v, 4));

      expect(data).toStrictEqual([1, 2, 4, 8, 16, 32, 64, 128]);
    });
  });
  describe('ratios.golden', () => {
    test('default values', () => {
      const decimals = (v: number, precision: number) =>
        parseFloat(v.toPrecision(precision));
      const data = scale
        .build(scale.ratios.golden)
        .map((v: number) => decimals(v, 4));

      expect(data).toStrictEqual([
        1,
        1.618,
        2.618,
        4.236,
        6.854,
        11.09,
        17.94,
        29.03
      ]);
    });
  });
});
