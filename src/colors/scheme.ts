/**
 * The [[ColorsScheme]] module creates basic palettes for Quarksilver color tokens.
 */
import chroma from 'chroma-js';

import {ColorBasicPaletteSchema, ColorOptionAdjustments} from '../../helpers/interfaces';
import {Utility} from '../../helpers/utility';

const palette = Utility.loadColorPalette;
const complement = Utility.getColorComplement;
const split = Utility.splitColor;
const spread = Utility.spreadColor;

const fetchNegation = (color: string): string => chroma.mix(color, complement(color), 0.5, 'lab').css();

const setNeutralPalette = (color: string, options: ColorOptionAdjustments): object =>
  palette(fetchNegation(color), options)

/**
 * A module namespaced under [[Colors]].
 * 
 * Contains [[monochromatic]], [[complementary]], [[splitComplementary]],
 * [[analogous]], [[tetradic]] methods for generating color schemes.
 * ```
 */
export const ColorsScheme = {
  /**
   * Generates monochromatic color schemes.
   * Parses data of type: [[ColorBasicPaletteSchema]]
   *
   * Usage:
   * ```ts
   * import {Colors} from '@quarksilver/core';
   *
   *const data: ColorBasicPaletteSchema = {
   *   base: '#f00',
   *   options: {
   *     contrast: 90,
   *     range: 'material',
   *     mode: 'lch'
   *   }
   * }
   *
   * const palette = Colors.ColorsScheme.monochromatic(data)
   * ```
   */
  monochromatic(data: ColorBasicPaletteSchema): object {
    const { base, options = {}, neutral, } = data;
    return neutral ? {
      main: palette(base, options),
      neutral: setNeutralPalette(base, options)
    } : {
      main: palette(base, options)
    }
  },

  /**
   * Generates complementary color schemes.
   * Parses data of type: [[ColorBasicPaletteSchema]]
   *
   * Usage:
   * ```ts
   * import {Colors} from '@quarksilver/core';
   *
   *const data: ColorBasicPaletteSchema = {
   *   base: '#f00',
   *   options: {
   *     contrast: 90,
   *     range: 'material',
   *     mode: 'lch'
   *   }
   * }
   *
   * const palette = Colors.ColorsScheme.complementary(data);
   * ```
   */
  complementary(data: ColorBasicPaletteSchema): object {
    const { base, options = {}, neutral, } = data;
    return neutral ? {
      main: palette(base, options),
      accent: palette(complement(base), options),
      neutral: setNeutralPalette(base, options)
    } : {
      main: palette(base, options),
      accent: palette(complement(base), options)
    }
  },

  /**
   * Generates split complement color schemes.
   * Parses data of type: [[ColorBasicPaletteSchema]]
   *
   * _Note: Also generates `triadic`, `clash` as aliases_
   *
   * Usage:
   * ```ts
   * import {Colors} from '@quarksilver/core';
   *
   *const data: ColorBasicPaletteSchema = {
   *   base: '#f00',
   *   options: {
   *     contrast: 90,
   *     range: 'material',
   *     mode: 'lch'
   *   }
   * }
   *
   * const palette = Colors.ColorsScheme.splitComplementary(data);
   * const triadicPalette = Colors.ColorsScheme.splitComplementary(data, 'triadic');
   * const clashPalette = Colors.ColorsScheme.splitComplementary(data, 'clash');
   * ```
   */
  splitComplementary(data: ColorBasicPaletteSchema, scheme?: 'triadic' | 'clash'): object {
    const { base, options = {}, neutral } = data;
    let colors: string[] = [];

    switch(scheme) {
      case 'clash':
        colors = split(base, 90);
        break;
      case 'triadic':
        colors = split(base, 60);
        break;
      default:
        colors = split(base);
        break;
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
  },

  /**
   * Generates analogous color schemes.
   * Parses data of type: [[ColorBasicPaletteSchema]]
   *
   * Usage:
   * ```ts
   * import {Colors} from '@quarksilver/core';
   *
   *const data: ColorBasicPaletteSchema = {
   *   base: '#f00',
   *   options: {
   *     contrast: 90,
   *     range: 'minimal',
   *     mode: 'lch'
   *   }
   * }
   *
   * const palette = Colors.ColorsScheme.analogous(data);
   * ```
   */
  analogous(data: ColorBasicPaletteSchema): object {
    const { base, options = {}, neutral } = data;
    let colors = spread(base);

    return neutral ? {
      alpha: palette(colors[0], options),
      beta: palette(colors[1], options),
      gamma: palette(colors[2], options),
      delta: palette(colors[3], options),
      neutral: setNeutralPalette(base, options)
    } : {
      alpha: palette(colors[0], options),
      beta: palette(colors[1], options),
      gamma: palette(colors[2], options),
      delta: palette(colors[3], options)
    }
  },

  /**
   * Generates tetradic color schemes.
   * Parses data of type: [[ColorBasicPaletteSchema]]
   *
   * Usage:
   * ```ts
   * import {Colors} from '@quarksilver/core';
   *
   *const data: ColorBasicPaletteSchema = {
   *   base: '#f00',
   *   options: {
   *     contrast: 90,
   *     range: 'minimal',
   *     mode: 'lch'
   *   }
   * }
   *
   * const palette = Colors.ColorsScheme.tetradic(data);
   * ```
   */
  tetradic(data: ColorBasicPaletteSchema): object {
    const { base, options = {}, neutral } = data;
    const baseSplit = split(base);
    const compSplit = split(complement(base));

    let colors = [...baseSplit, ...compSplit];

    return neutral ? {
      alpha: palette(colors[0], options),
      beta: palette(colors[1], options),
      gamma: palette(colors[2], options),
      delta: palette(colors[3], options),
      neutral: setNeutralPalette(base, options)
    } : {
      alpha: palette(colors[0], options),
      beta: palette(colors[1], options),
      gamma: palette(colors[2], options),
      delta: palette(colors[3], options)
    }
  }
}
