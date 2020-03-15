import { spin as rotate, blend, convert as transform } from './helpers';

export type Swatch = string;
export type Scheme = Swatch[];
export type Variation = Swatch[];
export type Palette = (Swatch | Variation)[];

export type Formats = 'hex' | 'rgb' | 'hsl' | 'named';
export type Degrees = number;
export type Percent = number;
export type Limit = number;

export interface ColorDataSchema {
  origin: Swatch;
  current: Swatch;
  scheme: Scheme;
  variation: Variation;
  palette: Palette;
}

export const complementOf = (color: Swatch): Swatch => rotate(color);

export const negationOf = (color: Swatch): Swatch =>
  blend(color, complementOf(color));

export const mix = (
  color: Swatch,
  withTarget: Swatch,
  byAmount: Percent = 50
): Swatch => blend(color, withTarget, byAmount);

export const spinHueFrom = (
  color: Swatch,
  toDegrees: Degrees,
  counterClockwise = false
): Swatch => rotate(color, toDegrees, counterClockwise);

export const changeFormatOf = (
  color: Swatch,
  toTargetFormat: Formats = 'rgb'
): Swatch => transform(color, toTargetFormat);

export const analogousFrom = (
  color: Swatch,
  spreadBy: Degrees = 45
): Scheme => {
  color = transform(color);
  const rightOfOrigin = transform(rotate(color, spreadBy));
  const leftOfOrigin = transform(rotate(color, spreadBy, true));

  return [leftOfOrigin, color, rightOfOrigin];
};

export const complementaryFrom = (color: Swatch): Scheme => [
  transform(color),
  transform(complementOf(color))
];

export const triadFrom = (
  color: Swatch,
  complementSplitBy: Degrees = 60
): Scheme => {
  color = transform(color);
  const complement = transform(complementOf(color));
  const rightOfComplement = transform(rotate(complement, complementSplitBy));
  const leftOfComplement = transform(
    rotate(complement, complementSplitBy, true)
  );

  return [color, leftOfComplement, rightOfComplement];
};

export const tetradFrom = (color: Swatch, spreadBy: Degrees = 90): Scheme => {
  color = transform(color);
  const complement = transform(complementOf(color));
  const shiftFromOrigin = transform(rotate(color, spreadBy));
  const shiftFromComplement = transform(rotate(complement, spreadBy));

  return [color, complement, shiftFromOrigin, shiftFromComplement];
};

export const createBlendFrom = (
  color: Swatch,
  toTarget: Swatch,
  withContrast: Percent = 97,
  upToRange: Limit = 3
): Variation => {
  color = transform(color);
  toTarget = transform(toTarget);

  return Array.from(Array(upToRange).fill(color))
    .map((origin: string, step: number): string => {
      const target = toTarget;
      const contrast = withContrast;
      const range = upToRange;
      const currentContrast = contrast - (contrast / range) * step;

      return mix(origin, target, currentContrast);
    })
    .reverse();
};

export const createTintsFrom = (
  color: Swatch,
  withContrast: Percent = 97,
  upToRange: Limit = 3
): Variation =>
  createBlendFrom(color, transform('#fff'), withContrast, upToRange);

export const createTonesFrom = (
  color: Swatch,
  withContrast: Percent = 97,
  upToRange: Limit = 3
): Variation =>
  createBlendFrom(color, transform('#aaa'), withContrast, upToRange);

export const createShadesFrom = (
  color: Swatch,
  withContrast: Percent = 97,
  upToRange: Limit = 3
): Variation =>
  createBlendFrom(color, transform('#111'), withContrast, upToRange);

export class Color {
  private color: Swatch = 'dodgerblue';
  private origin: Swatch = this.color;
  private current: Swatch = this.color;
  private scheme: Scheme = [];
  private variation: Variation = [];
  private palette: Palette = [];

  public constructor(color: Swatch) {
    this.color = color;
    this.origin = transform(color);
    this.current = transform(color);
  }

  public get originalValue(): Swatch {
    return this.origin;
  }

  public get value(): Swatch {
    return this.current;
  }

  public get schemes(): Scheme {
    return [...new Set(this.scheme)];
  }

  public get variations(): Variation {
    return this.variation;
  }

  public get palettes(): Palette {
    return [this.current, [...new Set(this.variation)]];
  }

  public get data(): ColorDataSchema {
    return {
      origin: this.origin,
      current: this.current,
      scheme: this.scheme,
      variation: this.variation,
      palette: this.palette
    };
  }

  public log(): void {
    const { origin, current, scheme, variation, palette } = this.data;
    const read = (data: Scheme | Variation | Palette): string =>
      JSON.stringify(data, null, 2);
    console.log(`
color.originalValue: ${origin}
---------------------------------------------------------------
color.value: ${current}
===============================================================
color.schemes: ${read(scheme)};
===============================================================
color.variations: ${read(variation)};
===============================================================
color.palettes: ${read(palette)};
===============================================================
    `);
  }

  public formatSwatch(format: Formats): Color {
    this.current = changeFormatOf(this.current, format);
    return this;
  }

  public shiftHue(
    toDegrees: Degrees,
    counterClockwise = false
  ): Color {
    this.current = spinHueFrom(this.current, toDegrees, counterClockwise);
    return this;
  }

  public fetchComplement(): Color {
    this.current = complementOf(this.current);
    return this;
  }

  public neutralize(): Color {
    this.current = negationOf(this.current);
    return this;
  }

  public mix(withTarget: Swatch, byAmount: Percent = 50): Color {
    this.current = mix(this.current, withTarget, byAmount);
    return this;
  }

  public createComplementary(): Color {
    this.scheme = [...this.scheme, ...complementaryFrom(this.current)];
    return this;
  }

  public createAnalogous(withSpread: Degrees = 45): Color {
    this.scheme = [...this.scheme, ...analogousFrom(this.current, withSpread)];
    return this;
  }

  public createTriad(withComplementSplit: Degrees = 60): Color {
    this.scheme = [
      ...this.scheme,
      ...triadFrom(this.current, withComplementSplit)
    ];
    return this;
  }

  public createTetrad(withSpread: Degrees = 90): Color {
    this.scheme = [...this.scheme, ...tetradFrom(this.current, withSpread)];
    return this;
  }

  // variant operations
  public createBlend(
    toTarget: Swatch,
    withContrast: Percent = 97,
    upToRange: Limit = 3
  ): Color {
    this.variation = [
      ...this.variation,
      ...createBlendFrom(this.current, toTarget, withContrast, upToRange)
    ];
    return this;
  }

  public createTints(withContrast: Percent = 97, upToRange: Limit = 3): Color {
    this.variation = [
      ...this.variation,
      ...createTintsFrom(this.current, withContrast, upToRange)
    ];
    return this;
  }

  public createTones(withContrast: Percent = 97, upToRange: Limit = 3): Color {
    this.variation = [
      ...this.variation,
      ...createTonesFrom(this.current, withContrast, upToRange)
    ];
    return this;
  }

  public createShades(withContrast: Percent = 97, upToRange: Limit = 3): Color {
    this.variation = [
      ...this.variation,
      ...createShadesFrom(this.current, withContrast, upToRange)
    ];
    return this;
  }
}

export const color = (color: string): Color => new Color(color);
export const colour = (color: string): Color => new Color(color);
export const c = (color: string): Color => new Color(color);
