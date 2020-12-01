import { css, sass, less, styl, raw, sd, tw } from "@build/index";

const values = {
  color: {
    main: "value",
    secondary: "value",
    tertiary: "value",
  },
};

const subcategory = {
  color: {
    main: {
      base: "value",
      tint: ["value", "value"],
      shade: ["value", "value"],
    },
  },
};

const nested = {
  color: {
    light: {
      main: {
        50: "value",
        100: "value",
        200: "value",
        300: "value",
        400: "value",
        500: "value",
        600: "value",
        700: "value",
        800: "value",
        900: "value",
      },
      secondary: {
        50: "value",
        100: "value",
        200: "value",
        300: "value",
        400: "value",
        500: "value",
        600: "value",
        700: "value",
        800: "value",
        900: "value",
      },
    },
    dark: {
      main: {
        50: "value",
        100: "value",
        200: "value",
        300: "value",
        400: "value",
        500: "value",
        600: "value",
        700: "value",
        800: "value",
        900: "value",
      },
      secondary: {
        50: "value",
        100: "value",
        200: "value",
        300: "value",
        400: "value",
        500: "value",
        600: "value",
        700: "value",
        800: "value",
        900: "value",
      },
    },
  },
};

const namespacing = {
  project: {
    color: {
      main: "value",
      accent: "value",
      highlight: "value",
    },
    font: {
      body: "value",
      headings: "value",
      code: "value",
    },
    content: {
      size: {
        base: "value",
        x: ["value", "value", "value", "value"],
        xd: ["value", "value", "value", "value"],
      },
      measure: {
        base: "value",
        xd: ["value", "value", "value", "value"],
      },
    },
    layout: {
      spacing: {
        base: "value",
        xd: ["value", "value", "value", "value"],
      },
      grid: {
        base: "value",
        n: ["value", "value", "value", "value"],
      },
    },
  },
};

describe("css :: TokenDictionary -> CSS", () => {
  test("can build values", () =>
    expect(css(values)).toStrictEqual(
      expect.stringContaining(
        `
:root {
  --color-main: value;
  --color-secondary: value;
  --color-tertiary: value;
}`
      )
    ));
  test("can build subcategories", () =>
    expect(css(subcategory)).toStrictEqual(
      expect.stringContaining(
        `
:root {
  --color-main: value;
  --color-main-tint-0: value;
  --color-main-tint-1: value;
  --color-main-shade-0: value;
  --color-main-shade-1: value;
}`
      )
    ));
  test("allows nesting", () =>
    expect(css(nested)).toStrictEqual(
      expect.stringContaining(
        `
:root {
  --color-light-main-50: value;
  --color-light-main-100: value;
  --color-light-main-200: value;
  --color-light-main-300: value;
  --color-light-main-400: value;
  --color-light-main-500: value;
  --color-light-main-600: value;
  --color-light-main-700: value;
  --color-light-main-800: value;
  --color-light-main-900: value;
  --color-light-secondary-50: value;
  --color-light-secondary-100: value;
  --color-light-secondary-200: value;
  --color-light-secondary-300: value;
  --color-light-secondary-400: value;
  --color-light-secondary-500: value;
  --color-light-secondary-600: value;
  --color-light-secondary-700: value;
  --color-light-secondary-800: value;
  --color-light-secondary-900: value;
  --color-dark-main-50: value;
  --color-dark-main-100: value;
  --color-dark-main-200: value;
  --color-dark-main-300: value;
  --color-dark-main-400: value;
  --color-dark-main-500: value;
  --color-dark-main-600: value;
  --color-dark-main-700: value;
  --color-dark-main-800: value;
  --color-dark-main-900: value;
  --color-dark-secondary-50: value;
  --color-dark-secondary-100: value;
  --color-dark-secondary-200: value;
  --color-dark-secondary-300: value;
  --color-dark-secondary-400: value;
  --color-dark-secondary-500: value;
  --color-dark-secondary-600: value;
  --color-dark-secondary-700: value;
  --color-dark-secondary-800: value;
  --color-dark-secondary-900: value;
}`
      )
    ));
  test("allows namespacing", () =>
    expect(css(namespacing)).toStrictEqual(
      expect.stringContaining(
        `
:root {
  --project-color-main: value;
  --project-color-accent: value;
  --project-color-highlight: value;
  --project-font-body: value;
  --project-font-headings: value;
  --project-font-code: value;
  --project-content-size: value;
  --project-content-size-x-0: value;
  --project-content-size-x-1: value;
  --project-content-size-x-2: value;
  --project-content-size-x-3: value;
  --project-content-size-xd-0: value;
  --project-content-size-xd-1: value;
  --project-content-size-xd-2: value;
  --project-content-size-xd-3: value;
  --project-content-measure: value;
  --project-content-measure-xd-0: value;
  --project-content-measure-xd-1: value;
  --project-content-measure-xd-2: value;
  --project-content-measure-xd-3: value;
  --project-layout-spacing: value;
  --project-layout-spacing-xd-0: value;
  --project-layout-spacing-xd-1: value;
  --project-layout-spacing-xd-2: value;
  --project-layout-spacing-xd-3: value;
  --project-layout-grid: value;
  --project-layout-grid-n-0: value;
  --project-layout-grid-n-1: value;
  --project-layout-grid-n-2: value;
  --project-layout-grid-n-3: value;
}`
      )
    ));
});

describe("sass :: TokenDictionary -> SassVariables", () => {
  test("can build values", () =>
    expect(sass(values)).toStrictEqual(
      expect.stringContaining(`
$color-main: value;
$color-secondary: value;
$color-tertiary: value;
`)
    ));
  test("can build subcategories", () =>
    expect(sass(subcategory)).toStrictEqual(
      expect.stringContaining(`
$color-main: value;
$color-main-tint-0: value;
$color-main-tint-1: value;
$color-main-shade-0: value;
$color-main-shade-1: value;
`)
    ));
  test("allows nesting", () =>
    expect(sass(nested)).toStrictEqual(
      expect.stringContaining(`
$color-light-main-50: value;
$color-light-main-100: value;
$color-light-main-200: value;
$color-light-main-300: value;
$color-light-main-400: value;
$color-light-main-500: value;
$color-light-main-600: value;
$color-light-main-700: value;
$color-light-main-800: value;
$color-light-main-900: value;
$color-light-secondary-50: value;
$color-light-secondary-100: value;
$color-light-secondary-200: value;
$color-light-secondary-300: value;
$color-light-secondary-400: value;
$color-light-secondary-500: value;
$color-light-secondary-600: value;
$color-light-secondary-700: value;
$color-light-secondary-800: value;
$color-light-secondary-900: value;
$color-dark-main-50: value;
$color-dark-main-100: value;
$color-dark-main-200: value;
$color-dark-main-300: value;
$color-dark-main-400: value;
$color-dark-main-500: value;
$color-dark-main-600: value;
$color-dark-main-700: value;
$color-dark-main-800: value;
$color-dark-main-900: value;
$color-dark-secondary-50: value;
$color-dark-secondary-100: value;
$color-dark-secondary-200: value;
$color-dark-secondary-300: value;
$color-dark-secondary-400: value;
$color-dark-secondary-500: value;
$color-dark-secondary-600: value;
$color-dark-secondary-700: value;
$color-dark-secondary-800: value;
$color-dark-secondary-900: value;
`)
    ));
  test("allows namespacing", () =>
    expect(sass(namespacing)).toStrictEqual(
      expect.stringContaining(`
$project-color-main: value;
$project-color-accent: value;
$project-color-highlight: value;
$project-font-body: value;
$project-font-headings: value;
$project-font-code: value;
$project-content-size: value;
$project-content-size-x-0: value;
$project-content-size-x-1: value;
$project-content-size-x-2: value;
$project-content-size-x-3: value;
$project-content-size-xd-0: value;
$project-content-size-xd-1: value;
$project-content-size-xd-2: value;
$project-content-size-xd-3: value;
$project-content-measure: value;
$project-content-measure-xd-0: value;
$project-content-measure-xd-1: value;
$project-content-measure-xd-2: value;
$project-content-measure-xd-3: value;
$project-layout-spacing: value;
$project-layout-spacing-xd-0: value;
$project-layout-spacing-xd-1: value;
$project-layout-spacing-xd-2: value;
$project-layout-spacing-xd-3: value;
$project-layout-grid: value;
$project-layout-grid-n-0: value;
$project-layout-grid-n-1: value;
$project-layout-grid-n-2: value;
$project-layout-grid-n-3: value;
`)
    ));
});

describe("less :: TokenDictionary -> LessVariables", () => {
  test("can build values", () =>
    expect(less(values)).toStrictEqual(
      expect.stringContaining(`
@color-main: value;
@color-secondary: value;
@color-tertiary: value;
`)
    ));
  test("can build subcategories", () =>
    expect(less(subcategory)).toStrictEqual(
      expect.stringContaining(`
@color-main: value;
@color-main-tint-0: value;
@color-main-tint-1: value;
@color-main-shade-0: value;
@color-main-shade-1: value;
`)
    ));
  test("allows nesting", () =>
    expect(less(nested)).toStrictEqual(
      expect.stringContaining(`
@color-light-main-50: value;
@color-light-main-100: value;
@color-light-main-200: value;
@color-light-main-300: value;
@color-light-main-400: value;
@color-light-main-500: value;
@color-light-main-600: value;
@color-light-main-700: value;
@color-light-main-800: value;
@color-light-main-900: value;
@color-light-secondary-50: value;
@color-light-secondary-100: value;
@color-light-secondary-200: value;
@color-light-secondary-300: value;
@color-light-secondary-400: value;
@color-light-secondary-500: value;
@color-light-secondary-600: value;
@color-light-secondary-700: value;
@color-light-secondary-800: value;
@color-light-secondary-900: value;
@color-dark-main-50: value;
@color-dark-main-100: value;
@color-dark-main-200: value;
@color-dark-main-300: value;
@color-dark-main-400: value;
@color-dark-main-500: value;
@color-dark-main-600: value;
@color-dark-main-700: value;
@color-dark-main-800: value;
@color-dark-main-900: value;
@color-dark-secondary-50: value;
@color-dark-secondary-100: value;
@color-dark-secondary-200: value;
@color-dark-secondary-300: value;
@color-dark-secondary-400: value;
@color-dark-secondary-500: value;
@color-dark-secondary-600: value;
@color-dark-secondary-700: value;
@color-dark-secondary-800: value;
@color-dark-secondary-900: value;
`)
    ));
  test("allows namespacing", () =>
    expect(less(namespacing)).toStrictEqual(
      expect.stringContaining(`
@project-color-main: value;
@project-color-accent: value;
@project-color-highlight: value;
@project-font-body: value;
@project-font-headings: value;
@project-font-code: value;
@project-content-size: value;
@project-content-size-x-0: value;
@project-content-size-x-1: value;
@project-content-size-x-2: value;
@project-content-size-x-3: value;
@project-content-size-xd-0: value;
@project-content-size-xd-1: value;
@project-content-size-xd-2: value;
@project-content-size-xd-3: value;
@project-content-measure: value;
@project-content-measure-xd-0: value;
@project-content-measure-xd-1: value;
@project-content-measure-xd-2: value;
@project-content-measure-xd-3: value;
@project-layout-spacing: value;
@project-layout-spacing-xd-0: value;
@project-layout-spacing-xd-1: value;
@project-layout-spacing-xd-2: value;
@project-layout-spacing-xd-3: value;
@project-layout-grid: value;
@project-layout-grid-n-0: value;
@project-layout-grid-n-1: value;
@project-layout-grid-n-2: value;
@project-layout-grid-n-3: value;
`)
    ));
});

describe("styl :: TokenDictionary -> StylusVariables", () => {
  test("can build values", () =>
    expect(styl(values)).toStrictEqual(
      expect.stringContaining(`
color-main = value
color-secondary = value
color-tertiary = value
`)
    ));
  test("can build subcategories", () =>
    expect(styl(subcategory)).toStrictEqual(
      expect.stringContaining(`
color-main = value
color-main-tint-0 = value
color-main-tint-1 = value
color-main-shade-0 = value
color-main-shade-1 = value
`)
    ));
  test("allows nesting", () =>
    expect(styl(nested)).toStrictEqual(
      expect.stringContaining(`
color-light-main-50 = value
color-light-main-100 = value
color-light-main-200 = value
color-light-main-300 = value
color-light-main-400 = value
color-light-main-500 = value
color-light-main-600 = value
color-light-main-700 = value
color-light-main-800 = value
color-light-main-900 = value
color-light-secondary-50 = value
color-light-secondary-100 = value
color-light-secondary-200 = value
color-light-secondary-300 = value
color-light-secondary-400 = value
color-light-secondary-500 = value
color-light-secondary-600 = value
color-light-secondary-700 = value
color-light-secondary-800 = value
color-light-secondary-900 = value
color-dark-main-50 = value
color-dark-main-100 = value
color-dark-main-200 = value
color-dark-main-300 = value
color-dark-main-400 = value
color-dark-main-500 = value
color-dark-main-600 = value
color-dark-main-700 = value
color-dark-main-800 = value
color-dark-main-900 = value
color-dark-secondary-50 = value
color-dark-secondary-100 = value
color-dark-secondary-200 = value
color-dark-secondary-300 = value
color-dark-secondary-400 = value
color-dark-secondary-500 = value
color-dark-secondary-600 = value
color-dark-secondary-700 = value
color-dark-secondary-800 = value
color-dark-secondary-900 = value
`)
    ));
  test("allows namespacing", () =>
    expect(styl(namespacing)).toStrictEqual(
      expect.stringContaining(`
project-color-main = value
project-color-accent = value
project-color-highlight = value
project-font-body = value
project-font-headings = value
project-font-code = value
project-content-size = value
project-content-size-x-0 = value
project-content-size-x-1 = value
project-content-size-x-2 = value
project-content-size-x-3 = value
project-content-size-xd-0 = value
project-content-size-xd-1 = value
project-content-size-xd-2 = value
project-content-size-xd-3 = value
project-content-measure = value
project-content-measure-xd-0 = value
project-content-measure-xd-1 = value
project-content-measure-xd-2 = value
project-content-measure-xd-3 = value
project-layout-spacing = value
project-layout-spacing-xd-0 = value
project-layout-spacing-xd-1 = value
project-layout-spacing-xd-2 = value
project-layout-spacing-xd-3 = value
project-layout-grid = value
project-layout-grid-n-0 = value
project-layout-grid-n-1 = value
project-layout-grid-n-2 = value
project-layout-grid-n-3 = value
`)
    ));
});

describe("raw :: TokenDictionary -> TokenData", () => {
  test("can build values", () =>
    expect(JSON.parse(raw(values))).toStrictEqual({
      color: {
        main: "value",
        secondary: "value",
        tertiary: "value",
      },
    }));
  test("can build subcategories", () =>
    expect(JSON.parse(raw(subcategory))).toStrictEqual({
      color: {
        main: {
          base: "value",
          shade: ["value", "value"],
          tint: ["value", "value"],
        },
      },
    }));
  test("allows nesting", () =>
    expect(JSON.parse(raw(nested))).toStrictEqual({
      color: {
        dark: {
          main: {
            "100": "value",
            "200": "value",
            "300": "value",
            "400": "value",
            "50": "value",
            "500": "value",
            "600": "value",
            "700": "value",
            "800": "value",
            "900": "value",
          },
          secondary: {
            "100": "value",
            "200": "value",
            "300": "value",
            "400": "value",
            "50": "value",
            "500": "value",
            "600": "value",
            "700": "value",
            "800": "value",
            "900": "value",
          },
        },
        light: {
          main: {
            "100": "value",
            "200": "value",
            "300": "value",
            "400": "value",
            "50": "value",
            "500": "value",
            "600": "value",
            "700": "value",
            "800": "value",
            "900": "value",
          },
          secondary: {
            "100": "value",
            "200": "value",
            "300": "value",
            "400": "value",
            "50": "value",
            "500": "value",
            "600": "value",
            "700": "value",
            "800": "value",
            "900": "value",
          },
        },
      },
    }));
  test("allows namespacing", () =>
    expect(JSON.parse(raw(namespacing))).toStrictEqual({
      project: {
        color: {
          accent: "value",
          highlight: "value",
          main: "value",
        },
        content: {
          measure: {
            base: "value",
            xd: ["value", "value", "value", "value"],
          },
          size: {
            base: "value",
            x: ["value", "value", "value", "value"],
            xd: ["value", "value", "value", "value"],
          },
        },
        font: {
          body: "value",
          code: "value",
          headings: "value",
        },
        layout: {
          grid: {
            base: "value",
            n: ["value", "value", "value", "value"],
          },
          spacing: {
            base: "value",
            xd: ["value", "value", "value", "value"],
          },
        },
      },
    }));
});

describe("sd :: TokenDictionary -> StyleDictionaryProperties", () => {
  test("can build values", () =>
    expect(sd(values)).toStrictEqual({
      color: {
        main: {
          value: "value",
        },
        secondary: {
          value: "value",
        },
        tertiary: {
          value: "value",
        },
      },
    }));
  test("can build subcategories", () =>
    expect(sd(subcategory)).toStrictEqual({
      color: {
        main: {
          base: {
            value: "value",
          },
          shade: {
            "0": {
              value: "value",
            },
            "1": {
              value: "value",
            },
          },
          tint: {
            "0": {
              value: "value",
            },
            "1": {
              value: "value",
            },
          },
        },
      },
    }));
  test("allows nesting", () =>
    expect(sd(nested)).toStrictEqual({
      color: {
        dark: {
          main: {
            "100": {
              value: "value",
            },
            "200": {
              value: "value",
            },
            "300": {
              value: "value",
            },
            "400": {
              value: "value",
            },
            "50": {
              value: "value",
            },
            "500": {
              value: "value",
            },
            "600": {
              value: "value",
            },
            "700": {
              value: "value",
            },
            "800": {
              value: "value",
            },
            "900": {
              value: "value",
            },
          },
          secondary: {
            "100": {
              value: "value",
            },
            "200": {
              value: "value",
            },
            "300": {
              value: "value",
            },
            "400": {
              value: "value",
            },
            "50": {
              value: "value",
            },
            "500": {
              value: "value",
            },
            "600": {
              value: "value",
            },
            "700": {
              value: "value",
            },
            "800": {
              value: "value",
            },
            "900": {
              value: "value",
            },
          },
        },
        light: {
          main: {
            "100": {
              value: "value",
            },
            "200": {
              value: "value",
            },
            "300": {
              value: "value",
            },
            "400": {
              value: "value",
            },
            "50": {
              value: "value",
            },
            "500": {
              value: "value",
            },
            "600": {
              value: "value",
            },
            "700": {
              value: "value",
            },
            "800": {
              value: "value",
            },
            "900": {
              value: "value",
            },
          },
          secondary: {
            "100": {
              value: "value",
            },
            "200": {
              value: "value",
            },
            "300": {
              value: "value",
            },
            "400": {
              value: "value",
            },
            "50": {
              value: "value",
            },
            "500": {
              value: "value",
            },
            "600": {
              value: "value",
            },
            "700": {
              value: "value",
            },
            "800": {
              value: "value",
            },
            "900": {
              value: "value",
            },
          },
        },
      },
    }));
  test("allows namespacing", () =>
    expect(sd(namespacing)).toStrictEqual({
      project: {
        color: {
          accent: {
            value: "value",
          },
          highlight: {
            value: "value",
          },
          main: {
            value: "value",
          },
        },
        content: {
          measure: {
            base: {
              value: "value",
            },
            xd: {
              "0": {
                value: "value",
              },
              "1": {
                value: "value",
              },
              "2": {
                value: "value",
              },
              "3": {
                value: "value",
              },
            },
          },
          size: {
            base: {
              value: "value",
            },
            x: {
              "0": {
                value: "value",
              },
              "1": {
                value: "value",
              },
              "2": {
                value: "value",
              },
              "3": {
                value: "value",
              },
            },
            xd: {
              "0": {
                value: "value",
              },
              "1": {
                value: "value",
              },
              "2": {
                value: "value",
              },
              "3": {
                value: "value",
              },
            },
          },
        },
        font: {
          body: {
            value: "value",
          },
          code: {
            value: "value",
          },
          headings: {
            value: "value",
          },
        },
        layout: {
          grid: {
            base: {
              value: "value",
            },
            n: {
              "0": {
                value: "value",
              },
              "1": {
                value: "value",
              },
              "2": {
                value: "value",
              },
              "3": {
                value: "value",
              },
            },
          },
          spacing: {
            base: {
              value: "value",
            },
            xd: {
              "0": {
                value: "value",
              },
              "1": {
                value: "value",
              },
              "2": {
                value: "value",
              },
              "3": {
                value: "value",
              },
            },
          },
        },
      },
    }));
});

describe("tw :: TokenDictionary -> TailwindUtilityData", () => {
  test("can build values", () =>
    expect(tw(values)).toStrictEqual({
      color: {
        main: "value",
        secondary: "value",
        tertiary: "value",
      },
    }));
  test("can build subcategories", () =>
    expect(tw(subcategory)).toStrictEqual({
      color: {
        main: {
          DEFAULT: "value",
          shade2: "value",
          shade3: "value",
          tint2: "value",
          tint3: "value",
        },
      },
    }));
});
