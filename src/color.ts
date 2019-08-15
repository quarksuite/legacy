import chroma from 'chroma-js';

/** Color utilities */

const setHue = (color: string, rotation: string) =>
  chroma(color)
    .set('hsl.h', rotation)
    .hex();

const complement = (color: string) => setHue(color, '+180');

const neutralize = (color: string) =>
  chroma.mix(color, complement(color), 0.5).hex();

export const swatch = {
  complement,
  neutralize
};

const blend = (color: string, target: string, range = 4, contrast = 95) => {
  const [, ...palette] = chroma
    .scale([color, chroma.mix(color, target, contrast / 100)])
    .colors(range + 1);

  return palette;
};

const tints = (color: string, range = 4, contrast = 95) =>
  blend(color, '#fff', range, contrast);
const tones = (color: string, range = 4, contrast = 95) =>
  blend(color, '#aaa', range, contrast);
const shades = (color: string, range = 4, contrast = 95) =>
  blend(color, '#111', range, contrast);

export const palette = {
  tints,
  tones,
  shades
};

const complementary = (color: string) => [
  chroma(color).hex(),
  complement(color)
];

const triColor = (
  color: string,
  target: string,
  distance = 15,
  accented = false
) =>
  accented
    ? [
        chroma(color).hex(),
        complement(color),
        setHue(target, `-${distance}`),
        setHue(target, `+${distance}`)
      ]
    : [
        chroma(color).hex(),
        setHue(target, `-${distance}`),
        setHue(target, `+${distance}`)
      ];

const split = (color: string, distance = 15, accented = false) =>
  triColor(color, complement(color), distance, accented);

const analogue = (color: string, distance = 15, accented = false) =>
  triColor(color, color, distance, accented);

const dual = (color: string, distance = 15) => {
  const base1 = chroma(color).hex();
  const base2 = setHue(chroma(color).hex(), `+${distance}`);

  return [base1, base2, complement(base1), complement(base2)];
};

const output = (palette: string | string[], range = 4, contrast = 95) => {
  if (typeof palette === 'string')
    return [
      chroma(palette).hex(),
      tints(palette, range, contrast),
      tones(palette, range, contrast),
      shades(palette, range, contrast)
    ];

  return palette.map(color => [
    chroma(color).hex(),
    tints(color, range, contrast),
    tones(color, range, contrast),
    shades(color, range, contrast)
  ]);
};

export const scheme = {
  monochromatic: (color: string, range = 4, contrast = 95) =>
    output(color, range, contrast),

  complementary: (color: string, range = 4, contrast = 95) =>
    output(complementary(color), range, contrast),

  splitComplementary: (
    color: string,
    distance = 15,
    accented = false,
    range = 4,
    contrast = 95
  ) => output(split(color, distance, accented), range, contrast),

  triadic: (color: string, range = 4, contrast = 95) =>
    output(split(color, 60), range, contrast),

  analogous: (
    color: string,
    distance = 15,
    accented = false,
    range = 4,
    contrast = 95
  ) => output(analogue(color, distance, accented), range, contrast),

  dual: (color: string, distance = 15, range = 4, contrast = 95) =>
    output(dual(color, distance), range, contrast),

  tetradic: (color: string, range = 4, contrast = 95) =>
    output(dual(color, 90), range, contrast)
};
