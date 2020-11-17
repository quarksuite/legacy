import { css, sass, less, styl, json, sd } from "@build/index";

const values = {
  color: {
    main: "red",
    secondary: "lime",
    tertiary: "blue",
  },
};

const subcategories = {
  color: {
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
  },
};

const blended = {
  color: {
    main: {
      base: "red",
      tint: ["coral", "navajowhite"],
      shade: ["crimson", "firebrick"],
    },
    secondary: "lime",
  },
};

describe("css :: object -> string", () => {
  test("can build CSS custom properties from a dictionary of values", () =>
    expect(css(values)).toStrictEqual(
      expect.stringContaining(
        `
:root {
  --color-main: red;
  --color-secondary: lime;
  --color-tertiary: blue;
}`
      )
    ));
  test("can build CSS custom properties from a dictionary of subcategories", () =>
    expect(css(subcategories)).toStrictEqual(
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
  test("can build CSS custom properties from values and subcategories", () =>
    expect(css(blended)).toStrictEqual(
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

describe("sass :: object -> string", () => {
  test("can build Sass variables from a dictionary of values", () =>
    expect(sass(values)).toStrictEqual(
      expect.stringContaining(`
$color-main: red;
$color-secondary: lime;
$color-tertiary: blue;`)
    ));
  test("can build Sass variables from a dictionary of subcategories", () =>
    expect(sass(subcategories)).toStrictEqual(
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
  test("can build Sass variables from values and subcategories", () =>
    expect(sass(blended)).toStrictEqual(
      expect.stringContaining(`
$color-main: red;
$color-main-tint-0: coral;
$color-main-tint-1: navajowhite;
$color-main-shade-0: crimson;
$color-main-shade-1: firebrick;
$color-secondary: lime;`)
    ));
});

describe("less :: object -> string", () => {
  test("can build Less variables from a dictionary of values", () =>
    expect(less(values)).toStrictEqual(
      expect.stringContaining(`
@color-main: red;
@color-secondary: lime;
@color-tertiary: blue;`)
    ));
  test("can build Less variables from a dictionary of subcategories", () =>
    expect(less(subcategories)).toStrictEqual(
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
  test("can build Less variables from values and subcategories", () =>
    expect(less(blended)).toStrictEqual(
      expect.stringContaining(`
@color-main: red;
@color-main-tint-0: coral;
@color-main-tint-1: navajowhite;
@color-main-shade-0: crimson;
@color-main-shade-1: firebrick;
@color-secondary: lime;`)
    ));
});

describe("styl :: object -> string", () => {
  test("can build Stylus variables from dictionary of values", () =>
    expect(styl(values)).toStrictEqual(
      expect.stringContaining(`
color-main = red
color-secondary = lime
color-tertiary = blue`)
    ));
  test("can build Stylus variables from dictionary of subcategories", () =>
    expect(styl(subcategories)).toStrictEqual(
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
  test("can build stylus variables from values and subcategories", () =>
    expect(styl(blended)).toStrictEqual(
      expect.stringContaining(`
color-main = red
color-main-tint-0 = coral
color-main-tint-1 = navajowhite
color-main-shade-0 = crimson
color-main-shade-1 = firebrick
color-secondary = lime`)
    ));
});

describe("json :: object -> string", () => {
  test("can build JSON from a dictionary of values", () =>
    expect(JSON.parse(json(values))).toStrictEqual({
      color: {
        main: "red",
        secondary: "lime",
        tertiary: "blue",
      },
    }));
  test("can build JSON from a dictionary of subcategories", () =>
    expect(JSON.parse(json(subcategories))).toStrictEqual({
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
  test("can build JSON from values and subcategories", () =>
    expect(JSON.parse(json(blended))).toStrictEqual({
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

describe("sd :: object -> object", () => {
  test("can build Style Dictionary properties from a dictionary of values", () =>
    expect(sd(values)).toStrictEqual({
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
  test("can build Style Dictionary properties from a dictionary of subcategories", () =>
    expect(sd(subcategories)).toStrictEqual({
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
  test("can build Style Dictionary properties from values and subcategories", () =>
    expect(sd(blended)).toStrictEqual({
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
