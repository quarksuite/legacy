import css from "./css";
import styleDictionary from "./integrations";
import { DesignData, DesignTokens, SupportedFormats } from "./types";

/**
 * A function that processes formatted design data and outputs variables/design tokens
 * of various filetypes. Also included is a data recipe for integrating with
 * {@link https://amzn.github.io/style-dictionary | Style Dictionary}
 *
 * ## Usage
 * ```ts
 * // Assuming a palette is already defined and formatted
 *
 * // CSS custom properties (:root { --color-main: #bada55; })
 * build('color', 'custom-properties', data);
 *
 * // Sass ($color-main: #bada55;)
 * build('color', 'sass', data);
 * build('color', 'scss', data);
 *
 * // Less (@color-main: #bada55;)
 * build('color', 'less', data);
 *
 * // Stylus (color-main = #bada55)
 * build('color', 'styl', data);
 *
 * // JSON ({ "color": { "main": "#bada55" } })
 * build('color', 'json', data);
 *
 * // Style Dictionary Property ({ "color": { "main": { "value": "#bada55" } } })
 * build('color', 'style-dictionary', data)
 * ```
 *
 * @remarks
 * In most cases, you'll want the basic filetypes as your target. The library provides a
 * Style Dictionary data recipe for those of you who need to support Android, iOS and other
 * targets beyond the scope of this project.
 *
 * This function will throw an error if your target isn't supported.
 *
 * @param context - a string representing the namespace or root category of your data
 * @param target - a string representing the target filetype or data recipe to output
 * @param data - An object representing formatted design data
 * @returns a string containing your variables/design tokens or an object created from a data recipe
 */
export const build = (
  context: string,
  target: SupportedFormats,
  data: DesignData
): DesignTokens => {
  if (target === "css" || target === "custom-properties")
    return `\n:root {${css({ context, padding: 2 }, data)}\n}\n`;
  if (target === "sass" || target === "scss")
    return css({ context, prefix: "$" }, data);
  if (target === "less") return css({ context, prefix: "@" }, data);
  if (target === "styl")
    return css({ context, prefix: "", operator: " = ", suffix: "" }, data);
  if (target === "json") return JSON.stringify({ [context]: data }, null, 2);
  if (target === "style-dictionary")
    return JSON.stringify(styleDictionary(context, data), null, 2);
  throw Error(`
Error: unsupported format ${target}
==================================================
Available targets:
  css - "custom-properties", "sass", "scss", "less", "styl"
  data - "json", "yaml", "yml",
  integrations - "style-dictionary"
`);
};
