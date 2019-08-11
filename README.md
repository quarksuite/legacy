![Quarksilver Logo](/home/cr-jr/Code/project/@quarksilver/core/assets/logo-fullcolor-with-text.png)

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

*IMPORTANT: If you’re using Quarksilver Components and you attempt to update the library to v1.0.0, everything will break. And not gracefully. The v1.x.x API is entirely incompatible with previous versions and functionality. Tread carefully from here on if you’re an early adopter.*

## What?

Quarksilver is a tiny toolkit for making, modifying and manipulating design systems. Here we have the core module. The one that makes everything go. I recently [released v0.2.x of Quarksilver Components](http://npmjs.com/@quarksilver/components), and you can install them if you want, but don’t try to use them with the v1 API. It won’t work.

## Why Quarksilver?

Color harmony is a matter of geometry as much as having a good eye. Content is the **basic unit** of every decision about layout and composition. The units in the scale don’t matter as much as being consistent.

### Quarksilver is designed for consistency

The explosion of design systems in recent years reinforced this line of thought. Quarksilver is intended to make it easy to create and work with design data to create flexible design systems. The only limit for what you can do with these utilities is your imagination.

### Quarksilver aims to work however **you** work.

Quarksilver is made to be simple to use and simple to build upon. Three concerns inform the most basic design systems: **colors, content, composition**. Following that assumption is the organizing principle of this whole kit.

The other reasons:

### Focus the Web First

I believe this simplifies a lot. React, Vue, Angular, Polymer, and others have been instrumental to changing the way we work. And from that work, the v1 custom elements spec emerged. I’m going with the solution that’s as close to the web as possible.

Quarksilver’s components are also web components. Even better, web components can plug into any UI library or framework that uses HTML. Native tools with interoperability are essential when the web can live on your toaster. We’re no longer shackled by the limits of early web technologies. HTML, CSS, and JS can do much more now.

### DOTRW (Do One Thing Really Well)

Quarksilver’s thing is design systems. All functionality that allows excellent, maintainable design systems are aligned with Quarksilver’s objective and dev experience. From here, I’ll be focusing on making Quarksilver excel at its purpose.

### Make Room for Other Things

You could call this project the culmination of all the lurking I’ve done over the years as a designer and developer. Following trends, picking out patterns, and paying attention to what lasts. But more than any of it, I made this tool so we could spend less time on boilerplate considerations and more time building. 

## How to Use Quarksilver

### Quarksilver Installation

> Quarksilver requires **at least** Node.js LTS (v10.16.2 at the time of this writing). Also recommend getting the latest version of yarn.

When you’re all set, time to install.

```bash
npm i @quarksilver/core

# OR

yarn add @quarksilver/core
```

### Using Quarksilver

Quarksilver is organized under two main modules: `colors` and `toolkit`. The first contains convenience functions for generating palettes from color data. The second contains the bare metal utilities for constructing design systems.  

*IMPORTANT: I really can’t emphasize enough how much has changed between v0.2.x and v1.x.x. This is your last warning if you stumbled on the project early.*

Quarksilver has two main modules `colors` and `typography`. These contain all the currently available functionality for building with and modifying design data. As of v1.x.x, the core is no longer focused on generating tokens at the endpoint. But you can use this kit to build your data up to **use** with the design token generating libraries and tools already out there. To recommend two I’ve used: [Theo from Salesforce](https://github.com/salesforce-ux/theo) and [Style Dictionary from Amazon](https://amzn.github.io/style-dictionary/#/).

These are both excellent for **consuming** design data and outputting cross-platform design tokens that Quarksilver helps you generate.

## Overview of the Kit
```typescript
## Quarksilver API 
