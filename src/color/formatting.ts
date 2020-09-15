// hex, rgb, hsl
export const matchValues = (s: string): string[] =>
  s.startsWith("#")
    ? (s.match(/[\da-f]{2}/g) as string[])
    : (s.match(/(-?[\d.]((?:%|deg|turn|g?rad)?))+/g) as string[]);

// hex
export const intToHex = (n: number): string => n.toString(16).padStart(2, "0");
export const hexToInt = (s: string): number => parseInt(s, 16);

// rgb, hsl
export const extractNumber = (s: string): number => parseFloat(s);
