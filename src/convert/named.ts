import w3cx11 from './named-lookup';
import { hex2Rgb, hex2Hsl } from './hex';

interface NameIndex {
  [index: string]: string;
}

const parseName = (collection: NameIndex, value: string) => collection[value];

export const named2Rgb = (name: string) => hex2Rgb(parseName(w3cx11, name));
export const named2Hsl = (name: string) => hex2Hsl(parseName(w3cx11, name));
