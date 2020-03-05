import { system } from '../../src/typography';

describe('Typography utilities', () => {
  describe('typography.system(family)', () => {
    test('outputs all stacks by default', () => {
      expect(system()).toStrictEqual([
        '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
        'Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
        'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace'
      ]);
    });
    test('a single family outputs a single stack', () => {
      expect(system('monospace')).toBe(
        'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace'
      );
    });
    test('two families target chosen stacks', () => {
      expect(system('sans', 'monospace')).toStrictEqual([
        '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
        'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace'
      ]);
    });
  });
});
