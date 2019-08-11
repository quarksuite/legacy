![Quarksilver Logo](/home/cr-jr/Code/project/@quarksilver/core/assets/logo-fullcolor-with-text.png)

# Quarksuite (Core)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Table of Contents

- [Elevator Pitch](#elevator-pitch)
- [Why Quarksuite?](#why-quarksuite)
    - [Designed for Consistency](#designed-for-consistency)
    - [Works How You Work Best](#works-how-you-work-best)
    - [Single Source of Truth](#single-source-of-truth)
- [How to Use Quarksuite](#how-to-use-quarksuite)
    - [Quarksuite Installation](#quarksuite-installation)
    - [Using Quarksuite](#using-quarksuite)
- [How to Build Design Systems with Quarksuite](#how-to-build-design-systems-with-quarksuite)
    - [Quickstart](#quickstart)
- [Quarksuite API Documentation](#quarksuite-api-documentation)
    - [color.swatch](#colorswatch)
        - [complement()](#complement)
            - [Parameters](#parameters)
            - [Returns](#returns)
            - [Example](#example)
        - [neutralize()](#neutralize)
            - [Parameters](#parameters-1)
            - [Returns](#returns-1)
            - [Example](#example-1)
    - [color.variant](#colorvariant)
        - [tints()](#tints)
            - [Parameters](#parameters-2)
            - [Returns](#returns-2)
            - [Example](#example-2)
        - [tones()](#tones)
            - [Parameters](#parameters-3)
            - [Returns](#returns-3)
            - [Example](#example-3)
        - [shades()](#shades)
            - [Parameters](#parameters-4)
            - [Returns](#returns-4)
            - [Example](#example-4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

*IMPORTANT: If you’re using Quarksuite Components and you attempt to update the library to v1.0.0, everything will break. And not gracefully. The v1.x.x API is entirely incompatible with previous versions and functionality. Tread carefully from here on if you’re an early adopter.*

## Elevator Pitch

Quarksuite is a toolkit for building design systems on a subatomic level. It provides what you need to create and maintain beautiful, consistent designs based on solid principles. Create your universe.

## Why Quarksuite?

### Designed for Consistency

Quarksuite is intended to make it easy to create flexible design systems. The only limit for what you can do with these utilities is your imagination. And your constraints, of course.

### Works How You Work Best

Quarksuite makes absolute no assumptions about your stack or how your system will be used. It provides the building blocks to take away most of our bikeshedding habits. Never worry about what color that button was again.

You like Webpack? You can use Quarksuite. You like React? Quarksuite is for you, too. Vue’s your soulmate? Quarksuite’s got your back. Do you build UIs by sprinkling unicorn horn powder while reciting incantations? Quarksuite will attract more mythical beasts to maim.

### Single Source of Truth

I get it, it’s overused. I mean it earnestly in this case. Quarksuite augments your design workflow with single, or multiple data sets organized around **your** project. You can use a design system built with this toolkit in any interface that reads and writes data. Which is **every** interface. 

## How to Use Quarksuite

### Quarksuite Installation

> Quarksuite requires **at least** Node.js LTS (v10.16.2 at the time of this writing). Also recommend getting the latest version of yarn.

When you’re all set, time to install.

```bash
npm i @quarksuite/core

# OR

yarn add @quarksuite/core
```

### Using Quarksuite

Quarksuite is organized under two main modules: `colors` and `scale`. The first helps you work with color down to the swatch level, output variants, change their range, color mode, etc… The second is the beginning and end of creating sizing and proportion for your design.

## How to Build Design Systems with Quarksuite

### Quickstart

```js
// First, import the kit
import kit from '@quarksuite/core';

// Destructuring makes it easier to grab what you need
const {
  color: { palette, variant },
  scale
} = kit;

/** Colors */
const brand = '#348ec9';

// Set a triadic scheme
const scheme = palette.triad(brand);

// Generate some variants
const variants = (color, options) => [
  variant.shades(color, options),
  variant.tones(color, options),
  variant.tints(color, options)
];

// set opts
const variantopts = {
  range: 3,
  mode: 'lrgb'
};

// Model output the way you want
const formatPalette = (palette, variants) =>
  palette.reduce(
    (container, category, index) => ({
      ...container,
      ...{ [category]: { base: scheme[index], ...variants } }
    }),
    {}
  );

const formatVariants = (palette, color) =>
  palette.reduce(
    (container, category, index) => ({
      ...container,
      ...{ [category]: variants(color, variantopts)[index] }
    }),
    {}
  );

/** Content */

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
const colors = formatPalette(
  ['brand', 'accent', 'spot'],
  formatVariants(['shades', 'tones', 'tints'], brand)
);

const content = {
  fs: scale.output(fRanges, { unit: 'vw' }),
  measure: scale.output(mRanges)
};

const composition = {
  widths: scale.output(container, { unit: '%' })
};

// Name your system whatever you want
const system = {
  colors,
  content,
  composition
};

console.log(system);
```

## Quarksuite API Documentation

### color.swatch

Utilities responsible for altering individual colors.

#### complement()

##### Parameters

+ `color: string`: any valid CSS color

##### Returns

`string`: The color complement (180° from origin)

##### Example

```js
color.swatch.complement('#348ec9');
```

#### neutralize()

##### Parameters

- `color: string`: any valid CSS color

##### Returns

`string`: The neutral, or negation, of a color by its complement

##### Example

```js
color.swatch.complement('#348ec9');
```

### color.variant

Utilities for outputting variants (tints, tones, shades) for a color

#### tints()

##### Parameters

- `color: string`: any valid CSS color
- `options?: VariantOptions = {}`: options for changing the output
  - `contrast?: number = 95`: sets a contrast for the output
  - `range?: number = 4`: sets the number of colors to output
  - `mode?: InterpolationMode = ‘lab’`: sets the color space of the output 

##### Returns

`string[]`: An array of tints from color to white

##### Example

```js
color.variant.tints('#348ec9', { range: 3 });
```

#### tones()

##### Parameters

- `color: string`: any valid CSS color
- `options?: VariantOptions = {}`: options for changing the output
  - `contrast?: number = 95`: sets a contrast for the output
  - `range?: number = 4`: sets the number of colors to output
  - `mode?: InterpolationMode = ‘lab’`: sets the color space of the output 

##### Returns

`string[]`: An array of tones from color to gray

##### Example

```js
color.variant.tones('#348ec9', { range: 3 });
```

#### shades()

##### Parameters

- `color: string`: any valid CSS color
- `options?: VariantOptions = {}`: options for changing the output
  - `contrast?: number = 95`: sets a contrast for the output
  - `range?: number = 4`: sets the number of colors to output
  - `mode?: InterpolationMode = ‘lab’`: sets the color space of the output 

##### Returns

`string[]`: An array of shades from color to black

##### Example

```js
color.variant.shades('#348ec9', { range: 3 });
```

#### temperature()

##### Parameters

+ `color: string`: any valid CSS color
+ `kelvin: number`: a temperature in Kelvin
+ `options?: VariantOptions = {}`: options for changing the output
  - `contrast?: number = 95`: sets a contrast for the output
  - `range?: number = 4`: sets the number of colors to output
  - `mode?: InterpolationMode = ‘lab’`: sets the color space of the output 

##### Returns

`string[]`: An array of the color blended with temperature

##### Example

```js
color.variant.temperature('#348ec9', 3500, { range: 8, mode: 'lch' })
```

### color.palette

#### triad()

##### Parameters

+ `color: string`: any valid CSS color (equal to a)
+ `degrees: number = 120` degrees on the wheel to distribute

##### Returns

`[string, string, string]`: A tuple representing a triadic scheme (A = `color`, B = left of `color`, C = right of `color`)

##### Example

```js
color.palette.triad('#348ec9')
```



#### tetrad()

#### spread()

### color.scale

#### create()

#### build()

#### multistrand()

#### augment()

#### output()

#### ratios