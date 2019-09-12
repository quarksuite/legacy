import { hex2Rgb, hex82Rgba } from '../../src/convert/hex';
import { rgb2Hex, rgba2Hex8, rgb2Hsl, rgba2Hsla } from '../../src/convert/rgb';
import { hsl2rgb, hsla2rgba } from '../../src/convert/hsl';

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
      expect(rgb2Hsl(color)).toBe('hsl(204, 58.9%, 49.6%)');
    });
    test('accepts CSS4 format: rgb(R%, G%, B%)', () => {
      const color = 'rgb(40%, 29%, 20%)';
      expect(rgb2Hsl(color)).toBe('hsl(27, 33.3%, 30%)');
    });
  });
  describe('rgba2Hsla(rgba)', () => {
    test('converts rgba color to hsla', () => {
      const color = 'rgba(52, 142, 201, 0.5)';
      expect(rgba2Hsla(color)).toBe('hsla(204, 58.9%, 49.6%, 0.5)');
    });
    test('accepts CSS4 format: rgba(R G B / A)', () => {
      const color = 'rgba(52 142 201 / 0.5)';
      expect(rgba2Hsla(color)).toBe('hsla(204, 58.9%, 49.6%, 0.5)');
    });
    test('accepts CSS4 format: rgba(R% G% B% / A%)', () => {
      const color = 'rgba(52% 12% 71% / 70%)';
      expect(rgba2Hsla(color)).toBe('hsla(281, 70.8%, 41.6%, 0.7)');
    });
  });
  describe('hsl2rgb(hsl)', () => {
    test('converts rgb color to hsl', () => {
      const color = 'hsl(204, 58.9%, 49.6%)';
      expect(hsl2rgb(color)).toBe('rgb(52, 141, 201)');
    });
    test('accepts format: hsl(H S% L%)', () => {
      const color = 'hsl(204 58.9% 49.6%)';
      expect(hsl2rgb(color)).toBe('rgb(52, 141, 201)');
    });
    test('accepts format: hsl(Hdeg, S%, L%)', () => {
      const color = 'hsl(12deg 58.9% 49.6%)';
      expect(hsl2rgb(color)).toBe('rgb(201, 82, 52)');
    });
    test('accepts format: hsl(Hrad, S%, L%)', () => {
      const color = 'hsl(1.2rad, 89%, 46%)';
      expect(hsl2rgb(color)).toBe('rgb(190, 222, 13)');
    });
    test('accepts format: hsl(Hturn, S%, L%)', () => {
      const color = 'hsl(0.7turn, 60%, 36%)';
      expect(hsl2rgb(color)).toBe('rgb(59, 37, 147)');
    });
  });
  describe('hsla2rgba(hsla)', () => {
    test('converts rgba color to hsla', () => {
      const color = 'hsla(204, 58.9%, 49.6%, 0.2)';
      expect(hsla2rgba(color)).toBe('rgba(52, 141, 201, 0.2)');
    });
    test('accepts format: hsla(H S L / A)', () => {
      const color = 'hsla(204 58.9% 49.6% / 0.2)';
      expect(hsla2rgba(color)).toBe('rgba(52, 141, 201, 0.2)');
    });
    test('accepts format: hsla(H S L / A%)', () => {
      const color = 'hsla(100 53.9% 30.6% / 20%)';
      expect(hsla2rgba(color)).toBe('rgba(64, 120, 36, 0.2)');
    });
    test('accepts format: hsla(Hdeg S L / A)', () => {
      const color = 'hsla(24deg 58.9% 49.6% / 0.2)';
      expect(hsla2rgba(color)).toBe('rgba(201, 112, 52, 0.2)');
    });
    test('accepts format: hsla(Hrad S L / A)', () => {
      const color = 'hsla(1.58rad, 58.9%, 49.6%, 20%)';
      expect(hsla2rgba(color)).toBe('rgba(124, 201, 52, 0.2)');
    });
    test('accepts format: hsla(Hturn S L / A)', () => {
      const color = 'hsla(0.75turn, 30.9%, 39.6%, 20%)';
      expect(hsla2rgba(color)).toBe('rgba(101, 70, 132, 0.2)');
    });
  });
});
