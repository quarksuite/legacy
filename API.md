# Quarksuite API

## color.swatch

### complement()

#### Parameters

+ `color: string`:  a color to modify

#### Returns

`string`: the complement (opposite) of a color

#### Example

```js
import { color } from '@quarksuite/core';

const { swatch } = color;

swatch.complement('#348ec9');
```

### neutralize()

#### Parameters

+ `color: string`: a color to modify

#### Returns

`string`: the negation of a color. Good for neutral palettes

#### Example

```js 
import { color } from '@quarksuite/core';

const { swatch } = color;

swatch.neutralize('#348ec9');
```

### mix()

#### Parameters

+ `color: string`: a color to modify
+ `target: string`: a color to mix
+ `intensity: number`: strength of mixture

#### Returns

`string`: the mix of `color` and `target`

#### Example

```js 
import { color } from '@quarksuite/core';

const { swatch } = color;

swatch.mix('#348ec9', 'green');
swatch.mix('#deaded', 'red', 75);
```

## color.palette

### tints()

#### Parameters

+ `color: string`: color to create tints for
+ `range: number = 4`: number of colors to output
+ `contrast: number = 95`: adjusts the contrast of output

#### Returns

`string[]`: a collection of tints (color + white)

#### Example

```js
import { color } from '@quarksuite/core';

const { palette } = color;

palette.tints('#348ec9');
palette.tints('#deaded', 2, 60);
```

### tones()

#### Parameters

- `color: string`: color to create tones for
- `range: number = 4`: number of colors to output
- `contrast: number = 95`: adjusts the contrast of output

#### Returns

`string[]`: a collection of tints (color + gray)

#### Example

```js
import { color } from '@quarksuite/core';

const { palette } = color;

palette.tones('#348ec9');
palette.tones('#deaded', 2, 60);
```

### shades()

#### Parameters

- `color: string`: color to create shades for
- `range: number = 4`: number of colors to output
- `contrast: number = 95`: adjusts the contrast of output

#### Returns

`string[]`: a collection of tints (color + black)

#### Example

```js
import { color } from '@quarksuite/core';

const { palette } = color;

palette.shades('#348ec9');
palette.shades('#deaded', 2, 60);
```

## color.scheme

### complementary()

#### Parameters

- `color: string`: color to create scheme from

#### Returns

`string[]`: a complementary base scheme

#### Example

```js
import { color } from '@quarksuite/core';

const { scheme } = color;

scheme.complementary('#348ec9');
```

### splitComplementary()

#### Parameters

+ `color: string`: color to create scheme from

+ `distance?: number = 15`: distance of split from color (between 15 and 30 recommended)

+ `accented?: boolean = false`: include complement as an accent

#### Returns

`string[]`: a split complementary base scheme

#### Example

``` js
import { color } from '@quarksuite/core';

const { scheme } = color;

scheme.splitComplementary('#348ec9');
scheme.splitComplementary('#deaded', 30, true);
```

### triadic()

#### Parameters

- `color: string`: color to create scheme from


#### Returns

`string[]`: a triadic base scheme

#### Example

```js
import { color } from '@quarksuite/core';

const { scheme } = color;

scheme.triadic('#348ec9');
```

### analogous()

#### Parameters

- `color: string`: color to create scheme from
- `distance?: number = 15`: distance of split from color (between 15 and 30 recommended)
- `accented?: boolean = false`: include complement as an accent

#### Returns

`string[]`: an analogous base scheme

#### Example

```js
import { color } from '@quarksuite/core';

const { scheme } = color;

scheme.analogous('#348ec9');
scheme.analogous('#deaded', 30, true);
```

### dual()

#### Parameters

- `color: string`: color to create scheme from

- `distance?: number = 15`: distance between base colors (between 15 and 30 recommended)


#### Returns

`string[]`: a dual color base scheme

#### Example

```js
import { color } from '@quarksuite/core';

const { scheme } = color;

scheme.dual('#348ec9');
scheme.dual('#deaded', 30);
```

### tetradic()

#### Parameters

- `color: string`: color to create scheme from


#### Returns

`string[]`: a tetradic base scheme 

#### Example

```js
import { color } from '@quarksuite/core';

const { scheme } = color;

scheme.tetradic('#348ec9');
```

### content.scale

### create()

#### Parameters

+ `value: number`: value to use for generating a scale

+ `limit: number`: the number of values you want to generate

#### Returns

`Generator`: a modular scale

#### Example

```js
import { content } from '@quarksuite/core';

const { scale } = content;

const custom = (limit: number) => scale.create(1.375, limit);
```

### build()

#### Parameters

+ `type: (limit: number) => Generator`: the created scale

+ `limit: number`: the number of values to output

#### Returns

`number[]`: a modular scale

#### Example

```js
import { content } from '@quarksuite/core';

const { scale } = content;

const newScale = (limit: number) => scale.create(1.375, limit);

scale.build(newScale, 8);
```

### multistrand()

#### Parameters

+ `scale: number[]`: the scale you want to thread

+ `ratios: number[]`: ratios to thread through your scale (too many will dilute it)

#### Returns

`number[]`: a multi-threaded modular scale

#### Example

```js
import { content } from '@quarksuite/core';

const { scale } = content;

scale.multistrand(scale.ratios.golden, [1.5, 1.75])
```

### augment()

#### Parameters

+ `value: number`: a significant value in your design

+ `scale: number[]`: a scale to augment

+ `transform: (value: number, scaleValue: number) => number`:  the augment operation

#### Returns

`number[]`: an augmented scale

####  Example

```js
import { content } from '@quarksuite/core';

const { scale } = content;

const multiply = (base, value) => base * value;

scale.augment(1.25, scale.ratios.octave, multiply);
```

### output()

#### Parameters

+ `scale: number[]`: a scale to output
+ `precision: number = 4`:  decimal place precision of values
+ `unit: string = ‘rem’`  : CSS unit to attach to values 

#### Returns

`string[]`: a design system-ready modular scale

#### Example

```js
import { content } from '@quarksuite/core';

const { scale } = content;

const multiply = (base, value) => base * value;

scale.output(scale.augment(1.5, scale.ratios.golden, multiply), 5, 'rem');
```

### ratios

A set of common scales popular in design and art. More will be added on request. Uses `scale.create` internally.

| key          | ratio                       |
| ------------ | --------------------------- |
| `major3rd`   | `1.25`                      |
| `perfect4th` | `1.333`                     |
| `perfect5th` | `1.5`                       |
| `golden`     | phi =  `1.6180371352785146` |
| `major6th`   | `1.667`                     |
| `octave`     | `2`                         |
