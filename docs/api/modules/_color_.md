---
id: _color_
title: color
sidebar_label: color
---

[Globals](../globals.md) / ["color"](_color_.md) /

## Index

### Object literals

* [palette](_color_.md#const-palette)
* [scheme](_color_.md#const-scheme)
* [swatch](_color_.md#const-swatch)

## Object literals

### `Const` palette

### ▪ **palette**: *object*

*Defined in [color.ts:39](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L39)*

###  shades

• **shades**: *`shades`*

*Defined in [color.ts:42](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L42)*

###  tints

• **tints**: *`tints`*

*Defined in [color.ts:40](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L40)*

###  tones

• **tones**: *`tones`*

*Defined in [color.ts:41](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L41)*

___

### `Const` scheme

### ▪ **scheme**: *object*

*Defined in [color.ts:99](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L99)*

###  analogous

▸ **analogous**(`color`: string, `distance`: number, `accented`: boolean, `range`: number, `contrast`: number): *string | string[][] | string | string[][][]*

*Defined in [color.ts:117](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L117)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`color` | string | - |
`distance` | number | 15 |
`accented` | boolean | false |
`range` | number | 4 |
`contrast` | number | 95 |

**Returns:** *string | string[][] | string | string[][][]*

###  complementary

▸ **complementary**(`color`: string, `range`: number, `contrast`: number): *string | string[][] | string | string[][][]*

*Defined in [color.ts:103](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L103)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`color` | string | - |
`range` | number | 4 |
`contrast` | number | 95 |

**Returns:** *string | string[][] | string | string[][][]*

###  dual

▸ **dual**(`color`: string, `distance`: number, `range`: number, `contrast`: number): *string | string[][] | string | string[][][]*

*Defined in [color.ts:125](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L125)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`color` | string | - |
`distance` | number | 15 |
`range` | number | 4 |
`contrast` | number | 95 |

**Returns:** *string | string[][] | string | string[][][]*

###  monochromatic

▸ **monochromatic**(`color`: string, `range`: number, `contrast`: number): *string | string[][] | string | string[][][]*

*Defined in [color.ts:100](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L100)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`color` | string | - |
`range` | number | 4 |
`contrast` | number | 95 |

**Returns:** *string | string[][] | string | string[][][]*

###  splitComplementary

▸ **splitComplementary**(`color`: string, `distance`: number, `accented`: boolean, `range`: number, `contrast`: number): *string | string[][] | string | string[][][]*

*Defined in [color.ts:106](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L106)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`color` | string | - |
`distance` | number | 15 |
`accented` | boolean | false |
`range` | number | 4 |
`contrast` | number | 95 |

**Returns:** *string | string[][] | string | string[][][]*

###  tetradic

▸ **tetradic**(`color`: string, `range`: number, `contrast`: number): *string | string[][] | string | string[][][]*

*Defined in [color.ts:128](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L128)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`color` | string | - |
`range` | number | 4 |
`contrast` | number | 95 |

**Returns:** *string | string[][] | string | string[][][]*

###  triadic

▸ **triadic**(`color`: string, `range`: number, `contrast`: number): *string | string[][] | string | string[][][]*

*Defined in [color.ts:114](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L114)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`color` | string | - |
`range` | number | 4 |
`contrast` | number | 95 |

**Returns:** *string | string[][] | string | string[][][]*

___

### `Const` swatch

### ▪ **swatch**: *object*

*Defined in [color.ts:18](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L18)*

###  complement

• **complement**: *`complement`*

*Defined in [color.ts:19](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L19)*

###  mix

• **mix**: *`mix`*

*Defined in [color.ts:21](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L21)*

###  neutralize

• **neutralize**: *`neutralize`*

*Defined in [color.ts:20](https://github.com/quarksuite/core/blob/fe4ecc7/src/color.ts#L20)*