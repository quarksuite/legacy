import tinycolor from 'tinycolor2';

/** Color utilities */

const setHue = (color: string, rotation: number) =>
  tinycolor(color)
    .spin(rotation)
    .toHexString();

const complement = (color: string) => setHue(color, 180);

const mix = (color: string, target: string, amount?: number) =>
  tinycolor.mix(color, target, amount).toHexString();

const neutralize = (color: string) => mix(color, complement(color));

export const swatch = {
  complement,
  neutralize,
  mix
};

const tints = (color: string, count = 4, contrast = 100) =>
  Array.from(Array(count).fill(color), (color, index) =>
    tinycolor(color)
      .lighten(contrast / 2.15 / ++index)
      .toHexString()
  ).reverse();

const tones = (color: string, count = 4, contrast = 100) =>
  Array.from(Array(count).fill(color), (color, index) =>
    tinycolor(color)
      .desaturate(contrast / 2 / ++index)
      .toHexString()
  ).reverse();

const shades = (color: string, count = 4, contrast = 100) =>
  Array.from(Array(count).fill(color), (color, index) =>
    tinycolor(color)
      .darken(contrast / 2.5 / ++index)
      .toHexString()
  ).reverse();

export const palette = {
  tints,
  tones,
  shades
};

const complementary = (color: string) => [
  tinycolor(color).toHexString(),
  complement(color)
];

const splitComplementary = (color: string, distance = 15, accented = false) => {
  const a = tinycolor(color).toHexString();
  const opposite = complement(a);
  const b = setHue(opposite, -distance);
  const c = setHue(opposite, distance);

  return accented ? [a, opposite, b, c] : [a, b, c];
};

const analogous = (color: string, distance = 15) =>
  Array.from(Array(3).fill(color), (value, index) =>
    setHue(value, distance * index)
  );

const dual = (color: string, distance = 15) => {
  const a = tinycolor(color).toHexString();
  const b = setHue(a, distance);
  const c = complement(a);
  const d = complement(b);

  return [a, b, c, d];
};

export const scheme = {
  complementary,
  splitComplementary,
  triadic: (color: string) => splitComplementary(color, 60),
  analogous,
  dual,
  tetradic: (color: string) => dual(color, 90)
};
