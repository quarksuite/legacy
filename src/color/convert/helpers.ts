import { w3c } from "@color/data/w3c-x11";
import { compose } from "@architecture/compose";

// Conversion helpers
export const intToHex = (n: number): string => n.toString(16).padStart(2, "0");

export const hexToInt = (s: string): number => parseInt(s, 16);

export const extractValue = (s: string): number =>
  parseInt(s.replace(/\D+/g, ""));

export const toFraction = (n: number): number => n / 100;

export const toPercentage = (n: number): number => n * 100;

export const parsePercent = compose(toFraction, extractValue);
