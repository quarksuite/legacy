![Quarksilver Logo](/home/cr-jr/Code/project/@quarksilver/core/assets/logo-fullcolor-with-text.png)

# Quarksuite (Core)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Table of Contents

- [Introduction](#introduction)
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
    - [color.scale](#colorscale)
        - [create()](#create)
        - [build()](#build)
        - [multistrand()](#multistrand)
        - [augment()](#augment)
        - [output()](#output)
        - [ratios](#ratios)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

*IMPORTANT: If you’re using Quarksuite Components and you attempt to update the library to v1.0.0, everything will break. And not gracefully. The v1.x.x API is entirely incompatible with previous versions and functionality. Tread carefully from here on if you’re an early adopter.*

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

## Quarksuite API Documentation

### color.scale

#### create()

#### build()

#### multistrand()

#### augment()

#### output()

#### ratios