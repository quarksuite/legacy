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
export type ColorValues =
  | [ColorFragment, ColorFragment, ColorFragment]
  | [ColorFragment, ColorFragment, ColorFragment, ColorFragment];
export type HexData =
  | [HexFragment, HexFragment, HexFragment]
  | [HexFragment, HexFragment, HexFragment, HexFragment];
export type RGBData =
  | [Channel, Channel, Channel]
  | [Channel, Channel, Channel, Alpha];
export type HSLData =
  | [Hue, Saturation, Lightness]
  | [Hue, Saturation, Lightness, Alpha];

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

export type Complementary = [Color, Color];
export type Analogous = [Color, Color, Color];
export type Triadic = [Color, Color, Color];
export type Tetradic = [Color, Color, Color, Color];
export type Custom = [...Color[]];

export type Scheme = (Complementary & Analogous & Triadic & Tetradic) | Custom;

export type Tints = [...Color[]];
export type Tones = [...Color[]];
export type Shades = [...Color[]];

export type Variants = Tints | Tones | Shades;
