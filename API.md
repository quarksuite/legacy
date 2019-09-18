# Quarksuite API (v2.0.0)

*IMPORTANT: Be careful when upgrading from a previous version. Don’t hesitate to [submit an issue](https://github.com/quarksuite/core/issues) if you have any trouble upgrading. I’ve also eschewed an overly technical writing style since that gets in the way of clear communication at times.*

*You can [try out any example](https://www.pika.dev/packages/@quarksuite/core/repl) with the Pika.dev REPL.*

## Color Functions

### color.complement

Grabs the complement of a color.

```js
color.complement('#348ec9')
```

### color.neutralize

Mixes a color with its complement to neutralize it. Great for muted color palettes.

```js
color.neutralize('#348ec9')
```

### color.mix

Mixes any two colors. You can provide an `amount` to mix them more or less.

```js
color.mix('#348ec9', 'orange');

// less
color.mix('#348ec9', 'orange', 30);

// more
color.mix('#348ec9', 'orange', 80);
```

### color.format

Converts a color to another `format`. Use caution when passing colors with an alpha channel.

```js
// converts to rgb by default
color.format('#348ec9');

// pass in another format
color.format('#348ec9', 'hsl')

// convert a color with an alpha channel
color.format('#348ec990', 'rgba');

// works with W3C named colors
color.format('rebeccapurple', 'hex');
```

#### Formats

The available formats for conversion work with any other format listed.

| Key     | Example                    |
| ------- | -------------------------- |
| `hex`   | `#beac90`                  |
| `hex8`  | `#bea9ccaa`                |
| `rgb`   | `rgb(30, 110, 0)`          |
| `rgba`  | `rgba(44, 150, 70, 0.31)`  |
| `hsl`   | `hsl(128, 40%, 75%)`       |
| `hsla`  | `hsla(33, 78%, 42%, 0.25)` |
| `named` | `yellowgreen`              |

### color.palette

Responsible for building color palettes. You can output a collection of base colors and modify them according to your needs. You can also generate your whole palette with `tints`, `tones`, and `shades`.

```js
// creates a 1:1 color object by default
color.palette('#348ec9');
```

#### Schemes

```js
// monochromatic scheme with three tints and shades
color.palette('#348ec9', {
  tints: {}, shades: {}
});

// complementary scheme
color.palette('#348ec9', {
  scheme: { type: 'complementary' }
});

// split complementary
color.palette('#348ec9', {
  scheme: { type: 'split complementary' }
});

// you can adjust the distance of the spread
color.palette('#348ec9', {
  scheme: { type: 'split complementary', distance: 30 }
});

// And also add the complement as an accent
color.palette('#348ec9', {
  scheme: { type: 'split complementary', distance: 30, accented: true }
});

// Triadic is a shortcut for a split complementary scheme
// that creates an equilateral triangle
color.palette('#348ec9', {
  scheme: { type: 'triadic' }
});

// an analogous scheme with all other defaults
color.palette('#348ec9', {
  scheme: { type: 'analogous' }
});

// analogous schemes can also be spread and accented
color.palette('#348ec9', {
  scheme: { type: 'analogous', distance: 45, accented: true }
});

// dual color = tetradic
color.palette('#348ec9', {
  scheme: { type: 'dual color' }
})

// accepts a distance but cannot be accented
color.palette('#348ec9', {
  scheme: { type: 'dual color', distance: 30 }
})

// Tetradic is a shortcut for a dual color scheme
// that creates a perfect square
color.palette('#348ec9', {
  scheme: { type: 'tetradic', distance: 30 }
})
```

#### Variants

Do keep in mind that if you don’t pass in variant objects, Quarksuite won’t generate them.

```js
// By default passing in variants creates 3 of 
// that variant using a logarithmic blend mode
color.palette('goldenrod', {
  tints: {}, shades: {}
})

// More variants
color.palette('goldenrod', {
  tints: { limit: 5 }
})

// Fewer variants
color.palette('goldenrod', {
  tints: { limit: 2 }
})

// Lower contrast
color.palette('dodgerblue', {
  shades: { contrast: 40 }
})

// Higher contrast
color.palette('dodgerblue', {
  shades: { contrast: 99 }
})

// Linear blend mode
color.palette('aliceblue', {
  tones: { mode: 'linear' }
})
```

## Typography Functions

### typography.system

Outputs a system font stack for the given `family`.

```js
// sans-serif
typography.system('sans');

// serif
typography.system('serif');

// monospace
typography.system('monospace');
```

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
| `perf4th`  | `1.333`                    |
| `dim5th`   | `1.414`                    |
| `min6th`   | `1.6`                      |
| `golden`   | phi = `1.6180371352785146` |
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

Outputs a scale with the desired `unit` and `precision`. Accepts all available absolute and relative CSS units.

```js
// By default, it returns 'rem' units and a
// precision of 4
scale.output(scale.create());

// Allows you to use another unit
scale.output(scale.create(), 'em');

// More precise values
scale.output(scale.create(), 'rem', 7);

// Less precise values
scale.output(scale.create(), 'rem', 2);
```

