import { InterpolationMode } from 'chroma-js';

/**
 * Models a complete Quarksilver configuration.
 */
export interface QuarksilverConfigSchema {
  /** An aggregate of color configuration schema */
  colors:
    | ColorCustomSwatchSchema
    | ColorCustomPaletteSchema
    | ColorBasicPaletteSchema;
  /** An aggregate of content configuration schema */
  content: ContentSchema;
}

/** Models content configuration data */
export interface ContentSchema {
  fonts: ContentFontsSchema;
  scale: ContentScaleSchema;
}

/** Models custom mode color swatches */
export interface ColorCustomSwatchSchema {
  [index: string]: string;
}

/** Models custom mode color palettes */
export interface ColorCustomPaletteSchema {
  [index: string]: {
    base: string;
    options?: ColorOptions;
  };
}

/** Models scheme mode color configuration data */
export interface ColorBasicPaletteSchema {
  /** The base color to transform */
  base: string;
  /** Relevant for contexts where a scheme function can't be called directly */
  scheme?: string;
  /** Adjustments to the output data */
  options?: ColorOptions;
}

/** Models options available when modifying color palettes */
export interface ColorOptions {
  /**
   * The range of variants (each) to output.
   *
   * The named values are for convenience.
   *
   * `minimal` = 2
   *
   * `material` = 4 (default)
   */
  range?: number | 'minimal' | 'material';
  /** The color space used to build the palette (lab is the default) */
  mode?: InterpolationMode;
  /**
   * The palette contrast.
   *
   * Accepts a value from 0-100.
   *
   * `low` = 30
   *
   * `med` = 60
   *
   * `high` = 95
   */
  contrast?: number | 'low' | 'med' | 'high';
}

/** Models the correct format for configuring fonts */
export interface ContentFontsSchema {
  [index: string]: {
    /** Human readable name for font */
    name: string;
    /** CSS font-family stack */
    stack: string | string[];
    /** Styles expected when using font */
    styles: (string | number)[];
  };
}

/** Models the correct format for defining a modular scale. */
export interface ContentScaleSchema {
  /** Scale base. Accepts relative and absolute values. */
  base: string;
  /** Ratio to scale by. Named values correspond with [modularscale.com](https://modularscale.com). */
  ratio:
    | number
    | 'augmented4th'
    | 'goldenSection'
    | 'minor2nd'
    | 'minor3rd'
    | 'major2nd'
    | 'major3rd'
    | 'perfect4th'
    | 'perfect5th';

  /**
   * Optionally sets a limit for the scale output.
   *
   * `'full'` = 17
   * `'half'` = 9
   */
  limit?: number | 'full' | 'half';
}
