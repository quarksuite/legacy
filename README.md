[![NPM Version](https://img.shields.io/npm/v/@quarksuite/core?label=release&logo=npm&style=for-the-badge)](https://npmjs.com/package/@quarksuite/core)
[![Travis CI](https://img.shields.io/travis/quarksuite/core?logo=travis&style=for-the-badge)](https://travis-ci.com/github/quarksuite/core)
[![Coveralls](https://img.shields.io/coveralls/github/quarksuite/core?logo=coveralls&style=for-the-badge)](https://coveralls.io/github/quarksuite/core)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/quarksuite/core?style=for-the-badge)
[![Minzipped bundle](https://img.shields.io/bundlephobia/minzip/@quarksuite/core?style=for-the-badge)](https://bundlephobia.com/result?p=@quarksuite/core)
[![License: MIT](https://img.shields.io/github/license/quarksuite/core?style=for-the-badge)](https://github.com/quarksuite/core/blob/master/LICENSE)

# Quarksuite

![Quarksuite Logo](assets/logo.png)

[![Basic Demonstration](assets/basic-usage.gif)](https://asciinema.org/a/oJ2Avxd0MbVTLrWFsuKznLnhY?t=5)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Table of Contents

- [Summary](#summary)
- [Features](#features)
- [Installation](#installation)
  - [As a Module](#as-a-module)
  - [In the Browser](#in-the-browser)
- [Usage Examples](#usage-examples)
  - [Minimal Prototype](#minimal-prototype)
  - [Shaped Like Itself](#shaped-like-itself)
  - [Design System Starter](#design-system-starter)
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
  - [Simplicity](#simplicity)
- [Showcase](#showcase)
- [Inspired By](#inspired-by)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Summary

Quarksuite is a kit for developers, designers, and front-end designers with a focus on building consistent, evolving baselines for prototyping and design systems.

## Features

+ set a solid foundation for your projects
+ [adjust colors](https://github.com/quarksuite/core/blob/master/API.md#color-functions), [generate schemes](https://github.com/quarksuite/core/blob/master/API.md#scheme-functions), and [build full palettes](https://github.com/quarksuite/core/blob/master/API.md#variant-functions) with tints, tones, and/or shades
+ [create modular scales](https://github.com/quarksuite/core/blob/master/API.md#scale-functions) for your content, layout, and composition
+ [use handy system font stacks and better web defaults](https://github.com/quarksuite/core/blob/master/API.md#prototyping-functions) in your prototypes
+ use what you need and leave the rest
+ framework not required

## Installation

### As a Module

> You’ll require at least Node.js LTS (v10+) to use Quarksuite as a module.

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

// Your baseline
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
      
      // Your baseline
    </script>
  </body>
</html>
```

## Usage Examples

### Minimal Prototype

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

### Design System Starter

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
const [sans, mono] = systemfonts('sans-serif', 'monospace');

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

You can [read the full API documentation](https://github.com/quarksuite/core/blob/master/API.md) for available functions.

## Contributing

You can read about [how to contribute](https://github.com/quarksuite/core/blob/master/CONTRIBUTING.md) and the guidelines for this project.

## Concept

Quarksuite is built around the idea that fundamental, **quantifiable** visual elements can be represented as another category of data about our interfaces.

[This isn't a new idea](https://css-tricks.com/what-are-design-tokens/).

The library's focus is on a similar level&mdash;or just below design tokens. It allows a structure similar to projects like [Styled System](https://styled-system.com/) or [Ether](https://ether.thescenery.co/), but it doesn't require you to use a framework.

## Project Objectives

These are the constraints guiding current and future development of the kit. Any feature requests that contradict them won't be considered.

### Small, Nimble, Adaptive

This project aims to stay within 3&ndash;6KB minified and gzipped while providing enough flexibility for baselines of any size.

### Works the Way You Work

This project should work with many environments and configurations&mdash;any framework, any build, or none at all.

### Zero Lock-In

This project has no dependencies and your data should be easy to detach from the library entirely when you're done. The API is flat to allow as-needed use.

### Simplicity

The API should remain painless to work with and painless to extend. The smallest of prototype baselines should be able to grow into complex design system foundations.

## Showcase
  
If you've built something with Quarksuite, and you want to share, please submit a pull request with a link to your project.

## Inspired By

+ [Ether](https://ether.thescenery.co)
+ [Styled System](https://styled-system.com)
