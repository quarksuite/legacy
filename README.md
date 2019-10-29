# Quarksuite (Core)

Quarksuite is a kit aimed at helping developers create consistent, independent baselines for design systems. Built to bridge the gap between having a mature system and not having one at all.

## Goals

### Small, Yet Complete

Quarksuite travels light: Ongoing development aims for simpler ways to use the library while keeping it small and fast for the wide spectrum of network speeds.

### Modify > Configure

Quarksuite assumes you want to build your idea as quickly as possible. Many of the functions have default output with options to change it according to your needs. This is intended to streamline setup and avoid, where possible, burdening developers with even more decisions to make.

### Your Data, Your Methods

Quarksuite imposes no structural rules about how you use your design system baseline. You can generate all of your design data in one file. You can also split it up and create mini-systems for your current and future projects. You can even generate design tokens with Style Dictionary or Theo to uncouple Quarksuite from your data entirely if you ever want to stop using it.

## Features

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

The recommended way to get up and running with Quarksuite is to [clone the design token template](https://github.com/quarksuite/tokens-template) and modify it according to your needs.

If you’d like a bare example:

```js
// Assuming node module

const {color, typography, scale} = require('@quarksuite/core');

/* Colors */

// Monochromatic with tints, shades
const palette = color.palette('#aaa', {
  tints: {}, shades: {}
})

/* Typography */

// System sans
const font = typography.system('sans');

/* Modular Scale */

// base = 1, ratio = 'golden', limit = 6
const ms = scale.create();

// Output
module.exports = {
  palette,
  font,
  ms
}
```

## REPL

Pika provides a REPL that lets you [play with Quarksuite](https://www.pika.dev/packages/@quarksuite/core/repl) before deciding if you want to use it. Take your time and try it out.

## Quarksuite API

[Browse the API here](API.md).

## Contributing

Please [read the contribution guidelines](CONTRIBUTING.md).

## Development

If you’d like to hack on Quarksuite in a local environment, do the following:

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

+ `npm run test`  OR `yarn test`: run unit tests
+ `npm run build`  OR `yarn build`: build project 

## Credit

All of the code for the new internal color conversions was modified from [this CSS Tricks article by Jon Kantner](https://css-tricks.com/converting-color-spaces-in-javascript). Be sure to read it if you want to understand how they work.

