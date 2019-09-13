import { hex2Rgb, hex82Rgba, hex2Hsl, hex82Hsla } from '../../src/convert/hex';
import { rgb2Hex, rgba2Hex8, rgb2Hsl, rgba2Hsla } from '../../src/convert/rgb';
import { hsl2Rgb, hsla2Rgba, hsl2Hex, hsla2Hex8 } from '../../src/convert/hsl';
import { named2Rgb, named2Hsl } from '../../src/convert/named';

describe('Color conversion utilities', () => {
  describe('hex conversions', () => {
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
    describe('hex2Hsl(hex)', () => {
      test('converts hex color to hsl', () => {
        const color = '#348ec9';
        expect(hex2Hsl(color)).toBe('hsl(204, 58.9%, 49.6%)');
      });
      test('accepts format: #RGB', () => {
        const color = '#82c';
        expect(hex2Hsl(color)).toBe('hsl(276, 71.4%, 46.7%)');
      });
    });
    describe('hex82Hsla(hex)', () => {
      test('converts hex8 color to hsla', () => {
        const color = '#348ec939';
        expect(hex82Hsla(color)).toBe('hsla(204, 58.9%, 49.6%, 0.2)');
      });
      test('accepts format: #RGB', () => {
        const color = '#82ca';
        expect(hex82Hsla(color)).toBe('hsla(276, 71.4%, 46.7%, 0.7)');
      });
    });
  });

  describe('hsl conversions', () => {
    describe('hsl2Rgb(hsl)', () => {
      test('converts rgb color to hsl', () => {
        const color = 'hsl(204, 58.9%, 49.6%)';
        expect(hsl2Rgb(color)).toBe('rgb(52, 141, 201)');
      });
      test('accepts format: hsl(H S% L%)', () => {
        const color = 'hsl(204 58.9% 49.6%)';
        expect(hsl2Rgb(color)).toBe('rgb(52, 141, 201)');
      });
    });
    describe('hsla2Rgba(hsla)', () => {
      test('converts rgba color to hsla', () => {
        const color = 'hsla(204, 58.9%, 49.6%, 0.2)';
        expect(hsla2Rgba(color)).toBe('rgba(52, 141, 201, 0.2)');
      });
      test('accepts format: hsla(H S L / A)', () => {
        const color = 'hsla(204 58.9% 49.6% / 0.2)';
        expect(hsla2Rgba(color)).toBe('rgba(52, 141, 201, 0.2)');
      });
      test('accepts format: hsla(H S L / A%)', () => {
        const color = 'hsla(100 53.9% 30.6% / 20%)';
        expect(hsla2Rgba(color)).toBe('rgba(64, 120, 36, 0.2)');
      });
    });
    describe('hsl2Hex(hsl)', () => {
      test('converts hsl color to hex', () => {
        const color = 'hsl(204, 58.9%, 49.6%)';
        expect(hsl2Hex(color)).toBe('#348dc9');
      });
      test('accepts format: hsl(H S% L%)', () => {
        const color = 'hsl(204 58.9% 49.6%)';
        expect(hsl2Hex(color)).toBe('#348dc9');
      });
    });
    describe('hsla2Hex8(hsl)', () => {
      test('converts hsl color to hex', () => {
        const color = 'hsla(204, 58.9%, 49.6%, 0.12)';
        expect(hsla2Hex8(color)).toBe('#348dc91f');
      });
      test('accepts format: hsla(H S% L% / A)', () => {
        const color = 'hsla(204 58.9% 49.6% / 0.5)';
        expect(hsla2Hex8(color)).toBe('#348dc980');
      });
    });
  });

  describe('rgb conversions', () => {
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
    describe('rgba2Hex8(rgba)', () => {
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
  });

  describe('named color conversions', () => {
    describe('named2Rgb', () => {
      test('converts a named CSS color to rgb equivalent', () => {
        const color = 'dodgerblue';
        expect(named2Rgb(color)).toBe('rgb(30, 144, 255)');
      });
    });
    describe('named2Rgb', () => {
      test('converts a named CSS color to hsl equivalent', () => {
        const color = 'dodgerblue';
        expect(named2Hsl(color)).toBe('hsl(210, 100%, 55.9%)');
      });
    });
  });
});
