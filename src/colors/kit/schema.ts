import { InterpolationMode } from 'chroma-js';

export interface QuarksilverConfigSchema {
  colors:
    | ColorCustomSwatchSchema
    | ColorCustomPaletteSchema
    | ColorBasicPaletteSchema;
  content: ContentSchema;
}

export interface ContentSchema {
  fonts: ContentFontsSchema;
  scale: ContentScaleSchema;
}

export interface ColorCustomSwatchSchema {
  [index: string]: string | string[];
}

export interface ColorCustomPaletteSchema {
  [index: string]: {
    value: string;
    options?: ColorOptions;
  };
}

export interface ColorBasicPaletteSchema {
  base: string;
  options?: ColorOptions;
}

export interface ColorOptions {
  range?: number | 'minimal' | 'material';
  mode?: InterpolationMode;
  contrast?: number | 'low' | 'med' | 'high';
}

export interface ContentFontsSchema {
  [index: string]: {
    name: string;
    stack: string | string[];
    styles: (string | number)[];
  };
}

export interface ContentScaleSchema {
  base: string;
  ratio:
    | number
    | 'augmented4th'
    | 'goldenRatio'
    | 'minor2nd'
    | 'minor3rd'
    | 'major2nd'
    | 'major3rd'
    | 'perfect4th'
    | 'perfect5th';
  range: number | [number, number] | 'fullScale' | 'half' | 'minimal';
}
