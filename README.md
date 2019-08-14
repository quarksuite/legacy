# Quarksuite

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Table of Contents

- [Introduction](#introduction)
- [Why Quarksuite?](#why-quarksuite)
    - [Designed for Consistency](#designed-for-consistency)
    - [Works How You Work Best](#works-how-you-work-best)
    - [Single Source of Truth](#single-source-of-truth)
- [Creating Design Systems with Quarksuite](#creating-design-systems-with-quarksuite)
- [Quarksuite API](#quarksuite-api)
    - [content.scale](#contentscale)
        - [create()](#create)
            - [Parameters](#parameters)
            - [Returns](#returns)
            - [Example](#example)
        - [build()](#build)
            - [Parameters](#parameters-1)
            - [Returns](#returns-1)
            - [Example](#example-1)
        - [multistrand()](#multistrand)
            - [Returns](#returns-2)
            - [Example](#example-2)
        - [augment()](#augment)
            - [Parameters](#parameters-2)
            - [Returns](#returns-3)
            - [Example](#example-3)
        - [output()](#output)
            - [Parameters](#parameters-3)
            - [Returns](#returns-4)
            - [Example](#example-4)
        - [ratios](#ratios)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

*IMPORTANT: If you’ve arrived from one of the other projects, it would be a good idea to get up to speed on Quarksuite’s new objectives and design. We’re on the road to v1 now. Stay tuned.*

## Introduction

Quarksuite is a toolkit for creating subatomic design systems. It provides what you need to create and maintain beautiful, consistent designs based on solid principles. Build a universe.

## Why Quarksuite?

### Designed for Consistency

Quarksuite is intended to make it easy to create flexible design systems. The only limit for what you can do with these utilities is your imagination. And your constraints, of course.

### Works How You Work Best

Quarksuite makes absolute no assumptions about your stack or how your system will be used. It provides the building blocks to take away most of our bikeshedding habits. Never worry about what color that button was again.

You like Webpack? You can use Quarksuite. You like React? Quarksuite is for you, too. Vue’s your soulmate? Quarksuite’s got your back. Do you build UIs by sprinkling unicorn horn powder while reciting incantations? Quarksuite will attract more mythical beasts to maim.

### Single Source of Truth

I get it, it’s overused. I mean it earnestly in this case. Quarksuite augments your design workflow with single, or multiple data sets organized around **your** project. You can use a design system built with this toolkit in any interface that reads and writes data. Which is **every** interface. 

## Creating Design Systems with Quarksuite

```js
// First, import the kit
import tools from '@quarksuite/core';

// Destructuring makes it easier to grab what you need
const {
  content: { scale }
} = tools;

/** content.scale */

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
const content = {
  fs: scale.output(fRanges, 4, 'vw'),
  measure: scale.output(mRanges)
};

const composition = {
  widths: scale.output(container, 4, '%')
};

// Name your system whatever you want and export to use wherever you need
export default {
  content,
  composition
};
```

## Quarksuite API

### content.scale

#### create()

##### Parameters

+ `value: number`: value to use for generating a scale

+ `limit: number`: the number of values you want to generate

##### Returns

`Generator`: a modular scale

##### Example

```js
import tools from '@quarksuite/core';

const { content: { scale } } = tools;

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
import tools from '@quarksuite/core';

const { content: { scale } } = tools;

const newScale = (limit: number) => scale.create(1.375, limit);

scale.build(newScale, 8);
```

#### multistrand()

Parameters

+ `scale: number[]`: the scale you want to thread

+ `ratios: number[]`: ratios to thread through your scale (too many will dilute it)

##### Returns

`number[]`: a multi-threaded modular scale

##### Example

```js
import tools from '@quarksuite/core';

const { content: { scale } } = tools;

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
import tools from '@quarksuite/core';

const { content: { scale } } = tools;

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
import tools from '@quarksilver/core';

const { content: { scale } } = tools;

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