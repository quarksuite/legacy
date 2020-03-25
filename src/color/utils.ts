import * as convert from './convert';

// Color modification utils
const calculateDifference = (
  origin: number,
  target: number,
  p: number
): number => Math.round(((1 - p) * origin ** 2 + p * target ** 2) ** 0.5);

const calculateMix = (
  origin: string,
  target: string,
  amount: number
): number[] => {
  const [O_RED, O_GREEN, O_BLUE] = origin.split(', ');
  const [T_RED, T_GREEN, T_BLUE] = target.split(', ');
  const RGB_STORE: Map<string, string> = new Map([
    [O_RED, T_RED],
    [O_GREEN, T_GREEN],
    [O_BLUE, T_BLUE]
  ]);
  return Array.from(RGB_STORE).map(([origin, target]): number => {
    const matchChars = /\D/g;
    const getValueOf = (s: string): number =>
      parseInt(s.replace(matchChars, ''));
    return calculateDifference(getValueOf(origin), getValueOf(target), amount);
  });
};

const normalization = (a: number, b: number, x: number): number =>
  Math.min(Math.max(x, a), b);

export const spin = (
  rotation: number,
  counterClockwise: boolean,
  color: string
): string => {
  let [H, S, L] = convert.parseHSL(convert.format('hsl', color));
  const calculatedHue = counterClockwise ? H - rotation : H + rotation;
  H = calculatedHue < 0 ? (calculatedHue + 360) % 360 : calculatedHue % 360;
  S = convert.toPercentage(S);
  L = convert.toPercentage(L);

  return convert.format('rgb', `hsl(${H}, ${S}%, ${L}%)`);
};

export const modify = (
  property: 'hue' | 'saturation' | 'lightness',
  modifier: (current: number) => number,
  color: string
): string => {
  const values = convert.parseHSL(convert.format('hsl', color));
  let [H] = values;
  let [, S, L] = values.map((v: number) => convert.toPercentage(v));

  // Putting H, S, L in an array to allow the modifier access to
  // the currentValue nudges me as a little inefficient,
  // but it's good enough for the quick operations involved
  if (property === 'hue') {
    // Allow multiple rotations on the color wheel
    const [h] = [H].map((current: number) => modifier(current));
    H = normalization(0, 720, h) % 360;
  }

  if (property === 'saturation') {
    const [s] = [S].map((current: number) => modifier(current));
    S = normalization(0, 100, s);
  }

  if (property === 'lightness') {
    const [l] = [L].map((current: number) => modifier(current));
    L = normalization(0, 100, l);
  }

  return convert.format('rgb', `hsl(${H}, ${S}%, ${L}%)`);
};

export const mixColors = (
  target: string,
  amount: number,
  color: string
): string => {
  // Convert arguments to RGB
  const [R, G, B] = calculateMix(
    convert.format('rgb', color),
    convert.format('rgb', target),
    convert.toFraction(amount)
  );

  return `rgb(${R}, ${G}, ${B})`;
};

export const createBlend = (
  target: string,
  contrast: number,
  limit: number,
  color: string
): string[] => {
  const colorToRGB = convert.format('rgb', color);
  const targetToRGB = convert.format('rgb', target);

  return Array.from(Array(limit).fill(colorToRGB))
    .map((value: string, index: number): string => {
      const amount = contrast - (contrast / limit) * index;
      return mixColors(targetToRGB, amount, value);
    })
    .reverse();
};
