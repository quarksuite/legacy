import { compose } from "@architecture/toolbox";
import { w3c } from "@color/data/w3c-x11";
import { toRGB as rgb, toHSL as hsl } from "@color/convert/hex";

export const toHex = (name: string): string => w3c[name];

export const toRGB = compose(toHex, rgb);

export const toHSL = compose(toHex, hsl);
