import chroma from 'chroma-js';

import { ColorBasicPaletteSchema, ColorOptionAdjustments } from '../utils/interfaces';
import * as Color from '../utils/colors';

const palette = Color.loadPalette;
const complement = Color.getComplement;
const split = Color.split;
const spread = Color.spread;

const fetchNegation = (color: string): string => chroma.mix(color, complement(color), 0.5, 'lab').hex();

const setNeutralPalette = (color: string, options: ColorOptionAdjustments): object =>
  palette(fetchNegation(color), options)

  const inscribeRGBTriangle = (color: string, rotation: number = 60): string[] => {
    const a = color;
    const bc = split(color, rotation);

    return [a, ...bc];
  }

const triColorScheme = (data: ColorBasicPaletteSchema, scheme: 'split complement' | 'triadic' | 'clash'): object => {
  const { base, options = {}, neutral } = data;
  let colors: string[];

  switch (scheme) {
    case 'split complement':
      colors = inscribeRGBTriangle(base);
      break;
    case 'triadic':
      colors = inscribeRGBTriangle(base, 120);
      break;
    case 'clash':
      colors = inscribeRGBTriangle(base, 90);
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

const inscribeRGBRect = (color: string, rotation: number = 60) => {
  const a = color;
  const b = split(a, rotation)[1];
  const c = complement(a);
  const d = complement(b);

  return [a, c, b, d];
}

const quadColorScheme = (data: ColorBasicPaletteSchema, scheme: 'tetradic' | 'square'): object => {
  const { base, options = {}, neutral } = data;
  let colors: string[];
  
  switch (scheme) {
    case 'tetradic':
      colors = inscribeRGBRect(base)
      break;
    case 'square':
      colors = inscribeRGBRect(base, 90);
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

export const monochromatic = (data: ColorBasicPaletteSchema): object => {
  const { base, options = {}, neutral, } = data;
  return neutral ? {
    main: palette(base, options),
    neutral: setNeutralPalette(base, options)
  } : {
      main: palette(base, options)
    }
}

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

export const splitComplement = (data: ColorBasicPaletteSchema): object => triColorScheme(data, 'split complement');
export const triadic = (data: ColorBasicPaletteSchema): object => triColorScheme(data, 'triadic');
export const clash = (data: ColorBasicPaletteSchema): object => triColorScheme(data, 'clash');

export const analogous = (data: ColorBasicPaletteSchema): object => {
  const { base, options = {}, neutral } = data;
  let analogues = spread(base);

  return neutral ? {
    main: palette(base, options),
    alpha: palette(analogues[0], options),
    beta: palette(analogues[1], options),
    gamma: palette(analogues[2], options),
    neutral: setNeutralPalette(base, options)
  } : {
      main: palette(base, options),
      alpha: palette(analogues[0], options),
      beta: palette(analogues[1], options),
      gamma: palette(analogues[2], options),
    }
}

export const tetradic = (data: ColorBasicPaletteSchema): object => quadColorScheme(data, 'tetradic');
export const square = (data: ColorBasicPaletteSchema): object => quadColorScheme(data, 'square');
