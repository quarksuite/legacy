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
export type NumOfHues = number;
export type NumOfVariants = number;

export interface CustomSchemeOpts {
  hues: NumOfHues;
  arc: Angle;
  rotation?: Angle;
}

// Utility types
export type Clrs =
  | "navy"
  | "blue"
  | "aqua"
  | "teal"
  | "olive"
  | "green"
  | "lime"
  | "yellow"
  | "orange"
  | "red"
  | "maroon"
  | "fuchsia"
  | "purple"
  | "black"
  | "gray"
  | "grey"
  | "silver"
  | "white";

// Palette assembly
export type Color = CSSColor | Clrs;

export type Complementary = [origin: Color, opposite: Color];
export type Analogous = [
  origin: Color,
  leftOfOrigin: Color,
  rightOfOrigin: Color
];
export type Triadic = [
  origin: Color,
  leftOfOpposite: Color,
  rightOfOpposite: Color
];
export type Tetradic = [
  origin: Color,
  opposite: Color,
  rotationFromOrigin: Color,
  rotationFromOpposite: Color
];
export type Custom = [...hues: [...Color[]]];

export type Scheme = (Complementary & Analogous & Triadic & Tetradic) | Custom;

export type Tints = [...tints: [...Color[]]];
export type Tones = [...tones: [...Color[]]];
export type Shades = [...shades: [...Color[]]];

export type Variants = Tints | Tones | Shades;
