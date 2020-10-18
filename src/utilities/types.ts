export type QSDataModel = (string | string[])[];
export type QSRawData =
  | string[]
  | (string | string[])[][]
  | (string | (string | string[])[])[];

export interface QSFormattedData {
  [index: string]:
    | string
    | { [index: string]: { base: string; [index: string]: string } };
}

export interface ConstructionOpts {
  context: string;
  separator?: string;
  prefix?: string;
  operator?: string;
  suffix?: string;
  padding?: number;
}

export type Filetypes = "css" | "scss" | "less" | "styl" | "json" | "yaml";
export type DataRecipes = "style-dictionary";

export interface StyleDictFormat {
  [index: string]:
    | { value: string }
    | {
        [index: string]: {
          base: { value: string };
          [index: string]: { value: string };
        };
      };
}

export type Output = string | StyleDictFormat;
