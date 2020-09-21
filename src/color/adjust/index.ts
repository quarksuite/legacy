import { compose } from "../../fn";
import { percentAsFraction, percentAsFloat, normalization } from "../math";
import { matchValues, extractNumber } from "../formatting";
import { validateColor } from "../validate";
import { toHSL, preserveFormat } from "../convert";

export const hue = (n: number, color: string): string | Error => {
  // Reject invalid color
  validateColor("Cannot adjust hue of an invalid color", color);

  const [h, S, L, A] = compose(toHSL, matchValues)(color);
  const H = extractNumber(h) + n;

  const target = A ? `hsla(${H}, ${S}, ${L}, ${A})` : `hsl(${H}, ${S}, ${L})`;
  return preserveFormat(target, color);
};

export const saturation = (n: number, color: string): string | Error => {
  // Reject invalid color
  validateColor("Cannot adjust saturation of an invalid color", color);

  const [H, s, L, A] = compose(toHSL, matchValues)(color);
  const S = `${normalization(0, 100, extractNumber(s) + n)}%`;

  const target = A ? `hsla(${H}, ${S}, ${L}, ${A})` : `hsl(${H}, ${S}, ${L})`;
  return preserveFormat(target, color);
};

export const lightness = (n: number, color: string): string | Error => {
  // Reject invalid color
  validateColor("Cannot adjust lightness of an invalid color", color);

  const [H, S, l, A] = compose(toHSL, matchValues)(color);
  const L = `${normalization(0, 100, extractNumber(l) + n)}%`;

  const target = A ? `hsla(${H}, ${S}, ${L}, ${A})` : `hsl(${H}, ${S}, ${L})`;
  return preserveFormat(target, color);
};

export const alpha = (n: number, color: string): string | Error => {
  // Reject invalid color
  validateColor("Cannot adjust transparency of an invalid color", color);

  const [H, S, L, a] = compose(toHSL, matchValues)(color);
  const A = percentAsFraction(
    normalization(0, 100, a ? percentAsFloat(extractNumber(a)) + n : 100 + n)
  );

  const target =
    A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`;

  return preserveFormat(target, color);
};
