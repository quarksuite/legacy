import { Clrs } from "@api/color/data/types";
import {
  pipe,
  set,
  hue,
  saturation,
  lightness,
  alpha,
  mix,
  complementary,
  analogous,
  triad,
  tetrad,
  custom,
  tints,
  tones,
  shades,
  hex,
  rgb,
  hsl,
  clrs,
  systemfonts,
  ms,
  update,
  merge,
  partition,
  units,
} from "@api/index";
import { RelativeUnits } from "@api/scale/types";

describe("API flow testing", () => {
  describe("v4 feature: partial application", () => {
    test("can partially apply any of the library's functions", () => {
      const swatch = hex("springgreen");

      const quarterCircle = set(hue, 90);
      const mute = set(saturation, -50);
      const brighten = set(lightness, 25);

      expect(quarterCircle(swatch)).toBe("#0000ff");
      expect(mute(swatch)).toBe("#40bf80");
      expect(brighten(swatch)).toBe("#80ffbf");
    });
    test("can chain partial application", () => {
      const swatch = rgb(clrs("orange"));

      const opposite = set(hue, 180);
      const evenly = set(mix, 50);
      const negate = set(evenly, opposite(swatch));

      const predicate = negate(swatch) === mix(50, hue(180, swatch), swatch);

      expect(negate(swatch)).toBe("rgb(181, 141, 181)");
      expect(predicate).toBeTruthy();
    });
  });
  describe("v4 feature: function composition", () => {
    test("can compose the library` functions", () => {
      const swatch = rgb(clrs("teal"));

      const fade = set(alpha, -25);
      const darken = set(lightness, -35);

      const mixRed = set(mix, 45, clrs("red"));
      const opposite = set(hue, 180);

      const flipped = pipe(mixRed, opposite);
      const faded = pipe(fade, darken);

      expect(flipped(swatch)).toBe("rgb(156, 175, 176)");
      expect(faded(swatch)).toBe("rgba(17, 65, 65, 0.75)");
    });
  });
  describe("feature: predictable outputs", () => {
    test("can reliably predict the output for different structure", () => {
      const swatch = clrs("yellow");
      const analogousTest = analogous(45, swatch);
      const manualAnalogous = [
        hue(0, swatch),
        hue(-45, swatch),
        hue(45, swatch),
      ];

      const schemePredicate =
        JSON.stringify(analogousTest) === JSON.stringify(manualAnalogous);

      expect(schemePredicate).toBeTruthy();
    });
  });
  describe("feature: scheme composition", () => {
    const swatch = clrs("fuchsia");
    const [origin, a, b] = triad(90, swatch);
    const [, c, d, e] = custom({ hues: 4, arc: 60 }, swatch);

    const tri = set(triad, 30);
    const tetra = set(tetrad, 45);

    const aggregate = [origin, [a, b], [c, d, e]]
      .flat()
      .map((hue) => tri(hue))
      .sort();

    expect([...new Set(...aggregate)]).toStrictEqual([
      "#124df0",
      "#f04612",
      "#bcf012",
    ]);
    expect([
      ...new Set(...aggregate.flat().map((hue: string) => tetra(hue))),
    ]).toStrictEqual(["#124df0", "#f0b512", "#7d12f0", "#85f012"]);
  });
  describe("v4 feature: custom schemes", () => {
    const swatch = clrs("aqua");
    const accent = hue(60, swatch);

    const myScheme = custom({ hues: 7, arc: 35 }, swatch);
    const final = [...myScheme, ...complementary(accent)];

    expect(final).toStrictEqual([
      "#7fdbff",
      "#7f90ff",
      "#b97fff",
      "#ff7ffb",
      "#ff7fb0",
      "#ff997f",
      "#ffe37f",
      "#a37fff",
      "#dbff7f",
    ]);
  });
  describe("v4 feature: scale partitioning", () => {
    test("correctly splits a large scale into partitions of the desired size", () => {
      const globalScale = ms(50, 1.05, 1);
      const [first, , second, , third, ...rest] = partition(6, globalScale);

      expect(globalScale).toStrictEqual([
        1,
        1.05,
        1.1025,
        1.1576250000000001,
        1.2155062500000002,
        1.2762815625000004,
        1.3400956406250004,
        1.4071004226562505,
        1.477455443789063,
        1.5513282159785162,
        1.6288946267774422,
        1.7103393581163142,
        1.79585632602213,
        1.8856491423232367,
        1.9799315994393987,
        2.0789281794113688,
        2.182874588381937,
        2.292018317801034,
        2.406619233691086,
        2.5269501953756404,
        2.653297705144422,
        2.7859625904016436,
        2.925260719921726,
        3.0715237559178123,
        3.225099943713703,
        3.3863549408993885,
        3.555672687944358,
        3.733456322341576,
        3.920129138458655,
        4.116135595381588,
        4.321942375150668,
        4.538039493908201,
        4.764941468603611,
        5.003188542033792,
        5.253347969135482,
        5.5160153675922565,
        5.791816135971869,
        6.081406942770463,
        6.385477289908986,
        6.704751154404436,
        7.039988712124658,
        7.391988147730891,
        7.761587555117436,
        8.14966693287331,
        8.557150279516975,
        8.985007793492823,
        9.434258183167465,
        9.905971092325839,
        10.401269646942131,
        10.921333129289238,
      ]);
      expect(first).toStrictEqual([
        1,
        1.05,
        1.1025,
        1.1576250000000001,
        1.2155062500000002,
        1.2762815625000004,
      ]);
      expect(second).toStrictEqual([
        1.9799315994393987,
        2.0789281794113688,
        2.182874588381937,
        2.292018317801034,
        2.406619233691086,
        2.5269501953756404,
      ]);
      expect(third).toStrictEqual([
        3.920129138458655,
        4.116135595381588,
        4.321942375150668,
        4.538039493908201,
        4.764941468603611,
        5.003188542033792,
      ]);
      expect([...rest]).toStrictEqual([
        [
          5.5160153675922565,
          5.791816135971869,
          6.081406942770463,
          6.385477289908986,
          6.704751154404436,
          7.039988712124658,
        ],
        [
          7.761587555117436,
          8.14966693287331,
          8.557150279516975,
          8.985007793492823,
          9.434258183167465,
          9.905971092325839,
        ],
        [10.921333129289238],
      ]);

      expect([...first, ...third]).toStrictEqual([
        1,
        1.05,
        1.1025,
        1.1576250000000001,
        1.2155062500000002,
        1.2762815625000004,
        3.920129138458655,
        4.116135595381588,
        4.321942375150668,
        4.538039493908201,
        4.764941468603611,
        5.003188542033792,
      ]);
      expect([...second, ...rest.flat()]).toStrictEqual([
        1.9799315994393987,
        2.0789281794113688,
        2.182874588381937,
        2.292018317801034,
        2.406619233691086,
        2.5269501953756404,
        5.5160153675922565,
        5.791816135971869,
        6.081406942770463,
        6.385477289908986,
        6.704751154404436,
        7.039988712124658,
        7.761587555117436,
        8.14966693287331,
        8.557150279516975,
        8.985007793492823,
        9.434258183167465,
        9.905971092325839,
        10.921333129289238,
      ]);
    });
  });
  describe("v4 fix: merge removes duplicate values", () => {
    const values = set(ms, 10);
    const first = values(1.75, 1);
    const second = values(1.5, 1);
    const third = values(1.25, 1);

    expect(merge(first, second, third)).toStrictEqual([
      1,
      1.25,
      1.5,
      1.5625,
      1.75,
      1.953125,
      2.25,
      2.44140625,
      3.0517578125,
      3.0625,
      3.375,
      3.814697265625,
      4.76837158203125,
      5.0625,
      5.359375,
      5.9604644775390625,
      7.450580596923828,
      7.59375,
      9.37890625,
      11.390625,
      16.4130859375,
      17.0859375,
      25.62890625,
      28.722900390625,
      38.443359375,
      50.26507568359375,
      87.96388244628906,
      153.93679428100586,
    ]);
  });
});

describe("Examples", () => {
  test("Prototyping", () => {
    const color = hsl("gainsboro");
    const [tint, tone, shade] = [tints, tones, shades].map((fn) =>
      set(fn, 4, 99)
    );

    const palette = {
      main: color,
      "main-tint": tint(color),
      "main-tone": tone(color),
      "main-shade": shade(color),
    };

    const scale = ms(8, 1.618, 1);
    const rems = set(units, 3, "rem");

    const composition = {
      scale: rems(scale),
    };

    expect({ palette, composition }).toStrictEqual({
      composition: {
        scale: [
          "1rem",
          "1.62rem",
          "2.62rem",
          "4.24rem",
          "6.85rem",
          "11.1rem",
          "17.9rem",
          "29rem",
        ],
      },
      palette: {
        main: "hsl(0, 0%, 86.3%)",
        "main-shade": [
          "hsl(0, 0%, 74.9%)",
          "hsl(0, 0%, 61.2%)",
          "hsl(0, 0%, 43.9%)",
          "hsl(0, 0%, 8.63%)",
        ],
        "main-tint": [
          "hsl(0, 0%, 89.8%)",
          "hsl(0, 0%, 93.3%)",
          "hsl(0, 0%, 96.5%)",
          "hsl(0, 0%, 100%)",
        ],
        "main-tone": [
          "hsl(0, 0%, 78.8%)",
          "hsl(0, 0%, 70.6%)",
          "hsl(0, 0%, 61.6%)",
          "hsl(0, 0%, 50.6%)",
        ],
      },
    });
  });
  test("Project: Quarksuite", () => {
    const color = rgb("#348ec9");

    const [main, accent, highlight] = triad(60, color);

    const tint = set(tints, 3, 98);
    const shade = set(shades, 2, 98);

    const palette = {
      brand: main,
      "brand-tint": tint(main),
      "brand-shade": shade(main),
      "brand-accent": accent,
      "brand-highlight": highlight,
    };

    const [sans, mono] = systemfonts("sans-serif", "monospace");

    const scale = ms(5, 2, 1);

    const composition = {
      ms: units(4, "rem", scale),
    };

    expect({ palette, fonts: { sans, mono }, composition }).toStrictEqual({
      composition: {
        ms: ["1rem", "2rem", "4rem", "8rem", "16rem"],
      },
      fonts: {
        mono:
          "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
        sans:
          "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
      },
      palette: {
        brand: "rgb(52, 141, 201)",
        "brand-accent": "rgb(201, 52, 141)",
        "brand-highlight": "rgb(141, 201, 52)",
        "brand-shade": ["rgb(37, 101, 144)", "rgb(7, 20, 28)"],
        "brand-tint": [
          "rgb(152, 186, 220)",
          "rgb(208, 222, 238)",
          "rgb(253, 253, 254)",
        ],
      },
    });
  });
  test("Project: Starter Kit Defaults", () => {
    // Axioms
    const base = 1;
    const ratio = 1.5;
    const measure = 72;
    const maximum = 100;
    const range = 4;
    const outputPrecision = 4;

    // Palette
    const palette = {
      ...[
        "navy",
        "blue",
        "aqua",
        "teal",
        "olive",
        "green",
        "lime",
        "yellow",
        "orange",
        "red",
        "maroon",
        "fuchsia",
        "purple",
        "black",
        "gray",
        "silver",
        "white",
      ].reduce((acc, c) => ({ ...acc, ...{ [c]: clrs(c as Clrs) } }), {}),
    };

    // content
    const initial = set(ms, range, ratio);

    const isNotBaseValue = (v: number) => v !== base;
    const isNotMaximumCPL = (v: number) => v !== measure;

    const contentInversion = (v: number) => base / v;
    const fractionOfMeasure = (v: number) => measure / v;

    // content fonts
    const [sans, , mono] = systemfonts();

    const fonts = {
      sans: {
        name: "Roboto",
        stack: ["Roboto", sans].join(", "),
        weights: ["300", "400", "400i", "700", "900"],
      },
      mono: {
        name: "Roboto Mono",
        stack: ["Roboto Mono", mono].join(", "),
        weights: ["400", "700"],
      },
    };

    // content size
    const rems = set(units, outputPrecision, "rem");
    const ems = set(units, outputPrecision, "em");

    const sizes = initial(base).filter(isNotBaseValue);

    const size = {
      base: rems([base])[0],
      x: rems(sizes),
      dx: ems(update(contentInversion, sizes)),
    };

    // measure (characters per line)
    const ch = set(units, outputPrecision, "ch");

    const lineLength = update(fractionOfMeasure, initial(base));

    const line = {
      base: ch([measure])[0],
      dx: ch(lineLength.filter(isNotMaximumCPL)),
    };

    // content spacing
    const ex = set(units, outputPrecision, "ex");

    const vr = initial(base).filter(isNotBaseValue);

    const spacing = {
      base: ex([base])[0],
      x: ex(vr),
      dx: ex(update(contentInversion, vr)),
    };

    // layout

    const isNotBaseFraction = (n: number) => n !== base;
    const isNotViewportMaximum = (v: number) => v !== maximum;

    // layout grid
    const fr = set(units, outputPrecision, "fr");

    const gu = initial(base);

    const grid = {
      base: fr(gu)[0],
      n: fr(gu.filter(isNotBaseFraction)),
    };

    // layout viewport
    const [vw, vh, vmin, vmax] = [
      "vw",
      "vh",
      "vmin",
      "vmax",
    ].map((viewport: string) =>
      set(units, outputPrecision, viewport as RelativeUnits)
    );

    const vp = update((v: number) => v * 10, initial(base)).filter(
      isNotViewportMaximum
    );

    const viewport = {
      vw: {
        base: vw([maximum])[0],
        dx: vw(vp),
      },
      vh: {
        base: vh([maximum])[0],
        dx: vh(vp),
      },
      vmin: {
        base: vmin([maximum])[0],
        dx: vmin(vp),
      },
      vmax: {
        base: vmax([maximum])[0],
        dx: vmax(vp),
      },
    };

    expect({ palette }).toStrictEqual({
      palette: {
        aqua: "#7fdbff",
        black: "#111111",
        blue: "#0074d9",
        fuchsia: "#f012be",
        gray: "#aaaaaa",
        green: "#2ecc40",
        lime: "#01ff70",
        maroon: "#85144b",
        navy: "#001f3f",
        olive: "#3d9970",
        orange: "#ff851b",
        purple: "#b10dc9",
        red: "#ff4136",
        silver: "#dddddd",
        teal: "#39cccc",
        white: "#ffffff",
        yellow: "#ffdc00",
      },
    });
    expect({ content: { size, line, spacing } }).toStrictEqual({
      content: {
        line: {
          base: "72ch",
          dx: ["48ch", "32ch", "21.33ch"],
        },
        size: {
          base: "1rem",
          dx: ["0.6667em", "0.4444em", "0.2963em"],
          x: ["1.5rem", "2.25rem", "3.375rem"],
        },
        spacing: {
          base: "1ex",
          dx: ["0.6667ex", "0.4444ex", "0.2963ex"],
          x: ["1.5ex", "2.25ex", "3.375ex"],
        },
      },
    });
    expect({ layout: { grid, viewport } }).toStrictEqual({
      layout: {
        grid: {
          base: "1fr",
          n: ["1.5fr", "2.25fr", "3.375fr"],
        },
        viewport: {
          vh: {
            base: "100vh",
            dx: ["10vh", "15vh", "22.5vh", "33.75vh"],
          },
          vmax: {
            base: "100vmax",
            dx: ["10vmax", "15vmax", "22.5vmax", "33.75vmax"],
          },
          vmin: {
            base: "100vmin",
            dx: ["10vmin", "15vmin", "22.5vmin", "33.75vmin"],
          },
          vw: {
            base: "100vw",
            dx: ["10vw", "15vw", "22.5vw", "33.75vw"],
          },
        },
      },
    });
  });
});
