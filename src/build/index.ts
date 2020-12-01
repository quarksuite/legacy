import { properties } from "./css";
import {
  TokenDictionary,
  CSS,
  SassVariables,
  LessVariables,
  StylusVariables,
  TokenData,
  StyleDictionaryProperties,
  TailwindUtilityData,
} from "./types";

/**
 * A function that builds design token dictionaries as CSS custom properties.
 *
 * ## Usage
 * ```
 * css({
 *   color: {
 *     main: "red",
 *     accent: "green",
 *     highlight: "blue"
 *   }
 * });
 * ```
 *
 * @param tree - the dictionary to process
 * @returns a string of custom properties wrapped in a :root selector
 */
export const css = (tree: TokenDictionary): CSS =>
  `\n:root {${properties(tree, { padding: "  " })}}`;

/**
 * A function that builds design token dictionaries as Sass variables.
 *
 * ## Usage
 * ```
 * sass({
 *   color: {
 *     main: "red",
 *     accent: "green",
 *     highlight: "blue"
 *   }
 * });
 * ```
 *
 * @param tree - the dictionary to process
 * @returns a string of Sass variables, one per line
 */
export const sass = (tree: TokenDictionary): SassVariables =>
  properties(tree, { prefix: "$" });

/**
 * A function that builds design token dictionaries as Less variables.
 *
 * ## Usage
 * ```
 * less({
 *   color: {
 *     main: "red",
 *     accent: "green",
 *     highlight: "blue"
 *   }
 * });
 * ```
 *
 * @param tree - the dictionary to process
 * @returns a string of Less variables, one per line
 */
export const less = (tree: TokenDictionary): LessVariables =>
  properties(tree, { prefix: "@" });

/**
 * A function that builds design token dictionaries as Stylus variables.
 *
 * ## Usage
 * ```
 * styl({
 *   color: {
 *     main: "red",
 *     accent: "green",
 *     highlight: "blue"
 *   }
 * });
 * ```
 *
 * @param tree - the dictionary to process
 * @returns a string of Stylus variables, one per line
 */
export const styl = (tree: TokenDictionary): StylusVariables =>
  properties(tree, { prefix: "", operator: " = ", suffix: "" });

/**
 * A function that converts design token dictionaries to JSON.
 *
 * ## Usage
 * ```
 * raw({
 *   color: {
 *     main: "red",
 *     accent: "green",
 *     highlight: "blue"
 *   }
 * });
 * ```
 *
 * @param tree - the dictionary to process
 * @returns JSON formatted with two spaces
 */
export const raw = (tree: TokenDictionary): TokenData =>
  JSON.stringify(tree, null, 2);

/**
 * A function that converts design token dictionaries to {@link https://amzn.github.io/style-dictionary | Style Dictionary properties}
 * for additional processing.
 *
 * ## Usage
 * ```
 * sd({
 *   color: {
 *     main: "red",
 *     accent: "green",
 *     highlight: "blue"
 *   }
 * });
 * ```
 *
 * @param tree - the dictionary to process
 * @returns Style Dictionary properties to pass along for further building
 */
export const sd = (tree: TokenDictionary): StyleDictionaryProperties =>
  Object.entries(tree).reduce((acc, [key, value]) => {
    if (typeof value === "object")
      return { ...acc, [key]: sd(value as TokenDictionary) };
    return { ...acc, [key]: { value } };
  }, {});

/**
 * A function that converts dictionary subcategories into Tailwind utility data.
 *
 * ## Usage
 * ```
 * tw({
 *   content: {
 *      size: {
 *        base: "1rem";
 *        x: ["1.5rem", "2rem", "2.5rem", "3rem", "3.5rem"]
 *      }
 *   }
 * });
 * ```
 *
 *  @remarks
 *  This function isn't required to use data dictionaries with Tailwind. It's
 *  more a shortcut for processing scale tokens without changing the structure
 *  of a dictionary
 *
 * @param data - the dictionary to process
 * @returns Tailwind data ready to be dropped into a config
 */
export const tw = (tree: TokenDictionary): TailwindUtilityData =>
  Object.entries(tree).reduce((acc, [key, value]) => {
    if (key === "base") return { ...acc, DEFAULT: value };
    if (Array.isArray(value))
      return {
        ...acc,
        ...{
          ...value.reduce((a, v, i: number) => {
            return { ...a, [[key, i + 2].join("")]: v };
          }, {}),
        },
      };
    if (typeof value === "object") return { ...acc, [key]: tw(value) };
    return { ...acc, [key]: value };
  }, {});
