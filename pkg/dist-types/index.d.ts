import * as colorUtils from './color';
import * as scaleUtils from './scale';
export declare const color: {
    complement: (color: string) => string;
    neutralize: (color: string) => string;
    mix: (color: string, target: string, amount?: number) => string;
    format: (color: string, format?: import("./color/convert/helpers").CSSColorFormats) => string;
    scheme: (color: string, type: colorUtils.SchemeType, options?: colorUtils.SchemeOptions) => colorUtils.ColorScheme;
    variants: (color: string, target: string, options?: colorUtils.VariantOptions) => string[];
};
export declare const typography: {
    system: (...fonts: string[]) => string | string[];
};
export declare const scale: {
    create: (base?: number, ratio?: number | "min2nd" | "maj2nd" | "min3rd" | "maj3rd" | "perf4th" | "dim5th" | "perf5th" | "min6th" | "golden" | "maj6th" | "min7th" | "octave" | "maj10th" | "maj12th" | "x2octave", limit?: number, invert?: boolean) => number[];
    modify: (scale: number[], n: number, modifier: (n: number, scaleValue: number) => number) => number[];
    merge: (...scales: number[][]) => number[];
    output: (scale: number[], unit?: scaleUtils.CSSUnits, precision?: number) => string[];
};
