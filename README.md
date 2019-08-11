![Quarksilver Logo](assets/logo-core-with-text.png)

# Quarksilver (Core)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Table of Contents

- [What?](#what)
- [Why Quarksilver?](#why-quarksilver)
    - [Philosophy](#philosophy)
        - [The Web First](#the-web-first)
        - [DOTRW (Do One Thing Really Well)](#dotrw-do-one-thing-really-well)
        - [Make Room](#make-room)
- [How to Use Quarksilver](#how-to-use-quarksilver)
    - [Quarksilver Installation](#quarksilver-installation)
    - [Using Quarksilver](#using-quarksilver)
- [Quarksilver API](#quarksilver-api)
    - [API: colors](#api-colors)
        - [colors.custom](#colorscustom)
            - [swatches()](#swatches)
            - [palette()](#palette)
        - [colors.scheme](#colorsscheme)
            - [monochromatic()](#monochromatic)
            - [complementary()](#complementary)
            - [splitComplementary()](#splitcomplementary)
            - [triadic()](#triadic)
            - [clash()](#clash)
            - [analogous()](#analogous)
            - [tetradic()](#tetradic)
            - [square()](#square)
    - [API: toolkit](#api-toolkit)
        - [toolkit.colors](#toolkitcolors)
            - [toolkit.colors.swatch](#toolkitcolorsswatch)
                - [complement()](#complement)
                - [neutralize()](#neutralize)
            - [toolkit.colors.variants](#toolkitcolorsvariants)
                - [tints()](#tints)
                - [tones()](#tones)
                - [shades()](#shades)
            - [toolkit.colors.palette](#toolkitcolorspalette)
                - [spread()](#spread)
                - [triad()](#triad)
                - [tetrad()](#tetrad)
        - [toolkit.content](#toolkitcontent)
            - [scale()](#scale)
        - [toolkit.tokenize](#toolkittokenize)
            - [colors()](#colors)
            - [fonts()](#fonts)
            - [scale()](#scale-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

*IMPORTANT: This project is technically no longer maintained as I’ve started to rebuild with a clearer idea of what Quarksuite (note the name change) is supposed to be. [Check out the new package](https://npmjs.com/@quarksuite/core) if you want to follow along. Otherwise, you can continue to fiddle with what’s already here.*

*Find out more about what’s coming in v1 and later by [following the Twitter account](https://twitter.com/Quarksuite). I think you’ll like what’s coming. [Head to the new repo](https://github.com/quarksuite) and stay tuned.*

*This documentation otherwises exists as is in the v0.2.x package.*

## What?

Quarksilver is a tiny toolkit for making, modifying and manipulating design systems. What you’re viewing now is the core module. The one that makes everything go. Other planned nodes in the Quarksilver network include a CLI and a web application.

## Why Quarksilver?

After a while of learning digital design, I was needled by the sense that design principles could be automated to a point. Color harmony is a matter of geometry as much as taste. Typefaces also hint in their attributes about *how* to use them. Content is the **basic unit** of every decision about layout.

The advent of style guides followed by the explosion of design systems reinforced this line of thought. I didn’t see many toolkits for constructing the foundation, though. I saw a lot of specialized kits locked into specific frameworks.

Quarksilver aims to work however **you** work.

### Philosophy

Quarksilver is made to be simple to use and simple to build upon. Three concerns inform the most basic design systems: **colors, content, composition**. Following that assumption is the organizing principle of this entire toolkit.

The other reasons:

#### The Web First

I believe focusing the web simplifies a lot my work as, well, a front-end web developer. React, Vue, Angular, Polymer, and others have been awesome. I’m going with the solution that’s as close to the web as possible: the web components v1 spec. Quarksilver’s components are also web components. Even better, web components can plug into any UI library or framework that uses HTML. Native tools with interoperability are awesome. We’re no longer shackled by the limits of early web technologies. HTML, CSS, and JS can do much more now.

#### DOTRW (Do One Thing Really Well)

Quarksilver’s thing is design systems. All functionality that allows excellent, maintainable design systems are aligned with Quarksilver’s objective. And from there, it will simply be made better and more efficient at **doing** its thing.

#### Make Room

I built a simple toolkit for making design systems because I don’t want to spend a lot of time making design systems. I spend a lot of time making things so I don’t need to spend as much making other things.

Now we’ll move on to what you can do with Quarksilver.

## How to Use Quarksilver

### Quarksilver Installation

> Quarksilver requires **at least** Node.js LTS (v10.16.0 at the time of this writing). Also recommend getting the latest version of yarn.



When you’re all set, time to install.

```bash
npm i @quarksilver/core

# OR

yarn add @quarksilver/core
```

### Using Quarksilver

Quarksilver is organized under two main modules: `colors` and `toolkit`. The first contains convenience functions for generating palettes from color data. The second contains all the bare metal utilities for constructing design systems.  

You can copy the block of code below if you’d just like to get going with a simple system that’s ready for consumption and token output by Style Dictionary.

```typescript
import quarks from '@quarksilver/core';

const { colors, toolkit } = quarks;

// A simple monochromatic color scheme with a wide range
// of variants.
const colorConfig = {
  base: '#348ec9'
}

const color = colors.scheme.monochromatic(colorConfig);

// System font stacks for body, headings, and code
const fontConfig = {
  'system-sans': {
    name: 'System (Sans)',
    stack: '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
    styles: [400, '400i', 700]
	},
  'system-serif': {
    name: 'System (Serif)',
    stack: 'Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
    styles: [400, '400i', 700]
  },
  'system-mono': {
    name: 'System (Mono)',
    stack: 'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace',
    styles: [400, '400i', 700]
  }
};

const font = toolkit.tokenize.fonts(fontConfig);

// Sizing and spacing with a modular scale
const scaleConfig = {
  base: '1em',
  ratio: 1.25,
  limit: 9
}

const ms = toolkit.tokenize.scale(toolkit.content.scale(scaleConfig));

// Output
export default JSON.stringify({ color, font, ms }, null, 2)
```

## Quarksilver API

### API: colors

A module housing convenience functions for working with color data. Functionality is categorized under `custom` and `scheme`.

#### colors.custom

Handles building custom palettes from color data. Data is of type `ColorsCustomSwatchSchema` and `ColorsCustomPaletteSchema`.

##### swatches()

Let’s say you wanted to use the [new ‘default’ web colors](https://clrs.cc) in your project.

```typescript
import quarks from '@quarksilver/core';
import {ColorsCustomSwatchSchema} from '@quarksilver/core/dist-types/schema';

const { swatches } = quarks.colors.custom;

const data: ColorsCustomSwatchSchema = {
  navy: '#001f3f',
  blue: '#0074d9',
  aqua: '#7fdbff',
  teal: '#39cccc',
  olive: '#3d9970',
  green: '#2ecc40',
  lime: '#01ff70',
  yellow: '#ffdc00',

  orange: '#ff851b',
  red: '#ff4136',
  maroon: '#85144b',
  fuchsia: '#f012be',
  purple: '#b10dc9',
  black: '#111111',
  gray: '#aaaaaa',
  silver: '#dddddd',

  white: '#ffffff'
};

swatches(data);
```

##### palette()

Or, let’s say you’ve decided on a few base colors already and simply want to generate variants.

```typescript
import quarks from '@quarksilver/core';
import {ColorsCustomPaletteSchema} from '@quarksilver/core/dist-types/schema';

const { palette } = quarks.colors.custom;

const data: ColorsCustomPaletteSchema = {
  brand: {
    base: '#DEADED' // any valid CSS color
  },
  accent: {
    base: '#C0FFEE',
    options: { range: 'minimal' }
  }
};

palette(data);
```



#### colors.scheme

Handles building color schemes from a base color with variants. Includes eight scheme functions: `monochromatic`, `complementary`, `splitComplementary`, `triadic`, `clash`, `analogous`, `tetradic`, and `square`. All schemes rely on processing color config of the type `ColorsBasicPaletteSchema`.

##### monochromatic()

```typescript
import quarks from '@quarksilver/core';
import {ColorsBasicPaletteSchema} from '@quarksiver/core/dist-types/schema';

const { monochromatic } = quarks.colors.scheme;

const data: ColorsBasicPaletteSchema = {
  base: 'dodgerblue' // named CSS colors are allowed
};

monochromatic(data);
```

##### complementary()

```typescript
import quarks from '@quarksilver/core';
import {ColorsBasicPaletteSchema} from '@quarksiver/core/dist-types/schema';

const { complementary } = quarks.colors.scheme;

const data: ColorsBasicPaletteSchema = {
  base: 'dodgerblue' // named CSS colors are allowed
};

complementary(data);
```

##### splitComplementary()

```typescript
import quarks from '@quarksilver/core';
import {ColorsBasicPaletteSchema} from '@quarksiver/core/dist-types/schema';

const { splitComplementary } = quarks.colors.scheme;

const data: ColorsBasicPaletteSchema = {
  base: 'dodgerblue' // named CSS colors are allowed
};

splitComplementary(data);
```

##### triadic()

```typescript
import quarks from '@quarksilver/core';
import {ColorsBasicPaletteSchema} from '@quarksiver/core/dist-types/schema';

const { triadic } = quarks.colors.scheme;

const data: ColorsBasicPaletteSchema = {
  base: 'dodgerblue' // named CSS colors are allowed
};

triadic(data);
```

##### clash()

```typescript
import quarks from '@quarksilver/core';
import {ColorsBasicPaletteSchema} from '@quarksiver/core/dist-types/schema';

const { clash } = quarks.colors.scheme;

const data: ColorsBasicPaletteSchema = {
  base: 'dodgerblue' // named CSS colors are allowed
};

clash(data);
```

##### analogous()

```typescript
import quarks from '@quarksilver/core';
import {ColorsBasicPaletteSchema} from '@quarksiver/core/dist-types/schema';

const { analogous } = quarks.colors.scheme;

const data: ColorsBasicPaletteSchema = {
  base: 'dodgerblue' // named CSS colors are allowed
};

analogous(data);
```

##### tetradic()

```typescript
import quarks from '@quarksilver/core';
import {ColorsBasicPaletteSchema} from '@quarksiver/core/dist-types/schema';

const { tetradic } = quarks.colors.scheme;

const data: ColorsBasicPaletteSchema = {
  base: 'dodgerblue' // named CSS colors are allowed
};

tetradic(data);
```

##### square()

```typescript
import quarks from '@quarksilver/core';
import {ColorsBasicPaletteSchema} from '@quarksiver/core/dist-types/schema';

const { square } = quarks.colors.scheme;

const data: ColorsBasicPaletteSchema = {
  base: 'dodgerblue' // named CSS colors are allowed
};

square(data);
```

### API: toolkit

A module that contains the core utilities for working with Quarksilver. Useful if you need to customize the output beyond basic configuration. Also contains `tokenize`, which is responsible for preparing data for Style Dictionary to output design tokens.

#### toolkit.colors

Exposes the core color utilities.

##### toolkit.colors.swatch

Contains functions for transforming individual colors.

###### complement()

Fetches the complement (opposite) of a color.

```typescript
import quarks from '@quarksilver/core';

const { complement } = quarks.toolkit.colors.swatch;

const color = '#f00000';

complement(color);
```

###### neutralize()

Returns the result of a color blended evenly with its complement. Handy for neutral palettes.

```typescript
import quarks from '@quarksilver/core';

const { neutralize } = quarks.toolkit.colors.swatch;

const color = '#f00000';

neutralize(color);
```

##### toolkit.colors.variants

Contains functions that output variants for a color (tints, tones, shades). Used internally by the colors module to output variants for custom palettes and schemes. Accepts a `ColorOptions` type to modify output.

###### tints()

Returns an array of tints for a color (color + white)

```typescript
import quarks from '@quarksilver/core';
import {ColorOptions} from '@quarksilver/core/dist-types/schema';

const { tints } = quarks.toolkit.colors.variants;

const color = '#f00000';

// default color options
const options: ColorOptions = {
  contrast: 'high', // 'med' | 'low' | number <= 100
  range: 'material', // 'minimal' | number
  mode: 'lab' // 'hsl' | 'lch' | 'hsv' | 'rgb'
};

tints(color, options);
```

###### tones()

Returns an array of tones for a color (color + gray)

```typescript
import quarks from '@quarksilver/core';
import {ColorOptions} from '@quarksilver/core/dist-types/schema';

const { tones } = quarks.toolkit.colors.variants;

const color = '#f00000';

// default color options
const options: ColorOptions = {
  contrast: 'high', // 'med' | 'low' | number <= 100
  range: 'material', // 'minimal' | number
  mode: 'lab' // 'hsl' | 'lch' | 'hsv' | 'rgb'
};

tones(color, options);
```

###### shades()

Returns an array of shades for a color (color + black)

```typescript
import quarks from '@quarksilver/core';
import {ColorOptions} from '@quarksilver/core/dist-types/schema';

const { shades } = quarks.toolkit.colors.variants;

const color = '#f00000';

// default color options
const options: ColorOptions = {
  contrast: 'high', // 'med' | 'low' | number <= 100
  range: 'material', // 'minimal' | number
  mode: 'lab' // 'hsl' | 'lch' | 'hsv' | 'rgb'
};

shades(color, options);
```

##### toolkit.colors.palette

Contains functions that create and modify color palettes in place. Used internally by color schemes.

###### spread()

Returns a range of colors between the one passed in and a hue x `degrees` (`60` by default) on the wheel. Can return more or fewer colors with `range` (`3` by default).

```typescript
import quarks from '@quarksilver/core';

const { spread } = quarks.toolkit.colors.palette;

const color = '#f00000';

spread(color);

// adjust degrees to 90
spread(color, 90);

// add more colors to output
spread(color, 90, 6)
```

###### triad()

Inscribes a triangle on the color wheel. Accepts `degrees` (`120` by default) to alter the points.

```typescript
import quarks from '@quarksilver/core';

const { triad } = quarks.toolkit.colors.palette;

const color = '#f00000';

// degrees default = 120 = triadic scheme
triad(color);

// degrees = 150 = split complementary scheme
triad(color, 150);

// degrees = 90 = clash scheme
triad(color, 90);
```

###### tetrad()

Inscribes a rectangle on the color wheel. Accepts `degrees` (`60` by default) to alter the points.

```typescript
import quarks from '@quarksilver/core';

const { tetrad } = quarks.toolkit.colors.palette;

const color = '#f00000';

// degrees default = 60 = tetradic scheme
tetrad(color);

// degrees = 90 = square scheme
tetrad(color, 90);
```

#### toolkit.content

Exposes the core content utilities.

##### scale()

Responsible for outputting values in a modular scale from `ContentScaleSchema`.

```typescript
import quarks from '@quarksilver/core';
import {ContentScaleSchema} from '@quarksilver/core/dist-types/schema';

const { scale } = quarks.toolkit.content;

const data: ContentScaleSchema = {
  base: '1em',
  ratio: 1.25,
  // limit: 'full' = 17
}

scale(data);
```

#### toolkit.tokenize

Exposes utilities necessary for transforming design data into a format Style Dictionary can parse and generate design tokens from. Depending on your work process, you may not need these.

##### colors()

Transforms colors for consumption by Style Dictionary. Must assign a `key`. `data` will be directly translated if color is a swatch, or formatted as a scale if a palette.

```typescript
import quarks from '@quarksilver/core';

const { variants } = quarks.toolkit.colors;
const { tokenize } = quarks.toolkit;

const color = '#f00000';

// swatch
tokenize.colors(color, 'red');

// palette
tokenize.colors(variants.tints(color), 'main');
```

##### fonts()

Transforms a collection of fonts for consumption by Style Dictionary.

```typescript
import quarks from '@quarksilver/core';
import {ContentFontsSchema} from '@quarksilver/core/dist-types/schema';

const { tokenize } = quarks.toolkit;

const data: ContentFontsSchema = {
  'system-sans': {
    name: 'System (Sans)',
    stack:
    '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
    styles: [400, '400i', 700]
  },
  'system-serif': {
    name: 'System (Serif)',
    stack:
    'Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
    styles: [400, '400i', 700]
  },
  'system-mono': {
    name: 'System (Mono)',
    stack:
    'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace',
    styles: [400, '400i', 700]
  }
};

tokenize.fonts(data);
```

##### scale()

Transforms modular scale values for consumption by Style Dictionary.

```typescript
import quarks from '@quarksilver/core';
import {ContentScaleSchema} from '@quarksilver/core/dist-types/schema';

const { content, tokenize } = quarks.toolkit;

const data: ContentScaleSchema = {
  base: '1em',
  ratio: 1.25,
  limit: 8
}

tokenize.scale(content.scale(data))
```

