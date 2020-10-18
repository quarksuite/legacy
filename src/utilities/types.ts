// Assembly types
export type QSDataModel = (string | string[])[];
export type QSRawData =
  | string[]
  | (string | string[])[][]
  | (string | (string | string[])[])[];

export interface QSFormattedData {
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
type Unsupported = Error;

export type OutputTypes =
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

export type Output = string | StyleDictFormat | Unsupported;
