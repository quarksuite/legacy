import { format } from '../../src/color';

describe('Color format utility', () => {
  describe('color.format(color, format)', () => {
    describe('Outputs various CSS color formats', () => {
      test('from hex to rgb', () => {
        const color = '#449c90';
        expect(format(color, 'rgb')).toBe('rgb(68, 156, 144)');
      });
      test('from hex to hsl', () => {
        const color = '#4c0c90';
        expect(format(color, 'hsl')).toBe('hsl(269, 84.6%, 30.6%)');
      });
      test('from hex to hsl: grayscale', () => {
        const color = '#aaaaaa';
        expect(format(color, 'hsl')).toBe('hsl(0, 0%, 66.7%)');
      });
      test('from hex to hsl: zero values', () => {
        const color = '#000000';
        expect(format(color, 'hsl')).toBe('hsl(0, 0%, 0%)');
      });
      test('from rgb to hex', () => {
        const color = 'rgb(30, 10, 0)';
        expect(format(color, 'hex')).toBe('#1e0a00');
      });
      test('from rgb to hex: grayscale', () => {
        const color = 'rgb(150, 150, 150)';
        expect(format(color, 'hex')).toBe('#969696');
      });
      test('from rgb to hex: zero values', () => {
        const color = 'rgb(0, 0, 0)';
        expect(format(color, 'hex')).toBe('#000000');
      });
      test('from rgb to hsl', () => {
        const color = 'rgb(25, 200, 100)';
        expect(format(color, 'hsl')).toBe('hsl(146, 77.8%, 44.1%)');
      });
      test('from rgb to hsl: grayscale', () => {
        const color = 'rgb(150, 150, 150)';
        expect(format(color, 'hsl')).toBe('hsl(0, 0%, 58.8%)');
      });
      test('from rgb to hsl: zero values', () => {
        const color = 'rgb(0, 0, 0)';
        expect(format(color, 'hsl')).toBe('hsl(0, 0%, 0%)');
      });
      test('from hsl to hex', () => {
        const color = 'hsl(25, 12%, 29%)';
        expect(format(color, 'hex')).toBe('#534841');
      });
      test('from hsl to hex: grayscale', () => {
        const color = 'hsl(25, 0%, 58.8%)';
        expect(format(color, 'hex')).toBe('#969696');
      });
      test('from hsl to hex: zero values', () => {
        const color = 'hsl(25, 0%, 0%)';
        expect(format(color, 'hex')).toBe('#000000');
      });
      test('from hsl to rgb', () => {
        const color = 'hsl(215, 12%, 29%)';
        expect(format(color, 'rgb')).toBe('rgb(65, 72, 83)');
      });
      test('from hsl to rgb: grayscale', () => {
        const color = 'hsl(0, 0%, 58.8%)';
        expect(format(color, 'rgb')).toBe('rgb(150, 150, 150)');
      });
      test('from hsl to rgb: zero values', () => {
        const color = 'hsl(215, 12%, 0%)';
        expect(format(color, 'rgb')).toBe('rgb(0, 0, 0)');
      });
      test('from named to hex', () => {
        const color = 'dodgerblue';
        expect(format(color, 'hex')).toBe('#1e90ff');
      });
      test('from named to rgb', () => {
        const color = 'dodgerblue';
        expect(format(color, 'rgb')).toBe('rgb(30, 144, 255)');
      });
      test('from named to hsl', () => {
        const color = 'dodgerblue';
        expect(format(color, 'hsl')).toBe('hsl(210, 100%, 55.9%)');
      });
    });
  });
});
