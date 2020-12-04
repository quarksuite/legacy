import { complementary, triad, analogous, tetrad, custom } from "@scheme/index";

describe("Public color scheme generator functions", () => {
  describe("complementary :: string -> [string]", () => {
    test("can generate complementary color schemes", () => {
      expect(complementary("red")).toStrictEqual(["#ff0000", "#00ffff"]);
      expect(complementary("lime")).toStrictEqual(["#00ff00", "#ff00ff"]);
      expect(complementary("blue")).toStrictEqual(["#0000ff", "#ffff00"]);

      expect(complementary("rgb(33, 200, 120)")).toStrictEqual([
        "rgb(33, 200, 119)",
        "rgb(200, 33, 114)",
      ]);
      expect(complementary("hsl(330, 70%, 40%)")).toStrictEqual([
        "hsl(330, 70%, 40%)",
        "hsl(150, 70%, 40%)",
      ]);
      expect(complementary("coral")).toStrictEqual(["#ff7f50", "#50d0ff"]);
    });
  });
  describe("analogous :: number -> string -> [string]", () => {
    test("can generate analogous color schemes", () => {
      expect(analogous(45, "red")).toStrictEqual([
        "#ff0000",
        "#ff00bf",
        "#ffbf00",
      ]);
      expect(analogous(45, "lime")).toStrictEqual([
        "#00ff00",
        "#bfff00",
        "#00ffbf",
      ]);
      expect(analogous(45, "blue")).toStrictEqual([
        "#0000ff",
        "#00bfff",
        "#bf00ff",
      ]);

      expect(analogous(45, "#348ec9")).toStrictEqual([
        "#348dc9",
        "#34c995",
        "#4a34c9",
      ]);
      expect(analogous(45, "rgb(110, 140, 0)")).toStrictEqual([
        "rgb(110, 140, 0)",
        "rgb(140, 65, 0)",
        "rgb(5, 140, 0)",
      ]);
      expect(analogous(45, "hsl(-35, 45%, 50%)")).toStrictEqual([
        "hsl(325, 45%, 50%)",
        "hsl(280, 45%, 50%)",
        "hsl(10, 45%, 50%)",
      ]);
    });
  });
  describe("triad :: number -> string -> [string]", () => {
    test("can generate triadic color schemes", () => {
      expect(triad(60, "red")).toStrictEqual(["#ff0000", "#0000ff", "#00ff00"]);
      expect(triad(60, "lime")).toStrictEqual([
        "#00ff00",
        "#ff0000",
        "#0000ff",
      ]);
      expect(triad(60, "blue")).toStrictEqual([
        "#0000ff",
        "#00ff00",
        "#ff0000",
      ]);

      expect(triad(45, "papayawhip")).toStrictEqual([
        "#ffefd5",
        "#e5d5ff",
        "#d5fff9",
      ]);
      expect(triad(45, "#abcedef9")).toStrictEqual([
        "#abcedef9",
        "#dbdeabf9",
        "#deabc1f9",
      ]);
      expect(triad(45, "hsl(0.35turn, 40%, 70%)")).toStrictEqual([
        "hsl(126, 40%, 70%)",
        "hsl(351, 40%, 70%)",
        "hsl(261, 40%, 70%)",
      ]);
    });
  });
  describe("tetrad :: number -> string -> [string]", () => {
    test("can generate tetradic color schemes", () => {
      expect(tetrad(90, "red")).toStrictEqual([
        "#ff0000",
        "#00ffff",
        "#80ff00",
        "#8000ff",
      ]);
      expect(tetrad(90, "lime")).toStrictEqual([
        "#00ff00",
        "#ff00ff",
        "#0080ff",
        "#ff8000",
      ]);
      expect(tetrad(90, "blue")).toStrictEqual([
        "#0000ff",
        "#ffff00",
        "#ff0080",
        "#00ff80",
      ]);

      expect(tetrad(45, "hotpink")).toStrictEqual([
        "#ff69b4",
        "#69ffb4",
        "#ff8f69",
        "#69daff",
      ]);
      expect(tetrad(45, "rgba(33, 180, 240, 0.95)")).toStrictEqual([
        "rgba(33, 181, 240, 0.95)",
        "rgba(240, 92, 33, 0.95)",
        "rgba(40, 33, 240, 0.95)",
        "rgba(233, 240, 33, 0.95)",
      ]);
      expect(tetrad(45, "hsl(130grad, 50%, 65%)")).toStrictEqual([
        "hsl(117, 50%, 65%)",
        "hsl(297, 50%, 65%)",
        "hsl(162, 50%, 65%)",
        "hsl(342, 50%, 65%)",
      ]);
    });
  });
  describe("custom :: object -> string -> [string]", () => {
    test("can generate custom color schemes", () => {
      expect(custom({ hues: 2, arc: 45 }, "red")).toStrictEqual([
        "#ff0000",
        "#ffbf00",
      ]);
      expect(custom({ hues: 4, arc: 30 }, "lime")).toStrictEqual([
        "#00ff00",
        "#00ff80",
        "#00ffff",
        "#0080ff",
      ]);
      expect(custom({ hues: 8, arc: 15 }, "blue")).toStrictEqual([
        "#0000ff",
        "#4000ff",
        "#8000ff",
        "#bf00ff",
        "#ff00ff",
        "#ff00bf",
        "#ff0080",
        "#ff0040",
      ]);
    });
    test("can offset generated hues from the origin for even more scheme configurations", () => {
      expect(custom({ hues: 2, arc: 45, offset: 90 }, "red")).toStrictEqual([
        "#ff0000",
        "#80ff00",
      ]);
      expect(custom({ hues: 4, arc: 30, offset: 60 }, "lime")).toStrictEqual([
        "#00ff00",
        "#00ffff",
        "#0080ff",
        "#0000ff",
      ]);
      expect(custom({ hues: 8, arc: 15, offset: 30 }, "blue")).toStrictEqual([
        "#0000ff",
        "#8000ff",
        "#bf00ff",
        "#ff00ff",
        "#ff00bf",
        "#ff0080",
        "#ff0040",
        "#ff0000",
      ]);
    });
    test("left rotations of generated hues are allowed", () => {
      expect(custom({ hues: 2, arc: 45, offset: -90 }, "red")).toStrictEqual([
        "#ff0000",
        "#8000ff",
      ]);
      expect(custom({ hues: 4, arc: 30, offset: -60 }, "lime")).toStrictEqual([
        "#00ff00",
        "#ffff00",
        "#80ff00",
      ]);
      expect(custom({ hues: 8, arc: 15, offset: -30 }, "blue")).toStrictEqual([
        "#0000ff",
        "#0080ff",
        "#0040ff",
        "#4000ff",
        "#8000ff",
        "#bf00ff",
        "#ff00ff",
      ]);
    });
  });
});
