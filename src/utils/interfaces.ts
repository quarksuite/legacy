import {InterpolationMode} from 'chroma-js';


export interface CustomSwatchSchema {
  [index: string]: string
}

export interface CustomPaletteSchema {
  [index: string]: {
    value: string,
    options?: ColorAdjustments
  }
}

export interface BasicPaletteSchema {
  base: string,
  scheme?: string,
  options?: ColorAdjustments,
  neutral?: boolean
}

export interface ColorAdjustments {
  variants?: number,
  mode?: InterpolationMode,
  contrast?: number
}
