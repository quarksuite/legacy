# Quarksuite API (v4.0.0)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Functional Utilities](#functional-utilities)
  - [set](#set)
    - [Usage](#usage)
    - [Param](#param)
    - [Returns](#returns)
  - [pipe](#pipe)
    - [Usage](#usage-1)
    - [Param](#param-1)
    - [Returns](#returns-1)
- [Prototyping Functions](#prototyping-functions)
  - [clrs](#clrs)
    - [Usage](#usage-2)
    - [Param](#param-2)
    - [Returns](#returns-2)
  - [systemfonts](#systemfonts)
    - [Usage](#usage-3)
    - [Param](#param-3)
    - [Returns](#returns-3)
- [Color Functions](#color-functions)
  - [hex](#hex)
    - [Usage](#usage-4)
    - [Param](#param-4)
    - [Returns](#returns-4)
  - [rgb](#rgb)
    - [Usage](#usage-5)
    - [Param](#param-5)
    - [Returns](#returns-5)
  - [hsl](#hsl)
    - [Usage](#usage-6)
    - [Param](#param-6)
    - [Returns](#returns-6)
  - [hue](#hue)
    - [Usage](#usage-7)
    - [Param](#param-7)
    - [Returns](#returns-7)
  - [saturation](#saturation)
    - [Usage](#usage-8)
    - [Param](#param-8)
    - [Returns](#returns-8)
  - [lightness](#lightness)
    - [Usage](#usage-9)
    - [Param](#param-9)
    - [Returns](#returns-9)
  - [alpha](#alpha)
    - [Usage](#usage-10)
    - [Param](#param-10)
    - [Returns](#returns-10)
  - [mix](#mix)
    - [Usage](#usage-11)
    - [Param](#param-11)
    - [Returns](#returns-11)
- [Scheme Functions](#scheme-functions)
  - [complementary](#complementary)
    - [Usage](#usage-12)
    - [Param](#param-12)
    - [Returns](#returns-12)
  - [analogous](#analogous)
    - [Usage](#usage-13)
    - [Param](#param-13)
    - [Returns](#returns-13)
  - [triad](#triad)
    - [Usage](#usage-14)
    - [Param](#param-14)
    - [Returns](#returns-14)
  - [tetrad](#tetrad)
    - [Usage](#usage-15)
    - [Param](#param-15)
    - [Returns](#returns-15)
  - [custom](#custom)
    - [Usage](#usage-16)
    - [Param](#param-16)
    - [Returns](#returns-16)
- [Variant Functions](#variant-functions)
  - [tints](#tints)
    - [Usage](#usage-17)
    - [Param](#param-17)
    - [Returns](#returns-17)
  - [tones](#tones)
    - [Usage](#usage-18)
    - [Param](#param-18)
    - [Returns](#returns-18)
  - [shades](#shades)
    - [Usage](#usage-19)
    - [Param](#param-19)
    - [Returns](#returns-19)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

You can [try out all examples on RunKit][runkit].

> As of v4, I flattened the API so that each function is exported as a top level module. This makes it easier to use only what you need from the library.
> 
> Additionally, the functions no longer come curried. Instead, v4 exposes functional utilities you can use to curry and compose them directly.
> 
> Beyond that, the *documentation* still organizes the modules by how they're used to keep things simple.

## Functional Utilities

These are part of advanced use and aren't *required* to use the library. Instead, they make it easier to **use and combine** settings.

### set

`set` allows you to partially apply the arguments of any other function in the library including **new functions created with set**.

#### Usage

```js
// rotate any color's hue by a third
const rotateByThird = set(hue, 120);

rotateByThird('red'); // #00ff00
rotateByThird('lime'); // #0000ff
rotateByThird('blue'); // #ff0000

// chaining example

// mix colors evenly
const evenly = set(mix, 50);

// mix any color evenly with coral
const mixWithCoral = set(evenly, 'coral');

// mix any color evenly with dodgerblue
const mixWithDodgerblue = set(evenly, 'dodgerblue');

mixWithCoral('springgreen'); // #b4c96a
mixWithDodgerblue('springgreen') // #15cfc9
```

#### Param

+ `fn`: the function you want to curry
+ `applied`: the arguments you want to apply

#### Returns

A function whose parameters are the `remaining` arguments of `fn`

### pipe

A function that allows you to perform two operations consecutively.

> Giving a variable compose the proper types is a bit of a hassle in TypeScript right now, but `pipe` can still be chained like any other `compose`.

#### Usage

```js

// mix any color evenly with coral AND dodgerblue
const mixWithCoralAndDodgerblue = pipe(mixWithCoral, mixWithDodgerblue);

mixWithCoralAndDodgerblue('springgreen'); // #81afc3

// chaining example

const mixAndRotate = pipe(mixWithCoralAndDodgerblue, rotateByThird);

mixAndRotate('springgreen'); // #c381af
```

#### Param

+ `f`: first operation
+ `g`: second operation

#### Returns

A new function whose parameter is the data to operate on

## Prototyping Functions

These functions are prototyping helpers and include clrs.cc accessible web defaults and system font stacks.

### clrs

A function that maps a web default with its [clrs.cc accessible match][clrs]. If a match isn't found, it will throw an error.

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

`fonts`: one or more arguments targeting the desired stacks

#### Returns

An array of font stacks matching each defined family

## Color Functions

These functions work exclusively on any valid CSS color (even those with transparency) to convert to another format or modify via adjustment or mixture. Color functions also check the format and will throw errors if your color is invalid.

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

#### Param

+ `n`: the amount to shift the hue
+ `color`: the color to adjust

#### Returns

A new color that is the result of adjusting the hue of the input color

### saturation

A function that adjusts the saturation of any valid CSS color

> The saturation adjustment is bound between a range of 0-100% and will lock at either depending how on the adjustment value goes out of bounds

#### Usage

```js
// positive value saturates
saturation(30, 'rgb(31, 220, 25)'); // rgb(8, 245, 0)

// negative value desaturates
saturation(-25, 'crimson'); // #be324e

// >100 locks at full saturation
saturation(300, 'hsl(40, 35%, 70%)'); // hsl(40, 100%, 70%)

// <=0 locks at no saturation
saturation(-250, '#44cc00'); // #666666
```

#### Param

+ `n`: the amount to shift the saturation
+ `color`: the color to adjust

#### Returns

A new color that is the result of adjusting the saturation of the input color

### lightness

A function that adjusts the lightness/luminance of any valid CSS color

> The lightness adjustment is bound between a range of 0-100% and will lock at either depending how on the adjustment value goes out of bounds

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

#### Param

+ `n`: the amount to shift the lightness
+ `color`: the color to adjust

#### Returns

A new color that is the result of adjusting the lightness of the input color

### alpha

A function that adjusts the alpha/transparency of any valid CSS color

> The alpha adjustment is bound between a range of 0-100% and will lock at either depending how on the adjustment value goes out of bounds

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

#### Param

+ `n`: the amount to shift the alpha
+ `color`: the color to adjust

#### Returns

A new color that is the result of adjusting the alpha of the input color

### mix

A function that mixes a target color with any valid CSS color by a given percentage.

> The `mix` function will throw an error if either the target or input color is invalid

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

#### Param

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
> An arc of 60 is the maximum before the colors become too different to maintain an analogous harmony.

#### Usage

```js
// low contrast analogous
analogous(30, 'red'); // [ '#ff0000', '#ff0080', '#ff8000' ]

// mid contrast analogous
analogous(45, 'lime'); // [ '#00ff00', '#bfff00', '#00ffbf' ]

// high contrast analogous
analogous(60, 'blue'); // [ '#0000ff', '#00ffff', '#ff00ff' ]
```

#### Param

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
triad(30, 'red'); // [ '#ff0000', '#00ff80', '#0080ff' ]

// high contrast split complement
triad(45, 'lime'); // [ '#00ff00', '#4000ff', '#ff0040' ]

// equilateral triad (triadic)
triad(60, 'blue'); // [ '#0000ff', '#ff0000', '#00ff00' ]

// triadic clash
triad(90, 'rgb(11, 77, 119)'); // [ 
//   'rgb(11, 78, 119)', 
//   'rgb(106, 11, 119)', 
//   'rgb(24, 119, 11)' 
// ]
```

#### Param

+ `arc`: distance between the *complement* of the input color and its adjacent hues
+ `color`: the input color

#### Returns

An array of: `[color, leftOfOpposite, rightOfOpposite]`

### tetrad

A function that creates a four color scheme from any valid CSS color.

A tetradic scheme is made of a color, its opposite, and two hues between them. A tetrad is also called a dual color scheme.

> A tetrad is an inherently balanced scheme. Much like four legs on a table, it provides your palette a sense of sturdiness.
> 
> Rather than arc, the contrast that can exist in a tetrad varies by the rotation of the the input color and its complement.
> 
> Rotated 90 degrees, the four colors are spaced evenly around the wheel and create a square.

#### Usage

```js
// mid contrast tetrad
tetrad(30, 'red'); // [ '#ff0000', '#00ffff', '#ff8000', '#0080ff' ]

// high contrast tetrad 
tetrad(15, 'lime'); // [ '#00ff00', '#ff00ff', '#00ff40', '#ff00bf' ]

// balanced tetrad
tetrad(60, 'blue'); // [ '#0000ff', '#ffff00', '#ff00ff', '#00ff00' ]

// square
tetrad(90, 'hsl(33, 100%, 30%)'); // [
//    'hsl(33, 100%, 30%)',
//    'hsl(213, 100%, 30%)',
//    'hsl(123, 100%, 30%)',
//    'hsl(303, 100%, 30%)'
// ]
```

#### Param

+ `rotation`: degrees of rotation from input color and complement
+ `color`: the input color

#### Returns

An array of: `[color, opposite, colorRotation, oppositeRotation]`

### custom

A function that creates a custom scheme from any valid CSS color.

You can use this function to create five, six, or `n` hue color schemes.

> If any of the output hues would return the same value, the duplicates are removed.

#### Usage

```js
// five hue
custom({ hues: 5, arc: 72}, 'red'); // [ 
//   '#ff0000',
//   '#ccff00',
// 	 '#00ff66',
//   '#0066ff',
//   '#cc00ff'
// ]

// six hue
custom({ hues: 6, arc: 45 }, 'lime'); // [
//   '#00ff00',
//   '#00ffbf',
//   '#0080ff',
//   '#4000ff',
//   '#ff00ff',
//   '#ff0040'
// ]

// 4 hues, 72 degree split, rotated 60 degrees
custom({ hues: 4, arc: 72, rotation: 60}, 'blue'); // [
//   '#0000ff',
//   '#ff00ff',
//   '#ff3300',
//   '#99ff00'
// ]
```


#### Param

+ `options`: custom color scheme options
	* `hues`: number of output hues
	* `arc`: distance between hues on the color wheel
	* `rotation?`: an optional rotational offset for the hues
+ `color`: the input color

#### Returns

An array of: `[color, ...generatedHues]`

## Variant Functions

These functions work on any valid CSS color to create tints, tones, and shades to complete your palettes.

As with the other functions that operate on colors, an invalid color will throw an error.

### tints

A function that creates tints from any valid CSS color.

> A tint is made of a color mixed with pure white.

#### Usage

```js
// 4 high contrast tints
tints(4, 99, 'red'); // [ '#ff7f7f', '#ffb3b3', '#ffdcdc', '#fffefe' ]

// 3 mid contrast tints
tints(3, 64, 'lime'); // [ '#76ff76', '#a7ffa7', '#ccffcc' ]

// 2 low contrast tints
tints(2, 32, 'blue'); // [ '#6666ff', '#9090ff' ]
```

#### Param

+ `count`: number of tints to create
+ `contrast`: percentage of contrast between tints
+ `color`: the input color

#### Returns

An array of tints ordered from light to lightest.

### tones

A function that creates tones from any valid CSS color.

> A tone is made of a color mixed with pure gray.

#### Usage

```js
// 4 high contrast tones
tones(4, 99, 'red'); // [ '#e64040', '#ca5a5a', '#aa6e6e', '#827f7f' ]

// 3 mid contrast tones
tones(3, 64, 'lime'); // [ '#3bea3b', '#54d254', '#66b866' ]

// 2 low contrast tones
tones(2, 32, 'blue'); // [ '#3333ef', '#4848de' ]
```

#### Param

+ `count`: number of tones to create
+ `contrast`: percentage of contrast between tones
+ `color`: the input color

#### Returns

An array of tones ordered from least to most muted.

### shades

A function that creates shades from any valid CSS color.

> A shade is made of a color mixed with pure black.

#### Usage

```js
// 4 high contrast shades
shades(4, 99, 'red'); // [ '#dd0000', '#b50000', '#810000', '#1a0000' ]

// 3 mid contrast shades
shades(3, 64, 'lime'); // [ '#00e200', '#00c100', '#009900' ]

// 2 low contrast shades
shades(2, 32, 'blue'); // [ '#0000ea', '#0000d2' ]
```

#### Param

+ `count`: number of shades to create
+ `contrast`: percentage of contrast between shades
+ `color`: the input color

#### Returns

An array of shades ordered from dark to darkest.

[runkit]: https://npm.runkit.com/%40quarksuite%2Fcore
[clrs]: https://clrs.cc
[systemfonts]: https://systemfontstack.com