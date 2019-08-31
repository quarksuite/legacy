# Quarksuite (Core)

Quarksuite is a toolkit that helps create a subatomic foundation for design systems. It provides what you need to maintain consistency and ease implementation of the **boilerplate** concerns of your system. Quarksuite is meant to bridge the gap between having a mature design system versus having one at all.

## What Quarksuite Is

### A Starting Point

Colors, content proportions, and spacing aren’t the whole of a design system. A system emerges from concerns that are in play before we even write a line of code. Made by people and not tools.

### Interoperable

Quarksuite begins and ends with data. Data travels faster than a framework. This means you can also generate design tokens for your system using tools like Theo and Style Dictionary.

## What Quarksuite Isn’t

### A Design System

Quarksuite is not, in itself, a design system. It creates subatomic data you can use **within** a design system.

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

+ A simple API (`colors`, `content`)
+ Color palette and scheme generation you can modify down to the swatch
+ Modular scale generation you can modify down to the unit
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
    <script src="https://unpkg.com/@quarksuite/core@1.4.0/dist-web/index.js"></script>
  </body>
</html>
```

## Creating A Design System Baseline with Quarksuite

As an example:

```js
const { color, content } = require('@quarksuite/core');

const { palette, scheme } = color;
const scale = content.scale;

/** Colors */

// Set a base color
const brand = '#348ec9';

// Create a base scheme
const baseScheme = scheme.triadic(brand);

const colors = ['brand', 'secondary', 'accent'].reduce(
  (container, category, index) => {
    const value = baseScheme[index];

    const variants = v =>
      v.reduce((container, value, index) => {
        return { ...container, ...{ [`${++index}00`]: { value } } };
      }, {});

    return {
      ...container,
      ...{
        [category]: {
          base: { value },
          tint: variants(palette.tints(value, 3)),
          tone: variants(palette.tones(value, 3)),
          shade: variants(palette.shades(value, 3))
        }
      }
    };
  },
  {}
);

/** Content */

const baseScale = scale.build(scale.ratios.perfect5th, 6);

const ms = scale
  .output(baseScale, 3, 'vw')
  .reduce((container, value, index) => {
    return { ...container, ...{ [index]: { value } } };
  }, {});

const spacing = scale
  .output(scale.augment(0.15, baseScale, (b, v) => b * v), 2, 'em')
  .reduce((container, value, index) => {
    return { ...container, ...{ [index]: { value } } };
  }, {});

const data = {
  color: colors,
  ms,
  spacing
};

module.exports = data;
```
## Quarksuite & X

One of Quarksuite’s stated goals is interoperability with what you already use. The following sections illustrate how to integrate Quarksuite data with a few example workflows. You can submit a pull request to add more.

### Task: Generate Design Tokens

#### Quarksuite & Style Dictionary (CSS Custom Properties/Sass/LESS)

##### Install Style Dictionary

```bash
npm install style-dictionary -D

# OR

yarn add style-dictionary --dev
```

##### system.js

```js
const { color, content } = require('@quarksuite/core');

const { palette, scheme } = color;
const scale = content.scale;

/** Colors */

// Set a base color
const brand = '#348ec9';

// Create a base scheme
const baseScheme = scheme.triadic(brand);

const colors = ['brand', 'secondary', 'accent'].reduce(
  (container, category, index) => {
    const value = baseScheme[index];

    const variants = v =>
      v.reduce((container, value, index) => {
        return { ...container, ...{ [`${++index}00`]: { value } } };
      }, {});

    return {
      ...container,
      ...{
        [category]: {
          base: { value },
          tint: variants(palette.tints(value, 3)),
          tone: variants(palette.tones(value, 3)),
          shade: variants(palette.shades(value, 3))
        }
      }
    };
  },
  {}
);

/** Content */

const baseScale = scale.build(scale.ratios.perfect5th, 6);

const ms = scale
  .output(baseScale, 3, 'vw')
  .reduce((container, value, index) => {
    return { ...container, ...{ [index]: { value } } };
  }, {});

const spacing = scale
  .output(scale.augment(0.15, baseScale, (b, v) => b * v), 2, 'em')
  .reduce((container, value, index) => {
    return { ...container, ...{ [index]: { value } } };
  }, {});

const data = {
  color: colors,
  ms,
  spacing
};

module.exports = data;
```

##### build.js

```js
const { writeFileSync } = require('fs');
const StyleDictionary = require('style-dictionary');
const data = require('./system');

// Token output config
const platforms = ['css', 'scss', 'less'].map(ext => ({
  transformGroup: ext,
  buildPath: 'dist/',
  files: [
    {
      format: `${ext}/variables`,
      destination: ext === 'scss' ? `_system.${ext}` : `system.${ext}`
    }
  ]
}));

// Write data to JSON file
writeFileSync('system.json', JSON.stringify(data, null, 2));

// Build tokens
StyleDictionary.extend({
  source: [`*.json`],
  platforms
}).buildAllPlatforms();
```

##### Run

```bash
node build.js

css
✔︎  dist/system.css

scss
✔︎  dist/_system.scss

less
✔︎  dist/system.less
```

##### Output

```css
/* dist/system.css */

/**
 * Do not edit directly
 * Generated on Tue, 27 Aug 2019 16:58:34 GMT
 */

:root {
 --color-brand-base: #348ec9;
 --color-brand-tint-100: #76b2da;
 --color-brand-tint-200: #b7d6eb;
 --color-brand-tint-300: #f9fbfd;
 --color-brand-tone-100: #5a97bf;
 --color-brand-tone-200: #80a0b5;
 --color-brand-tone-300: #a6a9ac;
 --color-brand-shade-100: #296b96;
 --color-brand-shade-200: #1f4763;
 --color-brand-shade-300: #142430;
 --color-secondary-base: #c9348e;
 --color-secondary-tint-100: #da76b2;
 --color-secondary-tint-200: #ebb7d6;
 --color-secondary-tint-300: #fdf9fb;
 --color-secondary-tone-100: #bf5a97;
 --color-secondary-tone-200: #b580a0;
 --color-secondary-tone-300: #aca6a9;
 --color-secondary-shade-100: #96296b;
 --color-secondary-shade-200: #631f47;
 --color-secondary-shade-300: #301424;
 --color-accent-base: #8ec934;
 --color-accent-tint-100: #b2da76;
 --color-accent-tint-200: #d6ebb7;
 --color-accent-tint-300: #fbfdf9;
 --color-accent-tone-100: #97bf5a;
 --color-accent-tone-200: #a0b580;
 --color-accent-tone-300: #a9aca6;
 --color-accent-shade-100: #6b9629;
 --color-accent-shade-200: #47631f;
 --color-accent-shade-300: #243014;
 --ms-0: 1vw;
 --ms-1: 1.5vw;
 --ms-2: 2.25vw;
 --ms-3: 3.38vw;
 --ms-4: 5.06vw;
 --ms-5: 7.59vw;
 --spacing-0: 0.15em;
 --spacing-1: 0.22em;
 --spacing-2: 0.34em;
 --spacing-3: 0.51em;
 --spacing-4: 0.76em;
 --spacing-5: 1.1em;
}
```
## Quarksuite API

[Browse the API here](API.md)

## Contributing

If you’d like to help Quarksuite grow, you have any suggestions to improve its code, or you have something awesome in mind that I didn’t consider, please create an issue or pull request and we’ll discuss further.

### Guidelines

#### On Features Outside the Scope of Quarksuite's Goals

I will not accept any requests to build features outside of Quarksuite's stated goals. This is not meant to be a swiss army knife for design. It's meant to assist in building design systems and output data consumable by other design tools. If you want to use Quarksuite-created design data as tokens, you can. But it will never be built into the core.

#### On Opening Issues

I understand it's frustrating when code breaks. Especially when you’re on a tight schedule. But if I don’t respond right away, I’ll be with you as soon as I can. Rudeness won't encourage a swifter response. Quite the opposite.

#### On Pull Requests

As of v1, I’m open to improvements and code review. I want this project to be great, and I could really use your help.

## Development

If you’d like to hack on Quarksuite in a local environment, this section is for you.

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

+ `test`: run unit tests
+ `build`: build project 
