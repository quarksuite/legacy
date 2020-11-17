import { construct } from "./css";
import { StyleDictionaryProperties, TokenDictionary } from "./types";

/**
 * A function that builds design tokens as CSS custom properties.
 *
 * ## Usage
 * ```
 * // Assuming a data set is prepared
 * css(data);
 * ```
 *
 * @param data - the data to transform
 * @returns a string of custom properties wrapped in a :root selector
 */
export const css = (data: TokenDictionary): string =>
  `\n:root {${construct({ padding: 2 }, data)}}`;

/**
 * A function that builds design tokens as Sass variables.
 *
 * ## Usage
 * ```
 * // Assuming a data set is prepared
 * sass(data);
 * ```
 *
 * @param data - the data to transform
 * @returns a string of Sass variables, one per line
 */
export const sass = (data: TokenDictionary): string =>
  construct({ prefix: "$" }, data);

/**
 * A function that builds design tokens as Less variables.
 *
 * ## Usage
 * ```
 * // Assuming a data set is prepared
 * less(data);
 * ```
 *
 * @param data - the data to transform
 * @returns a string of Less variables, one per line
 */
export const less = (data: TokenDictionary): string =>
  construct({ prefix: "@" }, data);

/**
 * A function that builds design tokens as Stylus variables wrapped in its context.
 *
 * ## Usage
 * ```
 * // Assuming a data set is prepared
 * styl(data);
 * ```
 *
 * @param context - the root key or namespace of your data
 * @param data - the data to transform
 * @returns a string of Stylus variables, one per line
 */
export const styl = (data: TokenDictionary): string =>
  construct({ prefix: "", operator: " = ", suffix: "" }, data);

/**
 * A function that translates your data to JSON.
 * ## Usage
 * ```
 * // Assuming a data set is prepared
 * json(data);
 * ```
 *
 * @param data - the data to transform
 * @returns JSON data formatted with two spaces
 */
export const json = (data: TokenDictionary): string =>
  JSON.stringify(data, null, 2);

/**
 * A function that builds your data as {@link https://amzn.github.io/style-dictionary | Style Dictionary} properties for
 * additional processing.
 * ## Usage
 * ```
 * // Assuming a data set is prepared
 * sd(data);
 * ```
 *
 * @param data - the data to transform
 * @returns Style Dictionary properties ready for processing
 */
export const sd = (data: TokenDictionary): StyleDictionaryProperties =>
  Object.entries(data).reduce((acc, [context, tokens]) => {
    return {
      ...acc,
      ...{
        [context]: Object.entries(tokens).reduce((a, [category, value]) => {
          if (typeof value === "string")
            return { ...a, ...{ [category]: { value } } };
          return {
            ...a,
            ...{
              [category]: Object.entries(value).reduce(
                (aa, [k, v]: [string, string | string[]]) => {
                  if (typeof v === "string")
                    return { ...aa, ...{ [k]: { value: v } } };
                  return {
                    ...aa,
                    [k]: v.reduce(
                      (aaa, v, i) => ({ ...aaa, [i]: { value: v } }),
                      {}
                    ),
                  };
                },
                {}
              ),
            },
          };
        }, {}),
      },
    };
  }, {});
