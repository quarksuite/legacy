import { spread } from '../../src/colors/kit';

describe('color utility kit', () => {
  const color = '#ff0000';
  describe('spread(color, rotation?)', () => {
    test('returns a range of colors fanned from base', () => {
      expect(spread(color)).toStrictEqual(['#ff00ff', '#ffa6a6', '#ffff00']);
    });
  });
});
