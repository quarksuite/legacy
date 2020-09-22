export type Hue = number;
export type Saturation = number;
export type Lightness = number;
export type Alpha = number;
export type Channel = number;
export type HexFragment = string;

export type HueCalc = (x: Hue) => Hue;
export type SatCalc = (x: Saturation) => Saturation;
export type LumCalc = (x: Lightness) => Lightness;
export type AlphaCalc = (x: Alpha) => Alpha;
export type ChannelCalc = (x: Channel) => Channel;

export type ColorFragment = string;
export type ColorValues = [
  r: ColorFragment,
  g: ColorFragment,
  b: ColorFragment,
  a?: ColorFragment
];
export type HexData = [
  r: HexFragment,
  g: HexFragment,
  b: HexFragment,
  a?: HexFragment
];
export type RGBData = [r: Channel, g: Channel, b: Channel, a?: Alpha];
export type HSLData = [h: Hue, s: Saturation, l: Lightness, a?: Alpha];

export type ColorFormats = "hex" | "rgb" | "hsl" | "named";

export type Color = string;
export type Scheme = [
  a: Color,
  b: Color,
  c?: Color,
  d?: Color,
  ...custom: [...Color[]]
];
export type Variant = [...color: [...Color[]]];
