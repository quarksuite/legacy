import cssFormat from "./css";
import styleDictionary from "./integrations";
import { DesignData, DesignTokens, StyleDictionaryProperties } from "./types";

/**
 * A function that builds your data as CSS custom properties wrapped in its context.
 *
 * ## Usage
 * ```
 * // Assuming a data set is prepared
 * css('color', data);
 * ```
 *
 * @param context - the root key or namespace of your data
 * @param data - the data to transform
 * @returns a string of custom properties wrapped in a :root selector
 */
export const css = (context: string, data: DesignData): DesignTokens =>
  `\n:root {${cssFormat({ context, padding: 2 }, data)}\n}\n`;

/**
 * A function that builds your data as Sass variables wrapped in its context.
 *
 * ## Usage
 * ```
 * // Assuming a data set is prepared
 * sass('color', data);
 * ```
 *
 * @param context - the root key or namespace of your data
 * @param data - the data to transform
 * @returns a string of Sass variables, one per line
 */
export const sass = (context: string, data: DesignData): DesignTokens =>
  cssFormat({ context, prefix: "$" }, data);

/**
 * A function that builds your data as Less variables wrapped in its context.
 *
 * ## Usage
 * ```
 * // Assuming a data set is prepared
 * less('color', data);
 * ```
 *
 * @param context - the root key or namespace of your data
 * @param data - the data to transform
 * @returns a string of Less variables, one per line
 */
export const less = (context: string, data: DesignData): DesignTokens =>
  cssFormat({ context, prefix: "@" }, data);

/**
 * A function that builds your data as Stylus variables wrapped in its context.
 *
 * ## Usage
 * ```
 * // Assuming a data set is prepared
 * stylus('color', data);
 * ```
 *
 * @param context - the root key or namespace of your data
 * @param data - the data to transform
 * @returns a string of Stylus variables, one per line
 */
export const stylus = (context: string, data: DesignData): DesignTokens =>
  cssFormat({ context, prefix: "", operator: " = ", suffix: "" }, data);

/**
 * A function that builds your data as JSON wrapped in its context.
 * ## Usage
 * ```
 * // Assuming a data set is prepared
 * json('color', data);
 * ```
 *
 * @param context - the root key or namespace of your data
 * @param data - the data to transform
 * @returns JSON data formatted with two spaces
 */
export const json = (context: string, data: DesignData): DesignTokens =>
  JSON.stringify({ [context]: data }, null, 2);

/**
 * A function that builds your data as {@link https://amzn.github.io/style-dictionary | Style Dictionary} properties for
 * additional processing.
 * ## Usage
 * ```
 * // Assuming a data set is prepared
 * styleProps('color', data);
 * ```
 *
 * @param context - the root key or namespace of your data
 * @param data - the data to transform
 * @returns Style Dictionary properties ready for handoff to that tool
 */
export const styleProps = (
  context: string,
  data: DesignData
): StyleDictionaryProperties => styleDictionary(context, data);
