import { w3c } from "@color/data/w3c-x11";

const InvalidColorError = (input: string): Error => {
  throw Error(`'${input}' is not a valid CSS color`);
};

export const validateColor = (color: string): string | Error => {
  interface Categories {
    [index: string]: RegExp | boolean;
  }

  const formats: Categories = {
    hex: /^#([\da-f]{3,4}){1,2}$/i,
    rgb: /^(?:rgba?\((?:(?:100%|(?:\d\.?\d?){1,2}%)|(?:255|2[0-4][0-9]|1[0-9]{2}|\d{1,2}|0))([\s,/]+)(?:(?:100%|(?:\d\.?\d?){1,2}%)|(?:255|2[0-4][0-9]|1[0-9]{2}|\d{1,2}|0))\1(?:(?:100%|(?:\d\.?\d?){1,2}%)|(?:255|2[0-4][0-9]|1[0-9]{2}|\d{1,2}|0))(?:\1(?:1|0\.\d+))?\))$/,
    hsl: /^(?:hsla?\((?:-?((\d\.?\d?)(?:deg|g?rad|turn)?)+([\s,/]+))((?:100|(?:\d\.?\d?){1,})%)\3((?:100|(?:\d\.?\d?){1,})%)(?:\3(?:1|0\.\d+))?\))$/,
    w3c: !!w3c[color]
  };

  const valid = Object.keys(formats).filter((category: string) => {
    if (category === "w3c") return formats[category];
    return (formats[category] as RegExp).test(color);
  })[0];

  return valid || InvalidColorError(color);
};
