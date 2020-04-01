# API (v3.0.0)

*The modules in v3.0.0 of Quarksuite come with curried functions. You can [read more about currying](https://medium.com/@kbrainwave/currying-in-javascript-ce6da2d324fe) in this article*.

You can [try out all examples on RunKit](https://npm.runkit.com/%40quarksuite%2Fcore).

## Color Functions

The color functions accept a `color` of any valid CSS format (hex, rgb, hsl, w3c named colors). Keep in mind that there is no processing of alpha transparency. 

*Also, for simplicity, `hsl()` values don't currently wrap negative hue values. This means `hsl(-30, 58%, 50%)` will throw an error in this version even though it's a valid CSS color.*

*I'll implement the negative hue syntax, if it's truly needed, in a future update. [Let me know in the issues](https://github.com/quarksuite/core/issues) or you can submit a pull request.* 

### color.pipe

This function executes operations in a right to left order on a color.

#### Call

+ `color.pipe(...operations)(color)`

#### Params

+ `operations: Function[]`: The chain of functions to execute
+ `color: string`: the color to transform

#### Returns

`string`: the color after all transformations are applied as `rgb()`

#### Example

```js
const swatch = color.a11y('orange');
const desat = color.adjust('saturation', s => s - 10); // valid: standby argument is color
const mixRed = color.mix(color.a11y('red'), 45); // valid: standby argument is color

// color -> desaturate color by 10% -> mix 45% with red -> color
color.pipe(mixRed, desat)(swatch)
```

#### Notes

+ It's better to perform color adjustments before mixtures
+ Pay special attention to the result of hue adjustments **after** mixtures

### color.a11y

This function matches the colors [defined on clrs.cc](http://clrs.cc) to provide more accessible web defaults.

#### Call

+ `color.a11y(color)`

#### Params

`color: string`: the color to query for its accessible counterpart

#### Returns

`string | (() => never)`: the found color as `rgb()` or an error

#### Example

```js
// Use clrs.cc teal
color.a11y('teal');

// Use clrs.cc orange
color.a11y('orange');

// Use clrs.cc yellow
color.a11y('yellow');
```

### color.adjust

This function allows you to adjust the properties of a color with a modifier function.

#### Calls

+ `color.adjust(property)(modifier)(color)`
+ `color.adjust(property)(modifier, color)`
+ `color.adjust(property, modifier)(color)`
+ `color.adjust(property, modifier, color)`

#### Params

+ `property: string`: the property of the color you want to modify (`hue`, `saturation`, `lightness`)
+ `modifier: (current: number) => number`: modifier function to adjust the property
+ `color: string`: the color to modify

#### Returns

`string`: an adjusted color as `rgb()`

#### Example

```js
// rotate the hue of a color 90 degrees
const swatch = 'dodgerblue';
const hue = color.adjust('hue' h => h + 90);

hueBy90(swatch);

// desaturate by 20%
const desat20 = color.adjust('saturation', s => s - 20);

desat20(swatch);

// lighten by 15%
const lighten15 = color.adjust('lightness', l => l + 15);

lighten15(swatch);
```

#### Notes

+ Hue adjustments have a lower bound of `0` and an upper bound of `720`. This is to allow multiple rotations. A result below or exceeding will yield pure red
+ Saturation adjustments have a lower bound of `0` and an upper bound of `100`. A modifier that returns a number below will yield pure gray. A modifier that exceeds the limit will yield a fully saturated color.
+ Lightness adjustments have the same bounds as saturation. A modifier that returns a number below yields pure black. A modifier that exceeds the limit will yield pure white

### color.mix

This function mixes a color with a target by a given amount.

#### Calls

+ `color.mix(target)(amount)(color)`
+ `color.mix(target)(amount, color)`
+ `color.mix(target, amount)(color)`
+ `color.mix(target, amount, color)`


#### Params

+ `target: string`: the target color to mix with
+ `amount: number`: how much to mix with the target (as a percentage)
+ `color: string`: the color to mix

#### Returns

`string`: the mixture result as `rgb()`

#### Example

```js
const swatch = 'rgb(30%, 35%, 90%)';
const target = 'yellowgreen';

const mixYellowGreen = color.mix(target);

// evenly
mixYellowGreen(50, swatch);

// less with target
mixYellowGreen(32, swatch);

// more with target
mixYellowGreen(85, swatch);
```

### color.complement

This function fetches the complement of a color.

#### Call

+ `color.complement(color)`

#### Params

+ `color: string`: the input color

#### Returns

`string`: the color complement as `rgb()`

#### Example

```js
const swatch = '#c0ffee';

color.complement(swatch);

// equivalent
color.adjust('hue', h => h + 180)(swatch);
```

### color.negate

This function neutralizes a color with its complement.

#### Call

+ `color.negate(color)`

#### Params

+ `color: string`: the input color

#### Returns

`string`: the negated color

#### Example

```js

const swatch = 'hsl(42, 80%, 40%)';

color.negate(swatch);

// equivalent
color.mix(color.complement(swatch), 50)(swatch);
```

### color.convert

This function converts a color to another CSS format.

#### Calls

+ `color.convert(to)(color)`
+ `color.convert(to, color)`

#### Params

+ `to: string`: the output format (`hex`, `rgb`, `hsl`, `w3c`)
+  `color: string`: the input color

#### Return

`string | (() => never)`: the converted color (or unchanged input color if same format), otherwise throw an error for invalid color

#### Example

```js
// convert a color to HSL format
const toHSL = color.convert('hsl');

toHSL('red');
```

#### Notes

+ every color function does a conversion internally to output as `rgb()`, so an invalid color is immediately detected

## Scheme Functions

As with the color module, alpha transparency is not processed and output is `rgb()`. These functions are responsible for generating base hues for schemes. For monochromatic schemes, [see the variant module](#variant).

### scheme.complementary

This function creates a complementary scheme.

#### Call

+ `scheme.complementary(color)`

#### Params

+ `color: string`: the input color to create a scheme

#### Returns

`[color, complement]`: the complementary scheme

#### Example

```js
// create a complementary scheme
scheme.complementary('#bad');
```

### scheme.analogous

This function creates an analogous scheme.

#### Calls

+ `scheme.analogous(offset)(color)`
+ `scheme.analogous(offset, color)`

#### Params

+ `offset: number`: the degree of split from the input color
+ `color: string`: the input color

#### Returns

`[leftOfColor, color, rightOfColor]`: the analogous scheme

#### Example

```js
const swatch = 'rgb(33, 66, 120)';

// create low, mid, and high contrast analogous schemes
const lowContrastAnalogous = scheme.analogous(15);
const midContrastAnalogous = scheme.analogous(30);
const highCOntrastAnalogous = scheme.analogous(45);

lowContrastAnalogous(swatch);
midContrastAnalogous(swatch);
highContrastAnalogous(swatch);
```

### scheme.triad

This function creates a color triad.

#### Calls

+ `scheme.triad(offset)(color)`
+ `scheme.triad(offset, color)`

#### Params

+ `offset: number`: the degree of split from the complement of input color
+ `color: string`: the input color

#### Returns

`[color, leftOfComplement, rightOfComplement]`: the triadic scheme

#### Example

```js
const swatch = 'seagreen';

// create a triadic and split complementary scheme
const triadic = scheme.triad(60);
const split = scheme.triad(30);

triadic(swatch);
split(swatch);
```

### scheme.tetrad

This function creates a color tetrad.

#### Calls

+ `scheme.tetrad(offset)(color)`
+ `scheme.tetrad(offset, color)`

#### Params

`offset: number`: the degree of rotation from input color and complement
`color: string`: the input color

#### Returns

`[color, complement, offsetFromColor, offsetFromComplement]`: the tetradic scheme

#### Example

```js
const swatch = 'hsl(188, 28%, 48%)';

// create a square and tetradic scheme
const square = scheme.tetrad(90);
const tetradic = scheme.tetrad(45);

square(swatch);
tetradic(swatch);
```

## Variant Functions

The variant functions create blends, tints, tones, and shades. These complete your palette. You can adjust the contrast of the output as well as set a limit.

As with the previous modules for color, variant does not process alpha transparency.

### variant.blend

This function creates blends from your input color and a target color.

#### Calls

+ `variant.blend(target)(contrast)(limit)(color)`
+ `variant.blend(target)(contrast, limit, color)`
+ `variant.blend(target, contrast)(limit, color)`
+ `variant.blend(target, contrast, limit)(color)`
+ `variant.blend(target, contrast, limit, color)`

#### Params

+ `target: string`: the target color to blend with
+ `contrast: number`: overall blend contrast (as a percentage)
+ `limit: number`: the number of blends to output
+ `color: string`: the input color

#### Returns

`string[]`: an array of blend variants from least blended with target to most

#### Example

```js
const swatch = '#348ec9';

// create ten lime blends, and five aqua blends
const blendLime = variant.blend(color.a11y('lime'), 75, 10);
const blendAqua = variant.blend(color.a11y('aqua'), 75, 5);

blendLime(swatch);
blendAqua(swatch);
```

### variant.tints

Creates tints for a color.

#### Calls

+ `variant.tints(contrast)(limit)(color)`
+ `variant.tints(contrast, limit)(color)`
+ `variant.tints(contrast, limit, color)`

#### Params

+ `contrast: number`: overall tint contrast (as a percentage)
+ `limit: number`: the number of tints to output
+ `color: string`: the input color

#### Returns

`string[]`: an array of tints from light to lightest

#### Example

```js
const swatch = '#bada55';

// create 4 tints with 95% contrast
const tint = variant.tints(95, 4);

tint(swatch);
```

### variant.tones

Creates tones for a color.

#### Calls

+ `variant.tones(contrast)(limit)(color)`
+ `variant.tones(contrast, limit)(color)`
+ `variant.tones(contrast, limit, color)`

#### Params

+ `contrast: number`: overall tone contrast (as a percentage)
+ `limit: number`: the number of tones to output
+ `color: string`: the input color

#### Returns

`string[]`: an array of tones from least to most saturated

#### Example

```js
const swatch = '#bada55';

// create 3 tones with 70% contrast
const tone = variant.tones(70, 3);

tone(swatch);
```

### variant.shades

Creates shades for a color.

#### Calls

+ `variant.shades(contrast)(limit)(color)`
+ `variant.shades(contrast, limit)(color)`
+ `variant.shades(contrast, limit, color)`

#### Params

+ `contrast: number`: overall shade contrast (as a percentage)
+ `limit: number`: the number of shades to output
+ `color: string`: the input color

#### Returns

`string[]`: an array of shades from dark to darkest

#### Example

```js
const swatch = '#bada55';

// create 2 shades with 90% contrast
const shade = variant.shades(90, 2);

shade(swatch);
```

## Typography Functions

The typography module contains a sole function `system()` that creates system font stacks.

### typography.system

This function outputs [OS font stacks](http://systemfontstack.com) based on the keys passed in.

#### Calls

+ `typography.system(...fonts)`
+ `typography.system()`

#### Params

+ `fonts: string | string[] | undefined`: the font stacks you want (`sans`, `serif`, `monospace`)

#### Returns

`string | string[]`: your OS stacks as arrays or a string if only one parameter

#### Example

```js
// single stack
const stack = typography.system('sans');

// multiple
const [sans, mono] = typography.system('sans', 'monospace');

// all
const [sans, serif, mono] = typography.system()
```

## Scale Functions

Scale functions allow you to create, update, merge, and output [modular scales](https://modularscale.com). You can use them for your content, layout, proportion, or anywhere else in your design that requires consistent values.

### scale.create

This function creates a new modular scale.

#### Calls

+ `scale.create(ratio)(limit)(base)`
+ `scale.create(ratio, limit)(base)`
+ `scale.create(ratio, limit, base)`

#### Params

+ `ratio: string | number`: any named ratio or custom ratio
+ `limit: number`: the number of values to output
+ `base: number`: base scale value (can be integer or decimal)

#### Returns

`number[]`: values of a modular scale (base included)

#### Example

```js
const base = 1;

// create a modular scale using the golden ratio with 6 values
const s = scale.create('golden', 6);

s(base);
```

#### Notes

+ No internal conversions are performed on the base value. It trusts that you know exactly what you want.

#### Named Ratios

Below is a table of all the available named ratios you can use when creating a scale.


| ratio =             | value                      |
| ------------------- | -------------------------- |
| `min2nd`            | `1.067`                    |
| `maj2nd`            | `1.125`                    |
| `min3rd`            | `1.2`                      |
| `maj3rd`            | `1.25`                     |
| `perf4th`           | `1.333`                    |
| `aug4th`/`dim5th`   | `1.414`                    |
| `perf5th`           | `1.5`                      |
| `min6th`            | `1.6`                      |
| `golden`            | `1.6180371352785146`       |
| `maj6th`            | `1.667`                    |
| `min7th`            | `1.778`                    |
| `maj7th`            | `1.875`                    |
| `octave`            | `2`                        |
| `maj10th`           | `2.5`                      |
| `maj12th`           | `3`                        |
| `x2octave`          | `4`                        |

### scale.update

This function processes scale values with a modifier and outputs a new, updated scale.

#### Calls

+ `scale.update(modifier)(scale)`
+ `scale.update(modifier, scale)`

#### Params

+ `modifier: (value: number) => number`: the function to modify each scale value
+ `scale: number[]`: the scale to update

#### Returns

`number[]`: a new updated scale as raw values

#### Example 

```js
const base = 1
const original = scale.create('maj3rd', 8);

// double each value
const double = scale.update(v => v * 2, original(base));
```

### scale.merge

This function takes two or more scales and merges them into a single scale with unique values.

#### Call

+ `scale.merge(...scales)`

#### Params

+ `scales: number[][]`: the scales to merge

#### Returns

`number[]`: the merged scales

#### Example

```js
const base = 1;

const shared = scale.create('golden', 6);

// merge two scales with the same ratio and limit, but different base values
const first = shared(base);
const second = shared(base * 2);

const multithread = scale.merge;

multithread(first, second);
```

### scale.output

This function takes a raw scale and attaches any valid CSS unit to each value.

#### Calls

+ `scale.output(unit)(scale)`
+ `scale.output(unit, scale)`

#### Params

+ `unit: string`: any valid CSS unit
+ `scale`: the scale to transform

#### Returns

`string[]`: a ready-to-use modular scale

#### Example

```js
const content = scale.create('perf5th', 8, 16);

// output scale as px
const asPixels = scale.output('px');

asPixels(content);
```

### scale.pipe

This function executes a chain of operations from right to left on a scale.

#### Calls

+ `scale.pipe(...operations)(scale)`

#### Params

+ `operations: Function[]`: the chain of functions to execute on a scale
+ `scale: number[]`: the scale to be operated on

#### Example

```js
const base = 1;
const original = scale.create('maj3rd', 8, base);

const update = scale.update(v => v / 3);
const asRems = scale.output('rem');

// pipe operations to end up with a rem value output
scale.pipe(asRems, update)(original)
```