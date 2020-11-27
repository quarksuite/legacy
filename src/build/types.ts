// Build types
export interface CSSFormatOpts {
  padding?: string;
  prefix?: string;
  separator?: string;
  operator?: string;
  suffix?: string;
  eol?: string;
}

export interface Subcategory {
  base: string;
  [index: string]: string | string[];
}

export interface TokenDictionary {
  [index: string]: string | string[] | Subcategory | TokenDictionary;
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
