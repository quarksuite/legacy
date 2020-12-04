# QuarkSuite User Guide (v5.0.0)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Summary](#summary)
- [Baseline](#baseline)
  - [Color](#color)
    - [1. set a base color](#1-set-a-base-color)
    - [2. pick a color scheme](#2-pick-a-color-scheme)
    - [3. create variants](#3-create-variants)
  - [Typography](#typography)
    - [1. set font values and styles](#1-set-font-values-and-styles)
    - [2. creating a font size scale](#2-creating-a-font-size-scale)
  - [Layout](#layout)
    - [1. create whitespace and rhythm scales](#1-create-whitespace-and-rhythm-scales)
    - [2. create a measure/line length scale](#2-create-a-measureline-length-scale)
- [Build](#build)
  - [1. Add a namespace](#1-add-a-namespace)
  - [2. Set build formats](#2-set-build-formats)
  - [3. Run the build](#3-run-the-build)
    - [variables.css](#variablescss)
    - [_variables.scss](#_variablesscss)
    - [tokens.json](#tokensjson)
- [Enhancements](#enhancements)
  - [Settings](#settings)
    - [Color](#color-1)
    - [Scales](#scales)
  - [Factory Settings](#factory-settings)
  - [Presets](#presets)
    - [Font Size](#font-size)
    - [Spacing](#spacing)
    - [Measure](#measure)
    - [Bonus: `fr` grid scale](#bonus-fr-grid-scale)
  - [Configurations](#configurations)
  - [Reduce, Reuse, Recycle](#reduce-reuse-recycle)
    - [config.js](#configjs)
    - [tokens.js](#tokensjs)
- [Token Dictionary Spec](#token-dictionary-spec)
  - [Value](#value)
  - [Scale](#scale)
  - [Subcategory](#subcategory)
  - [Nesting](#nesting)
  - [Namespacing](#namespacing)
- [QuarkSuite Interop](#quarksuite-interop)
  - [Style Dictionary](#style-dictionary)
    - [build.js](#buildjs)
    - [output](#output)
    - [config.json](#configjson)
    - [build](#build)
      - [quarksuite_colors.xml](#quarksuite_colorsxml)
      - [Limitations](#limitations)
  - [CSS-in-JS](#css-in-js)
  - [Tailwind](#tailwind)
    - [tailwind.config.js](#tailwindconfigjs)
  - [Theme UI](#theme-ui)
    - [theme/index.js](#themeindexjs)
- [Support](#support)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Summary

The QuarkSuite workflow breaks down to two steps.

1. Create tokens
2. Build tokens

The rest of the workflow helps you do it in ways that best fit your projects.

First thing: [install the library](https://github.com/quarksuite/core/blob/master/README.md#installation). Once you've done that, we can get started.

Also note: this document is a bit more opinionated than the others. 

It's here to help you get the most out of this kit while introducing you to its core ideas and enhancements.

> Full disclosure: the below tutorial is the actual process for building QuarkSuite's *own* design tokens which are used on the upcoming website.

## Baseline

We'll begin with a basic setup. These token categories show up in nearly every modern web project, so they're a good starting point for a baseline.

+ Color
+ Typography
	* Fonts
	* Sizes
	* Leading
	* Weights
+ Layout
	* Measure
	* Spacing

And here are the relevant QuarkSuite modules we'll need:

```js
const {
  // Color
  rgb,
  triad,
  tints,
  shades,
  
  // Typography and Layout
  systemfonts,
  ms,
  update,
  units,
  
  // Build formats
  css,
  sass,
  raw,
} = require("@quarksuite/core");
```

### Color

QuarkSuite provides a bevy of utilities to help you get the colors and palettes you want. You'll want to [read the color utilities docs](https://github.com/quarksuite/core/blob/master/API.md#color-functions) to see what's available, but let's go through an example palette.

#### 1. set a base color

First, we'll define a color value to build our palette from:

```js

const swatch = rgb("#348ec9");

```

QuarkSuite can process any valid CSS color and also provides format utilities. If you set one on your base color, it will carry that format through your whole palette.

#### 2. pick a color scheme

Let's extend our base color into a collection of base hues and then use [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Examples) to pick them out.

```js
const [main, accent, highlight] = triad(60, swatch);
```

#### 3. create variants

Now we move on to generating our full palette. For this example we're gonna create `3` tints and `2` shades for the `main` hue, and 2 shades for the remaining hues. All with a contrast of `99`%. This is also the point where we assemble our data into a `color` dictionary.

```js
const color = {
  main: {
    base: main,
    tint: tints(3, 99, main),
    shade: shades(2, 99, main),
  },
  accent: {
    base: accent,
    shade: shades(2, 99, accent),
  },
  highlight: {
    base: highlight,
    shade: shades(2, 99, highlight),
  },
};
```

### Typography

The next set of tokens to create are for typography.

#### 1. set font values and styles

QuarkSuite isn't worried about what fonts you use or how you serve them. Instead, for your font tokens it provides a utility for attaching robust system fallbacks. Let's define `body` and `heading` values for our `text` dictionary. This is also the place to define our expected leading and weights.

```js
const text = {
  body: ["Zilla Slab", serif].join(", "),
  headings: ["Rubik", sans].join(", "),
  leading: { base: 1.5, tight: 1.25, loose: 1.75 },
  style: {
    regular: 400,
    bold: 700,
    black: 900,
  },
};
```

#### 2. creating a font size scale

Modular scales are an effective way to define consistent values for your content sizes. As you'll see in a bit, they can be used for **any** design data that requires a numeric scale.

For our example, we'll be creating a 10 `value` scale with a `ratio` of 1.5 with a `base` of 1.

```js
const base = 1;
const ratio = 1.5;
const values = 10;

const scale = ms(values, ratio, base);
const rem = units(4, "rem", scale);
const inverse = update((v) => base / v, scale);
const [s, ...sx] = rem;
const [, ...sxd] = units(4, "em", inverse);
```

The [way QuarkSuite does scales](https://github.com/quarksuite/core/blob/master/API.md#scale-functions) is starting you off with raw values to let you do all your calculations and conversions. And then you attach your units when you're done.

So instead of another library that fiddles with conversion math, QuarkSuite trusts the web to respond to its *own* units accurately. So use the values you actually intend.

Now, we'll update our `font` dictionary with a `size` subcategory:

```js
const text = {
  // ...families
  size: {
    base: s,
    x: sx,
    xd: sxd,
  },
  // ...styles
};
```

### Layout

The final set of data will define layout. And here's where our example may depart from the usual approaches.

Think about how the web is structured.

Every web project begins with content. The web itself started as a text medium. So why not make layout a **content concern**?

Therefore, in our baseline, layout is contained under the `content` dictionary.

#### 1. create whitespace and rhythm scales

Continuing from that idea, we're using the [`ex` unit](https://developer.mozilla.org/en-US/docs/Web/CSS/length).

About the ex unit:

> Represents the x-height of the element's font. On fonts with the "x" letter, this is generally the height of lowercase letters in the font; 1ex ≈ 0.5em in many fonts.

The ex unit also has wide support; having been around since *IE4*.

This, I think, makes it an ideal candidate for defining whitespace and vertical rhythm. To keep it general, we'll make a `spacing` subcategory.

```js
const ex = units(4, "ex", scale);
const [sp, ...spx] = ex;
const [, ...spxd] = units(4, "ex", inverse);

const content = {
  spacing: {
    base: sp,
    x: spx,
    xd: spxd,
  },
};
``` 


#### 2. create a measure/line length scale

Finally, it's important that we define the minimum and maximum line length. We'll also define a scale for values in between.

Since `content` is our context, we're gonna use another [content-based unit: `ch`](https://developer.mozilla.org/en-US/docs/Web/CSS/length).

About the ch unit: 

> Represents the width, or more precisely the advance measure, of the glyph "0" (zero, the Unicode character U+0030) in the element's font.

Crucial to know is that the ch unit responds to the **current size** of the element's font. This allows us to create a line length scale that we can mostly expect to work with the attributes of our chosen font.

As for support, it's been around since IE9.

So now, we'll set a `min` and `max` measure and calculate some intermediate values.

```js
const min = 45;
const max = 75;
const lock = update((v) => Math.trunc(max - v), scale).filter(
  (v) => v >= min && v <= max
);

const measure = {
  base: units(4, "ch", [max]).toString(),
  xd: units(4, "ch", lock),
  min: units(4, "ch", [min]).toString(),
};
```

## Build

Now with our tokens assembled, we're ready to build the whole dictionary to implement in our UI. Our example will output a `token` directory containing CSS custom properties, Sass variables, and raw JSON. But first...

### 1. Add a namespace

A project design token collection will generally want to have each token prefixed with a namespace. So let's do that.

```js
const qs = { color, text, content: { ...content, measure } };
```

If you were wondering why `measure` was defined apart from content, it's to demonstrate that token dictionaries are simply JS objects. They can be composed and nested without issue.

### 2. Set build formats

The final step is our output. For this, QuarkSuite provides [a set of build formats](https://github.com/quarksuite/core/blob/master/API.md#build-formats). For our example we're gonna output some CSS custom properties, Sass variables, and raw data.

```js
require("fs-extra").outputFileSync(
  `${__dirname}/tokens/variables.css`,
  css({ qs })
);

require("fs-extra").outputFileSync(
  `${__dirname}/tokens/_variables.scss`,
  sass({ qs })
);

require("fs-extra").outputFileSync(
  `${__dirname}/tokens/tokens.json`,
  raw({ qs })
);
```

You can use any filesystem library (or Node's native `fs` module), but I like `fs-extra` because it also creates the directory.  

### 3. Run the build

Finally, you run the script to build your tokens:

```bash
node tokens // or your own script
```

Your output directory will sit in the same directory as your token dictionaries.

Let's see our files:

```bash
tokens
├── tokens.json
├── variables.css
└── _variables.scss
```

#### variables.css

```css
:root {
  --qs-color-main: rgb(52, 141, 201);
  --qs-color-main-tint-0: rgb(153, 186, 220);
  --qs-color-main-tint-1: rgb(209, 223, 238);
  --qs-color-main-tint-2: rgb(254, 254, 255);
  --qs-color-main-shade-0: rgb(37, 100, 143);
  --qs-color-main-shade-1: rgb(5, 14, 20);
  --qs-color-accent: rgb(141, 201, 52);
  --qs-color-accent-shade-0: rgb(100, 143, 37);
  --qs-color-accent-shade-1: rgb(14, 20, 5);
  --qs-color-highlight: rgb(201, 52, 141);
  --qs-color-highlight-shade-0: rgb(143, 37, 100);
  --qs-color-highlight-shade-1: rgb(20, 5, 14);
  --qs-text-body: Zilla Slab, Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  --qs-text-headings: Rubik, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
  --qs-text-leading: 1.5;
  --qs-text-leading-tight: 1.25;
  --qs-text-leading-loose: 1.75;
  --qs-text-size: 1rem;
  --qs-text-size-x-0: 1.5rem;
  --qs-text-size-x-1: 2.25rem;
  --qs-text-size-x-2: 3.375rem;
  --qs-text-size-x-3: 5.063rem;
  --qs-text-size-x-4: 7.594rem;
  --qs-text-size-x-5: 11.39rem;
  --qs-text-size-x-6: 17.09rem;
  --qs-text-size-x-7: 25.63rem;
  --qs-text-size-x-8: 38.44rem;
  --qs-text-size-xd-0: 0.6667em;
  --qs-text-size-xd-1: 0.4444em;
  --qs-text-size-xd-2: 0.2963em;
  --qs-text-size-xd-3: 0.1975em;
  --qs-text-size-xd-4: 0.1317em;
  --qs-text-size-xd-5: 0.08779em;
  --qs-text-size-xd-6: 0.05853em;
  --qs-text-size-xd-7: 0.03902em;
  --qs-text-size-xd-8: 0.02601em;
  --qs-text-style-regular: 400;
  --qs-text-style-bold: 700;
  --qs-text-style-black: 900;
  --qs-content-space: 1ex;
  --qs-content-space-x-0: 1.5ex;
  --qs-content-space-x-1: 2.25ex;
  --qs-content-space-x-2: 3.375ex;
  --qs-content-space-x-3: 5.063ex;
  --qs-content-space-x-4: 7.594ex;
  --qs-content-space-x-5: 11.39ex;
  --qs-content-space-x-6: 17.09ex;
  --qs-content-space-x-7: 25.63ex;
  --qs-content-space-x-8: 38.44ex;
  --qs-content-space-xd-0: 0.6667ex;
  --qs-content-space-xd-1: 0.4444ex;
  --qs-content-space-xd-2: 0.2963ex;
  --qs-content-space-xd-3: 0.1975ex;
  --qs-content-space-xd-4: 0.1317ex;
  --qs-content-space-xd-5: 0.08779ex;
  --qs-content-space-xd-6: 0.05853ex;
  --qs-content-space-xd-7: 0.03902ex;
  --qs-content-space-xd-8: 0.02601ex;
  --qs-content-measure: 75ch;
  --qs-content-measure-xd-0: 74ch;
  --qs-content-measure-xd-1: 73ch;
  --qs-content-measure-xd-2: 72ch;
  --qs-content-measure-xd-3: 71ch;
  --qs-content-measure-xd-4: 69ch;
  --qs-content-measure-xd-5: 67ch;
  --qs-content-measure-xd-6: 63ch;
  --qs-content-measure-xd-7: 57ch;
  --qs-content-measure-xd-8: 49ch;
  --qs-content-measure-min: 45ch;
}
```

#### _variables.scss

```scss
$qs-color-main: rgb(52, 141, 201);
$qs-color-main-tint-0: rgb(153, 186, 220);
$qs-color-main-tint-1: rgb(209, 223, 238);
$qs-color-main-tint-2: rgb(254, 254, 255);
$qs-color-main-shade-0: rgb(37, 100, 143);
$qs-color-main-shade-1: rgb(5, 14, 20);
$qs-color-accent: rgb(141, 201, 52);
$qs-color-accent-shade-0: rgb(100, 143, 37);
$qs-color-accent-shade-1: rgb(14, 20, 5);
$qs-color-highlight: rgb(201, 52, 141);
$qs-color-highlight-shade-0: rgb(143, 37, 100);
$qs-color-highlight-shade-1: rgb(20, 5, 14);
$qs-text-body: Zilla Slab, Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
$qs-text-headings: Rubik, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
$qs-text-leading: 1.5;
$qs-text-leading-tight: 1.25;
$qs-text-leading-loose: 1.75;
$qs-text-size: 1rem;
$qs-text-size-x-0: 1.5rem;
$qs-text-size-x-1: 2.25rem;
$qs-text-size-x-2: 3.375rem;
$qs-text-size-x-3: 5.063rem;
$qs-text-size-x-4: 7.594rem;
$qs-text-size-x-5: 11.39rem;
$qs-text-size-x-6: 17.09rem;
$qs-text-size-x-7: 25.63rem;
$qs-text-size-x-8: 38.44rem;
$qs-text-size-xd-0: 0.6667em;
$qs-text-size-xd-1: 0.4444em;
$qs-text-size-xd-2: 0.2963em;
$qs-text-size-xd-3: 0.1975em;
$qs-text-size-xd-4: 0.1317em;
$qs-text-size-xd-5: 0.08779em;
$qs-text-size-xd-6: 0.05853em;
$qs-text-size-xd-7: 0.03902em;
$qs-text-size-xd-8: 0.02601em;
$qs-text-style-regular: 400;
$qs-text-style-bold: 700;
$qs-text-style-black: 900;
$qs-content-space: 1ex;
$qs-content-space-x-0: 1.5ex;
$qs-content-space-x-1: 2.25ex;
$qs-content-space-x-2: 3.375ex;
$qs-content-space-x-3: 5.063ex;
$qs-content-space-x-4: 7.594ex;
$qs-content-space-x-5: 11.39ex;
$qs-content-space-x-6: 17.09ex;
$qs-content-space-x-7: 25.63ex;
$qs-content-space-x-8: 38.44ex;
$qs-content-space-xd-0: 0.6667ex;
$qs-content-space-xd-1: 0.4444ex;
$qs-content-space-xd-2: 0.2963ex;
$qs-content-space-xd-3: 0.1975ex;
$qs-content-space-xd-4: 0.1317ex;
$qs-content-space-xd-5: 0.08779ex;
$qs-content-space-xd-6: 0.05853ex;
$qs-content-space-xd-7: 0.03902ex;
$qs-content-space-xd-8: 0.02601ex;
$qs-content-measure: 75ch;
$qs-content-measure-xd-0: 74ch;
$qs-content-measure-xd-1: 73ch;
$qs-content-measure-xd-2: 72ch;
$qs-content-measure-xd-3: 71ch;
$qs-content-measure-xd-4: 69ch;
$qs-content-measure-xd-5: 67ch;
$qs-content-measure-xd-6: 63ch;
$qs-content-measure-xd-7: 57ch;
$qs-content-measure-xd-8: 49ch;
$qs-content-measure-min: 45ch;
```

#### tokens.json

```json
{
  "qs": {
    "color": {
      "main": {
        "base": "rgb(52, 141, 201)",
        "tint": [
          "rgb(153, 186, 220)",
          "rgb(209, 223, 238)",
          "rgb(254, 254, 255)"
        ],
        "shade": [
          "rgb(37, 100, 143)",
          "rgb(5, 14, 20)"
        ]
      },
      "accent": {
        "base": "rgb(141, 201, 52)",
        "shade": [
          "rgb(100, 143, 37)",
          "rgb(14, 20, 5)"
        ]
      },
      "highlight": {
        "base": "rgb(201, 52, 141)",
        "shade": [
          "rgb(143, 37, 100)",
          "rgb(20, 5, 14)"
        ]
      }
    },
    "text": {
      "body": "Zilla Slab, Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
      "headings": "Rubik, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
      "leading": {
        "base": 1.5,
        "tight": 1.25,
        "loose": 1.75
      },
      "size": {
        "base": "1rem",
        "x": [
          "1.5rem",
          "2.25rem",
          "3.375rem",
          "5.063rem",
          "7.594rem",
          "11.39rem",
          "17.09rem",
          "25.63rem",
          "38.44rem"
        ],
        "xd": [
          "0.6667em",
          "0.4444em",
          "0.2963em",
          "0.1975em",
          "0.1317em",
          "0.08779em",
          "0.05853em",
          "0.03902em",
          "0.02601em"
        ]
      },
      "style": {
        "regular": 400,
        "bold": 700,
        "black": 900
      }
    },
    "content": {
      "space": {
        "base": "1ex",
        "x": [
          "1.5ex",
          "2.25ex",
          "3.375ex",
          "5.063ex",
          "7.594ex",
          "11.39ex",
          "17.09ex",
          "25.63ex",
          "38.44ex"
        ],
        "xd": [
          "0.6667ex",
          "0.4444ex",
          "0.2963ex",
          "0.1975ex",
          "0.1317ex",
          "0.08779ex",
          "0.05853ex",
          "0.03902ex",
          "0.02601ex"
        ]
      },
      "measure": {
        "base": "75ch",
        "xd": [
          "74ch",
          "73ch",
          "72ch",
          "71ch",
          "69ch",
          "67ch",
          "63ch",
          "57ch",
          "49ch"
        ],
        "min": "45ch"
      }
    }
  }
}
```

Brilliant.

Now, you may wondering why the token construction process was so laborious and repetitive. And if the basic utilities were all this library included, I couldn't argue with that.

## Enhancements

QuarkSuite's major strength in authoring design tokens rests in its functional API. Which would be underwhelming on its own without the [`bind` and `pipe` utilities](https://github.com/quarksuite/core/blob/master/API.md#functional-utilities) augmenting its might.

So we're gonna get into the advanced features:

1. Settings
2. Factory Settings
3. Presets
4. Configurations

Let's rework our baseline. And in the process, I shall show you **true power**.

That is... I'll show you an effective and enjoyable workflow!

Yes, *that*. Not the other thing.

### Settings

The `bind` utility is a higher order function that accepts a utility and allows you to define some initial arguments. It does the same for other bound functions. So you can chain bound utilities until the last argument to pass is the data itself.

#### Color

The most repetition that happens in our definition of colors is when defining our `tints` and `shades`. So we'll create some settings for generating our variants.

```js
const contrast = 99;
const count = 3;
const light = bind(tints, count, contrast);
const dark = bind(shades, count - 1, contrast);
```

Now we've redefined our color variants in a reusable and contextual way without changing the output.

```js
const color = {
  main: {
    base: main,
    tint: light(main),
    shade: dark(main),
  },
  accent: {
    base: accent,
    shade: dark(accent),
  },
  highlight: {
    base: highlight,
    shade: dark(highlight),
  },
};
```

#### Scales

Scales are a perfect candidate for settings. We can rework our typography and layout scales with `bind` like so.

```js
const base = 1;
const ratio = 1.5;
const values = 10;
const min = 45;
const max = 75;

const scale = bind(ms, values, ratio);
const content = pipe(base, scale);
const invert = bind(update, (v) => base / v);
const fragment = bind(update, (v) => Math.trunc(max - v));
const wrap = (v) => [v];
const stringify = (v) => v.toString();
const lock = (scale) => scale.filter((v) => v >= min && v <= max);
const accuracy = bind(units, 4);
const rem = bind(accuracy, "rem");
const em = bind(accuracy, "em");
const ch = bind(accuracy, "ch");
const ex = bind(accuracy, "ex");
```

This is a good time to introduce the `pipe` utility as we'll be using it a lot to streamline our settings. The pipe utility accepts a value and then pushes it through a sequence of functions. What kind of functions? It takes **bound utilities** which have had their argument initialized up to the point where the only unbound argument is the data itself.

That is where unbound = `(x) => any`.

From there it processes the value with each function and outputs a new value.

So `x -> ...(x) => any -> any`.

Take notice of how the `units` utility is chained. Which creates a fully curried binding where `(precision, unit, scale) => string[]` becomes `(precision) => (unit) => (scale) => string[]`.

### Factory Settings

You'll notice some repetition in the above code. What could we do to resolve that? 

The answer: we'll wrap the bindings with another function accepting a *writable* initial argument. Or we create `factory settings`.

```js
const scale = bind(ms, values, ratio);
const content = pipe(base, scale);
const invert = bind(update, (v) => base / v);
const fragment = (max = 75) => bind(update, (v) => Math.trunc(max - v));
const wrap = (v) => [v];
const stringify = (v) => v.toString();
const lock = (scale) => scale.filter((v) => v >= min && v <= max);
const accuracy = bind(units, 4);
const output = (unit = "rem") => bind(accuracy, unit);
```

As a rule, settings accept *data*, factory settings accept *arguments*.

The use case for factory settings is when you have settings you want to carry across projects or to provide options for presets.

### Presets

Now I'll introduce presets. This feature allows `pipe` to show off its abilities. In fact, you've already seen one: `content = pipe(base, scale);` is actually a minimal preset.

Presets can safely be the starting value for other presets. Thus we can rework our baseline scales into a *chain* of presets that make use of our factory settings.

#### Font Size

So we go from this:

```js
const rem = units(4, "rem", scale);
const inverse = update((v) => base / v, scale);
const [s, ...sx] = rem;
const [, ...sxd] = units(4, "em", inverse);

const text = {
  body: ["Zilla Slab", serif].join(", "),
  headings: ["Rubik", sans].join(", "),
  leading: { base: 1.5, tight: 1.25, loose: 1.75 },
  size: {
    base: s,
    x: sx,
    xd: sxd,
  },
  style: {
    regular: 400,
    bold: 700,
    black: 900,
  },
};
```

to this:

```js
// Size
const [, ...sx] = pipe(content, output());
const [, ...sxd] = pipe(content, invert, output("em"));

const text = {
  body: ["Zilla Slab", serif].join(", "),
  headings: ["Rubik", sans].join(", "),
  leading: { base: 1.5, tight: 1.25, loose: 1.75 },
  size: {
    base: pipe(base, wrap, output(), stringify),
    x: sx,
    xd: sxd,
  },
  style: {
    regular: 400,
    bold: 700,
    black: 900,
  },
};
```

#### Spacing

And this:

```js
const ex = units(4, "ex", scale);
const [sp, ...spx] = ex;
const [, ...spxd] = units(4, "ex", inverse);

const content = {
  space: {
    base: sp,
    x: spx,
    xd: spxd,
  },
};
```

to this:

```js
// Spacing
const [, ...spx] = pipe(content, output("ex"));
const [, ...spxd] = pipe(content, invert, output("ex"));

const content = {
  space: {
    base: pipe(base, wrap, output("ex"), stringify),
    x: spx,
    xd: spxd,
  },
};
```

#### Measure

Finally, our measure scale goes from this:

```js
const min = 45;
const max = 75;
const lock = update((v) => Math.trunc(max - v), scale).filter(
  (v) => v >= min && v <= max
);

const measure = {
  base: units(4, "ch", [max]).toString(),
  xd: units(4, "ch", lock),
  min: units(4, "ch", [min]).toString(),
};
```

To this:

```js
const measure = {
  base: pipe(max, wrap, output("ch"), stringify),
  xd: pipe(content, fragment(), lock, output("ch")),
  min: pipe(min, wrap, output("ch"), stringify),
};
```

#### Bonus: `fr` grid scale

With all of our refactoring, we can add another scale to our `content` dictionary with a few lines of code.

```js
const [, ...gu] = pipe(content, output("fr"));
const grid = { base: pipe(base, wrap, output("fr"), stringify), n: gu };

const qs = { color, text, content: { ...content, measure, grid } };
```

### Configurations

Now our token dictionaries are a little cleaner, but you've likely noticed that some of our presets only have a few elements that change while following the same general pipeline. Now, you've identified candidates for **configuration**. The same principle for factory settings applies here: we pass those writable elements as arguments in a function.

As a convention, I also recommend `PascalCase` for configurations to indicate that they are *programmable* values.

```js
// Configurations
const isNotBaseValue = (_v, i) => i !== 0;

// Configurations
const Value = (value, unit = "rem") =>
  pipe(value, wrap, output(unit), stringify);

const Scale = (scale, { unit = "rem", inversion = false } = {}) =>
  inversion
    ? pipe(scale.filter(isNotBaseValue), invert, output(unit))
    : pipe(scale.filter(isNotBaseValue), output(unit));

const IntermediateMeasure = (scale, cpl = 75) =>
  pipe(scale, fragment(cpl), lock, output("ch"));
```

Here, we've defined three configurations. 

+ `Value`: initial scale value with unit
+ `Scale`: the actual scale values calculated from the initial value with units and an inversion option
+ `IntermediateMeasure`: a scale of intermediate cpl (characters per line) calculated from a fragmented max measure and limited up to the minimum measure 

A configuration is distinct from a factory setting in that a configuration will accept an argument *and* data.

Finally, we'll refactor our dictionaries with our configurations.

```js
const text = {
  body: ["Zilla Slab", serif].join(", "),
  headings: ["Rubik", sans].join(", "),
  leading: { base: 1.5, tight: 1.25, loose: 1.75 },
  size: {
    base: setValue(base),
    x: setScale(content),
    xd: setScale(content, "em", true),
  },
  style: {
    regular: 400,
    bold: 700,
    black: 900,
  },
};

const content = {
  space: {
    base: setValue(base, "ex"),
    x: setScale(content, "ex"),
    xd: setScale(content, "ex", true),
  },
  measure: {
    base: setValue(max, "ch"),
    xd: setIntermediateMeasure(content),
    min: setValue(min, "ch"),
  },
  grid: {
    base: setValue(base, "fr"),
    n: setScale(content, "fr"),
  },
};

const qs = { color, text, content };
```

### Reduce, Reuse, Recycle

All of the above enhancements leave a lot of code for one file. So our last refactor is separating our token dictionary and build code from our settings and configurations.

This is also a good time remind you of the [main project objective](https://github.com/quarksuite/core/blob/master/README.md#project-objectives): **"Design as a Module"**. Configurations allow you to make programmatic statements about your design expectations, patterns, and idioms that inform *most* of your web design projects so you can change only what *needs* to change across them.

#### config.js

I'll conclude the tutorial with an example of a configuration I'm actually using now.

```js
const {
  bind,
  pipe,
  systemfonts,
  hex,
  hue,
  mix,
  tints,
  tones,
  shades,
  ms,
  update,
  units,
} = require("@quarksuite/core");

// Configuration setup
const complement = bind(hue, 180);

const light = ({ count = 3, contrast = 99 } = {}) =>
  bind(tints, count, contrast);

const muted = ({ count = 2, contrast = 99 } = {}) =>
  bind(tones, count, contrast);

const dark = ({ count = 2, contrast = 95 }) => bind(shades, count, contrast);

const isNotBaseValue = (_v, i) => i !== 0;

const content = ({ values = 10, ratio = 1.5, base = 1 }) =>
  ms(values, ratio, base);

const invert = (base = 1) => bind(update, (v) => base / v);
const fragment = (max = 75) => bind(update, (v) => max - v);
const percentage = (max = 100) => bind(update, (v) => max - v * 10);

const box = (v) => [v];
const extract = (v) => v.toString();

const lock = ({ min = 45, max = 75 } = {}, scale) =>
  scale.filter((v) => v >= min && v <= max);
const lineRange = ({ min = 45, max = 75 }) => bind(lock, { min, max });

const minimum = (boundary, scale) =>
  scale.filter((v) => Math.sign(v) !== -1 && v >= boundary);
const viewRange = (boundary = 15) => bind(minimum, boundary);

const output = ({ precision = 4, unit = "rem" } = {}) =>
  bind(units, precision, unit);

// General purpose value and scale configurations
const Value = (base = 1, { precision = 4, unit = "rem" } = {}) =>
  pipe(base, box, output({ precision, unit }), extract);

const Scale = ({
  values,
  ratio,
  base,
  precision,
  unit,
  inversion = false,
} = {}) =>
  inversion
    ? pipe(
        content({ values, ratio, base }).filter(isNotBaseValue),
        invert(base),
        output({ precision, unit })
      )
    : pipe(
        content({ values, ratio, base }).filter(isNotBaseValue),
        output({ precision, unit })
      );

const VP = ({
  values,
  ratio,
  base,
  precision,
  unit = "vw",
  max = 100,
  boundary,
  initial = false,
} = {}) =>
  initial
    ? Value(max, { precision, unit })
    : pipe(
        content({ values, ratio, base }),
        percentage(max),
        viewRange(boundary),
        output({ precision, unit })
      );

// Statements

// I often start with a neutral base color.
exports.Neutral = (color) => pipe(color, bind(mix, 50, complement(color)));

// I nearly always need variants for a palette.
exports.Tints = (color, { count, contrast } = {}) =>
  pipe(color, light({ count, contrast }));
exports.Tones = (color, { count, contrast } = {}) =>
  pipe(color, muted({ count, contrast }));
exports.Shades = (color, { count, contrast } = {}) =>
  pipe(color, dark({ count, contrast }));
  
// For working with Tailwind, I usually switch to a Material Design style
// numeric scale.
exports.Material = (color, { contrast = 99 } = {}) =>
  [
    ...tints(5, contrast, hex(color)).reverse(),
    hex(color),
    ...shades(4, contrast, hex(color)),
  ].reduce(
    (acc, swatch, index) => ({
      ...acc,
      ...(index === 0
        ? { 50: swatch }
        : { [String(index).padEnd(3, 0)]: swatch }),
    }),
    {}
  );


// I usually use Roboto from Google Fonts with a fallback to system sans
exports.Font = (font = "Roboto", fallback = "sans-serif") =>
  [font, ...systemfonts(fallback)].join(", ");

// My font size scales nearly always use em units for inversions, and I usually
// set them as subcategories, so I need a toggle to generate the base value
exports.Size = ({
  base = 1,
  initial = false,
  inversion,
  precision,
  values,
  ratio,
} = {}) =>
  initial
    ? Value(base, { precision })
    : inversion
    ? Scale({ base, precision, inversion, values, ratio, unit: "em" })
    : Scale({ base, precision, values, ratio });

// I almost always use content-based units for spacing. In this case, "ex" unit
exports.Spacing = ({
  base = 1,
  initial = false,
  inversion,
  precision,
  values,
  ratio,
} = {}) =>
  initial
    ? Value(base, { precision, unit: "ex" })
    : inversion
    ? Scale({ base, precision, inversion, values, ratio, unit: "ex" })
    : Scale({ base, precision, values, ratio, unit: "ex" });

// I usually create a grid that adapts by line length in my recent designs.
exports.Grid = ({
  base = 1,
  initial = false,
  precision,
  columns,
  ratio,
} = {}) =>
  initial
    ? Value(base, { precision, unit: "fr" })
    : Scale({ base, precision, ratio, unit: "fr", values: columns });

// So I also need a way to calculate the measure (characters per line) and I
// need to be able to grab the minimum and maximum as values.
exports.Measure = ({
  max = 75,
  min = 45,
  values,
  ratio,
  precision,
  isMin = false,
  isMax = false,
} = {}) => {
  // Return minimum or maximum measure when asked
  if (isMin) return Value(min, { precision, unit: "ch" });
  if (isMax) return Value(max, { precision, unit: "ch" });

  // Otherwise, we're calculating a scale from:
  // maximum / values - minimum / values
  return pipe(
    content({ values, ratio, base: max / values - min / values }),
    fragment(max),
    lineRange({ min, max }),
    output({ precision, unit: "ch" })
  );
};

// I often make use of viewport units with CSS grid.
exports.Viewport = {
  width: ({
    values,
    ratio,
    base,
    precision,
    max = 100,
    boundary = 10,
    initial = false,
  } = {}) => VP({ values, ratio, base, precision, unit: "vw", max, boundary, initial }),
  height: ({
    values,
    ratio,
    base,
    precision,
    max = 100,
    boundary = 15,
    initial = false,
  } = {}) => VP({ values, ratio, base, precision, unit: "vh", max, boundary, initial }),
  min: ({ values, ratio, base, precision, max = 100, boundary = 15, initial = false } = {}) =>
    VP({ values, ratio, base, precision, unit: "vmin", max, boundary, initial }),
  max: ({ values, ratio, base, precision, max = 100, boundary = 15, initial = false } = {}) =>
    VP({ values, ratio, base, precision, unit: "vmax", max, boundary, initial }),
};
```



#### tokens.js

And here they are used to build out the full QuarkSuite token dictionary.

```js
const { rgb, triad } = require("@quarksuite/core");
const {
  Tints,
  Shades,
  Font,
  Size,
  Spacing,
  Measure,
  Grid,
  Viewport,
} = require("./config");

const swatch = rgb("#348ec9");
const [main, accent, highlight] = triad(60, swatch);

const color = {
  main: {
    base: main,
    tint: Tints(main),
    shade: Shades(main),
  },
  accent: {
    base: accent,
    shade: Shades(accent),
  },
  highlight: {
    base: highlight,
    shade: Shades(highlight),
  },
};

const text = {
  body: Font("Zilla Slab"),
  headings: Font("Rubik", "sans-serif"),
  code: Font("Space Mono", "monospace"),
  leading: { base: 1.5, tight: 1.25, loose: 1.75 },
  size: {
    base: Size({ initial: true }),
    x: Size(),
    xd: Size({ inversion: true }),
  },
  style: {
    regular: 400,
    bold: 700,
    black: 900,
  },
};

const content = {
  space: {
    base: Spacing({ initial: true }),
    x: Spacing(),
    xd: Spacing({ inversion: true }),
  },
  measure: {
    base: Measure({ isMax: true }),
    xd: Measure(),
    min: Measure({ isMin: true }),
  },
  grid: {
    base: Grid({ initial: true }),
    n: Grid(),
  },
};

const viewport = {
  width: {
    base: Viewport.width({ initial: true }),
    xd: Viewport.width(),
  },
  height: {
    base: Viewport.height({ initial: true }),
    xd: Viewport.height(),
  },
  minimum: {
    base: Viewport.min({ initial: true }),
    xd: Viewport.min(),
  },
  maximum: {
    base: Viewport.max({ initial: true }),
    xd: Viewport.max(),
  },
};

module.exports = { color, text, content, viewport };
```

## Token Dictionary Spec

> If you have your own way of generating your tokens, **this is not required**.

This section documents the possible configurations allowed by the token dictionary spec.

The spec itself draws a lot of inspiration from the [Styled System theme specification](https://styled-system.com/theme-specification/). 

It begins with the same ideas about values and scales, but borrows its ideas about hierarchy from [Style Dictionary properties](https://amzn.github.io/style-dictionary/#/properties).

Values and scales to enforce consistency + hierarchical structure to allow and encourage composition of design tokens = a format that can cover most design token authoring taxonomies.

### Value

```js
const dict = {
  color: {
    main: "red",
  }
}
```

### Scale

```js
const dict = {
  color: {
    main: ["red", "crimson", "firebrick"]
  }
}
```

### Subcategory

```js
const dict = {
  color: {
    main: {
      base: "red",
      shade: ["crimson", "firebrick"]
    }
  }
}
```

### Nesting

```js
const dict = {
  color: {
    light: {
      main: {
        base: "red",
        shade: ["crimson", "firebrick"]
      }
    },
    dark: {
      main: {
        base: "lime",
        shade: ["forestgreen", "darkgreen"]
      }
    }
  }
}
```

### Namespacing

```js
const dict = {
  qs: {
    color: {
      main: "red",
      accent: "cyan",
      highlight: "lime"
    },
    font: {
      body: "sans-serif",
      heading: "serif",
      code: "monospace"
    }
  }
}
```

## QuarkSuite Interop

If you've been following along this far, you see QuarkSuite does quite a lot on its own for authoring and building design tokens. That said, it's also designed to connect with tools many of us already use.

> The integration examples use QuarkSuite's own token dictionaries.

### Style Dictionary

QuarkSuite provides build format `sd` for direct translation of token dictionaries to [Style Dictionary](https://amzn.github.io/style-dictionary/) properties.

#### build.js

```js
const { outputFileSync } = require("fs-extra");
const { color, text, content, viewport } = require("@quarksuite/tokens");
const { sd } = require("@quarksuite/core");

outputFileSync("properties/color.json", JSON.stringify(sd({ color }), null, 2));
outputFileSync("properties/text.json", JSON.stringify(sd({ text }), null, 2));
outputFileSync(
  "properties/content.json",
  JSON.stringify(sd({ content }), null, 2)
);
outputFileSync(
  "properties/viewport.json",
  JSON.stringify(sd({ viewport }), null, 2)
);

```

#### output

```bash
node build
```

```bash
properties
├── color.json
├── content.json
├── text.json
└── viewport.json

0 directories, 4 files
```

#### config.json

This config is more or less lifted directly from the Style Dictionary example config with a few minor changes.

```json
{
  "source": ["properties/**/*.json"],
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "prefix": "qs",
      "buildPath": "build/scss/",
      "files": [{
        "destination": "_variables.scss",
        "format": "scss/variables"
      }]
    },
    "android": {
      "transformGroup": "android",
      "buildPath": "build/android/src/main/res/values/",
      "files": [{
        "destination": "quarksuite_colors.xml",
        "format": "android/colors"
      }]
    }
  }
}
```

#### build

```bash
yarn style-dictionary build
```

```bash
build
├── android
│   └── src
│       └── main
│           └── res
│               └── values
│                   └── quarksuite_colors.xml
└── scss
    └── _variables.scss

6 directories, 2 files
```

And the files:

```scss

// Do not edit directly
// Generated on Fri, 04 Dec 2020 16:26:53 GMT

$qs-content-space-base: 1ex;
$qs-content-space-x-0: 1.5ex;
$qs-content-space-x-1: 2.25ex;
$qs-content-space-x-2: 3.375ex;
$qs-content-space-x-3: 5.063ex;
$qs-content-space-x-4: 7.594ex;
$qs-content-space-x-5: 11.39ex;
$qs-content-space-x-6: 17.09ex;
$qs-content-space-x-7: 25.63ex;
$qs-content-space-x-8: 38.44ex;
$qs-content-space-xd-0: 0.6667ex;
$qs-content-space-xd-1: 0.4444ex;
$qs-content-space-xd-2: 0.2963ex;
$qs-content-space-xd-3: 0.1975ex;
$qs-content-space-xd-4: 0.1317ex;
$qs-content-space-xd-5: 0.08779ex;
$qs-content-space-xd-6: 0.05853ex;
$qs-content-space-xd-7: 0.03902ex;
$qs-content-space-xd-8: 0.02601ex;
$qs-content-measure-base: 75ch;
$qs-content-measure-min: 45ch;
$qs-content-grid-base: 1fr;
$qs-content-grid-n-0: 1.5fr;
$qs-content-grid-n-1: 2.25fr;
$qs-content-grid-n-2: 3.375fr;
$qs-content-grid-n-3: 5.063fr;
$qs-content-grid-n-4: 7.594fr;
$qs-content-grid-n-5: 11.39fr;
$qs-content-grid-n-6: 17.09fr;
$qs-content-grid-n-7: 25.63fr;
$qs-content-grid-n-8: 38.44fr;
$qs-color-main-base: #348dc9;
$qs-color-main-tint-0: #99badc;
$qs-color-main-tint-1: #d1dfee;
$qs-color-main-tint-2: #fefeff;
$qs-color-main-shade-0: #266692;
$qs-color-main-shade-1: #0c202d;
$qs-color-accent-base: #8dc934;
$qs-color-accent-shade-0: #669226;
$qs-color-accent-shade-1: #202d0c;
$qs-color-highlight-base: #c9348d;
$qs-color-highlight-shade-0: #922666;
$qs-color-highlight-shade-1: #2d0c20;
$qs-text-body: Zilla Slab, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
$qs-text-headings: Rubik, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
$qs-text-leading-base: 1.5;
$qs-text-leading-tight: 1.25;
$qs-text-leading-loose: 1.75;
$qs-text-size-base: 1rem;
$qs-text-size-x-0: 1.5rem;
$qs-text-size-x-1: 2.25rem;
$qs-text-size-x-2: 3.375rem;
$qs-text-size-x-3: 5.063rem;
$qs-text-size-x-4: 7.594rem;
$qs-text-size-x-5: 11.39rem;
$qs-text-size-x-6: 17.09rem;
$qs-text-size-x-7: 25.63rem;
$qs-text-size-x-8: 38.44rem;
$qs-text-size-xd-0: 0.6667em;
$qs-text-size-xd-1: 0.4444em;
$qs-text-size-xd-2: 0.2963em;
$qs-text-size-xd-3: 0.1975em;
$qs-text-size-xd-4: 0.1317em;
$qs-text-size-xd-5: 0.08779em;
$qs-text-size-xd-6: 0.05853em;
$qs-text-size-xd-7: 0.03902em;
$qs-text-size-xd-8: 0.02601em;
$qs-text-style-regular: 400;
$qs-text-style-bold: 700;
$qs-text-style-black: 900;
$qs-viewport-width-base: 100vw;
$qs-viewport-width-xd-0: 90vw;
$qs-viewport-width-xd-1: 85vw;
$qs-viewport-width-xd-2: 77.5vw;
$qs-viewport-width-xd-3: 66.25vw;
$qs-viewport-width-xd-4: 49.38vw;
$qs-viewport-width-xd-5: 24.06vw;
$qs-viewport-height-base: 100vh;
$qs-viewport-height-xd-0: 90vh;
$qs-viewport-height-xd-1: 85vh;
$qs-viewport-height-xd-2: 77.5vh;
$qs-viewport-height-xd-3: 66.25vh;
$qs-viewport-height-xd-4: 49.38vh;
$qs-viewport-height-xd-5: 24.06vh;
$qs-viewport-minimum-base: 100vmin;
$qs-viewport-minimum-xd-0: 90vmin;
$qs-viewport-minimum-xd-1: 85vmin;
$qs-viewport-minimum-xd-2: 77.5vmin;
$qs-viewport-minimum-xd-3: 66.25vmin;
$qs-viewport-minimum-xd-4: 49.38vmin;
$qs-viewport-minimum-xd-5: 24.06vmin;
$qs-viewport-maximum-base: 100vmax;
$qs-viewport-maximum-xd-0: 90vmax;
$qs-viewport-maximum-xd-1: 85vmax;
$qs-viewport-maximum-xd-2: 77.5vmax;
$qs-viewport-maximum-xd-3: 66.25vmax;
$qs-viewport-maximum-xd-4: 49.38vmax;
$qs-viewport-maximum-xd-5: 24.06vmax;
```

##### quarksuite_colors.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!--
  Do not edit directly
  Generated on Fri, 04 Dec 2020 16:26:53 GMT
-->
<resources>
  <color name="color_main_base">#ff348dc9</color>
  <color name="color_main_tint_0">#ff99badc</color>
  <color name="color_main_tint_1">#ffd1dfee</color>
  <color name="color_main_tint_2">#fffefeff</color>
  <color name="color_main_shade_0">#ff266692</color>
  <color name="color_main_shade_1">#ff0c202d</color>
  <color name="color_accent_base">#ff8dc934</color>
  <color name="color_accent_shade_0">#ff669226</color>
  <color name="color_accent_shade_1">#ff202d0c</color>
  <color name="color_highlight_base">#ffc9348d</color>
  <color name="color_highlight_shade_0">#ff922666</color>
  <color name="color_highlight_shade_1">#ff2d0c20</color>
  
</resources>

```

##### Limitations

If you want to support sizing for iOS/Android (which have their own units), you *must* use `rems` for your numeric scales or Style Dictionary won't build for those formats.

### CSS-in-JS

QuarkSuite token dictionaries can already be used with any CSS-in-JS library since they're **plain JavaScript objects**.

For example, to access the main color from QuarkSuite's own palette: `qs.color.main.base`

### Tailwind

[Tailwind](https://tailwindcss.com) goes with QuarkSuite like chocolate goes with caramel: quite well.

#### tailwind.config.js

```js
const { color, text, content } = require("@quarksuite/tokens");
const { Material } = require("@quarksuite/config");
const { tw } = require("@quarksuite/core");

const { main, accent, highlight } = color;
const { body, headings, size, style } = text;
const { space, measure } = content;
const { base, ...variants } = measure;

module.exports = {
  purge: ["./index.html"],
  theme: {
    colors: {
      main: Material(main.base),
      accent: Material(accent.base),
      highlight: Material(highlight.base),
    },
    fill: (theme) => theme("colors"),
    stroke: (theme) => theme("colors"),
    fontFamily: { body, headings, code },
    fontSize: tw(size),
    fontWeight: style,
    maxWidth: tw({ prose: base, ...variants }),
    spacing: tw(space),
    borderWidth: (theme) => theme("spacing"),
    borderRadius: (theme) => theme("spacing"),
  },
  variants: {},
  plugins: [],
};
```

The `tw` build format transforms subcategories into a scale format usable by Tailwind.

Example: `content.size.x[2]` becomes the Tailwind utility `text-x4`. Meanwhile `content.size.base` becomes `text`.

### Theme UI

[Theme UI](https://theme-ui.com/home) is much like CSS-in-JS integration: pass in the data directly.

#### theme/index.js

```js
import { color, text as typography, content } from "@quarksuite/tokens";

const { main, accent, highlight } = color;
const { body, headings, code, size, style, leading } = typography;
const { space, measure } = content;

const [m, [light, lighter, background], [dark, text]] = main;
const [a, aShades] = accent;
const [h, hShades] = highlight;

export default {
  space: { ...space, none: "0" },
  radii: { ...space, none: "0" },
  sizes: measure,
  fonts: { body, headings, code },
  fontSizes: size,
  fontWeights: { ...style, light: 300 },
  lineHeights: leading,
  colors: {
    dark,
    text,
    light,
    lighter,
    background,
    main: m,
    accent: {
      base: a,
      shade: aShades,
    },
    highlight: {
      base: h,
      shade: hShades,
    },
    modes: {
      dark: {
        text: background,
        background: text,
        main: accent,
      },
    },
  },
  variants: {
    elements: {
      title: {
        bg: "primary",
        color: "background",
        m: "none",
        p: "x.3",
      },
    },
    content: {
      pl: "x.2",
      fontSize: "x.0",
      maxWidth: "max",
    },
    text: {
      heading: {
        fontFamily: "headings",
        fontWeight: "light",
        lineHeight: "tight",
      },
      subheading: {
        fontFamily: "headings",
        fontWeight: "light",
        lineHeight: "tight",
        bg: "accent.base",
        px: "x.1",
        py: "base",
      },
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "regular",
      lineHeight: "normal",
    },
    h1: {
      variant: "text.heading",
      fontSize: "x.2",
    },
    h2: {
      variant: "text.subheading",
      fontSize: "x.1",
    },
    p: {
      variant: "content",
    },
    ul: {
      variant: "content",
    },
    code: {
      borderRadius: "xd.3",
      bg: "lighter",
      color: "accent.base",
      px: "xd.1",
    },
    a: {
      color: "highlight.base",
      fontWeight: "bold",
    },
  },
};
```

Then, to plug in the theme with [Next.js](https://nextjs.org):

```js
import Head from "next/head";
import { ThemeProvider, BaseStyles } from "theme-ui";
import theme from "../theme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;900&family=Zilla+Slab:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <title>QuarkSuite Χ Theme UI</title>
      </Head>
      <BaseStyles>
        <Component {...pageProps} />
      </BaseStyles>
    </ThemeProvider>
  );
}

```

## Support

If you have any questions or suggestions about the user guide and how to improve it, [please submit an issue](https://github.com/quarksuite/core/issues) with the user guide tag.

Thanks for checking out this library.
