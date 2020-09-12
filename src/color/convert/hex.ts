import { hexToInt } from "@color/convert/helpers";

export const formatHexValues = (hex: string): (string | string[])[] => {
  const [, ...values] = hex;

  return values.length === 3
    ? values.map((C: string): string[] => C.repeat(2).split(""))
    : values
        .map((C: string, i: number, a: string[]): string[] | string => {
          switch (i) {
            case 0:
            case 2:
            case 4:
              return [C, a[i + 1]];
          }
          return C;
        })
        .filter((v: string[] | string): boolean => Array.isArray(v));
};

export const parseHex = (hex: string): number[] =>
  formatHexValues(hex).map((s: string | string[]): number => hexToInt(s));
