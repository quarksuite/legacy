import { CSSColorFormats } from './convert/helpers';
export declare const convert: (color: string, to?: CSSColorFormats) => string;
export declare const spin: (color: string, rotation?: number) => string;
export declare const blend: (color: string, target: string, amount?: number, mode?: "logarithmic" | "linear") => string;
