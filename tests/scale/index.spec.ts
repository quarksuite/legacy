import { ms, update, merge, partition, units } from "@scale/index";

describe("Modular scale functions", () => {
  const content = ms(4, 2, 1);
  describe("ms :: number -> number -> number -> [number]", () => {
    test("correctly generates modular scale values", () => {
      expect(ms(4, 2, 1)).toStrictEqual([1, 2, 4, 8]);
    });
  });
  describe("update :: (number -> number) -> [number]", () => {
    test("correctly updates the values in a scale", () => {
      expect(update((n: number) => n + 10, content)).toStrictEqual([
        11,
        12,
        14,
        18,
      ]);
    });
  });
  describe("merge :: [number] -> [number] -> [number]", () => {
    test("correctly merges scales into one", () => {
      const b = ms(8, 1.5, 1);
      expect(merge(content, b)).toStrictEqual([
        1,
        1.5,
        2,
        2.25,
        3.375,
        4,
        5.0625,
        7.59375,
        8,
        11.390625,
        17.0859375,
      ]);
    });
  });
  describe("partition :: number -> [number] -> [[number]]", () => {
    test("correctly splits scales into partitions with a desired length", () => {
      const mondo = ms(64, 1.125, 1);
      expect(partition(6, mondo)).toStrictEqual([
        [1, 1.125, 1.265625, 1.423828125, 1.601806640625, 1.802032470703125],
        [
          2.2806973457336426,
          2.565784513950348,
          2.8865075781941414,
          3.247321025468409,
          3.65323615365196,
          4.109890672858455,
        ],
        [
          5.201580382836482,
          5.851777930691043,
          6.583250172027423,
          7.4061564435308505,
          8.331925998972208,
          9.373416748843733,
        ],
        [
          11.863230572755349,
          13.346134394349768,
          15.01440119364349,
          16.891201342848927,
          19.00260151070504,
          21.377926699543174,
        ],
        [
          27.056438479109328,
          30.438493288997993,
          34.24330495012274,
          38.52371806888809,
          43.339182827499094,
          48.75658068093648,
        ],
        [
          61.707547424310235,
          69.42099085234901,
          78.09861470889264,
          87.86094154750423,
          98.84355924094226,
          111.19900414606002,
        ],
        [
          140.73623962235723,
          158.32826957515186,
          178.11930327204587,
          200.38421618105158,
          225.43224320368304,
          253.61127360414343,
        ],
        [
          320.97676815524403,
          361.0988641746495,
          406.2362221964807,
          457.0157499710408,
          514.142718717421,
          578.4105585570985,
        ],
        [
          732.0508631738278,
          823.5572210705564,
          926.5018737043758,
          1042.3146079174228,
          1172.6039339071006,
          1319.1794256454882,
        ],
        [1669.586460582571],
      ]);
    });
  });
  describe("units :: number -> string -> [number] -> [string]", () => {
    expect(units(5, "rem", content)).toStrictEqual([
      "1rem",
      "2rem",
      "4rem",
      "8rem",
    ]);
  });
});