// knobs and settings
export type ValueRange = number;
export type Ratio = number;
export type ScaleBase = number;
export type SignificantDigits = number;
export type UpdateCalc = (value: number) => number;

// units
export type AbsoluteUnits = "cm" | "mm" | "Q" | "in" | "pc" | "pt" | "px";
export type RelativeUnits =
  | "em"
  | "ex"
  | "ch"
  | "rem"
  | "lh"
  | "vw"
  | "vh"
  | "vmin"
  | "vmax";

// Scale assembly
export type RawScaleValues = number[];
export type Scale = string[];
