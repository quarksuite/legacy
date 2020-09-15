import { compose, curry } from "@architecture/toolbox";
import { intToHex } from "@color/formatting";

// Arithmetic
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

// hue
export const radToDeg = compose(productOf(180 / Math.PI), Math.round);
export const gradToDeg = productOf(0.9);
export const angleToDeg = compose(productOf(360), Math.round);

// saturation, lightness
export const percentAsFraction = quotientOf(100);
export const percentAsFloat = productOf(100);

// alpha
export const alphaAsHex = compose(productOf(255), Math.round, intToHex);

// red, green, blue calculation
export const channelAsFraction = quotientOf(255);
export const percentChannelAsInt = compose(
  productOf(255),
  percentAsFraction,
  Math.round
);
