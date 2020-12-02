// Build types
export interface CSSFormatOpts {
  padding?: string;
  prefix?: string;
  separator?: string;
  operator?: string;
  suffix?: string;
  eol?: string;
}

export type ValueToken = string | number;
export type ValueScale = ValueToken[];

export interface TokenSubcategory {
  base: ValueToken;
  [index: string]: ValueToken | ValueScale;
}

export interface TokenDictionary {
  [index: string]: ValueToken | ValueScale | TokenSubcategory | TokenDictionary;
}

// Output formats
export type CSS = string;
export type SassVariables = string;
export type LessVariables = string;
export type StylusVariables = string;
export type TokenData = string;

export interface StyleDictionaryProperties {
  [index: string]:
    | { value: string }
    | {
        [index: string]:
          | { value: string }
          | { [index: string]: { value: string } };
      }
    | StyleDictionaryProperties;
}

export interface TailwindUtilityData {
  [index: string]:
    | string
    | { DEFAULT: string; [index: string]: string }
    | TailwindUtilityData;
}
