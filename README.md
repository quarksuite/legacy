# [Quarksilver (Core)](#quarksilver-core)

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
    - [Installation](#installation)
- [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## [What?](#what)

Quarksilver is a tiny toolkit for making, modifying and manipulating design systems. What you’re viewing now is the core module. The one that makes everything go. Other planned nodes in the Quarksilver network include a CLI and a web application.

## [Why Quarksilver?](#why-quarksilver)

Ever since I started learning the craft of digital design nearly a decade ago, I was needled by the sense that foundational design decisions could be automated to a point. That colors are a matter of geometry as much as taste. That the typefaces we choose also provide valuable information in their attributes about *how* to use them. That our content is the **basic unit** of every decision about layout.

The advent of style guides followed by the explosion of design systems curbed a lot of bikeshedding habits in the industry. At the same time, I didn’t see many toolkits for constructing the foundation. I **did** see a lot of specialized kits for specific frameworks.

Quarksilver joins the clan of kits aiming to ease the churn. Build however you build best.

### [Philosophy](#philosophy)

Quarksilver is designed to be simple to use and simple to build upon. Three concerns inform the most basic design systems: **colors, content, composition**. Following that assumption is the organizing principle of this entire toolkit.

The other reasons I built this…

#### [The Web First](#the-web-first)

I believe targeting the web first simplifies a lot my work as, well, a front-end web developer. I know of React, Vue, Angular, and others; but I’m backing the web components horse all the way. To the extent that Quarksilver’s components are web components. Native tools with interoperability are awesome. We’re no longer shackled by the many limits of early web technologies. Regular HTML, CSS, and JS can do much more now.

#### [DOTRW (Do One Thing Really Well)](#do-one-thing-really-well)

Quarksilver’s “thing” is design systems. All functionality that allows excellent, maintainable design systems will be built into Quarksilver. And from there, it will simply be made better and more efficient at doing its “thing”.

#### [Make Room](#make-room)

The main reason I built a simple toolkit for making design systems is that I honestly don’t want to spend a lot of time **making** design systems. I have a habit of spending long hours building things, so that I won’t have to spend long hours building **other** things.

Now, let’s move on to what you can actually do with Quarksilver.

## [How to Use Quarksilver](#how-to-use-quarksilver)

### [Installation](#quarksilver-installation)

> Quarksilver requires **at least** Node.js LTS (v10.16.0 at the time of this writing). Also recommend getting the latest version of yarn.



When you’re all set up, it’s time to install.

```bash
npm i @quarksilver/core

# OR

yarn add @quarksilver/core
```

### [Usage](#usage)

As I said above, Quarksilver is organized by three main modules: `colors`, `content`, `composition`. A host of utility functions are defined for each operation, so let’s get started.

#### [Quickstart](#quickstart)

