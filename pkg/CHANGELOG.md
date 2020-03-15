# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).‘’

## [Unreleased]

### Updated

+ License changed to MIT. MPL-2.0 is robust and comprehensive but also more restrictive than I'd like

### Added

+ Refactor of the entire codebase: each module can now be used two ways.
  + Method chaining mode (`new Color('dodgerblue').mix('rebeccapurple').shiftHue(72).swatchSate`)
  + Combinator mode (`color('dodgerblue', mix, shiftHue, scheme(triadic, complementary), variants(tints, shades)`)
+ Discreet functions folded into `Color`, `Typography`, `Scale` classes. The API is lot more flexible and expressive

### Fixed

+ peculiarities with color manipulation have been resolved

### Removed

+ linear blend mode in variant generation. It amounted to little more than choice for the sake of choice
+ A ton of now unused functionality. Library is even slimmer

## 2.2.0

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

