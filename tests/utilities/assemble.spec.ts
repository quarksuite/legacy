import { assemble } from "@utilities/assemble";

describe("Data assembly utilities", () => {
  describe("assemble :: [string] -> object", () => {
    test("can assemble single-layer data", () => {
      const sample = ["#ff0000", "#00ff00", "#0000ff"];

      expect(assemble(["main", "secondary", "tertiary"], sample)).toStrictEqual(
        {
          main: "#ff0000",
          secondary: "#00ff00",
          tertiary: "#0000ff",
        }
      );
    });
    test("can assemble single-layer data with variants", () => {
      const sample = ["#ff0000", ["#00ff00", "#0000ff"], ["#ffff00"]];

      expect(assemble(["main", "secondary", "tertiary"], sample)).toStrictEqual(
        {
          main: "#ff0000",
          secondary: {
            "0": "#00ff00",
            "1": "#0000ff",
          },
          tertiary: {
            "0": "#ffff00",
          },
        }
      );
    });
    test("can assemble multilayer data", () => {
      const sample = [
        ["crimson", ["firebrick"], ["coral"]],
        ["forestgreen", ["springgreen"]],
        ["dodgerblue", ["skyblue"]],
      ];

      expect(
        assemble(
          [
            ["main", "a", "b"],
            ["secondary", "a"],
            ["tertiary", "a"],
          ],
          sample
        )
      ).toStrictEqual({
        main: {
          a: {
            "0": "firebrick",
          },
          b: {
            "0": "coral",
          },
          base: "crimson",
        },
        secondary: {
          a: {
            "0": "springgreen",
          },
          base: "forestgreen",
        },
        tertiary: {
          a: {
            "0": "skyblue",
          },
          base: "dodgerblue",
        },
      });
    });
    test("can blend data", () => {
      const sample = [
        "crimson",
        ["forestgreen", ["springgreen"]],
        ["dodgerblue", ["skyblue"]],
      ];

      expect(
        assemble(["main", ["secondary", "a"], ["tertiary", "a"]], sample)
      ).toStrictEqual({
        main: "crimson",
        secondary: {
          a: {
            "0": "springgreen",
          },
          base: "forestgreen",
        },
        tertiary: {
          a: {
            "0": "skyblue",
          },
          base: "dodgerblue",
        },
      });
    });
  });
});
