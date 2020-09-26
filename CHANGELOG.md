# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Unreleased - 2020-09-25](#unreleased---2020-09-25)
  - [Removed](#removed)
  - [Added](#added)
    - [General](#general)
    - [Color Formats](#color-formats)
    - [scheme functions](#scheme-functions)
    - [scale functions](#scale-functions)
  - [Changed](#changed)
    - [Color Formats](#color-formats-1)
    - [color functions](#color-functions)
    - [variant functions](#variant-functions)
    - [scale functions](#scale-functions-1)
  - [Fixed](#fixed)
    - [prototyping functions](#prototyping-functions)
- [v3.3.0 - 2020-08-16](#v330---2020-08-16)
  - [Removed](#removed-1)
- [v3.2.1 - 2020-06-05](#v321---2020-06-05)
  - [Added](#added-1)
- [v3.2.0 - 2020-05-07](#v320---2020-05-07)
  - [Added](#added-2)
  - [Changed](#changed-1)
  - [Fixed](#fixed-1)
- [v3.1.0](#v310)
  - [Changed](#changed-2)
  - [Fixed](#fixed-2)
- [v3.0.0](#v300)
  - [Changed](#changed-3)
  - [Added](#added-3)
  - [Fixed](#fixed-3)
- [v2.4.1](#v241)
  - [Fixed](#fixed-4)
- [v.2.4.0](#v240)
  - [Changed](#changed-4)
- [v2.3.2](#v232)
  - [Fixed](#fixed-5)
- [v2.3.0](#v230)
  - [Changed](#changed-5)
  - [Added](#added-4)
  - [Fixed](#fixed-6)
  - [Removed](#removed-2)
- [v2.2.0](#v220)
  - [Changed](#changed-6)
- [v2.1.0](#v210)
  - [Changed](#changed-7)
  - [Removed](#removed-3)
- [v2.0.3](#v203)
  - [Fixed](#fixed-7)
- [v2.0.2](#v202)
  - [Fixed](#fixed-8)
- [v2.0.1](#v201)
  - [Changed](#changed-8)
- [v2.0.0](#v200)
  - [Added](#added-5)
  - [Removed](#removed-4)
  - [Changed](#changed-9)
- [v1.4.1](#v141)
  - [Changed](#changed-10)
- [v1.4.0](#v140)
  - [Added](#added-6)
  - [Removed](#removed-5)
- [v1.3.0](#v130)
  - [Changed](#changed-11)
- [v1.2.0](#v120)
  - [Fixed](#fixed-9)
- [v1.1.1](#v111)
  - [Added](#added-7)
- [v1.1.0](#v110)
  - [Changed](#changed-12)
- [v1.0.0](#v100)
  - [Added](#added-8)
  - [Changed](#changed-13)
  - [Fixed](#fixed-10)
  - [Removed](#removed-6)
- [v0.2.3](#v023)
  - [Added](#added-9)
- [v0.2.2](#v022)
  - [Changed](#changed-14)
  - [Fixed](#fixed-11)
- [v0.1.0](#v010)
  - [Added](#added-10)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Unreleased - 2020-09-25

> This project is now in its prerelease stage for v4. No more breaking changes will be written and you can expect launch
> by **10/5**

The upcoming version is another full rewrite and refinement. The notable changes include a flattened API, functional utilities,
wider support of CSS color format syntax, and a more intentional workflow. You'll want to check the README and API docs for the full view
of what's new and different.

### Removed

+ higher-order function `color.adjust` was unecessarily complex and error prone
+ `color.negate` and `color.complement` are just conveniences for certain adjustments. Use `hue(180, color)` and `mix(50, hue(180, color), color)`
+ `variant.blend` functionality is approximately covered by the new `custom` scheme function. That said, generating **gradients** is outside the scope of this project

### Added

#### General

+ Properly defined types
+ Updated logo

#### Color Formats

+ `rgb`/`hsl` newer syntax supported as input. ex: `rgb(110 44 95)`, `hsl(50 75% 25%)`, `hsla(250 72% 49% / 69%);`
+ `hsl` format now accepts negative hues
+ `hsl` format also accepts hue as gradians (`150grad`)

+ `alpha` color adjustment

#### scheme functions

+ `custom` now available for creating five hue, six hue, `n` hue, and other configurations not covered by the basic schemes

#### scale functions

+ `partition` now available for splitting large scales into smaller scales of a given size

### Changed

Functions in this library no longer come already curried. It made defining correct types a nightmare, and it also meant
documentation was needlessly complicated. That said, the new `set` function allows you to initialize any of the of the
other functions with a few of their arguments. And it can be chained. So... roughly the same thing


In addition, every function is now a top level module. The domain module API **will not work** with v4. The rewrite made 
encapsulation under domain modules (`color`, `scheme`, `variant`, etc...) cumbersome. 

#### Color Formats

+ Alpha transparency is no longer ignored
+ Alpha transparency is removed from color if adjusted to `100` percent

#### color functions

+ `hue` now binds all adjustments to one full revolution in either direction, correcting for the input
+ `mix` now respects and and mixes transparency
+ `color.a11y` is now `clrs`
+ the toFormat conversion functions are now just `hex`, `rgb`, `hsl`

#### variant functions

+ `tints`, `tones`, `shades` now blend with pure white, gray, and black. Blending them with the clrs.cc defaults was an opinionated choice

#### scale functions

`scale.output` is now `units`

### Fixed

+ Redundant operations were breaking conversion for some hex and named colors (mainly `dodgerblue` and `color.a11y('orange')`)
+ colors now properly validate **before** they're transformed or generated
+ types now properly built and documented
+ `merge` was not actually merging. It now correctly removes duplicates
+ the variant functions were not properly sorting sorting tints, tones, or shades. Now it sorts correctly

#### prototyping functions

+ `typography.system` is now `systemfonts`

## v3.3.0 - 2020-08-16

### Removed

+ `color.toW3C` was both unnecessary and error-prone. So that's gone

## v3.2.1 - 2020-06-05

### Added

+ link to the starter kit

## v3.2.0 - 2020-05-07

### Added

+ `color.hue`, `color.saturation`, and `color.lightness` adjustment helpers and aliases

### Changed

+ Documentation examples updated

### Fixed

+ No more implicit rgb conversions when using the color modules. The format will match the format of the input color

## v3.1.0

### Changed

+ `color.convert` split into discrete `color.toHex`, `color.toHSL`, `color.toRGB`, and `color.toW3C` functions. [See the API](API.md)
+ Documentation examples updated

### Fixed

+ More internal refactoring and tightening up

## v3.0.0

### Changed

+ `hue`, `saturation`, `lightness` reduced to one function `color.adjust`. [See the API](API.md)
+ `scale.modify` renamed `scale.update`
+ Entire structure overhauled to be more declarative, functions curried
+ `pipe` composition helper added to `color` and `scale` modules
+ Entirely rewritten and ordered documentation
+ `variant.create` renamed `variant.blend`
+ License changed to MIT

### Added

+ `color.a11y`: a function that accepts a color and grabs its [clrs.cc](http://clrs.cc) accessible default if it exists
+ Code of Conduct

### Fixed

+ more logical errors with color creation, manipulation, and conversion have been resolved
+ reduced overall library size
+ removed some unneeded arguments. [See the API](API.md) 

## v2.4.1

### Fixed

+ properly built type definitions (again)

## v.2.4.0

### Changed

+ Reimplemented `color.format` as `color.convert`. See the [API docs](API.md) for details

## v2.3.2

### Fixed

+ properly built type definitions

## v2.3.0

This version is a bridge between the structure of v2 and the structure of the forthcoming v3. I was going to hold off on releasing until the v3 structure was implemented, but the many improvements to the current API and underlying logic justified a minor release.

### Changed

+ color module separated into `color`, `scheme` `variant` modules. See the [API docs](API.md) for details

### Added

+ `hue`, `saturation`, `lightness` modifiers added to color functions
+ scheme functions further separated into `complementary`, `analogous`, `triad`, and `tetrad`. [See API](API.md)
+ variant functions further separated into `create` for general blends, `tints`, `tones`, `shades`. See the [API docs](API.md).

### Fixed

+ improved calculation of color transformations

### Removed

+ linear blend mode in variant generation. It was kind of just there
+ precision parameter removed from `scale.output`. Not much practical use for it

## v2.2.0

### Changed

+ Simplified the way `typography.system` works. See the [API docs](API.md) for details
+ Updated quickstart in [README.md](README.md)

## v2.1.0

### Changed

+ The functionality of `color.palette` has been split back into `color.scheme` and `color.variants`. See the [API docs](API.md) for details

### Removed

+ Alpha channel conversion and formatting options. Many environments have native ways of changing the alpha transparency of a color, so it amounted to cruft
+ `color.palette`

## v2.0.3

### Fixed 

+ Updated dev dependencies

## v2.0.2

### Fixed

+ Hue for HSL format returned `NaN` for grayscale colors.

## v2.0.1

### Changed

+ added link to [design token template repo](https://github.com/quarksuite/tokens-template) and simplified quickstart example

## v2.0.0

### Added

+ Color conversion function `color.format`. See the [API docs](API.md) for details.
+ System stack typography function `typography.system`. See the [API docs](API.md) for details.

### Removed

+ tinycolor2 as a dependency
+ cleaned more unused settings

### Changed

+ Color and scale functions were rewritten to be simpler and behave a little differently. [Check out the API documentation](API.md) for more details.
+ API rewritten with fewer technical details

## v1.4.1

### Changed

+ documentation now includes examples of integrating Quarksuite with Style Dictionary or Theo to generate design tokens.

## v1.4.0

### Added

+ tinycolor2 as a dependency. Color output **will** change if you upgrade
+ Color API has been rewritten internally to use tinycolor2, but still functions the same

### Removed

+ chroma-js as a dependency. tinycolor2 is smaller and faster
+ cleaned some unused packages

## v1.3.0

### Changed

+ `color.scheme` functions now only output the base scheme colors out of recognition that you may want to choose whether to include tints, tones, or shades
+ API documentation moved to separate file

## v1.2.0

### Fixed

+ `scale.multistrand` was erroring in node environments that didn’t recognize `Array.prototype.flat()`. Now uses more compatible flattening internally

## v1.1.1

### Added

+ documentation about the domain of Quarksuite; what it is and isn’t used for
+ updated logo

## v1.1.0

### Changed

+ exports discrete `color` and `content` objects instead of default. See the docs for more

## v1.0.0

### Added

+ new content API with scale module
+ contributor guidelines
+ local development guide

### Changed

+ color API was rewritten from scratch to be simpler to use

### Fixed

+ project size drastically reduced

### Removed

+ `modularscale-js` as a dependency

## v0.2.3

### Added

+ Informs visitors of a project migration and continued development

## v0.2.2

### Changed

+ Updates the logo

### Fixed

+ Documentation assets are properly included in the package

## v0.1.0

Initial release.

### Added

+ Color toolkit for building schemes from the ground up
+ Custom color module for working with config-like objects
+ Color scheme module for building basic palettes
+ toolkit for tokenizing data to pass on to Style Dictionary
