> # External module: "content/scale"

A set of utilities responsible for creating and modifying modular scales.

## Index

### Functions

* [augment](_content_scale_.md#const-augment)
* [build](_content_scale_.md#build)
* [create](_content_scale_.md#create)
* [multistrand](_content_scale_.md#const-multistrand)
* [output](_content_scale_.md#const-output)

### Object literals

* [ratios](_content_scale_.md#const-ratios)

## Functions

### `Const` augment

▸ **augment**(`value`: number, `scale`: number[], `transform`: function, `precision`: number): *number[]*

*Defined in [content/scale.ts:88](https://github.com/quarksuite/core/blob/767c473/src/content/scale.ts#L88)*

Applies a transformation to the scale

**Parameters:**

▪ **value**: *number*

▪ **scale**: *number[]*

▪ **transform**: *function*

▸ (`value`: number, `scaleValue`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |
`scaleValue` | number |

▪`Default value`  **precision**: *number*= 4

**Returns:** *number[]*

___

###  build

▸ **build**(`type`: function, `limit`: number): *number[]*

*Defined in [content/scale.ts:42](https://github.com/quarksuite/core/blob/767c473/src/content/scale.ts#L42)*

A utility for building scales.

**Parameters:**

▪ **type**: *function*

▸ (`limit`: number): *`Generator`*

**Parameters:**

Name | Type |
------ | ------ |
`limit` | number |

▪`Default value`  **limit**: *number*= 8

**Returns:** *number[]*

___

###  create

▸ **create**(`value`: number, `limit`: number): *`IterableIterator<number>`*

*Defined in [content/scale.ts:35](https://github.com/quarksuite/core/blob/767c473/src/content/scale.ts#L35)*

A utility for creating new ratios.

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |
`limit` | number |

**Returns:** *`IterableIterator<number>`*

___

### `Const` multistrand

▸ **multistrand**(`scale`: number[], `ratios`: number[]): *number[]*

*Defined in [content/scale.ts:62](https://github.com/quarksuite/core/blob/767c473/src/content/scale.ts#L62)*

Includes intermediate values between a scale with multiple internal ratios

**Parameters:**

Name | Type |
------ | ------ |
`scale` | number[] |
`ratios` | number[] |

**Returns:** *number[]*

___

### `Const` output

▸ **output**(`scale`: number[], `precision`: number, `unit`: string): *string[]*

*Defined in [content/scale.ts:99](https://github.com/quarksuite/core/blob/767c473/src/content/scale.ts#L99)*

Outputs the scale with units and value precision

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`scale` | number[] | - |
`precision` | number | 4 |
`unit` | string | "rem" |

**Returns:** *string[]*

## Object literals

### `Const` ratios

### ▪ **ratios**: *object*

*Defined in [content/scale.ts:108](https://github.com/quarksuite/core/blob/767c473/src/content/scale.ts#L108)*

Exposes popular common ratios used in design and art

###  golden

• **golden**: *`golden`*

*Defined in [content/scale.ts:112](https://github.com/quarksuite/core/blob/767c473/src/content/scale.ts#L112)*

###  major3rd

• **major3rd**: *`major3rd`*

*Defined in [content/scale.ts:109](https://github.com/quarksuite/core/blob/767c473/src/content/scale.ts#L109)*

###  major6th

• **major6th**: *`major6th`*

*Defined in [content/scale.ts:113](https://github.com/quarksuite/core/blob/767c473/src/content/scale.ts#L113)*

###  octave

• **octave**: *`octave`*

*Defined in [content/scale.ts:114](https://github.com/quarksuite/core/blob/767c473/src/content/scale.ts#L114)*

###  perfect4th

• **perfect4th**: *`perfect4th`*

*Defined in [content/scale.ts:110](https://github.com/quarksuite/core/blob/767c473/src/content/scale.ts#L110)*

###  perfect5th

• **perfect5th**: *`perfect5th`*

*Defined in [content/scale.ts:111](https://github.com/quarksuite/core/blob/767c473/src/content/scale.ts#L111)*