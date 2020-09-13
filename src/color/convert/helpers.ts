import { w3c } from "@color/data/w3c-x11";
import { compose } from "@architecture/compose";

const floatToHundredths = (n: number): number => +n.toPrecision(4);

// Conversion helpers
export const intToHex = (n: number): string => n.toString(16).padStart(2, "0");

export const hexToInt = (s: string): number => parseInt(s, 16);

export const extractNumber = (s: string): number =>
  parseFloat(s.replace(/[^\d.]+/g, ""));

export const toFraction = (n: number): number => floatToHundredths(n / 100);

export const toPercent = (n: number): number => floatToHundredths(n * 100);

export const parseFraction = compose(toPercent, extractNumber);

export const parsePercent = compose(toFraction, extractNumber);
