import { compose, curry } from "@architecture/toolbox";
import { percentAsFraction, percentAsFloat, normalization } from "@color/math";
import { matchValues, extractNumber } from "@color/formatting";
import { toHSL, preserveFormat } from "@color/convert";

export const hue = curry(2, (n: number, color: string): string | Error => {
  const [h, S, L, A] = compose(toHSL, matchValues)(color);
  const H = extractNumber(h) + n;

  const target = A ? `hsla(${H}, ${S}, ${L}, ${A})` : `hsl(${H}, ${S}, ${L})`;
  return preserveFormat(target, color);
});

export const saturation = curry(2, (n: number, color: string):
  | string
  | Error => {
  const [H, s, L, A] = compose(toHSL, matchValues)(color);
  const S = `${normalization(0, 100, extractNumber(s) + n)}%`;

  const target = A ? `hsla(${H}, ${S}, ${L}, ${A})` : `hsl(${H}, ${S}, ${L})`;
  return preserveFormat(target, color);
});

export const lightness = curry(2, (n: number, color: string):
  | string
  | Error => {
  const [H, S, l, A] = compose(toHSL, matchValues)(color);
  const L = `${normalization(0, 100, extractNumber(l) + n)}%`;

  const target = A ? `hsla(${H}, ${S}, ${L}, ${A})` : `hsl(${H}, ${S}, ${L})`;
  return preserveFormat(target, color);
});

export const alpha = curry(2, (n: number, color: string): string | Error => {
  const [H, S, L, a] = compose(toHSL, matchValues)(color);

  const A = percentAsFraction(
    normalization(0, 100, a ? percentAsFloat(extractNumber(a)) + n : 100 + n)
  );

  const target =
    A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`;

  return preserveFormat(target, color);
});
