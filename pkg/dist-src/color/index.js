import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { spin as rotate, blend, convert as transform } from "./helpers.js";
export const complementOf = color => rotate(color);
export const negationOf = color => blend(color, complementOf(color));
export const mix = (color, withTarget, byAmount = 50) => blend(color, withTarget, byAmount);
export const spinHueFrom = (color, toDegrees, counterClockwise = false) => rotate(color, toDegrees, counterClockwise);
export const changeFormatOf = (color, toTargetFormat = 'rgb') => transform(color, toTargetFormat);
export const analogousFrom = (color, spreadBy = 45) => {
  color = transform(color);
  const rightOfOrigin = transform(rotate(color, spreadBy));
  const leftOfOrigin = transform(rotate(color, spreadBy, true));
  return [leftOfOrigin, color, rightOfOrigin];
};
export const complementaryFrom = color => [transform(color), transform(complementOf(color))];
export const triadFrom = (color, complementSplitBy = 60) => {
  color = transform(color);
  const complement = transform(complementOf(color));
  const rightOfComplement = transform(rotate(complement, complementSplitBy));
  const leftOfComplement = transform(rotate(complement, complementSplitBy, true));
  return [color, leftOfComplement, rightOfComplement];
};
export const tetradFrom = (color, spreadBy = 90) => {
  color = transform(color);
  const complement = transform(complementOf(color));
  const shiftFromOrigin = transform(rotate(color, spreadBy));
  const shiftFromComplement = transform(rotate(complement, spreadBy));
  return [color, complement, shiftFromOrigin, shiftFromComplement];
};
export const createBlendFrom = (color, toTarget, withContrast = 97, upToRange = 3) => {
  color = transform(color);
  toTarget = transform(toTarget);
  return Array.from(Array(upToRange).fill(color)).map((origin, step) => {
    const target = toTarget;
    const contrast = withContrast;
    const range = upToRange;
    const currentContrast = contrast - contrast / range * step;
    return mix(origin, target, currentContrast);
  }).reverse();
};
export const createTintsFrom = (color, withContrast = 97, upToRange = 3) => createBlendFrom(color, transform('#fff'), withContrast, upToRange);
export const createTonesFrom = (color, withContrast = 97, upToRange = 3) => createBlendFrom(color, transform('#aaa'), withContrast, upToRange);
export const createShadesFrom = (color, withContrast = 97, upToRange = 3) => createBlendFrom(color, transform('#111'), withContrast, upToRange);
export class Color {
  constructor(color) {
    _defineProperty(this, "color", 'dodgerblue');

    _defineProperty(this, "origin", this.color);

    _defineProperty(this, "current", this.color);

    _defineProperty(this, "scheme", []);

    _defineProperty(this, "variation", []);

    _defineProperty(this, "palette", []);

    this.color = color;
    this.origin = transform(color);
    this.current = transform(color);
  }

  get originalValue() {
    return this.origin;
  }

  get value() {
    return this.current;
  }

  get schemes() {
    return [...new Set(this.scheme)];
  }

  get variations() {
    return this.variation;
  }

  get palettes() {
    return [this.current, [...new Set(this.variation)]];
  }

  get data() {
    return {
      origin: this.origin,
      current: this.current,
      scheme: this.scheme,
      variation: this.variation,
      palette: this.palette
    };
  }

  log() {
    const {
      origin,
      current,
      scheme,
      variation,
      palette
    } = this.data;

    const read = data => JSON.stringify(data, null, 2);

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

  formatSwatch(format) {
    this.current = changeFormatOf(this.current, format);
    return this;
  }

  shiftHue(toDegrees, counterClockwise = false) {
    this.current = spinHueFrom(this.current, toDegrees, counterClockwise);
    return this;
  }

  fetchComplement() {
    this.current = complementOf(this.current);
    return this;
  }

  neutralize() {
    this.current = negationOf(this.current);
    return this;
  }

  mix(withTarget, byAmount = 50) {
    this.current = mix(this.current, withTarget, byAmount);
    return this;
  }

  createComplementary() {
    this.scheme = [...this.scheme, ...complementaryFrom(this.current)];
    return this;
  }

  createAnalogous(withSpread = 45) {
    this.scheme = [...this.scheme, ...analogousFrom(this.current, withSpread)];
    return this;
  }

  createTriad(withComplementSplit = 60) {
    this.scheme = [...this.scheme, ...triadFrom(this.current, withComplementSplit)];
    return this;
  }

  createTetrad(withSpread = 90) {
    this.scheme = [...this.scheme, ...tetradFrom(this.current, withSpread)];
    return this;
  } // variant operations


  createBlend(toTarget, withContrast = 97, upToRange = 3) {
    this.variation = [...this.variation, ...createBlendFrom(this.current, toTarget, withContrast, upToRange)];
    return this;
  }

  createTints(withContrast = 97, upToRange = 3) {
    this.variation = [...this.variation, ...createTintsFrom(this.current, withContrast, upToRange)];
    return this;
  }

  createTones(withContrast = 97, upToRange = 3) {
    this.variation = [...this.variation, ...createTonesFrom(this.current, withContrast, upToRange)];
    return this;
  }

  createShades(withContrast = 97, upToRange = 3) {
    this.variation = [...this.variation, ...createShadesFrom(this.current, withContrast, upToRange)];
    return this;
  }

}