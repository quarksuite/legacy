# Quarksuite (Core)

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

### For Tiny Universes

The baseline data you build with Quarksuite can be specific to one project, or you can use it across multiple systems. You can use Quarksuite for one-off interfaces, customizable themes, or anything else that consumes and writes data.

### Your Data, Your Way

I’ve deliberately built Quarksuite not to be opinionated about **how** you generate your baseline system data. You can have your system in one big file, or you can categorize colors, content, and composition in many files. In fact, Quarksuite is designed to disappear after its job is done.

## Features

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

[Browse the API here](API.md)

## Contributing

If you’d like to help Quarksuite grow, you have any suggestions to improve its code, or you have something awesome in mind that I simply didn’t consider, please consider making an issue or pull request and we’ll discuss further.

### Guidelines

#### On Features Outside the Scope of Quarksuite’s Goals

I will not be accepting any feature requests for building things into this project that fall outside of Quarksuite’s stated goals. This is not meant to be a swiss army knife for design. It’s meant to assist in building design systems and output data consumable by other design tools. If you want to use to Quarksuite-created design data as tokens, you can. But it will never be built into the core.

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
