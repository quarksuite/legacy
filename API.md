# Quarksuite API (v2.1.x)

*IMPORTANT: Be careful when upgrading from a previous version. Don’t hesitate to [submit an issue](https://github.com/quarksuite/core/issues) if you have any trouble upgrading.

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

Converts a color to another `format`.

```js
// converts to rgb by default
color.format('#348ec9');

// pass in another format
color.format('#348ec9', 'hsl')

// works with W3C named colors
color.format('rebeccapurple', 'hex');
```

#### Formats

The available formats for conversion work with any other format listed.

| Key     | Example              |
| ------- | -------------------- |
| `hex`   | `#beac90`            |
| `rgb`   | `rgb(30, 110, 0)`    |
| `hsl`   | `hsl(128, 40%, 75%)` |
| `named` | `yellowgreen`        |

### color.scheme

Builds a color scheme base. The `type` argument is required.

```js
// A complementary palette base
color.scheme('#348ec9', 'complementary');

// You can adjust the distance value of types analogous, split, dual
color.scheme('#348ec9', 'split', { distance: 30 });

// Types analogous, split can also include the complement as an accent
color.scheme('#348ec9', 'analogous', { accented: true });
```

#### Schemes

| Type =          | Note                                    |
| --------------- | --------------------------------------- |
| `complementary` |                                         |
| `analogous`     |                                         |
| `split`         |                                         |
| `triadic`       | Same as `split` with `{ distance: 60 }` |
| `dual`          |                                         |
| `tetradic`      | Same as `dual` with `{ distance: 90 }`  |

### color.variants

Generates palettes from a `color` and a `target` hue.

```js
// You can create tints, tones, shades
color.variants('#348ec9', '#ffffff');
color.variants('#348ec9', '#aaaaaa');
color.variants('#348ec9', '#111111');

// with options (defaults: limit = 2, contrast = 97, mode = 'logarithmic')
color.variants('#348ec9', '#ffffff', { limit: 3, contrast: 80, mode: 'linear'});
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

