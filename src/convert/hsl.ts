import { rgbCalc, hslData, hslaData } from './helpers';
import { rgb2Hex, rgba2Hex8 } from './rgb';

// HSL -> RGB
export const hsl2Rgb = (hsl: string) => {
  const data = hslData(hsl);

  let h = data[0];
  let s = data[1];
  let l = data[2];

  const rgb = rgbCalc(h, s, l);

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

// HSLA -> RGBA
export const hsla2Rgba = (hsla: string) => {
  const [h, s, l, a] = hslaData(hsla);

  const rgb = rgbCalc(h, s, l);

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${parseFloat(
    a.toPrecision(2)
  )})`;
};

// HSL -> Hex
export const hsl2Hex = (hsl: string) => rgb2Hex(hsl2Rgb(hsl));

// HSLA -> Hex8
export const hsla2Hex8 = (hsla: string) => rgba2Hex8(hsla2Rgba(hsla));
