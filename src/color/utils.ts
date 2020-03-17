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

const normalization = (x: number, a = 0, b = 100): number =>
  Math.min(Math.max(x, a), b);

export const spin = (
  color: string,
  rotation = 180,
  counterClockwise = false
): string => {
  let [H, S, L] = convert.parseHSL(convert.format(color, 'hsl'));
  const calculatedHue = counterClockwise ? H - rotation : H + rotation;
  H = calculatedHue < 0 ? (calculatedHue + 360) % 360 : calculatedHue % 360;
  S = convert.toPercentage(S);
  L = convert.toPercentage(L);

  return convert.format(`hsl(${H}, ${S}%, ${L}%)`, 'rgb');
};

export const modify = (
  color: string,
  property: 'hue' | 'saturation' | 'lightness',
  modifier: (current: number) => number
): string => {
  const values = convert.parseHSL(convert.format(color, 'hsl'));
  let [H] = values;
  let [, S, L] = values.map((v: number) => convert.toPercentage(v));

  // Putting H, S, L in an array to allow the modifier access to
  // the currentValue nudges me as a little inefficient,
  // but it's good enough for the quick operations involved
  if (property === 'hue') {
    // Allow multiple rotations on the color wheel
    const [h] = [H].map((current: number) => modifier(current));
    H = normalization(h, 0, 720) % 360;
  }

  if (property === 'saturation') {
    const [s] = [S].map((current: number) => modifier(current));
    S = normalization(s);
  }

  if (property === 'lightness') {
    const [l] = [L].map((current: number) => modifier(current));
    L = normalization(l);
  }

  return convert.format(`hsl(${H}, ${S}%, ${L}%)`);
};

export const mixColors = (
  color: string,
  target: string,
  amount = 50
): string => {
  // Convert arguments to RGB
  const [R, G, B] = calculateMix(
    convert.format(color),
    convert.format(target),
    convert.toFraction(amount)
  );

  return `rgb(${R}, ${G}, ${B})`;
};

export const createBlend = (
  color: string,
  target: string,
  contrast = 97,
  limit = 3
): string[] => {
  const colorToRGB = convert.format(color);
  const targetToRGB = convert.format(target);

  return Array.from(Array(limit).fill(colorToRGB))
    .map((value: string, index: number): string => {
      const amount = contrast - (contrast / limit) * index;
      return mixColors(value, targetToRGB, amount);
    })
    .reverse();
};
