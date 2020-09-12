import { extractValue, parsePercent } from "@color/convert/helpers";

export const parseRGB = (rgb: string): number[] => {
  // TypeScript requires a double assertion in this case
  // because null can't overlap with other types.
  const values = (rgb.match(/[^rgb(,)]+/g) as unknown) as string[];

  return values.map((channel: string): number => {
    if (channel.includes("%")) return Math.round(parsePercent(channel) * 255);
    return extractValue(channel);
  });
};

export const calcHSL = (r: number, g: number, b: number): number[] => {
  // Convert each channel to a fraction
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;

  // Find minimum and maximum channel values
  const cmin = Math.min(R, G, B);
  const cmax = Math.max(R, G, B);
  const delta = cmax - cmin;

  // Set hsl
  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue
  if (delta == 0) h = 0;
  if (cmax == R) h = ((G - B) / delta) % 6;
  if (cmax == G) h = (B - R) / delta + 2;
  if (cmax == B) h = (R - G) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +s.toPrecision(3);
  l = +l.toPrecision(3);

  return [h, s, l];
};
