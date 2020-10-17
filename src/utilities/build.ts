import {
  QSFormattedData,
  ConstructionOpts,
  Filetypes,
  DataRecipes,
  StyleDictFormat,
  Output,
} from "./types";

const prop = (
  padding: number,
  prefix: string,
  operator: string,
  suffix: string
) => (str: string, id: string, value: string): string =>
  str.concat("".padStart(padding, " "), prefix, id, operator, value, suffix);

const constructData = (
  {
    context,
    separator = "-",
    prefix = "--",
    operator = ": ",
    suffix = ";\n",
    padding = 2,
  }: ConstructionOpts,
  data: QSFormattedData
): string => {
  return Object.entries(data)
    .reduce((str, entries) => {
      const [category, data] = entries;
      const construct = prop(padding, prefix, operator, suffix);

      // String data are simply translated
      if (typeof data === "string") {
        return construct(str, [context, category].join(separator), data);
      }

      // Objects are parsed
      if (typeof data === "object") {
        // An object with a numeric index is part of single layer data
        // otherwise it's multilevel and needs internal processing
        if (data[0]) {
          return str.concat(
            Object.entries(data).reduce(
              (s, [index, value]: [string, unknown]) =>
                construct(
                  s,
                  [context, category, index].join(separator),
                  value as string
                ),
              ""
            )
          );
        } else {
          return str.concat(
            Object.entries(data).reduce(
              (s, [subcategory, inner]: [string, unknown]) => {
                if (subcategory === "base")
                  return construct(
                    s,
                    [context, category].join(separator),
                    inner as string
                  );
                return s.concat(
                  Object.values(inner as { [index: string]: string }).reduce(
                    (ss, value, index) =>
                      construct(
                        ss,
                        [context, category, subcategory, index].join(separator),
                        value
                      ),
                    ""
                  )
                );
              },
              ""
            )
          );
        }
      }

      return str;
    }, "")
    .trimEnd();
};

const sd = (context: string, data: QSFormattedData): StyleDictFormat => ({
  [context]: {
    ...Object.entries(data).reduce((acc, entries) => {
      const [category, data] = entries;

      // String data are simply translated
      if (typeof data === "string") {
        const value = data;
        return { ...acc, ...{ [category]: { value } } };
      }

      // Objects are parsed
      if (typeof data === "object") {
        // An object with a numeric index is part of single layer data
        // otherwise it's multilevel and needs internal processing
        if (data[0]) {
          return {
            ...acc,
            ...{
              [category]: {
                ...Object.values(data).reduce((a, value, index) => {
                  return { ...a, ...{ [index]: { value } } };
                }, {}),
              },
            },
          };
        } else {
          return {
            ...acc,
            ...{
              [category]: {
                ...Object.entries(data).reduce((a, [subcategory, inner]) => {
                  if (subcategory === "base")
                    return { ...a, ...{ [subcategory]: { value: inner } } };
                  return {
                    ...a,
                    ...{
                      [subcategory]: {
                        ...Object.values(inner).reduce(
                          (aa, value, i) => ({
                            ...aa,
                            ...{ [i]: { value } },
                          }),
                          {}
                        ),
                      },
                    },
                  };
                }, {}),
              },
            },
          };
        }
      }

      return acc;
    }, {}),
  },
});

/**
 * A function that processes assembled Quarksuite data and outputs variables/design tokens
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
 * // Style Dictionary Property ({ "color": { "main": { "value": "#bada55" } } })
 * build('color', 'style-dictionary', data)
 * ```
 *
 * @remarks
 * In most cases, you'll want the basic filetypes as your target. The library provides a
 * Style Dictionary data recipe for those of you who need to support Android, iOS and other
 * formats beyond the scope of this project.
 *
 * This function will throw an error if your target isn't supported.
 *
 * @param context - a string representing the namespace or root category the passed data
 * @param target - a string representing the target filetype or data recipe to output
 * @param data - An object representing assembled data ready for processing
 * @returns a string containing your variables/design tokens or an object created from a data recipe
 */
export const build = (
  context: string,
  target: Filetypes | DataRecipes,
  data: QSFormattedData
): Output => {
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
    case "style-dictionary":
      return JSON.stringify(sd(context, data), null, 2);
    default:
      throw Error(`
Format or filetype unsupported
==============================
Available filetypes: "css", "scss", "less", "styl", "json"
Available recipes: "style-dictionary"
`);
  }
};
