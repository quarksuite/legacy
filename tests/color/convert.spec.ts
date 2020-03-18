import {
  intToHex,
  hexToInt,
  extractValue,
  toFraction,
  toPercentage,
  checkFormat,
  parseHSL,
  parseRGB,
  calcHSL,
  calcRGB,
  hexToRGB,
  hexToHSL,
  hexToW3C,
  rgbToHex,
  rgbToHSL,
  rgbToW3C,
  hslToHex,
  hslToRGB,
  hslToW3C,
  w3cToHex,
  w3cToRGB,
  w3cToHSL
} from '../../src/color/convert';

describe('General helpers', () => {
  describe('intToHex(n: number): string', () => {
    test('correctly converts an integer to hexadecimal', () => {
      let input: number | number[] = 255;
      expect(intToHex(input)).toBe('ff');
      input = 120;
      expect(intToHex(input)).toBe('78');
      input = 1;
      expect(intToHex(input)).toBe('01');
      input = 0;
      expect(intToHex(input)).toBe('00');
      input = 20;
      expect(intToHex(input)).toBe('14');
      input = [200, 73, 177];
      expect(
        '#'.concat(input.map((value: number) => intToHex(value)).join(''))
      ).toBe('#c849b1');
      input = [0, 73, 177];
      expect(
        '#'.concat(input.map((value: number) => intToHex(value)).join(''))
      ).toBe('#0049b1');
    });
  });
  describe('hexToInt(x: string, y: string): number', () => {
    test('correctly converts hexadecimal to integer', () => {
      let input: string | string[] = 'a9';
      expect(hexToInt(input[0], input[1])).toBe(169);
      input = '00';
      expect(hexToInt(input[0], input[1])).toBe(0);
      input = 'ff';
      expect(hexToInt(input[0], input[1])).toBe(255);
      input = ['34', '8e', 'c9'];
      expect(
        `rgb(${input.map(([x, y]: string) => hexToInt(x, y)).join(', ')})`
      ).toBe('rgb(52, 142, 201)');
      input = ['34', '00', 'c9'];
      expect(
        `rgb(${input.map(([x, y]: string) => hexToInt(x, y)).join(', ')})`
      ).toBe('rgb(52, 0, 201)');
    });
  });
  describe('extractValue(s: string): number', () => {
    test('correctly evaluates a string and extracts any numbers', () => {
      let input: string | string[] = 'cjkak34cca9aa09jjlk3i ]kj{fjcmm348}';
      expect(extractValue(input)).toBe(349093348);
      input = 'rgb(39, 17, 10)';
      expect(extractValue(input)).toBe(391710);
    });
  });
  describe('toFraction(v: number): number', () => {
    test('converts a percentage to a decimal', () => {
      let input = 97;
      expect(toFraction(input)).toBe(0.97);
      input = 100;
      expect(toFraction(input)).toBe(1);
      input = 0;
      expect(toFraction(input)).toBe(0);
      input = 64;
      expect(toFraction(input)).toBe(0.64);
    });
  });
  describe('toPercentage(v: number): number', () => {
    test('converts a decimal to a percentage', () => {
      let input = 0.38;
      expect(toPercentage(input)).toBe(38);
      input = 0.42;
      expect(toPercentage(input)).toBe(42);
      input = 0;
      expect(toPercentage(input)).toBe(0);
      input = 1;
      expect(toPercentage(input)).toBe(100);
    });
  });
});

describe('Color conversion utilities', () => {
  describe('checkFormat(color: string, format: string): boolean', () => {
    test('checks an input color for the correct format', () => {
      expect(checkFormat('#348ec9', 'hex')).toBeTruthy();
      expect(checkFormat('#348', 'hex')).toBeTruthy();
      expect(checkFormat('348ec9', 'hex')).toBeFalsy();
      expect(checkFormat('rgb(33, 100, 94)', 'rgb')).toBeTruthy();
      expect(checkFormat('rgb(33%, 100%, 94%)', 'rgb')).toBeTruthy();
      expect(checkFormat('rg(303,110, 0)', 'rgb')).toBeFalsy();
    });
  });
  describe('parseHSL(hsl: string): number[]', () => {
    test('parses a HSL string and extracts its raw values', () => {
      let input = 'hsl(300, 39%, 30%)';
      expect(parseHSL(input)).toStrictEqual([300, 0.39, 0.3]);
      input = 'hsl(240, 11%, 67%)';
      expect(parseHSL(input)).toStrictEqual([240, 0.11, 0.67]);
      input = 'hsl(240, 100%, 67%)';
      expect(parseHSL(input)).toStrictEqual([240, 1, 0.67]);
      input = 'hsl(0, 15%, 0%)';
      expect(parseHSL(input)).toStrictEqual([0, 0.15, 0]);
    });
  });
  describe('calcRGB(h: number, s: number, l: number): number[]', () => {
    test('calculates RGB values from input HSL values', () => {
      let input = [20, 0.4, 0.39];
      expect(calcRGB(input[0], input[1], input[2])).toStrictEqual([
        139,
        86,
        60
      ]);
      input = [20, 0, 0.39];
      expect(calcRGB(input[0], input[1], input[2])).toStrictEqual([99, 99, 99]);
      input = [20, 0, 0];
      expect(calcRGB(input[0], input[1], input[2])).toStrictEqual([0, 0, 0]);
      input = [20, 0.93, 0.1];
      expect(calcRGB(input[0], input[1], input[2])).toStrictEqual([49, 18, 2]);
      input = [20, 1, 0.4];
      expect(calcRGB(input[0], input[1], input[2])).toStrictEqual([204, 68, 0]);
    });
  });
  describe('parseRGB(rgb: string): number[]', () => {
    test('parses an RGB string and extracts its values', () => {
      expect(parseRGB('rgb(30, 110, 25)')).toStrictEqual([30, 110, 25]);
      expect(parseRGB('rgb(0, 25, 182)')).toStrictEqual([0, 25, 182]);
      expect(parseRGB('rgb(20%, 80%, 32%)')).toStrictEqual([51, 204, 82]);
      expect(parseRGB('rgb(0, 0, 182)')).toStrictEqual([0, 0, 182]);
    });
  });
  describe('calcHSL(r: number, g: number, b: number): number[]', () => {
    test('calculates HSL values from input RGB channels', () => {
      expect(calcHSL(23, 110, 149)).toStrictEqual([199, 0.733, 0.337]);
      expect(calcHSL(0, 244, 149)).toStrictEqual([157, 1, 0.478]);
      expect(calcHSL(49, 0, 149)).toStrictEqual([260, 1, 0.292]);
      expect(calcHSL(49, 120, 0)).toStrictEqual([96, 1, 0.235]);
    });
  });
});

describe('Conversion functions', () => {
  describe('hexToRGB(hex: string): string', () => {
    test('converts a hex color to RGB', () => {
      expect(hexToRGB('#ffc0ac')).toBe('rgb(255, 192, 172)');
      expect(hexToRGB('#0ac0ac')).toBe('rgb(10, 192, 172)');
      expect(hexToRGB('#39a')).toBe('rgb(51, 153, 170)');
      expect(hexToRGB('#aacf3c')).toBe('rgb(170, 207, 60)');
    });
  });
  describe('hexToHSL(hex: string): string', () => {
    test('converts a hex color to HSL color', () => {
      expect(hexToHSL('#ffc0ac')).toBe('hsl(14, 100%, 84%)');
      expect(hexToHSL('#0ac0ac')).toBe('hsl(173, 90%, 40%)');
      expect(hexToHSL('#39a')).toBe('hsl(189, 54%, 43%)');
      expect(hexToHSL('#aacf3c')).toBe('hsl(75, 61%, 52%)');
    });
  });
  describe('hexToW3C(hex: string): string', () => {
    test('converts a hex color to its W3C named value, if defined', () => {
      expect(hexToW3C('#ff0000')).toBe('red');
      expect(hexToW3C('#f00')).toBe('red');
    });
  });
  describe('rgbToHex(rgb: string): string', () => {
    test('converts a RGB color to hex color', () => {
      expect(rgbToHex('rgb(220, 100, 100)')).toBe('#dc6464');
      expect(rgbToHex('rgb(20, 200, 90)')).toBe('#14c85a');
      expect(rgbToHex('rgb(204, 20, 190)')).toBe('#cc14be');
      expect(rgbToHex('rgb(25%, 50%, 75%)')).toBe('#4080bf');
    });
  });
  describe('rgbToHSL(rgb: string): string', () => {
    test('converts a RGB color to HSL color', () => {
      expect(rgbToHSL('rgb(30, 220, 10)')).toBe('hsl(114, 91%, 45%)');
      expect(rgbToHSL('rgb(30, 220, 200)')).toBe('hsl(174, 76%, 49%)');
      expect(rgbToHSL('rgb(30, 20, 200)')).toBe('hsl(243, 82%, 43%)');
      expect(rgbToHSL('rgb(30%, 70%, 80%)')).toBe('hsl(192, 56%, 55%)');
    });
  });
  describe('rgbToW3C(rgb: string): string', () => {
    test('converts RGB color to its W3C named value, if defined', () => {
      expect(rgbToW3C('rgb(0, 255, 0)')).toBe('lime');
      expect(rgbToW3C('rgb(100%, 0%, 0%)')).toBe('red');
    });
  });
  describe('hslToHex(hsl: string): string', () => {
    test('converts HSL color to hex color', () => {
      expect(hslToHex('hsl(233, 43%, 89%)')).toBe('#d7daef');
      expect(hslToHex('hsl(233, 43%, 39%)')).toBe('#39438e');
      expect(hslToHex('hsl(233, 43%, 9%)')).toBe('#0d0f21');
    });
  });
  describe('hslToRgb(hsl: string): string', () => {
    test('converts HSL color to RGB color', () => {
      expect(hslToRGB('hsl(143, 68%, 26%)')).toBe('rgb(21, 111, 56)');
      expect(hslToRGB('hsl(14, 68%, 26%)')).toBe('rgb(111, 42, 21)');
    });
  });
  describe('hslToW3C(hsl: string): string', () => {
    test('converts HSL color to its W3C named value, if defined', () => {
      expect(hslToW3C('hsl(240, 100%, 50%)')).toBe('blue');
    });
  });
  describe('w3cToHex(name: string): string', () => {
    test('converts a W3C color to hex color', () => {
      expect(w3cToHex('rebeccapurple')).toBe('#663399');
      expect(w3cToHex('dodgerblue')).toBe('#1e90ff');
      expect(w3cToHex('coral')).toBe('#ff7f50');
    });
  });
  describe('w3cToRGB(name: string): string', () => {
    test('converts a W3C color to RGB color', () => {
      expect(w3cToRGB('rebeccapurple')).toBe('rgb(102, 51, 153)');
      expect(w3cToRGB('dodgerblue')).toBe('rgb(30, 144, 255)');
      expect(w3cToRGB('coral')).toBe('rgb(255, 127, 80)');
    });
  });
  describe('w3cToHSL(name: string): string', () => {
    test('converts a W3C color to HSL color', () => {
      expect(w3cToHSL('rebeccapurple')).toBe('hsl(270, 50%, 40%)');
      expect(w3cToHSL('dodgerblue')).toBe('hsl(210, 100%, 56%)');
      expect(w3cToHSL('coral')).toBe('hsl(16, 100%, 66%)');
    });
  });
});
