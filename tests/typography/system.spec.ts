import { system } from '../../src/typography';

describe('Typography utilities', () => {
  describe('typography.system(family)', () => {
    test('outputs a corresponding system font stack', () => {
      expect(system('sans')).toBe(
        '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif'
      );
    });
    test('accepts: serif', () => {
      expect(system('serif')).toBe(
        'Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol'
      );
    });
    test('accepts: monospace', () => {
      expect(system('monospace')).toBe(
        'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace'
      );
    });
  });
});
