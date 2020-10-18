import { QSFormattedData, ConstructionOpts, StyleDictFormat } from "./types";

const prop = (
  padding: number,
  prefix: string,
  operator: string,
  suffix: string
) => (str: string, id: string, value: string): string =>
  str.concat("".padStart(padding, " "), prefix, id, operator, value, suffix);

export const constructData = (
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
              (s, value: unknown, index) =>
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

export const yaml = (context: string, data: QSFormattedData): string =>
  `
${context}:
${Object.entries(data).reduce((str, entries) => {
  const [category, data] = entries;

  // String data are simply translated
  if (typeof data === "string") {
    return str.concat("  ", category, ": ", data, "\n");
  }

  // Object data are parsed
  if (typeof data === "object") {
    // Object with numeric index indicates variant, otherwise
    // it's a multi-level dataset that needs further processing
    if (data[0]) {
      return str.concat(
        "\n  ",
        category,
        ":",
        Object.values(data).reduce((s, value: unknown) => {
          const variant = `\n    - ${value as string}`;
          return s.concat(variant);
        }, "")
      );
    } else {
      return str.concat(
        "  ",
        category,
        ":",
        Object.entries(data).reduce(
          (s, [subcategory, inner]: [string, unknown]) => {
            if (subcategory === "base")
              return s.concat("\n    ", subcategory, ": ", inner as string);
            return s.concat(
              "\n    ",
              subcategory,
              ":",
              Object.values(inner as { [index: string]: string }).reduce(
                (ss, value: unknown) => {
                  const variant = `\n      - ${value as string}`;
                  return ss.concat(variant);
                },
                ""
              )
            );
          },
          ""
        ),
        "\n"
      );
    }
  }

  return str;
}, "")}
`.trim();

export const sd = (
  context: string,
  data: QSFormattedData
): StyleDictFormat => ({
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
