import { constructData, sd, yaml } from "./scaffold";
import { FormattedDesignData, SupportedFormats, DesignTokens } from "./types";

/**
 * A function that processes formatted design data and outputs variables/design tokens
 * of various filetypes. Also included is a data recipe for integrating with
 * {@link https://amzn.github.io/style-dictionary | Style Dictionary}
 *
 * ## Usage
 * ```ts
 * // Assuming a palette is already defined and formatted
 *
 * // CSS (:root { --color-main: #bada55; })
 * build('color', 'css', data);
 *
 * // Sass ($color-main: #bada55;)
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
 * // YAML
 * // -------------------------------------------
 * // color:
 * //   main: #bada55
 * build('color', 'yaml' // or 'yml', data)
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
  data: FormattedDesignData
): DesignTokens => {
  switch (target) {
    case "css":
      return `:root {
${constructData({ context }, data)}
}`.trim();
    case "scss":
      return `
${constructData({ context, prefix: "$", padding: 0 }, data)}
      `.trimEnd();
    case "less":
      return `
${constructData({ context, prefix: "@", padding: 0 }, data)}
      `.trimEnd();
    case "styl":
      return `
${constructData(
  { context, prefix: "", operator: " = ", padding: 0, suffix: "\n" },
  data
)}
      `.trimEnd();
    case "json":
      return JSON.stringify({ [context]: data }, null, 2);
    case "yaml":
    case "yml":
      return yaml(context, data);
    case "style-dictionary":
      return JSON.stringify(sd(context, data), null, 2);
    default:
      throw Error(`
Format unsupported:
===============================================================================
Available filetypes: "css", "scss", "less", "styl", "json", "yaml" | "yml"
Available tool integrations: "style-dictionary"
`);
  }
};
