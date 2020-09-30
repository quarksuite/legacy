[![NPM Version](https://img.shields.io/npm/v/@quarksuite/core?label=release&logo=npm&style=for-the-badge)](https://npmjs.com/package/@quarksuite/core)
[![Travis CI](https://img.shields.io/travis/quarksuite/core?logo=travis&style=for-the-badge)](https://travis-ci.com/github/quarksuite/core)
[![Coveralls](https://img.shields.io/coveralls/github/quarksuite/core?logo=coveralls&style=for-the-badge)](https://coveralls.io/github/quarksuite/core)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/quarksuite/core?style=for-the-badge)
[![Minzipped bundle](https://img.shields.io/bundlephobia/minzip/@quarksuite/core?style=for-the-badge)](https://bundlephobia.com/result?p=@quarksuite/core)
[![License: MIT](https://img.shields.io/github/license/quarksuite/core?style=for-the-badge)](https://github.com/quarksuite/core/blob/master/LICENSE)

# Quarksuite

![Quarksuite Logo](assets/logo.png)

[![Basic Demonstration](assets/basic-usage.gif)](https://asciinema.org/a/oJ2Avxd0MbVTLrWFsuKznLnhY?t=5)

> Note: v4 is now in its pre-release stage and will launch after extensive testing, bug fixes, and documentation
> updates around **10/5**. The API itself is now complete and stable and no more **breaking** changes will be made.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Table of Contents

- [Summary](#summary)
- [Features](#features)
- [Installation](#installation)
  - [As a Module](#as-a-module)
  - [In the Browser](#in-the-browser)
- [Usage Examples](#usage-examples)
  - [Minimal](#minimal)
  - [Shaped Like Itself](#shaped-like-itself)
  - [Multi-stage](#multi-stage)
    - [Axioms](#axioms)
    - [Palette](#palette)
    - [Content](#content)
    - [Layout](#layout)
- [What's Next?](#whats-next)
- [API](#api)
- [Contributing](#contributing)
- [Concept](#concept)
- [Project Objectives](#project-objectives)
  - [Small, Nimble, Adaptive](#small-nimble-adaptive)
  - [Works the Way You Work](#works-the-way-you-work)
  - [Zero Lock-In](#zero-lock-in)
  - [Ease of use](#ease-of-use)
- [Thanks to:](#thanks-to)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Summary

Quarksuite is a toolkit for developers, designers, and front-end designers with a focus on designing UI with data.

## Features

+ make solid baselines to jumpstart your design systems
+ adjust colors, generate schemes, and build full palettes with tints, tones, and/or shades
+ create robust modular scales for your content, layout, and composition
+ use handy system font stacks to aid prototyping
+ flat, declarative API allowing you to use only what you need
+ no framework, no problem

## Installation

### As a Module

> You’ll require at least Node.js LTS (v6+) to use Quarksuite as a module.

```bash
npm install @quarksuite/core

# OR

yarn add @quarksuite/core
```

Then in any file:

```js
const { hex, tints, shades, systemfonts, ms, units } = require('@quarksuite/core');

// OR w/ ES Modules, Webpack, Parcel

import { hex, tints, shades, systemfonts, ms, units } from '@quarksuite/core';
```

### In the Browser

Do the above, then:

```bash
npx snowpack
```

```html
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Quarksuite Example</title>
  </head>
  <body>
    <script type="module" src="/index.js"></script>
  </body>
</html>
```

```js
import { hex, tints, shades, systemfonts, ms, units } from '/web_modules/@quarksuite/core.js';

// Your data
```

OR

```html
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Quarksuite Example</title>
  </head>
  <body>
    <script type="module">
      import { hex, tints, shades, systemfonts, ms, units } from "https://unpkg.com/@quarksuite/core"
      
      // Your baseline system
    </script>
  </body>
</html>
```

## Usage Examples

### Minimal

```js
import { hex, tints, shades, systemfonts, ms, units } from '@quarksuite/core';

const main = hex('gainsboro');
const tint = tints(4, 100, main);
const shade = shades(4, 100, main);

export const palette = { main, 'main-tint': tint, 'main-shade': shade };

const [sans, mono] = systemfonts('sans-serif', 'monospace');

export const fonts = { sans, mono };

const scale = ms(8, 1.618, 1);
const rems = units(4, 'rem', scale);

export const composition = { scale: rems };
```


### Shaped Like Itself

```js
import { set, rgb, triad, tints, shades, systemfonts, ms, units } from "@quarksuite/core";

const color = rgb("#348ec9");

const [main, accent, highlight] = triad(60, color);

const tint = set(tints, 3, 98);
const shade = set(shades, 2, 98);

export const palette = {
  brand: main,
  "brand-tint": tint(main),
  "brand-shade": shade(main),
  "brand-accent": accent,
  "brand-highlight": highlight,
};

const [sans, mono] = systemfonts("sans-serif", "monospace");

export const fonts = { sans, mono };

const scale = ms(5, 2, 1);

export const composition = {
  ms: units(4, "rem", scale),
};
```

### Multi-stage

#### Axioms

```js
export const base = 1;
export const ratio = 1.5;
export const measure = 72;
export const maximum = 100;
export const range = 4;
export const outputPrecision = 4;
```

#### Palette

```js
import { clrs } from '@quarksuite/core';

export const palette = {
  ...[
  "navy", "blue", "aqua", "teal",
  "olive", "green", "lime",
  "yellow", "orange", "red",
  "maroon", "fuchsia", "purple",
  "black", "gray", "silver", "white",
  ].reduce((acc, c) => ({ ...acc, ...{ [c]: clrs(c) } }), {}),
};
```

#### Content

```js
import { set, systemfonts, ms, update, units } from '@quarksuite/core';

const initial = set(ms, range, ratio);

const isNotBaseValue = (v: number) => v !== base;
const isNotMaximumCPL = (v: number) => v !== measure;

const contentInversion = (v: number) => base / v;
const fractionOfMeasure = (v: number) => measure / v;

// content fonts
const [sans, , mono] = systemfonts();

export const fonts = {
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

export const size = {
  base: rems([base])[0],
  x: rems(sizes),
  dx: ems(update(contentInversion, sizes)),
};

// measure (characters per line)
const ch = set(units, outputPrecision, "ch");

const lineLength = update(fractionOfMeasure, initial(base));

export const line = {
  base: ch([measure])[0],
  dx: ch(lineLength.filter(isNotMaximumCPL)),
};

// content spacing
const ex = set(units, outputPrecision, "ex");

const vr = initial(base).filter(isNotBaseValue);

export const spacing = {
  base: ex([base])[0],
  x: ex(vr),
  dx: ex(update(contentInversion, vr)),
};
```

#### Layout 

```js
import { set, ms, update, units } from '@quarksuite/core';

const initial = set(ms, range, ratio);

const isNotBaseFraction = (n: number) => n !== base;
const isNotViewportMaximum = (v: number) => v !== maximum;

// layout grid
const fr = set(units, outputPrecision, "fr");

const gu = initial(base);

export const grid = {
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
  set(units, outputPrecision, viewport)
);

const vp = update((v: number) => v * 10, initial(base)).filter(
  isNotViewportMaximum
);

export const viewport = {
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
```

## What's Next?

Each data set created with Quarksuite is vanilla JavaScript, so it'll work:

+ with any [CSS-in-JS approach](https://github.com/MicheleBertoli/css-in-js) 
+ with [Tailwind](https://tailwindcss.com/) 
+ as design tokens when transformed with [Style Dictionary](https://github.com/amzn/style-dictionary) or [Theo](https://github.com/salesforce-ux/theo)
+ right in a new browser tab

## API

You can [read the full API documentation](https://github.com/quarksuite/core/blob/master/API.md) for available function.

## Contributing

You can read about [how to contribute](https://github.com/quarksuite/core/blob/master/CONTRIBUTING.md) and the guidelines for this project.

## Concept

Quarksuite is built around the idea that fundamental, **quantifiable** visual elements can be represented as another category of data about our interfaces.

[This isn't a new idea](https://css-tricks.com/what-are-design-tokens/).

The library's domain is on a similar level&mdash;or just below design tokens. It allows a structure similar to projects like [Styled System](https://styled-system.com/) or [Ether](https://ether.thescenery.co/), but it doesn't require you to use a framework.

## Project Objectives

These are the principles guiding current and future development of the library. Any changes or feature requests that stray from this road will not be considered at this time.

### Small, Nimble, Adaptive

+ Aims to stay compact in size but flexible in use
+ Ought to be able to scale with the needs of your projects

### Works the Way You Work

+ support in different environments, build systems, bundlers, or with no build at all

### Zero Lock-In

+ use what you need and leave the rest behind
+ library not required to **use** your data

### Ease of use

+ simple baselines ought to be simple to build, scalable baselines should also be simple to build 

## Thanks to:

+ [Jon Kantner for: Converting Color Spaces in JavaScript](https://css-tricks.com/converting-color-spaces-in-javascript).  The internal color functions borrow heavily from this article and [color conversion formulas from RapidTables](https://www.rapidtables.com/convert/color/index.html).

+ Every developer who gives me moments of clarity as I learn functional programming and **when** to use it. 

+ Every designer who shows me better ways and checks my hubris.

+ You, for giving this a shot.
