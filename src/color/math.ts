import { compose, curry2 } from "../fn";
import { intToHex } from "./formatting";

// Arithmetic
const precision = curry2(
  (signifcant: number, n: number): number => +n.toPrecision(signifcant)
);

const significant3 = precision(3);

const sumOf = curry2((y: number, x: number) => significant3(x + y));
const productOf = curry2((multiplicand: number, n: number): number =>
  significant3(n * multiplicand)
);
const quotientOf = curry2((divisor: number, n: number): number =>
  significant3(n / divisor)
);
const remainderOf = curry2((modulo: number, n: number): number =>
  significant3(n % modulo)
);

const calcRad = productOf(180 / Math.PI);
const calcGrad = productOf(180 / 200);
const calcTurn = productOf(360);

const calcChannel = productOf(255);

// Hrad, Hgrad, Hturn -> hue

/** Formula: n° = n ㎭ × 180/π */
export const radToDeg = compose(calcRad, Math.round);

/** Formula: n° = nᵍ × 180/200 */
export const gradToDeg = calcGrad;

/** Formula: n° = n% × 360 */
export const fractionOfCircle = compose(calcTurn, Math.round);

// hue correction

/** Formula: n° = -n + 360 */
export const ccwHueCorrection = sumOf(360);

/** Formula: n° = n % 360 */
export const cwHueCorrection = remainderOf(360);

// saturation, lightness
export const percentAsFraction = quotientOf(100);
export const percentAsFloat = productOf(100);

// alpha
export const alphaAsHex = compose(compose(calcChannel, Math.round), intToHex);

export const normalization = (a: number, b: number, x: number): number =>
  Math.round(Math.min(Math.max(x, a), b));

// red, green, blue calculations

/** Formula: n = n / 255 */
export const channelAsFraction = quotientOf(255);

export const percentChannelAsInt = compose(
  compose(calcChannel, percentAsFraction),
  Math.round
);

export const calculateDifference = (
  origin: number,
  target: number,
  p: number
): number => significant3(((1 - p) * origin ** 2 + p * target ** 2) ** 0.5);
