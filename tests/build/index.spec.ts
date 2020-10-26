import { css, sass, less, stylus, json, styleProps } from "@build/index";

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

describe("css :: string -> object -> string", () => {
  test("can build CSS custom properties from single layer data", () =>
    expect(css("color", single)).toStrictEqual(
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
  test("can build CSS custom properties from single layer variant data", () =>
    expect(css("color", singleVariants)).toStrictEqual(
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
  test("can build CSS custom properties from multilayer data", () =>
    expect(css("color", multi)).toStrictEqual(
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
  test("can build CSS custom properties from blended data", () =>
    expect(css("color", blended)).toStrictEqual(
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

describe("sass :: string -> object -> string", () => {
  test("can build Sass variables from single layer data", () =>
    expect(sass("color", single)).toStrictEqual(
      expect.stringContaining(`
$color-main: red;
$color-secondary: lime;
$color-tertiary: blue;`)
    ));
  test("can build Sass variables from multilayer data", () =>
    expect(sass("color", multi)).toStrictEqual(
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
  test("can build Sass variables from blended data", () =>
    expect(sass("color", blended)).toStrictEqual(
      expect.stringContaining(`
$color-main: red;
$color-main-tint-0: coral;
$color-main-tint-1: navajowhite;
$color-main-shade-0: crimson;
$color-main-shade-1: firebrick;
$color-secondary: lime;`)
    ));
});

describe("less :: string -> object -> string", () => {
  test("can build Less variables from single layer data", () =>
    expect(less("color", single)).toStrictEqual(
      expect.stringContaining(`
@color-main: red;
@color-secondary: lime;
@color-tertiary: blue;`)
    ));
  test("can build Less variables from multilayer data", () =>
    expect(less("color", multi)).toStrictEqual(
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
  test("can build Less variables from blended data", () =>
    expect(less("color", blended)).toStrictEqual(
      expect.stringContaining(`
@color-main: red;
@color-main-tint-0: coral;
@color-main-tint-1: navajowhite;
@color-main-shade-0: crimson;
@color-main-shade-1: firebrick;
@color-secondary: lime;`)
    ));
});

describe("stylus :: string -> object -> string", () => {
  test("from single layer data", () =>
    expect(stylus("color", single)).toStrictEqual(
      expect.stringContaining(`
color-main = red
color-secondary = lime
color-tertiary = blue`)
    ));
  test("from multilayer data", () =>
    expect(stylus("color", multi)).toStrictEqual(
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
    expect(stylus("color", blended)).toStrictEqual(
      expect.stringContaining(`
color-main = red
color-main-tint-0 = coral
color-main-tint-1 = navajowhite
color-main-shade-0 = crimson
color-main-shade-1 = firebrick
color-secondary = lime`)
    ));
});

describe("json :: string -> object -> string", () => {
  test("can build JSON from single layer data", () =>
    expect(JSON.parse(json("color", single))).toStrictEqual({
      color: {
        main: "red",
        secondary: "lime",
        tertiary: "blue",
      },
    }));
  test("can build JSON from multilayer data", () =>
    expect(JSON.parse(json("color", multi))).toStrictEqual({
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
  test("can build JSON from blended data", () =>
    expect(JSON.parse(json("color", blended))).toStrictEqual({
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

describe("styleProps :: string -> object -> object", () => {
  test("from single layer data", () =>
    expect(styleProps("color", single)).toStrictEqual({
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
    expect(styleProps("color", singleVariants)).toStrictEqual({
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
    expect(styleProps("color", multi)).toStrictEqual({
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
    expect(styleProps("color", blended)).toStrictEqual({
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
