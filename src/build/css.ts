import { DesignData, CSSConstructionOpts, DataSubcategory } from "./types";

const prop = (
  padding: number,
  prefix: string,
  separator: string,
  operator: string,
  suffix: string,
  terminator: string
) => (str: string, keys: (string | number)[], value: string): string =>
  str.concat(
    "".padStart(padding, " "),
    prefix,
    keys.join(separator),
    operator,
    value,
    suffix,
    terminator
  );

export default (
  {
    context,
    separator = "-",
    prefix = "--",
    operator = ": ",
    suffix = ";",
    padding = 0,
    terminator = "\n",
  }: CSSConstructionOpts,
  data: DesignData
): string =>
  "\n"
    .concat(
      Object.entries(data).reduce((str, entries) => {
        const [category, value]: [
          string,
          string | string[] | DataSubcategory
        ] = entries;
        const construct = prop(
          padding,
          prefix,
          separator,
          operator,
          suffix,
          terminator
        );

        const isCategory = typeof value === "string";
        const isSubcategory =
          typeof value === "object" && !Array.isArray(value);

        if (isSubcategory) {
          return str.concat(
            Object.entries(value).reduce(
              (s: string, [subcategory, v]: [string, string | string[]]) => {
                return subcategory === "base"
                  ? construct(s, [context, category], v as string)
                  : s.concat(
                      (v as string[]).reduce(
                        (ss: string, vv: string, index: number) =>
                          construct(
                            ss,
                            [context, category, subcategory, index],
                            vv
                          ),
                        ""
                      )
                    );
              },
              ""
            )
          );
        }

        if (isCategory) {
          return construct(str, [context, category], value as string);
        }

        const base = Object.entries(data).filter(
          ([, value]) => typeof value === "string"
        )[0][0];
        return str.concat(
          (value as string[]).reduce(
            (s, v, index) => construct(s, [context, base, category, index], v),
            ""
          )
        );
      }, "")
    )
    .trimEnd();
