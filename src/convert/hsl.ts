import { rgbCalc, hslData, hslaData } from './helpers';

// HSL -> RGB
export const hsl2rgb = (hsl: string) => {
  const data = hslData(hsl);

  let h = data[0];
  let s = data[1];
  let l = data[2];

  const rgb = rgbCalc(h, s, l);

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

// HSLA -> RGBA
export const hsla2rgba = (hsla: string) => {
  const [h, s, l, a] = hslaData(hsla);

  const rgb = rgbCalc(h, s, l);

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${parseFloat(
    a.toPrecision(2)
  )})`;
};

// HSL -> Hex

// HSLA -> Hex8
