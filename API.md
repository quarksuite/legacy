# Quarksuite API (v2.4.x)

*IMPORTANT: Be careful when upgrading from a previous version. Don’t hesitate to [submit an issue](https://github.com/quarksuite/core/issues) if you have any trouble upgrading.*

*You can [try out any example](https://npm.runkit.com/%40quarksuite%2Fcore) on RunKit.*

As of v2.3.0, the color module has been separated into the `color`, `scheme`, and `variant` modules.

## Color Functions

### color.hue

Updates the hue of a color with a modifier function.

If the result of your modifier would be invalid, the hue is set to `0`. The upper limit is two full rotations or `720`. Either case sets the color to be red.

#### Parameters

+ `color: Color`: an input color
+ `modifier: (current: Hue) => Color`: a function to modify the hue


#### Return

`Color`: a color with a modified hue

#### Examples

```js
// Shift hue 45 degrees clockwise
color.hue('#348ec9', hue => hue + 45);

// Shift hue 90 degrees clockwise, then nudge 15 degrees counterclockwise
color.hue('#348ec9', hue => (hue + 90) - 15);
```

### color.saturation

Updates the saturation of a color with a modifier function.

If the result of your modifier would be invalid, the saturation is set to `0` or `100`. At `0`, the color is gray. At `100`, the color is fully saturated.

#### Parameters

+ `color: Color`: an input color
+ `modifier: (current: Saturation) => Color`: a function to modify the saturation 

#### Return

`Color`: a color with a modified saturation

#### Examples

```js
// Increase saturation by 25%
color.saturation('#348ec9', sat => sat + 25);

// Decrease saturation by half
color.saturation ('#348ec9', sat => sat / 2);
```

### color.lightness

Updates the lightness of a color with a modifier function.

If the result of your modifier would be invalid, the lightness is set to `0` or `100`. At `0`,
the color is black. At `100`, the color is white.

#### Parameters

+ `color: Color`: an input color
+ `modifier: (current: Lightness) => Color`: your function to modify the hue

#### Return

`Color`: a color with a modified lightness

#### Examples

```js
// Decrease lightness by 10%
color.lightness('#348ec9', light => light - 10%);

// Increase lightness by a quarter
color.lightness('#348ec9', light => light * 0.25);
```

### color.mix

Mixes the input color with a target color.

You can also pass in a percentage to mix with the target color more or less. An even mix is `50`.

#### Parameters

+ `color: Color`: an input color
+ `withTarget: Color`: a blend target
+ `byAmount?: Percent`: how much to blend with target

#### Return

`Color`: the result of mixing a color with a target color

#### Example

```js
color.mix('#348ec9', 'coral');

// less
color.mix('#348ec9', 'coral', 30);

// more
color.mix('#348ec9', 'coral', 80);
```

### color.complement

Grabs the complement of a color.

The complement is the color on the opposite side, or a 180 degree turn, from the input color.

#### Parameters

+ `color: Color`: an input color

#### Return

`Color`: complement of input color

#### Example

```js
color.complement('#348ec9')
```

### color.negate

Negates a color.

The negation of a color is the result of that color evenly mixed with its complement.

#### Parameters

+ `color: Color`: an input color

#### Return

`Color`: negation of input color

#### Example

```js
color.negate('#348ec9')
```

### color.convert

Converts a color to another CSS format.

The formats accepted are: `rgb` (default), `hsl`, `hex`, `w3c`.

#### Parameters

+ `color: Color`: an input color
+ `toFormat: CSSFormats`: desired format for conversion

#### Return 

`Color`: input color converted to new format

#### Example

```js
// RGB by default
color.convert('#348ec9');

// Convert to HSL
color.convert('#348ec9', 'hsl');
```

## Scheme Functions

### scheme.complementary

Creates a complementary scheme.

#### Parameters

+ `color: Color`: an input color

#### Return

`Scheme`: an array of `Color` as `[color, complement]`

#### Example

```js
scheme.complementary('#348ec9');
```

### scheme.analogous

Creates an analogous scheme.

#### Parameters

+ `color: Color`: an input color
+ `spreadBy?: Degrees = 30`: degrees to spread adjacent colors

#### Return

`Scheme`: an array of `Color` as `[leftOfColor, color, rightOfColor]`

#### Example

```js
scheme.analogous('#348ec9');

// low contrast analogous
scheme.analogous('#348ec9', 15);

// high contrast analogous
scheme.analgous('#348ec9', 45);
```

### scheme.triad

Creates a color triad from input color.

#### Parameters

+ `color: Color`: an input color
+ `splitComplementBy?: Degrees = 60`: degrees to split from the complement

#### Return

`Scheme`: an array of `Color` as `[color, leftOfComplement, rightOfComplement]`

#### Example

```js
// 60 degrees from complement = perfect triad
scheme.triad('#348ec9')

// Second parameter can alter split to produce imperfect triads
scheme.triad('#348ec9', 32);
```

### scheme.tetrad

Creates a color tetrad from input color.

#### Parameters

+ `color: Color`: an input color
+ `spreadBy?: Degrees = 90`: degrees to spread from color and complement

#### Return

`Scheme`: an aray of color as `[color, complement, rightOfColor, rightOfComplement]`

#### Example

```js
// 90 degree spread from origin and complement = perfect tetrad
scheme.tetrad('#348ec9');

// Second parameter can alter spread to produce imperfect tetrads
scheme.tetrad('#348ec9', 45);
```

## Variant Functions

### variant.create

Create a blend variant from input color and a target color.

#### Parameters

+ `color: Color`: an input color
+ `fromTarget: Color`: target color to blend
+ `withContrast?: Percent = 97`: contrast between variant values
+ `upToRange?: Limit = 3`: variant output limit

#### Return

`Variant`: an array of `Color` as a blend of color and target color with adjustments

#### Example

```js
variant.create('#348ec9', 'coral');

// can change the contrast
variant.create('#348ec9', 'coral', 72);

// can also change the range
variant.create('#348ec9', 'coral', 85, 5);
```

### variant.tints

Creates tints from input color.

Tints are the result of a color mixed with white.

#### Parameters

+ `color: Color`: an input color
+ `withContrast?: Percent = 97`: contrast between variant values
+ `upToRange?: Limit = 3`: variant output limit

#### Return

`Variant`: an array of `Color` as tints

#### Example

```js
variant.tints('#348ec9');

// can change the contrast
variant.tints('#348ec9', 80);

// can also adjust the range
variant.tints('#348ec9', 90, 5);
```

### variant.tones

Creates tones from input color.

Tones are the result of a color mixed with gray.

#### Parameters

+ `color: Color`: an input color
+ `withContrast?: Percent = 97`: contrast between variant values
+ `upToRange?: Limit = 3`: variant output limit

#### Return

`Variant`: an array of `Color` as tones

#### Example

```js
variant.tones('#348ec9');

// can change the contrast
variant.tones('#348ec9', 80);

// can also adjust the range
variant.tones('#348ec9', 90, 5);
```


### variant.shades

Creates shades from input color.

Shades are the result of a color mixed with black.

#### Parameters

+ `color: Color`: an input color
+ `withContrast?: Percent = 97`: contrast between variant values
+ `upToRange?: Limit = 3`: variant output limit

#### Return

`Variant`: an array of `Color` as shades

#### Example

```js
variant.shades('#348ec9');

// can change the contrast
variant.shades('#348ec9', 80);

// can also adjust the range
variant.shades('#348ec9', 90, 5);
```


## Typography Functions

### typography.system

Outputs system font stacks.

```js
// By default, calling will output all available system stacks
typography.system()

// But you can also use one family
typography('sans');

// or two
typography.system('sans', 'monospace');
```

#### Values

| Family      | Stack                                                        |
| ----------- | ------------------------------------------------------------ |
| `sans`      | `-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif` |
| `serif`     | `Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol` |
| `monospace` | `Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace` |


## Scale Functions

### scale.create

Creates a modular from a `base` and `ratio` with the option to set an output `limit`.

```js
// Creates a scale with a base of 1, the golden
// ratio and 6 values by default
scale.create();

// Passing in another base
scale.create(1.125);

// Ratios can be named
scale.create(1, 'min7th')

// Custom ratios are allowed
scale.create(1, 2.25)

// You can set a limit
scale.create(1, 'maj3rd', 8);

// You can invert the scale (divide)
scale.create(1, 'maj3rd', 8, true)
```

#### Ratios

All ratios have been borrowed from [modularscale.com](https://modularscale.com). Except `golden` which was calculated from the 15th and 16th values of a Fibonacci sequence.

| Key        | Value                      |
| ---------- | -------------------------- |
| `min2nd`   | `1.067`                    |
| `maj2nd`   | `1.125`                    |
| `min3rd`   | `1.2`                      |
| `maj3rd`   | `1.25`                     |
| `perf4th`  | `1.333`                    |
| `dim5th`   | `1.414`                    |
| `min6th`   | `1.6`                      |
| `golden`   | `1.6180371352785146`       |
| `maj6th`   | `1.667`                    |
| `min7th`   | `1.778`                    |
| `maj7th`   | `1.875`                    |
| `octave`   | `2`                        |
| `maj10th`  | `2.5`                      |
| `maj12th`  | `3`                        |
| `x2octave` | `4`                        |

### scale.modify

Modify a new or existing `scale` with `n` and a `modifier` function.

```js
// add ten to each value in the scale
scale.modify(scale.create(), 10, (n, v) => n + v)
```

### scale.merge

Merges `scales` and removes any duplicate values. Recommended not to merge more than three or use dissonant bases or ratios.

```js
const first = scale.create();
const second = scale.create(1.25);
const third = scale.create(1.5);

scale.merge(first, second, third);
```

### scale.output

Outputs a scale with the desired `unit`. Accepts `ch`, `'(r)em`, `ex`, `v(w | h | min | max)` `px`.

```js
// By default, it returns 'rem' units
scale.output(scale.create());

// Allows you to use another unit
scale.output(scale.create(), 'em');

```
