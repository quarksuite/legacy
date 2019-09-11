import {
  rgb2Hex,
  rgba2Hex8,
  hex2Rgb,
  hex82Rgba,
  rgb2Hsl,
  rgba2Hsla
} from '../../src/utils/convert';

describe('Color conversion utilities', () => {
  describe('rgb2Hex(rgb)', () => {
    test('converts rgb color to hex', () => {
      const color = 'rgb(52, 142, 201)';
      expect(rgb2Hex(color)).toBe('#348ec9');
    });
    test('accepts CSS4 format: rgb(R G B)', () => {
      const color = 'rgb(52 142 201)';
      expect(rgb2Hex(color)).toBe('#348ec9');
    });
    test('accepts CSS4 format: rgb(R%, G%, B%)', () => {
      const color = 'rgb(20%, 56%, 79%)';
      expect(rgb2Hex(color)).toBe('#338fc9');
    });
  });
  describe('rgba2Hex(rgba)', () => {
    test('converts rgba color to hex w/ alpha', () => {
      const color = 'rgba(52, 142, 201, 0.8)';
      expect(rgba2Hex8(color)).toBe('#348ec9cc');
    });
    test('accepts CSS4 format: rgba(R G B / A)', () => {
      const color = 'rgba(52 142 201 / 0.8)';
      expect(rgba2Hex8(color)).toBe('#348ec9cc');
    });
    test('accepts CSS4 format: rgba(R% G% B% / A%)', () => {
      const color = 'rgba(20% 56% 79% / 80%)';
      expect(rgba2Hex8(color)).toBe('#338fc9cc');
    });
  });
  describe('hex2Rgb(hex)', () => {
    test('converts hex color to rgb', () => {
      const color = '#348ec9';
      expect(hex2Rgb(color)).toBe('rgb(52, 142, 201)');
    });
    test('converts #RGB color to rgb', () => {
      const color = '#389';
      expect(hex2Rgb(color)).toBe('rgb(51, 136, 153)');
    });
  });
  describe('hex82Rgba(hex)', () => {
    test('converts hex8 color to rgba', () => {
      const color = '#348ec9cc';
      expect(hex82Rgba(color)).toBe('rgba(52, 142, 201, 0.8)');
    });
    test('converts #RGBA color to rgba', () => {
      const color = '#389c';
      expect(hex82Rgba(color)).toBe('rgba(51, 136, 153, 0.8)');
    });
  });
  describe('rgb2Hsl(rgb)', () => {
    test('converts rgb color to hsl', () => {
      const color = 'rgb(52, 142, 201)';
      expect(rgb2Hsl(color)).toBe('hsl(204, 60%, 50%)');
    });
    test('accepts CSS4 format: rgb(R%, G%, B%)', () => {
      const color = 'rgb(40%, 29%, 20%)';
      expect(rgb2Hsl(color)).toBe('hsl(27, 30%, 30%)');
    });
  });
  describe('rgba2Hsla(rgba)', () => {
    test('converts rgba color to hsla', () => {
      const color = 'rgba(52, 142, 201, 0.5)';
      expect(rgba2Hsla(color)).toBe('hsla(204, 60%, 50%, 0.5)');
    });
    test('accepts CSS4 format: rgba(R G B / A)', () => {
      const color = 'rgba(52 142 201 / 0.5)';
      expect(rgba2Hsla(color)).toBe('hsla(204, 60%, 50%, 0.5)');
    });
    test('accepts CSS4 format: rgba(R% G% B% / A%)', () => {
      const color = 'rgba(52% 12% 71% / 70%)';
      expect(rgba2Hsla(color)).toBe('hsla(281, 70%, 40%, 0.7)');
    });
  });
});
