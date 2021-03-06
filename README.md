> Note: This repository archives the legacy version of QuarkSuite: QuarkSuite 1.
> If you're interested in current development, [head to the new core repository](https://github.com/quarksuite/core).
>


[![NPM Version](https://img.shields.io/npm/v/@quarksuite/core?label=release&logo=npm&style=for-the-badge)](https://npmjs.com/package/@quarksuite/core)
[![Travis CI](https://img.shields.io/travis/quarksuite/legacy?logo=travis&style=for-the-badge)](https://travis-ci.com/github/quarksuite/legacy)
[![Coveralls](https://img.shields.io/coveralls/github/quarksuite/legacy?logo=coveralls&style=for-the-badge)](https://coveralls.io/github/quarksuite/legacy)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/quarksuite/legacy?style=for-the-badge)
[![Minzipped bundle](https://img.shields.io/bundlephobia/minzip/@quarksuite/core?style=for-the-badge)](https://bundlephobia.com/result?p=@quarksuite/core)
[![License: MIT](https://img.shields.io/github/license/quarksuite/legacy?style=for-the-badge)](https://github.com/quarksuite/legacy/blob/master/LICENSE)

# QuarkSuite

![QuarkSuite Logo](assets/logo.png)

[![QuarkSuite 1 Demo](https://asciinema.org/a/IFJ6NQXEsTtXthGxNCGg9viif.svg)](https://asciinema.org/a/IFJ6NQXEsTtXthGxNCGg9viif)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Table of Contents

- [Summary](#summary)
- [Use QuarkSuite](#use-quarksuite)
- [Don't Use QuarkSuite](#dont-use-quarksuite)
- [Features](#features)
  - [Superpowers](#superpowers)
- [Installation](#installation)
  - [As a Module](#as-a-module)
  - [In the Browser](#in-the-browser)
- [Minimal Example](#minimal-example)
- [User Guide](#user-guide)
- [API](#api)
- [Contributing](#contributing)
- [Concept](#concept)
- [Project Objectives](#project-objectives)
  - [Design as a Module](#design-as-a-module)
  - [Works the Way You Work](#works-the-way-you-work)
  - [Zero Friction](#zero-friction)
  - [Interop](#interop)
- [Quark + Suite](#quark--suite)
- [Inspired By](#inspired-by)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Summary

QuarkSuite is a collection of utilities focused around the creation, assembly, and distribution of [design tokens](https://css-tricks.com/what-are-design-tokens/). Made of and for web technologies.

## Use QuarkSuite

+ for small projects that need quick setup
+ for distributed design data sets shared between projects
+ for consistent yet flexible design system scaffolding

## Don't Use QuarkSuite

+ if your demands are much more complex than creating and building data to scale
+ if you prefer tools built around batteries-included configuration
+ if you have output demands beyond web technologies

## Features

+ [adjust colors](https://github.com/quarksuite/core/blob/master/API.md#color-functions), [generate schemes](https://github.com/quarksuite/core/blob/master/API.md#scheme-functions), and [build full palettes](https://github.com/quarksuite/core/blob/master/API.md#variant-functions) with tints, tones, and/or shades
+ [create and modifiy modular scales](https://github.com/quarksuite/core/blob/master/API.md#scale-functions) for your content, layout, and composition
+ [use handy system font stacks and better web defaults](https://github.com/quarksuite/core/blob/master/API.md#prototyping-functions) in your prototypes
+ [build your tokens](https://github.com/quarksuite/core/blob/master/API.md#build-formats) **(added in v5)**
	+ as css custom properties
	+ preprocessor variables (Sass, Less, Stylus supported)
	+ raw JSON
	+ Style Dictionary properties for complex builds or unsupported formats
	+ Tailwind data for theming

### Superpowers

+ functional utilities help project data sets scale into generic sets
+ embed the idioms and patterns of your design token workflow into shareable modules
+ focus on data that *changes* between your projects

For details, [see the enhancements section](https://github.com/quarksuite/core/blob/master/USAGE.md#enhancements) of the user guide.

## Installation

### As a Module

> You’ll require at least Node.js LTS (v12+) to use QuarkSuite as a module.

```bash
npm install @quarksuite/core

# OR

yarn add @quarksuite/core
```

Then in any file:

```js
const { hex, tints, shades, systemfonts, ms, units, css } = require('@quarksuite/core');

// OR w/ Snowpack, Webpack, Parcel

import { hex, tints, shades, systemfonts, ms, units, css } from '@quarksuite/core';
```

### In the Browser

```html
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Quarksuite Example</title>
  </head>
  <body>
    <script type="module">
      import { hex, tints, shades, systemfonts, ms, units, css } from "https://unpkg.com/@quarksuite/core"
      
      // Your baseline
    </script>
  </body>
</html>
```

## Minimal Example

```js
const {
  hex,
  tints,
  shades,
  systemfonts,
  ms,
  units,
  css,
} = require("@quarksuite/core");
const { outputFileSync } = require("fs-extra");

// Palette
const main = hex("gainsboro");
const tint = tints(4, 100, main);
const shade = shades(4, 100, main);

// Fonts
const [sans, mono] = systemfonts("sans-serif", "monospace");

// Size
const init = ms(8, 1.618, 1);
const [base, ...scale] = units(4, "rem", init);

outputFileSync(
  `${__dirname}/tokens/index.css`,
  css({
    color: { main: { base: main, tint, shade } },
    font: { sans, mono },
    content: { size: { base, x: scale } },
  })
);
```
```css
/* tokens/index.css */

:root {
  --color-main: #dcdcdc;
  --color-main-tint-0: #e5e5e5;
  --color-main-tint-1: #eeeeee;
  --color-main-tint-2: #f7f7f7;
  --color-main-tint-3: #ffffff;
  --color-main-shade-0: #bfbfbf;
  --color-main-shade-1: #9c9c9c;
  --color-main-shade-2: #6e6e6e;
  --color-main-shade-3: #000000;
  --font-sans: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
  --font-mono: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
  --content-size: 1rem;
  --content-size-x-0: 1.618rem;
  --content-size-x-1: 2.618rem;
  --content-size-x-2: 4.236rem;
  --content-size-x-3: 6.854rem;
  --content-size-x-4: 11.09rem;
  --content-size-x-5: 17.94rem;
  --content-size-x-6: 29.03rem;
}
```

## User Guide

As of v5, I've written a user guide that will take you through from basic setup to integration with related tools. [It's a great place to start](https://github.com/quarksuite/core/blob/master/USAGE.md) if you're new.

## API

You can also [read the full API](https://github.com/quarksuite/core/blob/master/API.md) for a technical overview of all library features.

## Contributing

You can read the [community and contribution guidelines](https://github.com/quarksuite/core/blob/master/CONTRIBUTING.md) for this project.

## Concept

QuarkSuite is built around [design tokens](https://css-tricks.com/what-are-design-tokens/) and the idea that authoring them shouldn't require a particular stack or framework.

The library's focus is on reuse and composition of its utilities to assemble [token dictionaries](https://github.com/quarksuite/core/blob/master/USAGE.md#token-dictionary-spec) and the API favors a data-last functional approach.

## Project Objectives

QuarkSuite is guided by the following objectives. Any feature requests that contradict them won't be considered at the moment.

### Design as a Module

QuarkSuite is structured to take advantage of its functional API to allow creating and composing common sets of design data you can use across projects.

The main advantage of this approach for design token authoring is that you can focus on what's *different* across your projects rather than bothering with the same plumbing and electricity.

### Works the Way You Work

This project has no opinions or comments about your web stack or tooling. Integrate your tokens at any stage that naturally works for your process.

### Zero Friction

This project has no dependencies and the included build formats detach output from data at your discretion.


### Interop

This project is built to leverage what already exists in the design token authoring and UI theming space.

QuarkSuite performs well enough on its own with small projects, but large teams will want to [integrate it with meatier tools](https://github.com/quarksuite/core/blob/master/USAGE.md#quarksuite-interop).


## Quark + Suite

In atomic design terminology, the level below atoms could be considered the subatomic parts of a design system. Quarks popped up a lot in the community as an analogy for design tokens.

A suite is "a group of things forming a unit or constituting a collection" or "a set of computer programs designed to work together".

So, QuarkSuite seemed a good fit.

## Inspired By

+ [Ether](https://ether.thescenery.co)
+ [Styled System](https://styled-system.com) 
+ [Style Dictionary](https://amzn.github.io/style-dictionary)
