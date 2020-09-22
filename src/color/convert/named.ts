import { Color } from "../data/types";
import { compose } from "../../fn";
import { w3c } from "../data/w3c-x11";
import { toRGB as rgb, toHSL as hsl } from "./hex";

export const toHex = (name: Color): Color => w3c[name];
export const toRGB = compose(toHex, rgb);
export const toHSL = compose(toHex, hsl);
