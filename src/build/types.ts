// Build types
export interface CSSFormatOpts {
  padding?: number;
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
  [index: string]: {
    [index: string]: string | Subcategory;
  };
}

type CSSCustomProperties = "css" | "custom-properties";
type CSSPreprocessors = "sass" | "scss" | "less" | "styl";
type GenPurposeData = "json" | "yaml" | "yml";
type ToolIntegration = "style-dictionary";

export type SupportedFormats =
  | CSSCustomProperties
  | CSSPreprocessors
  | GenPurposeData
  | ToolIntegration;

export interface StyleDictionaryProperties {
  [index: string]:
    | { value: string }
    | {
        [index: string]:
          | { value: string }
          | { [index: string]: { value: string } };
      };
}
