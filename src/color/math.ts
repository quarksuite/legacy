import { compose, curry } from "@architecture/toolbox";
import { intToHex } from "@color/formatting";

// Arithmetic
const precision = curry(
  2,
  (place: number, n: number): number => +n.toPrecision(place)
);

const significant3 = precision(3);

const sumOf = curry(2, (y: number, x: number): number => significant3(x + y));

const quotientOf = curry(2, (divisor: number, n: number): number =>
  significant3(n / divisor)
);

const productOf = curry(2, (multiplicand: number, n: number): number =>
  significant3(n * multiplicand)
);

const residueOf = curry(2, (modulo: number, n: number): number => n % modulo);

export const normalization = (a: number, b: number, x: number): number =>
  Math.round(Math.min(Math.max(x, a), b));

// Hrad, Hgrad, Hturn -> hue
export const radToDeg = compose(productOf(180 / Math.PI), Math.round);
export const gradToDeg = productOf(0.9);
export const fractionToDeg = compose(productOf(360), Math.round);

// hue correction
export const ccwHueCorrection = sumOf(360);
export const cwHueCorrection = residueOf(360);

// saturation, lightness
export const percentAsFraction = quotientOf(100);
export const percentAsFloat = productOf(100);

// alpha
export const alphaAsHex = compose(productOf(255), Math.round, intToHex);

// red, green, blue calculations

export const channelAsFraction = quotientOf(255);
export const percentChannelAsInt = compose(
  productOf(255),
  percentAsFraction,
  Math.round
);

export const calculateDifference = (
  origin: number,
  target: number,
  p: number
): number => significant3(((1 - p) * origin ** 2 + p * target ** 2) ** 0.5);
