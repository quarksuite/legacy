import { build } from "@build/index";

describe("Data building utility", () => {
  describe("build :: string -> string -> object -> string | object", () => {
    const single = {
      main: "red",
      secondary: "lime",
      tertiary: "blue",
    };

    const singleVariants = {
      main: "red",
      secondary: ["springgreen", "seagreen"],
      tertiary: ["skyblue", "dodgerblue"],
    };

    const multi = {
      main: {
        base: "red",
        tint: ["coral", "navajowhite"],
        shade: ["crimson", "firebrick"],
      },
      secondary: {
        base: "lime",
        tint: ["springgreen", "lightseagreen"],
        shade: ["chartreuse", "forestgreen"],
      },
    };

    const blended = {
      main: {
        base: "red",
        tint: ["coral", "navajowhite"],
        shade: ["crimson", "firebrick"],
      },
      secondary: "lime",
    };

    describe("can build CSS custom properties", () => {
      test("from single layer data", () =>
        expect(build("color", "css", single)).toStrictEqual(
          expect.stringContaining(
            `
:root {
  --color-main: red;
  --color-secondary: lime;
  --color-tertiary: blue;
}
`
          )
        ));
      test("from single layer variant data", () =>
        expect(build("color", "css", singleVariants)).toStrictEqual(
          expect.stringContaining(
            `
:root {
  --color-main: red;
  --color-main-secondary-0: springgreen;
  --color-main-secondary-1: seagreen;
  --color-main-tertiary-0: skyblue;
  --color-main-tertiary-1: dodgerblue;
}
`
          )
        ));
      test("from multilayer data", () =>
        expect(build("color", "css", multi)).toStrictEqual(
          expect.stringContaining(
            `
:root {
  --color-main: red;
  --color-main-tint-0: coral;
  --color-main-tint-1: navajowhite;
  --color-main-shade-0: crimson;
  --color-main-shade-1: firebrick;
  --color-secondary: lime;
  --color-secondary-tint-0: springgreen;
  --color-secondary-tint-1: lightseagreen;
  --color-secondary-shade-0: chartreuse;
  --color-secondary-shade-1: forestgreen;
}`
          )
        ));
      test("from blended data", () =>
        expect(build("color", "css", blended)).toStrictEqual(
          expect.stringContaining(
            `
:root {
  --color-main: red;
  --color-main-tint-0: coral;
  --color-main-tint-1: navajowhite;
  --color-main-shade-0: crimson;
  --color-main-shade-1: firebrick;
  --color-secondary: lime;
}`
          )
        ));
    });
    describe("can build Sass variables", () => {
      test("from single layer data", () =>
        expect(build("color", "scss", single)).toStrictEqual(
          expect.stringContaining(`
$color-main: red;
$color-secondary: lime;
$color-tertiary: blue;`)
        ));
      test("from multilayer data", () =>
        expect(build("color", "scss", multi)).toStrictEqual(
          expect.stringContaining(`
$color-main: red;
$color-main-tint-0: coral;
$color-main-tint-1: navajowhite;
$color-main-shade-0: crimson;
$color-main-shade-1: firebrick;
$color-secondary: lime;
$color-secondary-tint-0: springgreen;
$color-secondary-tint-1: lightseagreen;
$color-secondary-shade-0: chartreuse;
$color-secondary-shade-1: forestgreen;`)
        ));
      test("from blended data", () =>
        expect(build("color", "scss", blended)).toStrictEqual(
          expect.stringContaining(`
$color-main: red;
$color-main-tint-0: coral;
$color-main-tint-1: navajowhite;
$color-main-shade-0: crimson;
$color-main-shade-1: firebrick;
$color-secondary: lime;`)
        ));
    });
    describe("can build Less variables", () => {
      test("from single layer data", () =>
        expect(build("color", "less", single)).toStrictEqual(
          expect.stringContaining(`
@color-main: red;
@color-secondary: lime;
@color-tertiary: blue;`)
        ));
      test("from multilayer data", () =>
        expect(build("color", "less", multi)).toStrictEqual(
          expect.stringContaining(`
@color-main: red;
@color-main-tint-0: coral;
@color-main-tint-1: navajowhite;
@color-main-shade-0: crimson;
@color-main-shade-1: firebrick;
@color-secondary: lime;
@color-secondary-tint-0: springgreen;
@color-secondary-tint-1: lightseagreen;
@color-secondary-shade-0: chartreuse;
@color-secondary-shade-1: forestgreen;`)
        ));
      test("from blended data", () =>
        expect(build("color", "less", blended)).toStrictEqual(
          expect.stringContaining(`
@color-main: red;
@color-main-tint-0: coral;
@color-main-tint-1: navajowhite;
@color-main-shade-0: crimson;
@color-main-shade-1: firebrick;
@color-secondary: lime;`)
        ));
    });
    describe("can build Stylus variables", () => {
      test("from single layer data", () =>
        expect(build("color", "styl", single)).toStrictEqual(
          expect.stringContaining(`
color-main = red
color-secondary = lime
color-tertiary = blue`)
        ));
      test("from multilayer data", () =>
        expect(build("color", "styl", multi)).toStrictEqual(
          expect.stringContaining(`
color-main = red
color-main-tint-0 = coral
color-main-tint-1 = navajowhite
color-main-shade-0 = crimson
color-main-shade-1 = firebrick
color-secondary = lime
color-secondary-tint-0 = springgreen
color-secondary-tint-1 = lightseagreen
color-secondary-shade-0 = chartreuse
color-secondary-shade-1 = forestgreen`)
        ));
      test("from blended data", () =>
        expect(build("color", "styl", blended)).toStrictEqual(
          expect.stringContaining(`
color-main = red
color-main-tint-0 = coral
color-main-tint-1 = navajowhite
color-main-shade-0 = crimson
color-main-shade-1 = firebrick
color-secondary = lime`)
        ));
    });
    describe("can build JSON", () => {
      test("from single layer data", () =>
        expect(
          JSON.parse(build("color", "json", single) as string)
        ).toStrictEqual({
          color: {
            main: "red",
            secondary: "lime",
            tertiary: "blue",
          },
        }));
      test("from multilayer data", () =>
        expect(
          JSON.parse(build("color", "json", multi) as string)
        ).toStrictEqual({
          color: {
            main: {
              base: "red",
              shade: ["crimson", "firebrick"],
              tint: ["coral", "navajowhite"],
            },
            secondary: {
              base: "lime",
              shade: ["chartreuse", "forestgreen"],
              tint: ["springgreen", "lightseagreen"],
            },
          },
        }));
      test("from blended data", () =>
        expect(
          JSON.parse(build("color", "json", blended) as string)
        ).toStrictEqual({
          color: {
            main: {
              base: "red",
              shade: ["crimson", "firebrick"],
              tint: ["coral", "navajowhite"],
            },
            secondary: "lime",
          },
        }));
    });
    describe("can build Style Dictionary data for handoff", () => {
      test("from single layer data", () =>
        expect(
          JSON.parse(build("color", "style-dictionary", single) as string)
        ).toStrictEqual({
          color: {
            main: {
              value: "red",
            },
            secondary: {
              value: "lime",
            },
            tertiary: {
              value: "blue",
            },
          },
        }));
      test("from single layer variant data", () =>
        expect(
          JSON.parse(
            build("color", "style-dictionary", singleVariants) as string
          )
        ).toStrictEqual({
          color: {
            main: {
              value: "red",
            },
            secondary: {
              "0": {
                value: "springgreen",
              },
              "1": {
                value: "seagreen",
              },
            },
            tertiary: {
              "0": {
                value: "skyblue",
              },
              "1": {
                value: "dodgerblue",
              },
            },
          },
        }));
      test("from multilayer data", () =>
        expect(
          JSON.parse(build("color", "style-dictionary", multi) as string)
        ).toStrictEqual({
          color: {
            main: {
              base: {
                value: "red",
              },
              shade: {
                "0": {
                  value: "crimson",
                },
                "1": {
                  value: "firebrick",
                },
              },
              tint: {
                "0": {
                  value: "coral",
                },
                "1": {
                  value: "navajowhite",
                },
              },
            },
            secondary: {
              base: { value: "lime" },
              shade: {
                "0": {
                  value: "chartreuse",
                },
                "1": {
                  value: "forestgreen",
                },
              },
              tint: {
                "0": {
                  value: "springgreen",
                },
                "1": {
                  value: "lightseagreen",
                },
              },
            },
          },
        }));
      test("from blended data", () =>
        expect(
          JSON.parse(build("color", "style-dictionary", blended) as string)
        ).toStrictEqual({
          color: {
            main: {
              base: {
                value: "red",
              },
              shade: {
                "0": {
                  value: "crimson",
                },
                "1": {
                  value: "firebrick",
                },
              },
              tint: {
                "0": {
                  value: "coral",
                },
                "1": {
                  value: "navajowhite",
                },
              },
            },
            secondary: {
              value: "lime",
            },
          },
        }));
    });
    test("throws an error if target is unsupported", () =>
      expect(() => build("color", "wumbo" as never, single)).toThrow());
    test("empty object returns empty output", () => {
      expect(build("null", "scss", {})).toBe("");
    });
  });
});
