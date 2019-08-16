---
id: index
title: Quarksilver (Core)
sidebar_label: README
---

[Globals](globals.md) /

![Quarksuite Logo](assets/logo-with-text-v1.png)

# Quarksuite (Core)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Table of Contents

- [Introduction](#introduction)
- [What Quarksuite Is](#what-quarksuite-is)
    - [A Starting Point](#a-starting-point)
    - [Interoperable](#interoperable)
- [What Quarksuite Isn’t](#what-quarksuite-isnt)
    - [A Design System](#a-design-system)
- [Goals](#goals)
    - [Go Where the Web Goes](#go-where-the-web-goes)
    - [Simple, Yet Featureful](#simple-yet-featureful)
    - [Tiny Universes](#tiny-universes)
    - [Your Data, Your Way](#your-data-your-way)
- [Features](#features)
- [Installation](#installation)
    - [As a Node Module/Dependency](#as-a-node-moduledependency)
    - [In Your Browser](#in-your-browser)
- [Creating A Design System Baseline with Quarksuite](#creating-a-design-system-baseline-with-quarksuite)
- [Quarksuite API](#quarksuite-api)
    - [color.swatch](#colorswatch)
        - [complement()](#complement)
            - [Parameters](#parameters)
            - [Returns](#returns)
            - [Example](#example)
        - [neutralize()](#neutralize)
            - [Parameters](#parameters-1)
            - [Returns](#returns-1)
            - [Example](#example-1)
        - [mix()](#mix)
            - [Parameters](#parameters-2)
            - [Returns](#returns-2)
            - [Example](#example-2)
    - [color.palette](#colorpalette)
        - [tints()](#tints)
            - [Parameters](#parameters-3)
            - [Returns](#returns-3)
            - [Example](#example-3)
        - [tones()](#tones)
            - [Parameters](#parameters-4)
            - [Returns](#returns-4)
            - [Example](#example-4)
        - [shades()](#shades)
            - [Parameters](#parameters-5)
            - [Returns](#returns-5)
            - [Example](#example-5)
    - [color.scheme](#colorscheme)
        - [monochromatic()](#monochromatic)
            - [Parameters](#parameters-6)
            - [Returns](#returns-6)
            - [Example](#example-6)
        - [complementary()](#complementary)
            - [Parameters](#parameters-7)
            - [Returns](#returns-7)
            - [Example](#example-7)
        - [splitComplementary()](#splitcomplementary)
            - [Parameters](#parameters-8)
            - [Returns](#returns-8)
            - [Example](#example-8)
        - [triadic()](#triadic)
            - [Parameters](#parameters-9)
            - [Returns](#returns-9)
            - [Example](#example-9)
        - [analogous()](#analogous)
            - [Parameters](#parameters-10)
            - [Returns](#returns-10)
            - [Example](#example-10)
        - [dual()](#dual)
            - [Parameters](#parameters-11)
            - [Returns](#returns-11)
            - [Example](#example-11)
        - [tetradic()](#tetradic)
            - [Parameters](#parameters-12)
            - [Returns](#returns-12)
            - [Example](#example-12)
        - [content.scale](#contentscale)
        - [create()](#create)
            - [Parameters](#parameters-13)
            - [Returns](#returns-13)
            - [Example](#example-13)
        - [build()](#build)
            - [Parameters](#parameters-14)
            - [Returns](#returns-14)
            - [Example](#example-14)
        - [multistrand()](#multistrand)
            - [Parameters](#parameters-15)
            - [Returns](#returns-15)
            - [Example](#example-15)
        - [augment()](#augment)
            - [Parameters](#parameters-16)
            - [Returns](#returns-16)
            - [Example](#example-16)
        - [output()](#output)
            - [Parameters](#parameters-17)
            - [Returns](#returns-17)
            - [Example](#example-17)
        - [ratios](#ratios)
- [Contributing](#contributing)
    - [Guidelines](#guidelines)
        - [On Features Outside the Scope of Quarksuite’s Goals](#on-features-outside-the-scope-of-quarksuites-goals)
        - [On Opening Issues](#on-opening-issues)
        - [On Pull Requests](#on-pull-requests)
- [Development](#development)
    - [Clone the Repo](#clone-the-repo)
    - [Install Dependencies](#install-dependencies)
    - [Commands](#commands)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

Quarksuite is a toolkit that helps create a subatomic foundation for design systems. It provides what you need to maintain consistency and ease implementation of the **boilerplate** concerns of your system. Quarksuite is meant to weave in and out of your design system like cross-stitching.

## What Quarksuite Is

### A Starting Point

I don’t expect a design system to begin and end with Quarksuite. And really, they can’t. Colors, content proportions, and spacing aren’t the whole of a design system. A system emerges from concerns that are in play before we even write a line of code. Made by people and not tools.

### Interoperable

Quarksuite begins and ends with data by design. Data travels faster than a framework. This means you can use your baseline to also generate design tokens for your system using tools like Theo and Style Dictionary.

## What Quarksuite Isn’t

### A Design System

Quarksuite is not, in itself, a design system. It’s incomplete for that. As intended. Quarksuite creates subatomic data you can use **within** a design system.

## Goals

### Go Where the Web Goes

Quarksuite is made to travel light. This means it can follow your stack no matter what it might be and help you build design systems on **your** terms.

### Simple, Yet Featureful

Quarksuite is lean as a library. It only provides **utilities** for implementing design systems. You put data in and get data out that you can use through your whole system. Quarksuite will not be responsible for generating design tokens or building UIs. I built it to ease the execution of design systems for designers and to help developers get started with using them.

### Tiny Universes

The baseline data you build with Quarksuite can be specific to one project, or you can use it across multiple systems. You can use Quarksuite for one-off interfaces, customizable themes, or anything else that consumes and writes data.

### Your Data, Your Way

I’ve deliberately built Quarksuite not to be opinionated about **how** you generate your baseline system data. You can have your system in one big file, or you can categorize colors, content, and composition in many files. In fact, Quarksuite is designed to disappear after its job is done.

## Features

Quarksuite includes:

+ A simple, flexible API (`colors`, `content`)
+ Color palette and scheme generation, modification down to the swatch
+ Modular scale generation and modification down to the unit
+ Use it anywhere. With a build system, within a framework, or directly in your browser

## Installation

### As a Node Module/Dependency

> You’ll require at least Node.js LTS (v10.16.x) to use Quarksuite as a module. It’s also highly recommended you install Yarn, too.

```bash
npm install @quarksuite/core

# OR

yarn add @quarksuite/core
```

### In Your Browser

```html
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Quarksuite Example</title>
  </head>
  <body>
    <script src="https://unpkg.com/@quarksuite/core@1.2.0/dist-web/index.js"></script>
  </body>
</html>
```

## Creating A Design System Baseline with Quarksuite

As an example:

```js
// First, import the tools
import { color, content } from '@quarksuite/core';

/** color.scheme */

const { scheme } = color;

const brand = '#348ec9';

const colors = (keys, scheme) =>
  keys.reduce((container, category, index) => {
    return { ...container, ...{ [category]: scheme[index] } };
  }, {});

const palette = colors(
  ['brand', 'secondary', 'accent'],
  scheme.triadic(brand, 3)
);

/** content.scale */

const { scale } = content;

// Create a golden scale with 10 total values
const golden = scale.build(scale.ratios.golden, 10);

// Account for real world use cases with multistranding
const ms = scale.multistrand(golden, [1.5]);

// Augment with significant values in your design and a transform func
const multiply = (base, value) => base * value;
const add = (base, value) => base + value;

const fontSize = scale.augment(1.5, golden, multiply);
const fRanges = fontSize.filter(fs => fs <= 7);

const measure = scale.augment(21, ms, add);

const recommended = v => v >= 22 && v <= 31;
const mRanges = measure.filter(recommended);

// Create a new layout scale
const widths = scale.augment(10, ms, multiply);
const container = widths.filter(w => w <= 101);

// Don't forget to output
const typography = {
  fs: scale.output(fRanges, 4, 'vw'),
  measure: scale.output(mRanges)
};

const composition = {
  widths: scale.output(container, 4, '%')
};

console.log(palette, typography, composition);

// Use within your design system, or get one started.
export default {
  color: palette,
  content: typography,
  composition
};
```

## Quarksuite API

### color.swatch

#### complement()

##### Parameters

+ `color: string`:  a color to modify

##### Returns

`string`: the complement (opposite) of a color

##### Example

```js
import { color } from '@quarksuite/core';

const { swatch } = color;

swatch.complement('#348ec9');
```

#### neutralize()

##### Parameters

+ `color: string`: a color to modify

##### Returns

`string`: the negation of a color. Good for neutral palettes

##### Example

```js 
import { color } from '@quarksuite/core';

const { swatch } = color;

swatch.neutralize('#348ec9');
```

#### mix()

##### Parameters

+ `color: string`: a color to modify
+ `target: string`: a color to mix
+ `intensity: number`: strength of mixture

##### Returns

`string`: the mix of `color` and `target`

##### Example

```js 
import { color } from '@quarksuite/core';

const { swatch } = color;

swatch.mix('#348ec9', 'green');
swatch.mix('#deaded', 'red', 75);
```

### color.palette

#### tints()

##### Parameters

+ `color: string`: color to create tints for
+ `range: number = 4`: number of colors to output
+ `contrast: number = 95`: adjusts the contrast of output

##### Returns

`string[]`: a collection of tints (color + white)

##### Example

```js
import { color } from '@quarksuite/core';

const { palette } = color;

palette.tints('#348ec9');
palette.tints('#deaded', 2, 60);
```

#### tones()

##### Parameters

- `color: string`: color to create tones for
- `range: number = 4`: number of colors to output
- `contrast: number = 95`: adjusts the contrast of output

##### Returns

`string[]`: a collection of tints (color + gray)

##### Example

```js
import { color } from '@quarksuite/core';

const { palette } = color;

palette.tones('#348ec9');
palette.tones('#deaded', 2, 60);
```

#### shades()

##### Parameters

- `color: string`: color to create shades for
- `range: number = 4`: number of colors to output
- `contrast: number = 95`: adjusts the contrast of output

##### Returns

`string[]`: a collection of tints (color + black)

##### Example

```js
import { color } from '@quarksuite/core';

const { palette } = color;

palette.shades('#348ec9');
palette.shades('#deaded', 2, 60);
```

### color.scheme

#### monochromatic()

##### Parameters

+ `color: string`: color to create scheme from
+ `range: number = 4`: number of tints, tones, shades to output (each)
+ `contrast: number = 95`: adjust the overall contrast of the palette

##### Returns

`string[]`: a monochromatic scheme with tints, tones, and shades

##### Example

```js
import { color } from '@quarksuite/core';

const { scheme } = color;

scheme.monochromatic('#348ec9');
scheme.monochromatic('#deaded', 3, 78);
```

#### complementary()

##### Parameters

- `color: string`: color to create scheme from
- `range: number = 4`: number of tints, tones, shades to output (each)
- `contrast: number = 95`: adjust the overall contrast of the palette

##### Returns

`string[][]`: a complementary scheme with tints, tones, and shades

##### Example

```js
import { color } from '@quarksuite/core';

const { scheme } = color;

scheme.complementary('#348ec9');
scheme.complementary('#deaded', 3, 78);
```

#### splitComplementary()

##### Parameters

+ `color: string`: color to create scheme from

+ `distance: number = 15`: distance of split from color (between 15 and 30 recommended)

+ `accented: boolean = false`: include complement as an accent

- `range: number = 4`: number of tints, tones, shades to output (each)
- `contrast: number = 95`: adjust the overall contrast of the palette

##### Returns

`string[][]`: a split complementary scheme with tints, tones, and shades

##### Example

``` js
import { color } from '@quarksuite/core';

const { scheme } = color;

scheme.splitComplementary('#348ec9');
scheme.splitComplementary('#deaded', 30, 2, 85);
```

#### triadic()

##### Parameters

- `color: string`: color to create scheme from

- `range: number = 4`: number of tints, tones, shades to output (each)
- `contrast: number = 95`: adjust the overall contrast of the palette

##### Returns

`string[][]`: a triadic scheme with tints, tones, and shades

##### Example

```js
import { color } from '@quarksuite/core';

const { scheme } = color;

scheme.triadic('#348ec9');
scheme.triadic('#deaded', 3, 55);
```

#### analogous()

##### Parameters

- `color: string`: color to create scheme from

- `distance: number = 15`: distance of split from color (between 15 and 30 recommended)

- `accented: boolean = false`: include complement as an accent

- `range: number = 4`: number of tints, tones, shades to output (each)
- `contrast: number = 95`: adjust the overall contrast of the palette

##### Returns

`string[][]`: an analogous scheme with tints, tones, and shades

##### Example

```js
import { color } from '@quarksuite/core';

const { scheme } = color;

scheme.analogous('#348ec9');
scheme.analogous('#deaded', 30, 2, 85);
```

#### dual()

##### Parameters

- `color: string`: color to create scheme from

- `distance: number = 15`: distance between base colors (between 15 and 30 recommended)

- `range: number = 4`: number of tints, tones, shades to output (each)
- `contrast: number = 95`: adjust the overall contrast of the palette

##### Returns

`string[][]`: a dual color scheme with tints, tones, and shades

##### Example

```js
import { color } from '@quarksuite/core';

const { scheme } = color;

scheme.dual('#348ec9');
scheme.dual('#deaded', 30, 2, 85);
```

#### tetradic()

##### Parameters

- `color: string`: color to create scheme from

- `range: number = 4`: number of tints, tones, shades to output (each)

- `contrast: number = 95`: adjust the overall contrast of the palette

##### Returns

`string[][]`: a tetradic scheme with tints, tones, and shades

##### Example

```js
import { color } from '@quarksuite/core';

const { scheme } = color;

scheme.tetradic('#348ec9');
scheme.tetradic('#deaded', 1, 50);
```

#### content.scale

#### create()

##### Parameters

+ `value: number`: value to use for generating a scale

+ `limit: number`: the number of values you want to generate

##### Returns

`Generator`: a modular scale

##### Example

```js
import { content } from '@quarksuite/core';

const { scale } = content;

const custom = (limit: number) => scale.create(1.375, limit);
```

#### build()

##### Parameters

+ `type: (limit: number) => Generator`: the created scale

+ `limit: number`: the number of values to output

##### Returns

`number[]`: a modular scale

##### Example

```js
import { content } from '@quarksuite/core';

const { scale } = content;

const newScale = (limit: number) => scale.create(1.375, limit);

scale.build(newScale, 8);
```

#### multistrand()

##### Parameters

+ `scale: number[]`: the scale you want to thread

+ `ratios: number[]`: ratios to thread through your scale (too many will dilute it)

##### Returns

`number[]`: a multi-threaded modular scale

##### Example

```js
import { content } from '@quarksuite/core';

const { scale } = content;

scale.multistrand(scale.ratios.golden, [1.5, 1.75])
```

#### augment()

##### Parameters

+ `value: number`: a significant value in your design

+ `scale: number[]`: a scale to augment

+ `transform: (value: number, scaleValue: number) => number`:  the augment operation

##### Returns

`number[]`: an augmented scale

#####  Example

```js
import { content } from '@quarksuite/core';

const { scale } = content;

const multiply = (base, value) => base * value;

scale.augment(1.25, scale.ratios.octave, multiply);
```

#### output()

##### Parameters

+ `scale: number[]`: a scale to output
+ `precision: number = 4`:  decimal place precision of values
+ `unit: string = ‘rem’`  : CSS unit to attach to values 

##### Returns

`string[]`: a design system-ready modular scale

##### Example

```js
import { content } from '@quarksuite/core';

const { scale } = content;

const multiply = (base, value) => base * value;

scale.output(scale.augment(1.5, scale.ratios.golden, multiply), 5, 'rem');
```

#### ratios

A set of common scales popular in design and art. More will be added on request. Uses `scale.create` internally.

| key          | ratio                       |
| ------------ | --------------------------- |
| `major3rd`   | `1.25`                      |
| `perfect4th` | `1.333`                     |
| `perfect5th` | `1.5`                       |
| `golden`     | phi =  `1.6180371352785146` |
| `major6th`   | `1.667`                     |
| `octave`     | `2`                         |

## Contributing

If you’d like to help Quarksuite grow, you have any suggestions to improve its code, or you have something awesome in mind that I simply didn’t consider, please consider making an issue or pull request and we’ll discuss further.

### Guidelines

#### On Features Outside the Scope of Quarksuite’s Goals

I will not be accepting any feature requests for building things into this project that fall outside of Quarksuite’s stated goals. This is not meant to be a swiss army knife for design. It’s meant to build design systems and output data consumable by other design tools. If you want to use to Quarksuite-created design data as design tokens, you can. But it will never be a feature built into the library.

#### On Opening Issues

I understand it can be frustrating when code breaks. Especially if you’re on a tight schedule. But if I don’t respond right away, I’ll be with you as soon as I can. What you’re not gonna do: badger me to respond to your issue more urgently. I have to be honest and say belligerence doesn’t encourage me to respond any faster. Please be respectful.

#### On Pull Requests

As of v1.x.x, I’m open to improvements to the code. And I’m even open to code review, as I’m largely self-taught and may have overlooked some things in authoring this library. I want this project to be great, and I could really use your help.

## Development

If you’d like to hack on Quarksuite locally—either to improve or extend, this section is for you.

### Clone the Repo

```bash
https://github.com/quarksuite/core.git
```

### Install Dependencies

```bash
npm install 

# OR

yarn
```

### Commands

+ `test`: run unit tests
+ `build`: build project