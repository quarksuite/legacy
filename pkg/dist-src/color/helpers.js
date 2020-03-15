import { hslData, convertPercentage as percentToInteger, checkFormat } from "./convert/helpers.js";
import * as transform from "./convert//index.js";

const calculateDifference = (origin, target, p) => Math.round(((1 - p) * origin ** 2 + p * target ** 2) ** 0.5);

const calculateMix = (origin, target, amount) => {
  const [O_RED, O_GREEN, O_BLUE] = origin.split(', ');
  const [T_RED, T_GREEN, T_BLUE] = target.split(', ');
  const RGB_STORE = new Map([[O_RED, T_RED], [O_GREEN, T_GREEN], [O_BLUE, T_BLUE]]);
  return Array.from(RGB_STORE).map(([origin, target]) => {
    const matchChars = /\D/g;

    const getValueOf = s => parseInt(s.replace(matchChars, ''));

    return calculateDifference(getValueOf(origin), getValueOf(target), amount);
  });
};

const hexConvert = (color, to) => {
  if (to === 'rgb') return transform.hex2Rgb(color);
  if (to === 'hsl') return transform.hex2Hsl(color);
  if (to === 'named') return transform.hex2Named(color);
  return color;
};

const rgbConvert = (color, to) => {
  if (to === 'hex') return transform.rgb2Hex(color);
  if (to === 'hsl') return transform.rgb2Hsl(color);
  if (to === 'named') return transform.rgb2Named(color);
  return color;
};

const hslConvert = (color, to) => {
  if (to === 'hex') return transform.hsl2Hex(color);
  if (to === 'rgb') return transform.hsl2Rgb(color);
  if (to === 'named') return transform.hsl2Named(color);
  return color;
};

const namedConvert = (color, to) => {
  if (to === 'hex') return transform.named2Hex(color);
  if (to === 'rgb') return transform.named2Rgb(color);
  if (to === 'hsl') return transform.named2Hsl(color);
  return color;
};

export const convert = (color, to = 'rgb') => {
  const hex = checkFormat(color, 'hex');
  const rgb = checkFormat(color, 'rgb');
  const hsl = checkFormat(color, 'hsl');
  const name = checkFormat(color, 'named');
  if (hex) return hexConvert(color, to);
  if (rgb) return rgbConvert(color, to);
  if (hsl) return hslConvert(color, to);
  if (name) return namedConvert(color, to);
  return color;
};
export const spin = (color, rotation = 180, counterClockwise = false) => {
  let [h, s, l] = hslData(convert(color, 'hsl'));
  const calculatedHue = counterClockwise ? h - rotation : h + rotation;
  h = calculatedHue < 0 ? (calculatedHue + 360) % 360 : calculatedHue % 360;
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return convert(`hsl(${h}, ${s}%, ${l}%)`);
};
export const blend = (color, target, amount = 50) => {
  // Convert arguments to RGB as required by blend function
  color = convert(color);
  target = convert(target);
  amount = percentToInteger(amount);
  const [R, G, B] = calculateMix(color, target, amount);
  return `rgb(${R}, ${G}, ${B})`;
};