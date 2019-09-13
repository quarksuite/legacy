import { w3cx11 } from './named-lookup';
import { hex2Rgb, hex2Hsl } from './hex';

export const named2Rgb = (name: string) => hex2Rgb(w3cx11[name]);
export const named2Hsl = (name: string) => hex2Hsl(w3cx11[name]);
export const named2Hex = (name: string) => w3cx11[name];
