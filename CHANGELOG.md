# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased - 2020-09-22

> This project is currently being rewritten. Tread carefully

### Removed

+ higher-order function `color.adjust` was unecessarily complex and error prone
+ `color.negate` and `color.complement` are just conveniences for certain adjustments. Use `color.hue(180, color)` and `color.mix(50, color.hue(180, color), color)`

### Added

#### Color Formats

+ `rgb`/`hsl` newer syntax supported as input. ex: `rgb(110 44 95)`, `hsl(50 75% 25%)`, `hsla(250 72% 49% / 69%);`
+ `hsl` format now accepts negative hues
+ `hsl` format also accepts hue as gradians (`150grad`)

+ UMD build for legacy environments
#### Modules

##### color

+ `color.alpha` color adjustment
+ `color.settings` function that partially applies any color function
+ `color.create` function that allows you to compose color functions
+ `color.utilities` wraps `color.to[format]` conversion functions, and `color.a11y` . **They're not
  intended to be used as part of the main workflow in v4**

##### scheme

+ `scheme.custom` now available for creating five hue, six hue, `n` hue, etc

### Changed

#### Color Formats

+ Alpha transparency is no longer ignored
+ Alpha transparency is removed from color if adjusted to `100` percent

#### Modules

##### color

+ `color.hue` now binds all adjustments to one full revolution in either direction, correcting for the input
+ `color.mix` now respects and and mixes transparency
+ `color.complement`, `color.negate`, and `color.a11y` are now functions of `color.utilities`

### Fixed

+ Redundant operations were breaking conversion for some hex and named colors (mainly `dodgerblue` and `color.a11y('orange')`)
+ colors now properly validated **before** they're transformed or generated

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
