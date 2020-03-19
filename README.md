# Quarksuite (Core)

![Quarksuite Logo](assets/logo.png)

Quarksuite is a kit aimed at helping developers create consistent, independent baselines for design systems. Built to bridge the gap between having a mature system and not having one at all.

## Goals

### Small, Yet Complete

Quarksuite travels light: Ongoing development aims for ease and efficiency.

### Modify > Configure

Quarksuite is designed with a set of defaults in mind that will help you get started quickly. This is intended to streamline setup and avoid, where possible, burdening developers with even more decisions to make.

### Your Data, Your Methods

Quarksuite imposes no structural rules about how you use your baseline. You can generate all of it in one file. You can also split it up and create mini-boilerplates for your current and future projects.

## Features

+ Modify colors, create palettes and schemes, ~~convert CSS formats~~ (currently reworking)
+ Ready-to-use [OS font stacks](https://systemfontstack.com/)
+ Create, modify, and merge modular scales for content, layout, and proportion
+ No framework required. Build the way you want

## Installation

### As a Module

> You’ll require at least Node.js LTS to use Quarksuite as a module. I would recommend installing Yarn as well.

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

Do the above, then:

```bash
npx snowpack
```

```html
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Quarksuite (v2.3.0) Example</title>
  </head>
  <body>
    <script type="module" src="/index.js"></script>
  </body>
</html>
```

```js
import { color, typography, scale } from '/web_modules/@quarksuite/core.js';

// Your baseline system
```

OR

```html
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Quarksuite (v2.3.0) Example</title>
  </head>
  <body>
    <script type="module">
      import { color, typography, scale } from "https://unpkg.com/@quarksuite/core@2.3.0/dist-web/index.js"
      
      // Your baseline system
    </script>
  </body>
</html>
```

## Quickstart

```js
// Assuming node module

const {variant, typography, scale} = require('@quarksuite/core');

// A barebones monochromatic templating scheme
const base = '#aaaaaa';

exports.palette = {
  base,
  tints: variant.tints(base, 95, 3),
  shades: variant.shades(base, 95, 3)
};

// System font stacks
const [sans, serif, mono] = typography.system();

exports.font = {
  sans,
  serif,
  mono
}

// Content and proportion scales
const baseProp = scale.create(1, 'octave', 4);

exports.scale = {
  content: scale.output(scale.create(1, 'maj3rd')),
  block: scale.output(baseProp),
  inline: scale.output(baseProp, 'em')
};

```

## REPL

You can [try out the latest version](https://npm.runkit.com/%40quarksuite%2Fcore) of Quarksuite on RunKit to see if it fits your needs.

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

+ `npm run dev` OR `yarn dev`: run tests on save
+ `npm run build`  OR `yarn build`: build project

## Credit

All of the code for the new internal color conversions was modified from [this CSS Tricks article by Jon Kantner](https://css-tricks.com/converting-color-spaces-in-javascript). Be sure to read it if you want to understand how they work.

