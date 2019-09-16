interface SystemStack {
  [index: string]: string;
}

const fonts: SystemStack = {
  sans:
    '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
  serif:
    'Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
  monospace:
    'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace'
};

/**
 * Fetches a system font stack to help with quick prototyping;
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // for sans
 * typography.system('sans');
 *
 * // for serif
 * typography.system('serif');
 *
 * // for monospace
 * typography.system('monospace');
 * ```
 *
 * @param family - the system family to output
 * @returns A system font stack
 **/
export const system = (family: 'sans' | 'serif' | 'monospace') => fonts[family];
