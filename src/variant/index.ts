import {
  Color,
  Contrast,
  CSSColor,
  NumOfVariants,
  Variant,
} from "@color/data/types";
import { mix } from "../color/mix";

const generate = (
  limit: number,
  contrast: number,
  target: CSSColor,
  color: CSSColor
): Variant =>
  Array.from(Array(limit).fill(color))
    .map(
      (base: string, index: number): Color => {
        const amount = contrast - (contrast / limit) * index;
        return mix(amount, target, base);
      }
    )
    .reverse();

export const tints = (
  range: NumOfVariants,
  contrast: Contrast,
  color: CSSColor
): Variant => generate(range, contrast, "white", color);

export const tones = (
  range: NumOfVariants,
  contrast: Contrast,
  color: CSSColor
): Variant => generate(range, contrast, "gray", color);

export const shades = (
  range: NumOfVariants,
  contrast: Contrast,
  color: CSSColor
): Variant => generate(range, contrast, "black", color);
