// Definitiion types
export type DesignLanguage = (string | string[])[];
export type DesignData =
  | string[]
  | (string | string[])[][]
  | (string | (string | string[])[])[];

export interface FormattedDesignData {
  [index: string]:
    | string
    | {
        [index: string]: string | { [index: string]: string };
      };
}

export interface ConstructionOpts {
  context: string;
  separator?: string;
  prefix?: string;
  operator?: string;
  suffix?: string;
  padding?: number;
}

// Build types
type CSSCustomProperties = "css";
type CSSPreprocessors = "scss" | "less" | "styl";
type GenPurposeData = "json" | "yaml" | "yml";
type ToolIntegration = "style-dictionary";
type UnsupportedFormatError = Error;

export type SupportedFormats =
  | CSSCustomProperties
  | CSSPreprocessors
  | GenPurposeData
  | ToolIntegration;

export interface StyleDictFormat {
  [index: string]:
    | { value: string }
    | {
        [index: string]:
          | { value: string }
          | { [index: string]: { value: string } };
      };
}

export type DesignTokens = string | StyleDictFormat | UnsupportedFormatError;
