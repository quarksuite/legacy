# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

