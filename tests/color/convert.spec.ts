import { convert } from '../../src/color';

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
        const color = '#4ce4';
        expect(convert(color, 'hsla')).toBe('hsla(192, 83.3%, 60%, 0.3)');
      });
      test('from rgb to hex', () => {
        const color = 'rgb(30, 10, 0)';
        expect(convert(color, 'hex')).toBe('#1e0a00');
      });
    });
  });
});
