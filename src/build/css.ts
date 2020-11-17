import { CSSFormatOpts, TokenDictionary } from "./types";

const format = (
  {
    padding = 0,
    prefix = "--",
    separator = "-",
    operator = ": ",
    suffix = ";",
    eol = "\n",
  }: CSSFormatOpts,
  hierarchy: (string | number)[],
  value: string,
  str: string
): string =>
  str.concat(
    "".padStart(padding, " "),
    prefix,
    hierarchy.join(separator),
    operator,
    value,
    suffix,
    eol
  );

export const construct = (
  options: CSSFormatOpts,
  data: TokenDictionary
): string =>
  "".concat(
    ...Object.entries(data).map(([context, tokens]) => {
      return Object.entries(tokens).reduce((str, [category, value]) => {
        // Single values are directly mapped
        if (typeof value === "string")
          return format(options, [context, category], value, str);

        // Subcategories are parsed
        return str.concat(
          Object.entries(value).reduce(
            (s, [k, v]: [string, string | string[]]) => {
              if (typeof v === "string")
                return format(options, [context, category], v, s);
              return s.concat(
                v.reduce(
                  (ss, vv, index) =>
                    format(options, [context, category, k, index], vv, ss),
                  ""
                )
              );
            },
            ""
          )
        );
      }, "\n");
    })
  );
