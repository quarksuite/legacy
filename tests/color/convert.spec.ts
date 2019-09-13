import convert from '../../src/color/convert';

describe('Color conversion', () => {
  describe('convert(color, to)', () => {
    describe('performs conversions between CSS color formats', () => {
      test('from hex to rgb', () => {
        const color = '#449c90';
        expect(convert(color, 'rgb')).toBe('rgb(68, 156, 144)');
      });
      test('from hex8 to rgba', () => {
        const color = '#4c0c90ce';
        expect(convert(color, 'rgba')).toBe('rgba(76, 12, 144, 0.8)');
      });
      test('from hex to hsl', () => {
        const color = '#4c0c90';
        expect(convert(color, 'hsl')).toBe('hsl(269, 84.6%, 30.6%)');
      });
      test('from hex8 to hsla', () => {
        const color = '#4c0c90cc';
        expect(convert(color, 'hsla')).toBe('hsla(269, 84.6%, 30.6%, 0.8)');
      });
      test('from rgb to hex', () => {
        const color = 'rgb(30, 10, 0)';
        expect(convert(color, 'hex')).toBe('#1e0a00');
      });
      test('from rgba to hex8', () => {
        const color = 'rgba(3, 80, 170, 0.33)';
        expect(convert(color, 'hex8')).toBe('#0350aa54');
      });
      test('from rgb to hsl', () => {
        const color = 'rgb(25, 200, 100)';
        expect(convert(color, 'hsl')).toBe('hsl(146, 77.8%, 44.1%)');
      });
      test('from rgba to hsla', () => {
        const color = 'rgba(25, 200, 100, 0.14)';
        expect(convert(color, 'hsla')).toBe('hsla(146, 77.8%, 44.1%, 0.14)');
      });
      test('from hsl to hex', () => {
        const color = 'hsl(25, 12%, 29%)';
        expect(convert(color, 'hex')).toBe('#534841');
      });
      test('from hsla to hex8', () => {
        const color = 'hsla(25, 12%, 29%, 0.9)';
        expect(convert(color, 'hex8')).toBe('#534841e6');
      });
      test('from hsl to rgb', () => {
        const color = 'hsl(215, 12%, 29%)';
        expect(convert(color, 'rgb')).toBe('rgb(65, 72, 83)');
      });
      test('from hsla to rgba', () => {
        const color = 'hsla(15, 40%, 29%, 0.8)';
        expect(convert(color, 'rgba')).toBe('rgba(104, 59, 44, 0.8)');
      });
      test('from named to hex', () => {
        const color = 'dodgerblue';
        expect(convert(color, 'hex')).toBe('#1e90ff');
      });
      test('from named to rgb', () => {
        const color = 'dodgerblue';
        expect(convert(color, 'rgb')).toBe('rgb(30, 144, 255)');
      });
      test('from named to hsl', () => {
        const color = 'dodgerblue';
        expect(convert(color, 'hsl')).toBe('hsl(210, 100%, 55.9%)');
      });
    });
  });
});
