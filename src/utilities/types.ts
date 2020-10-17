export type QSDataModel = (string | string[])[];
export type QSData =
  | string[]
  | (string | string[])[][]
  | (string | (string | string[])[])[];

export interface QSFormattedData {
  [index: string]:
    | string
    | { [index: string]: { base: string; [index: string]: string } };
}
