// Color attributes
export type Hue = number;
export type Saturation = number;
export type Lightness = number;
export type Alpha = number;
export type Channel = number;
export type HexFragment = string;

// Color calculations
export type HueCalc = (x: Hue) => Hue;
export type SatCalc = (x: Saturation) => Saturation;
export type LumCalc = (x: Lightness) => Lightness;
export type AlphaCalc = (x: Alpha) => Alpha;
export type ChannelCalc = (x: Channel) => Channel;

// Color formatting
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

export type CSSColor = string;
export type RawColor = string;
export type ColorError = Error;

// Knobs and settings
export type AdjustmentValue = number;
export type BlendValue = number;
export type Contrast = number;
export type Angle = number;
export type PaletteRange = number;

// Palette assembly
export type Color = CSSColor | ColorError;
export type BasicScheme = [a: Color, b: Color, c?: Color, d?: Color];

export type CustomScheme = [...custom: [...Color[]]];
export type Variant = [...color: [...Color[]]];
