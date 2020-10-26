// Build types
export interface CSSConstructionOpts {
  context: string;
  separator?: string;
  prefix?: string;
  operator?: string;
  suffix?: string;
  padding?: number;
  terminator?: string;
}

export interface DataSubcategory {
  base: string;
  [index: string]: string | string[];
}

export interface DesignData {
  [index: string]: (string | string[]) | DataSubcategory;
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

export type DesignTokens = string;
