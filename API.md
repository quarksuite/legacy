# Quarksuite API (v5.0.0)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Functional Utilities](#functional-utilities)
  - [bind](#bind)
    - [Usage](#usage)
    - [Params](#params)
    - [Returns](#returns)
  - [pipe](#pipe)
    - [Usage](#usage-1)
    - [Params](#params-1)
    - [Returns](#returns-1)
- [Prototyping Functions](#prototyping-functions)
  - [clrs](#clrs)
    - [Usage](#usage-2)
    - [Param](#param)
    - [Returns](#returns-2)
  - [systemfonts](#systemfonts)
    - [Usage](#usage-3)
    - [Param](#param-1)
    - [Returns](#returns-3)
- [Color Functions](#color-functions)
  - [hex](#hex)
    - [Usage](#usage-4)
    - [Param](#param-2)
    - [Returns](#returns-4)
  - [rgb](#rgb)
    - [Usage](#usage-5)
    - [Param](#param-3)
    - [Returns](#returns-5)
  - [hsl](#hsl)
    - [Usage](#usage-6)
    - [Param](#param-4)
    - [Returns](#returns-6)
  - [hue](#hue)
    - [Usage](#usage-7)
    - [Params](#params-2)
    - [Returns](#returns-7)
  - [saturation](#saturation)
    - [Usage](#usage-8)
    - [Params](#params-3)
    - [Returns](#returns-8)
  - [lightness](#lightness)
    - [Usage](#usage-9)
    - [Params](#params-4)
    - [Returns](#returns-9)
  - [alpha](#alpha)
    - [Usage](#usage-10)
    - [Params](#params-5)
    - [Returns](#returns-10)
  - [mix](#mix)
    - [Usage](#usage-11)
    - [Params](#params-6)
    - [Returns](#returns-11)
- [Scheme Functions](#scheme-functions)
  - [complementary](#complementary)
    - [Usage](#usage-12)
    - [Param](#param-5)
    - [Returns](#returns-12)
  - [analogous](#analogous)
    - [Usage](#usage-13)
    - [Params](#params-7)
    - [Returns](#returns-13)
  - [triad](#triad)
    - [Usage](#usage-14)
    - [Params](#params-8)
    - [Returns](#returns-14)
  - [tetrad](#tetrad)
    - [Usage](#usage-15)
    - [Params](#params-9)
    - [Returns](#returns-15)
  - [custom](#custom)
    - [Usage](#usage-16)
    - [Params](#params-10)
    - [Returns](#returns-16)
- [Variant Functions](#variant-functions)
  - [tints](#tints)
    - [Usage](#usage-17)
    - [Params](#params-11)
    - [Returns](#returns-17)
  - [tones](#tones)
    - [Usage](#usage-18)
    - [Params](#params-12)
    - [Returns](#returns-18)
  - [shades](#shades)
    - [Usage](#usage-19)
    - [Params](#params-13)
    - [Returns](#returns-19)
- [Scale Functions](#scale-functions)
  - [ms](#ms)
    - [Usage](#usage-20)
    - [Params](#params-14)
    - [Returns](#returns-20)
  - [update](#update)
    - [Usage](#usage-21)
    - [Params](#params-15)
    - [Returns](#returns-21)
  - [merge](#merge)
    - [Usage](#usage-22)
    - [Param](#param-6)
    - [Returns](#returns-22)
  - [partition](#partition)
    - [Usage](#usage-23)
    - [Params](#params-16)
    - [Returns](#returns-23)
  - [units](#units)
    - [Usage](#usage-24)
    - [Params](#params-17)
    - [Returns](#returns-24)
- [Build formats](#build-formats)
  - [css](#css)
    - [Usage](#usage-25)
      - [Input](#input)
      - [Output](#output)
    - [Param](#param-7)
    - [Returns](#returns-25)
  - [sass](#sass)
    - [Usage](#usage-26)
      - [Input](#input-1)
      - [Output](#output-1)
    - [Param](#param-8)
    - [Returns](#returns-26)
  - [less](#less)
    - [Usage](#usage-27)
      - [Input](#input-2)
      - [Output](#output-2)
    - [Param](#param-9)
    - [Returns](#returns-27)
  - [styl](#styl)
    - [Usage](#usage-28)
      - [Input](#input-3)
      - [Output](#output-3)
    - [Param](#param-10)
    - [Returns](#returns-28)
  - [raw](#raw)
    - [Usage](#usage-29)
      - [Input](#input-4)
      - [Output](#output-4)
    - [Param](#param-11)
    - [Returns](#returns-29)
  - [sd](#sd)
    - [Usage](#usage-30)
      - [Input](#input-5)
      - [Output](#output-5)
  - [tw](#tw)
    - [Usage](#usage-31)
      - [Input](#input-6)
      - [Output](#output-6)
    - [Param](#param-12)
    - [Returns](#returns-30)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

You can [try out all the examples on RunKit][runkit].

## Functional Utilities

These are part of advanced usage and aren't *required* to use the library. Instead, they make it easier to break up utilities and build complex behavior.

### bind

Allows you to bind any other utility in the library; allows **chaining**.

Binding is essential to the advanced features of [settings][ug-settings] and [factory settings][ug-factory-settings].

> The precise name for what this does: partial application. A function with a type signature of `(z, y, x) => any` becomes `(z, y) => (x) => any` or `(z) => (y) => (x) => any` if each arg is bound one at a time.

#### Usage

```js
// rotate any color's hue by a third
const rotateByThird = bind(hue, 120);

rotateByThird('red'); // #00ff00
rotateByThird('lime'); // #0000ff
rotateByThird('blue'); // #ff0000

// chaining example

// mix colors evenly
const evenly = bind(mix, 50);

// mix any color evenly with coral
const mixWithCoral = bind(evenly, 'coral');

// mix any color evenly with dodgerblue
const mixWithDodgerblue = bind(evenly, 'dodgerblue');

mixWithCoral('springgreen'); // #b4c96a
mixWithDodgerblue('springgreen') // #15cfc9
```

#### Params

+ `utility`: the utility to bind
+ `...initial`: the initial arguments you want to bind

#### Returns

A function whose parameters are the `...pending` or unbound arguments of `utility`

### pipe

> As of v5, pipe is no longer limited to two operations. It's also chainable.

A function that takes a value and pipes it through a chain of bound operations. 

Essential to the advanced features of [presets][ug-presets] and [configurations][ug-configurations].

#### Usage

```js

const color = "springgreen";

// bound settings that accept a color as data

const lighten = bind(lightness, 10);
const darken = bind(lightness, -10);
const sat = bind(saturation, 15);
const desat = bind(saturation, -30);
const fade = bind(alpha, -4);
const mixInBlue = bind(mix, 25, clrs("blue"));
const mixInGreen = bind(mix, 10, clrs("lime"));

// lighten and desaturate a color with bound settings

pipe(color, lighten, desat); // #43ef99

// darken a color, mix in clrs.blue, lighten with bound settings

pipe(color, darken, mixInBlue, lighten); // #05ffb8

// A bound pipeline

const brand = bind(pipe, color, darken, mixInBlue);

// modifications

brand(lighten, mixInGreen, desat); // #19ebac
brand(darken, mixInGreen, mixInBlue, fade, fade); // #00b09beb
```

#### Params

+ `value`: the value you want to pipe
+ `...fns`: The functions to pipe the value through

#### Returns

The transformed value at the end of the chain

## Prototyping Functions

These functions are prototyping helpers and include clrs.cc accessible web defaults and system font stacks.

### clrs

A function that maps a web default with its [Colors/clrs.cc accessible match][clrs]. If a match isn't found, it will throw an error.

#### Usage

```js
clrs('red'); // #ff4136
clrs('lime'); // #01ff70
clrs('blue'); // #0074d9

// clrs can be safely converted to other formats
rgb(clrs('orange')); // rgb(255, 133, 27)
hsl(clrs('teal')); // hsl(180, 59%, 51.2%)
```

#### Param

`color`: the web default to map

#### Returns

A new color that is a clrs.cc web default

### systemfonts

A function that maps one or more of `'sans-serif'`, `'serif'`, and/or `'monospace'` to a [defined stack of system fonts][systemfonts].

#### Usage

```js
// one
systemfonts('sans-serif'); // [
//  '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif'
// ]

// two
systemfonts('sans-serif', 'monospace'); // [
//  '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
//  'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace'
// ]

// all
systemfonts('sans-serif', 'serif', 'monospace'); // [
//  '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
//  'Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
//  'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace'
// ]
```

#### Param

`...fonts`: one or more arguments targeting the desired stacks

#### Returns

An array of font stacks matching each defined family

## Color Functions

These functions work exclusively on any valid CSS color (even those with transparency) to convert to another format or modify via adjustment or mixture. Color functions also check the format and will throw errors if your color is invalid.

> If you need more from your palette than what the library provides, you're welcome to use a dedicated color library to build your colors. 
> 
> [chroma.js][chroma-js] and [TinyColor][tinycolor] are great libraries for color and I've used them both as dependencies in previous versions. 

### hex

Converts a color to its hexadecimal equivalent.

#### Usage

```js
// RGB[A] -> hex
hex('rgb(110, 255, 25)'); // #6fff19
hex('rgb(50%, 25%, 75%)'); // #8040bf
hex('rgb(220 195 70)'); // #dcc346
hex('rgba(46, 110, 0, 0.8)'); // #2e6e00cc
hex('rgba(20 186 19 / 20.9%)'); // #14ba1335

// HSL[A] -> hex
hex('hsl(300, 50%, 80%)'); // #e6b3e6
hex('hsla(90, 87%, 40%, 0.9)'); // #66bf0de6
```

#### Param

`color`: the color to convert to hex

#### Returns

The input color converted to its hexadecimal format

### rgb

Converts a color to its RGB equivalent.

#### Usage

```js
// hex -> RGB[A]
rgb('#abcdef'); // rgb(171, 205, 239)
rgb('#ded'); // rgb(221, 238, 221)
rgb('#face'); // rgb(255, 170, 204, 0.933)
rgb('#3acc0ecd'); // rgb(58, 204, 14, 0.804)

// HSL[A] -> RGB[A]
rgb('hsl(105, 33%, 60%)'); // rgb(136, 187, 119)
rgb('hsla(190, 70%, 10%, 0.8)'); // rgba(8, 37, 43, 0.8)
```

#### Param

`color`: the color to convert to rgb

#### Returns

The input color converted to its RGB format

### hsl

Converts a color to its HSL equivalent.

#### Usage

```js
// RGB[A] -> HSL[A]
hsl('rgb(31, 115, 25)'); // hsl(116, 64.3%, 27.5%)
hsl('rgb(80 110 220)'); // hsl(227, 66.7%, 58.9%)
hsl('rgb(30%, 50%, 10%)'); // hsl(90, 66.2%, 30.2%)
hsl('rgba(244, 210, 200, 0.72)'); // hsla(14, 668.8%, 87.1%, 0.72)

// hex -> HSL[A]
hsl('#deaded'); // hsl(286, 63.9, 80.4%)
hsl('#ace'); // hsl(210, 66.5%, 80%)
hsl('#face'); // hsl(336, 100%, 83.4%, 0.933)
hsl('#faac110c'); // hsl(40, 95.8%, 52.3%, 0.0471)

```

#### Param

`color`: the color to convert to hsl

#### Returns

The input color converted to its HSL format

### hue

A function that adjusts the hue of any valid CSS color.

> The hue adjustment is bound to one full revolution. Any adjustment with a negative hue result or a value >360 is corrected.

#### Usage

```js
// a positive value rotates the hue right
hue(102, 'coral'); // '#56ff50';

// a negative value rotates the hue left
hue(-45, 'coral'); // #ff50a5

// hue adjustment is relative to the input color
hue(0, 'coral'); // #ff7f50
hue(360, 'coral'); // #ff7f50
```

#### Params

+ `n`: the amount to shift the hue
+ `color`: the color to adjust

#### Returns

A new color that is the result of adjusting the hue of the input color

### saturation

A function that adjusts the saturation of any valid CSS color

#### Usage

```js
// positive value saturates
saturation(30, 'rgb(31, 220, 25)'); // rgb(8, 245, 0)

// negative value desaturates
saturation(-25, 'crimson'); // #be324e

// >100 locks at full saturation
saturation(300, 'hsl(40, 35%, 70%)'); // hsl(40, 100%, 70%)

// <=0 locks at full desaturation
saturation(-250, '#44cc00'); // #666666
```

#### Params

+ `n`: the amount to shift the saturation
+ `color`: the color to adjust

#### Returns

A new color that is the result of adjusting the saturation of the input color

### lightness

A function that adjusts the lightness/luminance of any valid CSS color

#### Usage

```js
// positive value brightens
lightness(40, 'dodgerblue'); // #ebf5ff

// negative value darkens
lightness(-25, 'dodgerblue'); // #004f9e

// >100 locks at white
lightness(100, 'rgb(31, 200, 100)'); // rgb(255, 255, 255)

// <=0 locks at black
lightness(-100, 'hsl(336, 70%, 40%)'); // hsl(336, 70%, 0%)
```

#### Params

+ `n`: the amount to shift the lightness
+ `color`: the color to adjust

#### Returns

A new color that is the result of adjusting the lightness of the input color

### alpha

A function that adjusts the transparency of any valid CSS color.

#### Usage

```js
// positive value increases
alpha(20, '#faec'); // #ffaaee

// negative value decreases
alpha(-50, '#face'); // #ffaacc6e

// >100 means opaque
alpha(100, 'rgba(100, 220, 100, 0.8)'); // rgb(100, 220, 100)

// <=0 means fully transparent
alpha(-100, 'hsla(33, 100%, 39%, 70%)'); // hsla(33, 100%, 39%, 0)
```

#### Params

+ `n`: the amount to shift the alpha
+ `color`: the color to adjust

#### Returns

A new color that is the result of adjusting the alpha of the input color

### mix

A function that mixes a target color with any valid CSS color by a given percentage.

#### Usage

```js
// evenly
mix(50, 'red', 'blue'); // #b400b4

// mix less of target
mix(25, 'red', 'blue'); // #8000dd

// mix more of target
mix(75, 'red', blue); // #dd0080

// 0% mix is input color
mix(0, 'red', 'blue'); // #0000ff

// 100% mix is target color
mix(100, 'red', 'blue'); // #ff0000

```

#### Params

+ `amount`: percentage to mix input with target
+ `target`: the color to mix in
+ `color`: the input color

#### Returns

A new color that is the result of two colors mixed together.

## Scheme Functions

These functions work on any valid CSS color to create basic complementary, analogous, triadic, or tetradic schemes.

The scheme functions also include a completely custom scheme creation function for more complex scheme configurations.

> Be aware that the scheme functions output base *hues*. Tints, tones, and shades to complete your palette are for the next section.

### complementary

A function that creates a complementary color scheme from any valid CSS color.

> A complementary scheme is a high contrast color scheme made of a color and its opposite on the color wheel.

#### Usage

```js
complementary('red'); // [ '#ff0000', '#00ffff' ]
complementary('lime'); // [ '#00ff00', '#ff00ff' ]
complementary('blue'); // [ '#0000ff' '#ffff00' ]
```

#### Param

+ `color`: the input color

#### Returns

An array of: `[color, opposite]`

### analogous

A function that creates an analogous color scheme from any valid CSS color.

An analogous scheme is a low to high contrast scheme made of a color and two colors next to it on the color wheel.

> The contrast varies by the arc between a color and its adjacent colors. A smaller arc means lower contrast between your hues while a larger arc means higher contrast.
> 
> An arc of 60 is the maximum before the colors break from an analogous harmony.

#### Usage

```js
// low contrast analogous
analogous(30, 'red'); // [ '#ff0000', '#ff0080', '#ff8000' ]

// mid contrast analogous
analogous(45, 'lime'); // [ '#00ff00', '#bfff00', '#00ffbf' ]

// high contrast analogous
analogous(60, 'blue'); // [ '#0000ff', '#00ffff', '#ff00ff' ]
```

#### Params

+ `arc`: the distance between the input color and its adjacent hues
+ `color`: the input color

#### Returns

An array of: `[color, leftOf, rightOf]`

### triad

A function that creates a three color scheme from any valid CSS color.

A triadic scheme is a balanced to high contrast scheme made of a color and two colors next to its **opposite** on the color wheel.

> The contrast varies by the same arc variable as an analogous scheme, but the arc is split from the other side of the wheel.
> 
> An arc of 60 evenly spaces all the colors on the wheel and creates a equilateral triad (also known as a regular triadic scheme).
> 
> An arc between 30-45 makes the usual split complementary. An arc of 90 creates a triadic clash.

#### Usage

```js
// mid contrast split complement
triad(30, 'red'); // [ '#ff0000',  '#0080ff', '#00ff80' ]

// high contrast split complement
triad(45, 'lime'); // [ '#00ff00', '#ff0040', '#4000ff' ]

// equilateral triad (triadic)
triad(60, 'blue'); // [ '#0000ff', '#00ff00', '#ff0000' ]

// triadic clash
triad(90, 'rgb(111, 222, 111)'); // [ 
//  'rgb(111, 222, 111)', 
//  'rgb(222, 167, 111)', 
//  'rgb(111, 167, 222)' 
// ]
```

#### Params

+ `arc`: distance between the *complement* of the input color and its adjacent hues
+ `color`: the input color

#### Returns

An array of: `[color, rightOfComplement, leftOfComplement]`

### tetrad

A function that creates a four color scheme from any valid CSS color.

A tetradic scheme is made of a color, its opposite, and two hues between them. A tetrad is also called a dual color scheme.

> A tetrad is an inherently balanced scheme. Much like four legs on a table, it provides your palette a sense of sturdiness.
> 
> Rather than arc, the contrast that can exist in a tetrad varies by the degree of rotation from the input color and its complement.
> 
> Rotated 90 degrees, the four colors are spaced evenly around the wheel and create a square.

#### Usage


```js
// low contrast tetrad 
tetrad(15, 'lime'); // [ '#00ff00', '#ff00ff', '#00ff40', '#ff00bf' ]

// mid contrast tetrad
tetrad(30, 'red'); // [ '#ff0000', '#00ffff', '#ff8000', '#0080ff' ]

// balanced tetrad
tetrad(60, 'blue'); // [ '#0000ff', '#ffff00', '#ff00ff', '#00ff00' ]

// square
tetrad(90, 'hsl(33, 100%, 30%)'); // [
//  'hsl(33, 100%, 30%)',
//  'hsl(213, 100%, 30%)',
//  'hsl(123, 100%, 30%)',
//  'hsl(303, 100%, 30%)'
// ]
```

#### Params

+ `rotation`: degrees of rotation from input color and complement
+ `color`: the input color

#### Returns

An array of: `[color, opposite, colorOffset, oppositeOffset]`

### custom

A function that creates a custom scheme from any valid CSS color.

You can use this function to create five, six, or `n` hue color schemes.

> If any of the output hues would return the same value, the duplicates are removed from output.

#### Usage

```js
// five hue
custom({ hues: 5, arc: 72}, 'red'); // [ 
//  '#ff0000',
//  '#ccff00',
// 	'#00ff66',
//  '#0066ff',
//  '#cc00ff'
// ]

// six hue
custom({ hues: 6, arc: 45 }, 'lime'); // [
//  '#00ff00',
//  '#00ffbf',
//  '#0080ff',
//  '#4000ff',
//  '#ff00ff',
//  '#ff0040'
// ]

// 4 hues, 72 degree split, rotated 60 degrees
custom({ hues: 4, arc: 72, rotation: 60}, 'blue'); // [
//  '#0000ff',
//  '#ff00ff',
//  '#ff3300',
//  '#99ff00'
// ]
```


#### Params

+ `options`: custom color scheme options
	* `hues`: number of total output hues
	* `arc`: distance between hues on the color wheel
	* `offset?`: an optional offset from the origin
+ `color`: the input color

#### Returns

An array of: `[color, ...generatedHues]`

## Variant Functions

These functions work on any valid CSS color to create tints, tones, and shades to complete your palettes.

As with the other functions that operate on colors, an invalid color will throw an error.

### tints

A function that creates tints from any valid CSS color.

#### Usage

```js
// 4 high contrast tints
tints(4, 99, 'red'); // [ '#ff7f7f', '#ffb3b3', '#ffdcdc', '#fffefe' ]

// 3 mid contrast tints
tints(3, 64, 'lime'); // [ '#76ff76', '#a7ffa7', '#ccffcc' ]

// 2 low contrast tints
tints(2, 32, 'blue'); // [ '#6666ff', '#9090ff' ]
```

#### Params

+ `count`: number of tints to create
+ `contrast`: percentage of contrast between tints
+ `color`: the input color

#### Returns

An array of tints ordered from light to lightest.

### tones

A function that creates tones from any valid CSS color.

#### Usage

```js
// 4 high contrast tones
tones(4, 99, 'red'); // [ '#e64040', '#ca5a5a', '#aa6e6e', '#827f7f' ]

// 3 mid contrast tones
tones(3, 64, 'lime'); // [ '#3bea3b', '#54d254', '#66b866' ]

// 2 low contrast tones
tones(2, 32, 'blue'); // [ '#3333ef', '#4848de' ]
```

#### Params

+ `count`: number of tones to create
+ `contrast`: percentage of contrast between tones
+ `color`: the input color

#### Returns

An array of tones ordered from least to most muted.

### shades

A function that creates shades from any valid CSS color.

#### Usage

```js
// 4 high contrast shades
shades(4, 99, 'red'); // [ '#dd0000', '#b50000', '#810000', '#1a0000' ]

// 3 mid contrast shades
shades(3, 64, 'lime'); // [ '#00e200', '#00c100', '#009900' ]

// 2 low contrast shades
shades(2, 32, 'blue'); // [ '#0000ea', '#0000d2' ]
```

#### Params

+ `count`: number of shades to create
+ `contrast`: percentage of contrast between shades
+ `color`: the input color

#### Returns

An array of shades ordered from dark to darkest.

## Scale Functions

These functions are focused around modular scales. Includes a base function to create them and a suite of functions to modify them. When you've done all of your calculations, you attach your units.

### ms

This is the main scale creation function. All the other functions in this category operate on data returned from this one.

> Formula: `base * ratio ** n` where `n` is the current index.
> 
> For example: a four value scale with a ratio of 2 and a base of 1
> 
> `1 * 2 ** 0 = 1 * 1 = 1`
> 
> `1 * 2 ** 1 = 1 * 2 = 2`
> 
> `1 * 2 ** 2 = 1 * 2 * 2 = 4`
> 
> `1 * 2 ** 3 = 1 * 2 * 2 * 2 = 8`

#### Usage

```js
// 8 value scale with an approximate golden ratio
ms(8, 1.618, 1); // [
//  1,
//  1.618,
//  2.6179240000000004,
//  4.235801032000001,
//  6.853526069776001,
//  11.089005180897573,
//  17.94201038269227,
//  29.030172799196098
// ]

// 5 value scale with an octave ratio
ms(5, 2, 1); // [ 1, 2, 4, 8, 16 ]
```

#### Params

+ `values`: number of values to include in your scale
+ `ratio`: number raised to the power of the value's index
+ `base`: initial scale value (multiplied by the ratio calculated at each index)

#### Returns

An array of raw modular scale values.

### update

A function that updates a scale with a calculation applied to each value.

#### Usage

```js
// initial scale
const scale = ms(5, 2, 1);

// multiply each value by 0.25
update(n => n * 0.25, scale); // [ 0.25, 0.5, 1, 2, 4 ]

// add 8 to each value
update(n => n + 8, scale); // [ 9, 10, 12, 16, 24 ]

// cube each value
update(n => n ** 3, scale); // [ 1, 8, 64, 512, 4096 ]

// divide each value by 10
update(n => n / 10, scale); // [ 0.1, 0.2, 0.4, 0.8, 1.6 ]
```

#### Params

+ `calc`: a function that will be mapped to each `n` in the scale
+ `scale`: the scale you want to update

#### Returns

A new scale with updated values.

### merge

A function that takes two or more scales and merges their *unique* values. You can use this to create multistranded scales.

#### Usage

```js
// set initial scales
const a = ms(8, 1.5, 1);
const b = ms(10, 1.25, 1);

// create multithreaded scale
merge(a, b); // [
//  1,
//  1.5,
//  1.5625,
//  1.953125,
//  2.25,
//  2.44140625,
//  3.0517578125,
//  3.375,
//  ...
// ]
```

#### Param

+ `scales`: the scales you want to merge

#### Returns

A new scale of unique values from the merge

### partition

A function that lets you split a large scale into a series of smaller ones.
You can use this to create a staggered scale or context-dependent modular scales.

#### Usage

```js
// Start with a large scale
const globalScale = ms(18, 1.5, 1);

// split it up
const [small, med, large] = partition(6, globalScale);

small; // [ 1, 1.5, 2.25, 3.375, 5.0625, 7.59375 ]
med; // [
//  11.390625,
//  17.0859375,
//  25.62890625,
//  38.443359375,
//  57.6650390625,
//  86.49755859375
// ]
large // [
//  129.746337890625,
//  194.6195068359375,
//  291.92926025390625,
//  437.8938903808594,
//  656.8408355712891,
//  985.2612533569336
// ]
```

#### Params

+ `size`: the size of each split
+ `scale`: the scale you want to partition

#### Returns

A new scale containing chunked values

### units

A function that prepares a raw scale to be used in CSS. This is the final step in scale creation.

> Accepts all absolute and relative units. Does **no** unit conversion.

#### Usage

```js
const scale = ms(8, 1.618, 1);

// as rem units with greater precision
units(6, 'rem', scale); // [
//  '1rem',
//  '1.618rem',
//  '2.61792rem',
//  '4.2358rem',
//  '6.85353rem',
//  '11.089rem',
//  '17.942rem',
//  '29.0302rem'
// ]

// as em units with less precision
units(3, 'em', scale); // [
//  '1em',
//  '1.62em',
//  '2.62em',
//  '4.24em',
//  '6.85em',
//  '11.1em',
//  '17.9em',
//  '29em'
// ]
```

#### Params

+ `precision`: the maximum number of digits each scale value can have
+ `unit`: any valid CSS relative or absolute unit
+ `scale`: the scale to output

#### Returns

A new scale of CSS valid values

## Build formats

These functions build your data into strings of various file formats ready to download with the native filesystem API or library of your choice. The currently supported formats include `css` custom properties, `sass`, `less`, `styl` variables, and `raw` JSON.

Also included in this section are integration formats that build your data to be consumable by other design token or UI theming tools. For now, only [Style Dictionary properties][styleD] (`sd`) and [Tailwind theme data][tailwind] (`tw`) are supported.

Once built, your tokens are completely ready to use.

> Every build format and integration uses the standard token dictionary object. You can [read about the spec][tdspec] in the usage documentation. 
> 
> The examples use the simplest possible dictionaries for demonstration.

### css

Builds a token dictionary as [CSS custom properties][css].

#### Usage

##### Input

```js
css({
  color: { main: "red", accent: "lime", highlight: "cyan" }
})
```

##### Output

```css
:root {
  --color-main: "red";
  --color-accent: "lime";
  --color-highlight: "cyan";
}
```

#### Param

+ `tree`: the token dictionary to parse

#### Returns

A string containing a collection of CSS custom properties wrapped in a `:root` selector.

### sass

Builds a token dictionary as [Sass variables][sass].

#### Usage

##### Input

```js
sass({
  color: { main: "red", accent: "lime", highlight: "cyan" }
})
```

##### Output

```scss
$color-main: "red";
$color-accent: "lime";
$color-highlight: "cyan";
```

#### Param

+ `tree`: the token dictionary to parse

#### Returns

A string containing a collection of Sass variables.

### less

Builds a token dictionary as [Less variables][less].

#### Usage

##### Input

```js
less({
  color: { main: "red", accent: "lime", highlight: "cyan" }
})
```

##### Output

```less
@color-main: "red";
@color-accent: "lime";
@color-highlight: "cyan";
```

#### Param

+ `tree`: the token dictionary to parse

#### Returns

A string containing a collection of Less variables.

### styl

Builds a token dictionary as [Stylus variables][stylus].

#### Usage

##### Input

```js
styl({
  color: { main: "red", accent: "lime", highlight: "cyan" }
})
```

##### Output

```styl
color-main = "red"
color-accent = "lime"
color-highlight = "cyan"
```

#### Param

+ `tree`: the token dictionary to parse

#### Returns

A string containing a collection of Stylus variables.

### raw

This function is a wrapper around `JSON.stringify` with some pretty printing.

#### Usage

##### Input

```js
raw({
  color: { main: "red", accent: "lime", highlight: "cyan" }
})
```

##### Output

```json
{
  "color": {
    "main": "red",
    "accent": "lime",
    "highlight": "cyan"
  }
}
```

#### Param

+ `tree`: the token dictionary to parse

#### Returns

A string containing token dictionary data as pretty-printed JSON.

### sd

An integration format that converts a token dictionary into Style Dictionary properties.

You can see a more practical [example of Style Dictionary integration][interop-sd] in the user guide.

> Unlke the other build formats, `sd` preserves a subcategory's `base` property because that's what Style Dictionary anticipates.
>
> Additionally, if you pass a number value in, it will be converted to a string value.

#### Usage

##### Input

```js
sd({
  color: { main: "red", accent: "lime", highlight: "cyan" }
})
```

##### Output

```js
{
  color: {
    main: { value: "red" }, 
    accent: { value: "lime" }, 
    highlight: { value: "cyan" }
  }
}
```

### tw

An integration format that converts a token dictionary subcategory according to Tailwind theme specifications.

You can see a more practical [example of Tailwind integration][interop-tw] in the user guide.

> Keep in mind that it follows the **v2** theme format.

#### Usage

##### Input

```js
tw({
  fontSize: {
    base: "1rem",
    x: ["1.5rem", "2rem", "2.5rem", "3rem", "3.5rem"]  
  }
})
```

##### Output

```js
{
  fontSize: {
    DEFAULT: "1rem",
    x2: "1.5rem",
    x3: "2rem",
    x4: "2.5rem",
    x5: "3rem",
    x6: "3.5rem"
  }
}
```


#### Param

+ `tree`: the token dictionary to parse

#### Returns

A token dictionary with its subcategories converted to the valid Tailwind theme format.

[runkit]: https://npm.runkit.com/%40quarksuite%2Fcore
[ug-settings]: https://github.com/quarksuite/core/blob/master/USAGE.md#settings
[ug-factory-settings]: https://github.com/quarksuite/core/blob/master/USAGE.md#factory-settings
[ug-presets]: https://github.com/quarksuite/core/blob/master/USAGE.md#presets
[ug-configurations]: https://github.com/quarksuite/core/blob/master/USAGE.md#configurations
[clrs]: https://clrs.cc
[systemfonts]: https://systemfontstack.com
[chroma-js]: https://gka.github.io/chroma.js/
[tinycolor]: https://bgrins.github.io/TinyColor/
[styleD]: https://amzn.github.io/style-dictionary/#/properties
[tailwind]: https://tailwindcss.com
[css]: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
[sass]: https://sass-lang.com/documentation/variables
[less]: http://lesscss.org/features/#variables-feature
[stylus]: https://stylus-lang.com/docs/variables.html
[interop-sd]: https://github.com/quarksuite/core/blob/master/USAGE.md#style-dictionary
[interop-tw]: https://github.com/quarksuite/core/blob/master/USAGE.md#tailwind
[tdspec]: https://github.com/quarksuite/core/blob/master/USAGE.md#token-dictionary-spec
