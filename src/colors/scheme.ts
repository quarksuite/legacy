import chroma from 'chroma-js';

import { ColorBasicPaletteSchema, ColorOptionAdjustments } from '../utils/interfaces';
import * as Color from '../utils/colors';

// for convenience
const palette = Color.loadPalette;
const complement = Color.getComplement;
const split = Color.split;
const spread = Color.spread;

/**
 * Neutralizes a color with its complement
 */
const fetchNegation = (color: string): string => chroma.mix(color, complement(color), 0.5, 'lab').hex();

/**
 * Creates a palette from the neutralization
 */
const setNeutralPalette = (color: string, options: ColorOptionAdjustments): object =>
  palette(fetchNegation(color), options);

  /**
   * Inscribes a triangle of colors from point A.
   * rotation = 120 is an equilateral triad
   * rotation = 90 is an isosceles clash
 */
const inscribeTriangle = (color: string, rotation: number = 60): string[] => {
  const a = color;
  const bc = split(color, rotation);

  return [a, ...bc];
};

/**
 * Constructs tri-color schemes ('split complement', 'triadic', 'clash')
 */
const triColorScheme = (data: ColorBasicPaletteSchema, scheme: 'split complement' | 'triadic' | 'clash'): object => {
  const { base, options = {}, neutral } = data;
  let colors: string[];

  switch (scheme) {
    case 'split complement':
      colors = inscribeTriangle(base);
      break;
    case 'triadic':
      colors = inscribeTriangle(base, 120);
      break;
    case 'clash':
      colors = inscribeTriangle(base, 90);
      break;
    default:
      throw Error('scheme: expected one of ("split complement", "triadic", "clash")');
  }

  return neutral ? {
    main: palette(base, options),
    accent: palette(colors[0], options),
    spot: palette(colors[1], options),
    neutral: setNeutralPalette(base, options)
  } : {
      main: palette(base, options),
      accent: palette(colors[0], options),
      spot: palette(colors[1], options)
    }
};

/**
 * Inscribes a rectangle over the color wheel at point A
 * B = analog of a
 * C = complement of a
 * D = complement of b
 *
 * rotation = 90 is a perfect square
 * rotation = 60 is tetradic
 */
const inscribeRectangle = (color: string, rotation: number = 60) => {
  const a = color;
  const b = split(a, rotation)[1];
  const c = complement(a);
  const d = complement(b);

  return [a, c, b, d];
}


/**
 * Constructs quad-color schemes ('tetradic', 'square')
 */
const quadColorScheme = (data: ColorBasicPaletteSchema, scheme: 'tetradic' | 'square'): object => {
  const { base, options = {}, neutral } = data;
  let colors: string[];
  
  switch (scheme) {
    case 'tetradic':
      colors = inscribeRectangle(base)
      break;
    case 'square':
      colors = inscribeRectangle(base, 90);
      break;
    default:
      throw Error('scheme: expected one of ("tetradic", "square"');
  }

  return neutral ? {
    main: palette(colors[0], options),
    accent: palette(colors[1], options),
    spot: palette(colors[2], options),
    flourish: palette(colors[3], options),
    neutral: setNeutralPalette(base, options)
  } : {
      main: palette(colors[0], options),
      accent: palette(colors[1], options),
      spot: palette(colors[2], options),
      flourish: palette(colors[3], options)
    }
}

/**
 * Outputs a basic monochromatic scheme.
 * 
 * ```ts
 * import {monochromatic} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00'
 * }
 *
 * monochromatic(data)
 * ```
 *
 * Accepts options just a like a custom palette.
 *
 * _Note: __all__ schemes use these options. See the schema for more_
 *
 * ```ts
 * import {monochromatic} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00',
 *   options: {
 *     range: 'minimal' // two variants each
 *     contrast: 'med',
 *     mode: 'hsi'
 *   }
 * }
 *
 * monochromatic(data)
 * ```
 */
export const monochromatic = (data: ColorBasicPaletteSchema): object => {
  const { base, options = {}, neutral, } = data;
  return neutral ? {
    main: palette(base, options),
    neutral: setNeutralPalette(base, options)
  } : {
      main: palette(base, options)
    }
}

/**
 * Outputs a complementary scheme.
 * 
 * ```ts
 * import {complementary} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00'
 * }
 *
 * complementary(data)
 * ```
 *
 * Accepts options just a like a custom palette.
 *
 * _Note: __all__ schemes use these options. See the schema for more_
 *
 * ```ts
 * import {complementary} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00',
 *   options: {
 *     range: 'minimal' // two variants each
 *     contrast: 'med',
 *     mode: 'hsi'
 *   }
 * }
 *
 * complementary(data)
 * ```
 */
export const complementary = (data: ColorBasicPaletteSchema): object => {
  const { base, options = {}, neutral, } = data;
  const opposite = complement(base);

  return neutral ? {
    main: palette(base, options),
    accent: palette(opposite, options),
    neutral: setNeutralPalette(base, options)
  } : {
      main: palette(base, options),
      accent: palette(opposite, options)
    }
}

/**
 * Outputs a split complement scheme.
 * 
 * ```ts
 * import {splitComplement} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00'
 * }
 *
 * splitComplement(data)
 * ```
 *
 * Accepts options just a like a custom palette.
 *
 * _Note: __all__ schemes use these options. See the schema for more_
 *
 * ```ts
 * import {splitComplement} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00',
 *   options: {
 *     range: 'minimal' // two variants each
 *     contrast: 'med',
 *     mode: 'hsi'
 *   }
 * }
 *
 * splitComplement(data)
 * ```
 */
export const splitComplement = (data: ColorBasicPaletteSchema): object => triColorScheme(data, 'split complement');

/**
 * Outputs a triadic scheme.
 * 
 * ```ts
 * import {triadic} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00'
 * }
 *
 * triadic(data)
 * ```
 *
 * Accepts options just a like a custom palette.
 *
 * _Note: __all__ schemes use these options. See the schema for more_
 *
 * ```ts
 * import {triadic} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00',
 *   options: {
 *     range: 'minimal' // two variants each
 *     contrast: 'med',
 *     mode: 'hsi'
 *   }
 * }
 *
 * triadic(data)
 * ```
 */
export const triadic = (data: ColorBasicPaletteSchema): object => triColorScheme(data, 'triadic');

/**
 * Outputs a clash scheme.
 * 
 * ```ts
 * import {clash} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00'
 * }
 *
 * clash(data)
 * ```
 *
 * Accepts options just a like a custom palette.
 *
 * _Note: __all__ schemes use these options. See the schema for more_
 *
 * ```ts
 * import {clash} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00',
 *   options: {
 *     range: 'minimal' // two variants each
 *     contrast: 'med',
 *     mode: 'hsi'
 *   }
 * }
 *
 * clash(data)
 * ```
 */
export const clash = (data: ColorBasicPaletteSchema): object => triColorScheme(data, 'clash');

/**
 * Outputs a analogous scheme.
 * 
 * ```ts
 * import {analogous} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00'
 * }
 *
 * analogous(data)
 * ```
 *
 * Accepts options just a like a custom palette.
 *
 * _Note: __all__ schemes use these options. See the schema for more_
 *
 * ```ts
 * import {analogous} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00',
 *   options: {
 *     range: 'minimal' // two variants each
 *     contrast: 'med',
 *     mode: 'hsi'
 *   }
 * }
 *
 * analogous(data)
 * ```
 */
export const analogous = (data: ColorBasicPaletteSchema): object => {
  const { base, options = {}, neutral } = data;
  const analogues = spread(base);
  
  return neutral ? {
    main: palette(base, options),
    accent: palette(analogues[0], options),
    spot: palette(analogues[1], options),
    flourish: palette(analogues[2], options),
    neutral: setNeutralPalette(base, options)
  } : {
    main: palette(base, options),
    accent: palette(analogues[0], options),
    spot: palette(analogues[1], options),
    flourish: palette(analogues[2], options)
    }
}

/**
 * Outputs a tetradic scheme.
 * 
 * ```ts
 * import {tetradic} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00'
 * }
 *
 * tetradic(data)
 * ```
 *
 * Accepts options just a like a custom palette.
 *
 * _Note: __all__ schemes use these options. See the schema for more_
 *
 * ```ts
 * import {analogous} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00',
 *   options: {
 *     range: 'minimal' // two variants each
 *     contrast: 'med',
 *     mode: 'hsi'
 *   }
 * }
 *
 * tetradic(data)
 * ```
 */
export const tetradic = (data: ColorBasicPaletteSchema): object => quadColorScheme(data, 'tetradic');

/**
 * Outputs a square scheme.
 * 
 * ```ts
 * import {square} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00'
 * }
 *
 * square(data)
 * ```
 *
 * Accepts options just a like a custom palette.
 *
 * _Note: __all__ schemes use these options. See the schema for more_
 *
 * ```ts
 * import {square} from '@quarksilver/core';
 *
 * const data: ColorBasicPaletteSchema = {
 *   base: '#f00',
 *   options: {
 *     range: 'minimal' // two variants each
 *     contrast: 'med',
 *     mode: 'hsi'
 *   }
 * }
 *
 * square(data)
 * ```
 */
export const square = (data: ColorBasicPaletteSchema): object => quadColorScheme(data, 'square');
