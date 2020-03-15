const families = {
  sans: '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
  serif: 'Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
  monospace: 'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace'
};
/**
 * Fetches a system font stack to help with quick prototyping;
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // Default settings output all stacks
 * typography.system();
 *
 * // One argument will output a single stack
 * typography.system('sans');
 *
 * typography.system('serif');
 *
 * typography.system('monospace');
 *
 * // Multiple arguments output multiple stacks
 * typography.system('sans', 'monospace');
 * ```
 *
 * @param fonts - the system families to output
 * @returns Single or multiple system font stacks
 **/

export const system = (...fonts) => {
  // No arguments outputs all stacks by default
  if (!fonts.length) return ['sans', 'serif', 'monospace'].map(stack => families[stack]); // Output a string if only one family

  if (fonts.length === 1) {
    let [font] = fonts;
    return families[font];
  } // Output an array otherwise


  return fonts.map(stack => families[stack]);
};