import { modify, spin, createBlend } from './utils';
import { format } from './convert';

// Domain types
export type Swatch = string;
export type Scheme = Swatch[];
export type Variation = Swatch[];
export type Palette = (Swatch | Variation)[];

// Additional types for context
export type Formats = 'hex' | 'rgb' | 'hsl' | 'w3c';
export type Degrees = number;
export type Percent = number;
export type Limit = number;
export type Saturation = number;
export type Lightness = number;

// Swatch operations
export const hue = (
  color: Swatch,
  toDegrees: Degrees,
  counterClockwise = false
): Swatch => spin(color, toDegrees, counterClockwise);
export const saturation = (
  color: Swatch,
  modifier: (value: Saturation) => Swatch
): Swatch => 'saturation';
export const lightness = (
  color: Swatch,
  modifier: (value: Lightness) => Swatch
): Swatch => 'lightness';
export const mix = (
  color: Swatch,
  toTarget: Swatch,
  byAmount: Percent = 50
): Swatch => 'mix';
export const complement = (color: Swatch): Swatch => 'complement';
export const neutralize = (color: Swatch): Swatch => 'neutralize';

// Scheme operations
export const complementary = () => 'complementary';
export const analogous = () => 'analogous';
export const triad = () => 'triad';
export const tetrad = () => 'tetrad';

// Variation operations
export const custom = () => 'create';
export const tints = () => 'tints';
export const tones = () => 'tones';
export const shades = () => 'shades';

// Palette operations
export const convert = () => 'convert';
