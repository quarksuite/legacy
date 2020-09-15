import { w3c } from "@color/data/w3c-x11";
import { compose, curry } from "@architecture/toolbox";

const precision = curry(
  2,
  (place: number, n: number): number => +n.toPrecision(place)
);
const quotientOf = curry(2, (divisor: number, n: number): number =>
  precision(3, n / divisor)
);
const productOf = curry(2, (multiplicand: number, n: number): number =>
  precision(3, n * multiplicand)
);

// Conversion helpers
export const intToHex = (n: number): string => n.toString(16).padStart(2, "0");
export const hexToInt = (s: string): number => parseInt(s, 16);

export const matchValues = (s: string): string[] =>
  s.startsWith("#")
    ? (s.match(/[\da-f]{2}/g) as string[])
    : (s.match(/([\d.]((?:%|deg|turn|rad)?))+/g) as string[]);

export const extractNumber = (s: string): number =>
  parseFloat(s.replace(/[^\d.]+/g, ""));

export const percentAsFraction = quotientOf(100);
export const percentAsFloat = productOf(100);

export const channelAsFraction = quotientOf(255);
export const percentChannelAsInt = compose(
  productOf(255),
  percentAsFraction,
  Math.round
);

export const alphaAsHex = compose(productOf(255), Math.round, intToHex);
