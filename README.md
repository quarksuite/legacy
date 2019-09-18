# Quarksuite (Core)

Quarksuite is a kit aimed at helping developers create consistent, independent baselines for design systems. I built it to bridge the gap between having a mature design system and not having one at all.

That said:

Decisions about design are meaningful because of people. You can build a small or large baseline as you want with this project. Quarksuite will generate your palette, basic system font stacks, and your sizing and proportion scales without much issue.

However, none of it matters without a clear understanding of your audience, appropriate messaging, visuals, iconography, and content. Quarksuite can’t help you with any of that.

## Goals

### Small, Yet Complete

Quarksuite travel light: Ongoing development aims for simpler ways to use the library while keeping it small and fast for the wide spectrum of network speeds.

### Modify > Configure

Quarksuite assumes you want to build your idea as quickly as possible. Many of the functions have default output with options to change it according to your needs. This is intended to streamline setup and avoid, where possible, burdening developers with even more decisions to make.

### Your Data, Your Methods

Quarksuite imposes no structural rules about how you use your design system baseline. You can generate all of your design data in one file. You can also split it up and create mini-systems for your current and future projects. You can even generate design tokens with Style Dictionary or Theo to uncouple Quarksuite from your data entirely if you ever want to stop using it.

## Features

+ Three tiny modules (`color`, `typography`, `scale`)
+ Modify colors, create palettes and schemes, convert CSS formats
+ Ready-to-use cross-platform [OS font stacks](https://systemfontstack.com/)
+ Create, modify, and merge modular scales for sizing and proportion. Output with relative or absolute units and value precision
+ No framework, no dependencies. Build the way you want

## Installation

### As a Module

> You’ll require at least Node.js LTS (v10.16.x) to use Quarksuite as a module. I would recommend installing Yarn as well.
```bash
npm install @quarksuite/core

# OR

yarn add @quarksuite/core
```

Then in any file:

```js
const {color, typography, scale} = require('@quarksuite/core');

// OR with ES Modules
import {color, typography, scale} from '@quarksuite/core';
```

### In the Browser

```html
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Quarksuite (v2.0.0) Example</title>
  </head>
  <body>
    <script src="https://unpkg.com/@quarksuite/core@2.0.0/dist-web/index.js"></script>
  </body>
</html>
```

## Quickstart

As a demonstration, I’ll show you you how I created Quarksuite’s own system baseline. 

### Setup

```js
/* system */

const { color, typography, scale } = require('@quarksuite/core');

// Create an object to collect system data
let system = {};
```

### Color Palette

```js
/* system.js */

// Beginning with the brand color, generate a basic triadic scheme.

/* Color */

const brand = '#348ec9';

// Create a triadic base scheme to modify
const baseScheme = color.palette(brand, {
  scheme: { type: 'triadic' }
});

// sets primary palette with three tints, two shades
const primary = color.palette(baseScheme[0].base, {
  tints: { limit: 3 },
  shades: { limit: 2 },
  format: 'hex'
});

// format the others as is
const secondary = color.palette(baseScheme[1].base, {
  format: 'hex'
});

const tertiary = color.palette(baseScheme[2].base, {
  format: 'hex'
});

// Add colors to data
system = {
  ...system,
  color: { primary, secondary, tertiary }
};
```

### Typography

```js
/* system */

/* Typography */

// Use sans-serif and serif system stack
const sans = typography.system('sans');
const serif = typography.system('serif');

// Collect font data
system = {
  ...system,
  font: {
    system: { sans, serif }
  }
}
```

### Proportions and Spacing

```js
/* system */

/* Scales */

// First, create a global scale with eight values
const baseScale = scale.create(1, 'maj3rd', 8);

// Read https://every-layout.dev/rudiments/units for the
// reasoning behind having block and inline element scales.

// 18px / root = 1.125em
const block = scale.modify(baseScale, 1.125, (n, v) => n * v);

// 5px / root = 0.3125em
const inline = scale.modify(baseScale, 0.3125, (n, v) => n * v);

// Collect scale data
system = {
  ...system,
  scale: {
    block: scale.output(block, 'rem'),
    inline: scale.output(inline, 'em')
  }
}
```

### Output

```js
// Output the system for usage
module.exports = system;
```

## REPL

Pika provides a REPL that lets you [play with Quarksuite](https://www.pika.dev/packages/@quarksuite/core/repl) before deciding if you want to commit to yet another developer tool. Take your time and try it out.

## Quarksuite & X

This project aims to work with what you already use. The following sections will demonstrate how to use Quarksuite with a few sample workflows to get started. You can submit a pull request to add to this section.

### Task: Generate Design Tokens

#### Quarksuite & [Style Dictionary](https://amzn.github.io/style-dictionary/) (CSS Custom Properties/Node/Web/JSON)

##### Install Style Dictionary

```bash
npm install style-dictionary -D

# OR

yarn add style-dictionary --dev
```

##### tokens.js

```js
// Using my own system for example
const system = require('system');

// Define an object to collect token formats
let tokens = {}

/* Color */

// Convert colors
const colors = Object.keys(system.color).reduce((coll, category) => {
  const [color] = system.color[category];
  let { base, tint, shade } = color;
  if (!tint || !shade)
    return {
      ...coll,
      ...{
        [category]: {
          base: { value: base },
        }
      }
    };
  return {
    ...coll,
    ...{
      [category]: {
        base: { value: base },
        tint: tint.reduce((c, value, i) => {
          return { ...c, ...{ [`${++i}00`]: { value } } };
        }, {}),
        shade: shade.reduce((c, value, i) => {
          return { ...c, ...{ [`${++i}00`]: { value } } };
        }, {})
      }
    }
  };
}, {});

tokens = {
  ...tokens,
  color: colors
};

// Convert typography
const fonts = Object.keys(system.font.system).reduce((coll, font) => {
  return {
    ...coll,
    ...{
      ...{
        [font]: { value: system.font.system[font] }
      }
    }
  };
}, {});

tokens = {
  ...tokens,
  font: { system: fonts }
};

// Convert scales
const scales = Object.keys(system.scale).reduce((coll, type) => {
  return {
    ...coll,
    ...{
      [type]: system.scale[type].reduce((c, value, i) => {
        if (i === 0) return { ...coll, ...{ base: { value } } };
        return {
          ...c,
          ...{
            [`${++i}x`]: { value }
          }
        };
      }, {})
    }
  };
}, {});

// Remove recursive block object
delete scales.inline.block;

tokens = {
  ...tokens,
  ms: scales
};

module.exports = tokens;
```

##### build.js

```js
const { writeFileSync } = require('fs');
const StyleDictionary = require('style-dictionary');
const data = require('./tokens');

// Token output config
const platforms = {
  css: {
    transformGroup: 'css',
    buildPath: 'dist/',
    files: [
      {
        format: 'css/variables',
        destination: 'system.css'
      }
    ]
  },
  node: {
    transformGroup: 'js',
    buildPath: 'dist/',
    files: [
      {
        format: 'javascript/module',
        destination: 'system.node.js'
      }
    ]
  },
  web: {
    transformGroup: 'js',
    buildPath: 'dist/',
    files: [
      {
        name: 'QuarksuiteDSB',
        format: 'javascript/object',
        destination: 'system.web.js'
      }
    ]
  },
  data: {
    transformGroup: 'js',
    buildPath: 'dist/',
    files: [
      {
        format: 'json/nested',
        destination: 'system.json'
      }
    ]
  }
};

// Write data to temporary file
writeFileSync('.system-sd.json', JSON.stringify(data, null, 2));

// Build tokens
StyleDictionary.extend({
  source: [`.system-sd.json`],
  platforms
}).buildAllPlatforms();
```

##### Run

```bash
node build

css
✔︎  dist/system.css

node
✔︎  dist/system.node.js

web
✔︎  dist/system.web.js

data
✔︎  dist/system.json
```

##### CSS

```css
/**
 * Do not edit directly
 * Generated on Tue, 17 Sep 2019 22:30:43 GMT
 */

:root {
 --color-primary-base: #348ec9;
 --color-primary-tint-100: #97badc;
 --color-primary-tint-200: #cfdeed;
 --color-primary-tint-300: #fbfcfe;
 --color-primary-shade-100: #276791;
 --color-primary-shade-200: #131e27;
 --color-secondary-base: #8fcb34;
 --color-tertiary-base: #cb348f;
 --font-system-sans: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
 --font-system-serif: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
 --axioms-root: calc(1rem * 0.5vw);
 --axioms-measure: 72ch;
 --ms-block-base: 1.125rem;
 --ms-block-2-x: 1.406rem;
 --ms-block-3-x: 1.758rem;
 --ms-block-4-x: 2.197rem;
 --ms-block-5-x: 2.747rem;
 --ms-block-6-x: 3.433rem;
 --ms-block-7-x: 4.292rem;
 --ms-block-8-x: 5.364rem;
 --ms-inline-base: 0.3125em;
 --ms-inline-2-x: 0.3906em;
 --ms-inline-3-x: 0.4883em;
 --ms-inline-4-x: 0.6104em;
 --ms-inline-5-x: 0.7629em;
 --ms-inline-6-x: 0.9537em;
 --ms-inline-7-x: 1.192em;
 --ms-inline-8-x: 1.49em;
}

```

## Quarksuite API

[Browse the API here](API.md).

## Contributing

Please [read the contribution guidelines](CONTRIBUTING.md).

## Development

If you’d like to hack on Quarksuite in a local environment, do the following:

#### Clone the Repo

```bash
https://github.com/quarksuite/core.git
```

#### Install Dependencies

```bash
npm install 

# OR

yarn
```

#### Commands

+ `npm run test`  OR `yarn test`: run unit tests
+ `npm run build`  OR `yarn build`: build project 
