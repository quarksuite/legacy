import { w3c } from "@color/data/w3c-x11";

export const ColorError = (format: string): Error => {
  return new Error("Invalid format: cannot be converted");
};

export const parseColor = (color: string): string => {
  interface Categories {
    [index: string]: RegExp | boolean;
  }

  const formats: Categories = {
    hex: /^#([\da-f]{3}){1,2}$/i,
    rgb: /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i,
    hsl: /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i,
    w3c: !!w3c[color]
  };

  return Object.keys(formats)
    .filter((category: string) => {
      if (category === "w3c") return formats[category];
      return (formats[category] as RegExp).test(color);
    })
    .join("");
};
