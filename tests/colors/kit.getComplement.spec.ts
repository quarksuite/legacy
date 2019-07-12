import { getComplement } from '../../src/colors/kit';

describe('color utility kit', () => {
  const color = '#ff0000';
  describe('getComplement(color)', () => {
    test('fetches the complement of a given color', () => {
      expect(getComplement(color)).toBe('#00ffff');
    });
  });
});
