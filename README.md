[![NPM Version](https://img.shields.io/npm/v/@quarksuite/core?label=release&logo=npm&style=for-the-badge)](https://npmjs.com/package/@quarksuite/core)
[![Travis CI](https://img.shields.io/travis/quarksuite/core?logo=travis&style=for-the-badge)](https://travis-ci.com/github/quarksuite/core)
[![Coveralls](https://img.shields.io/coveralls/github/quarksuite/core?logo=coveralls&style=for-the-badge)](https://coveralls.io/github/quarksuite/core)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/quarksuite/core?style=for-the-badge)
[![Minzipped bundle](https://img.shields.io/bundlephobia/minzip/@quarksuite/core?style=for-the-badge)](https://bundlephobia.com/result?p=@quarksuite/core)
[![License: MIT](https://img.shields.io/github/license/quarksuite/core?style=for-the-badge)](https://github.com/quarksuite/core/blob/master/LICENSE)

# Quarksuite

![Quarksuite Logo](assets/logo.png)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Table of Contents

- [Summary](#summary)
- [Installation](#installation)
  - [As a Module](#as-a-module)
  - [In the Browser](#in-the-browser)
- [Usage Examples](#usage-examples)
  - [Prototyping](#prototyping)
  - [Advanced Demonstration](#advanced-demonstration)
- [What's Next?](#whats-next)
- [API](#api)
- [Contributing](#contributing)
- [Concept](#concept)
- [Project Objectives](#project-objectives)
  - [Small, Nimble, Adaptive](#small-nimble-adaptive)
  - [Work the Way You Work](#work-the-way-you-work)
  - [Zero Lock-In](#zero-lock-in)
  - [Familiarity](#familiarity)
- [Thanks to:](#thanks-to)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Summary

Quarksuite is a tool for developers, designers, and front-end designers that treats core visual elements as data.

It [adjusts colors](https://github.com/quarksuite/core/blob/master/API.md#color-functions). It [generates schemes](https://github.com/quarksuite/core/blob/master/API.md#scheme-functions). It creates [full palettes](https://github.com/quarksuite/core/blob/master/API.md#variant-functions). And it defines [modular scales](https://github.com/quarksuite/core/blob/master/API.md#scale-functions) for content and layout. As a bonus, it also provides [operating system font stacks](https://github.com/quarksuite/core/blob/master/API.md#typography-functions) to aid rapid prototyping.

The goal here is to codify the consistency, utility, and order expected of any good design. Thereby leaving more time for the personality, expression, and resonance of great design.

I made this for myself first—as a developer/designer with a somewhat mathematically inclined sense of aesthetics.

I figure other people may get use out of it, too.

I've recently [built a starter kit](https://github.com/quarksuite/starter-kit) to make the transformation of raw data into usable values (via design tokens) a bit more straightforward. You could also call it a demonstration of this library's purpose.

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
const {color, scheme, variant, typography, scale} = require('@quarksuite/core');

// OR w/ ES Modules, Webpack, Parcel

import {color, scheme, variant, typography, scale} from '@quarksuite/core';
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
import { color, scheme, variant, typography, scale } from '/web_modules/@quarksuite/core.js';

// Your baseline system
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
      import { color, scheme, variant, typography, scale } from "https://unpkg.com/@quarksuite/core"
      
      // Your baseline system
    </script>
  </body>
</html>
```

## Usage Examples

### Prototyping

```js
const { color, variant, typography, scale } = require("@quarksuite/core");

const main = color.toRGB("gainsboro");
const [tints, shades] = [variant.tints(95, 3), variant.shades(95, 2)];

module.exports.palette = {
  base: main,
  tints: tints(main),
  shades: shades(main),
};

const [sans, mono] = typography.system("sans", "monospace");

module.exports.fonts = {
  sans,
  mono,
};

const base = 1;
const asRems = scale.output("rem");
const content = scale.create("golden", 6);

module.exports.ms = scale.pipe(content, asRems)(base);
```

### Advanced Demonstration

```js
const {
  color,
  scheme,
  variant,
  typography,
  scale,
} = require("@quarksuite/core");

// Color -> Color
const swatch = color.a11y("blue");
const desaturate = color.saturation(-15);
const mixLime = color.mix(color.a11y("lime"), 25);
const colorInput = color.pipe(mixLime, desaturate);

// Color -> Scheme
const midAnalogous = scheme.analogous(30);
const [secondary, main, accent] = midAnalogous(colorInput(swatch));

// Color -> Variant
const [tints, shades] = [variant.tints(95, 3), variant.shades(95, 2)];

// Color -> Scheme | Variant -> Palette
module.exports.palette = {
  main: {
    base: main,
    tints: tints(main),
    shades: shades(main),
  },
  secondary: {
    base: secondary,
    shades: shades(secondary),
  },
  accent: {
    base: accent,
    shades: shades(accent),
  },
};

const [sans, mono] = typography.system("sans", "monospace");

module.exports.fonts = {
  sans,
  mono,
};

// Prepare output
const asRems = scale.output("rem");
const asEms = scale.output("em");

// define scales
const [base, ...content] = scale.create("golden", 6, 1);
const layout = scale.create("octave", 4);
const [b, i] = [layout(base), scale.update((v) => v * 0.3125, layout(base))];

const [, ...block] = b;
const inline = i;

module.exports.ms = {
  base,
  content: asRems(content),
  block: asRems(block),
  inline: asEms(inline),
};
```

## What's Next?

Since each UI foundation created with Quarksuite is vanilla JavaScript, you can use it:

+ as-is with any [CSS-in-JS approach](https://github.com/MicheleBertoli/css-in-js) 
+ with [Tailwind](https://tailwindcss.com/) 
+ as design tokens when transformed with [Style Dictionary](https://github.com/amzn/style-dictionary) or [Theo](https://github.com/salesforce-ux/theo)

Really, any method that fits your actual workflow and tools is viable. It's up to you.

## API

You can [read the full API documentation](https://github.com/quarksuite/core/blob/master/API.md) for every module and available function.

## Contributing

You can read about [how to contribute](https://github.com/quarksuite/core/blob/master/CONTRIBUTING.md) and the guidelines for this project.

## Concept

Quarksuite is built around the idea that fundamental, **quantifiable** visual elements can be represented as another category of data about our interfaces.

[This isn't a new idea](https://css-tricks.com/what-are-design-tokens/).

The library's domain is on a similar level&mdash;or just below design tokens. It allows a structure similar to projects like [Styled System](https://styled-system.com/) or [Ether](https://ether.thescenery.co/), but it doesn't ask you to use React.

Quarksuite is designed to mirror the steps designers are likely to take while making these decisions on their own.

## Project Objectives

These are the principles guiding current and future development of the library. Any changes or feature requests that stray from this road will not be considered at this time.

### Small, Nimble, Adaptive

+ Aims to stay compact in size but flexible
+ Make your data as light or heavy as you want

### Works the Way You Work

+ Imposes no restrictions on structuring, exporting, or using your data

### Zero Lock-In

+ Update your data quickly without extensive rewrites 
+ Detach from the library at any time

### Familiarity

+ A focus on allowing the most declarative structure possible 

## Thanks to:

+ [Jon Kantner for: Converting Color Spaces in JavaScript](https://css-tricks.com/converting-color-spaces-in-javascript).  The internal color functions borrow heavily from this article and [color conversion formulas from RapidTables](https://www.rapidtables.com/convert/color/index.html).

+ [Folktale's](https://folktale.origamitower.com) implementation of [curry](https://folktale.origamitower.com/api/v2.3.0/en/folktale.core.lambda.curry.curry.html) and [compose.all](https://folktale.origamitower.com/api/v2.3.0/en/folktale.core.lambda.compose.all.html) was vital in making the module functions more&hellip; modular.

+ Every developer who gives me moments of clarity as I learn functional programming and **when** to use it. 

+ Every designer who shows me better ways of composing UI and reminds me to be careful about my enthusiasm over developer tools.

+ You, who considered this project enough to reach the bottom of this Readme.
