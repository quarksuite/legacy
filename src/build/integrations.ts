import {
  DesignData,
  StyleDictionaryProperties,
  DataSubcategory,
} from "./types";

export default (
  context: string,
  data: DesignData
): StyleDictionaryProperties => ({
  [context]: Object.entries(data).reduce((acc, entries) => {
    const [category, value]: [
      string,
      string | string[] | DataSubcategory
    ] = entries;
    const isCategory = typeof value === "string";
    const isSubcategory = typeof value === "object" && !Array.isArray(value);

    if (isSubcategory) {
      return {
        ...acc,
        ...{
          [category]: {
            ...Object.entries(value).reduce(
              (a, [subcategory, inner]: [string, string | string[]]) =>
                subcategory === "base"
                  ? { ...a, ...{ [subcategory]: { value: inner } } }
                  : {
                      ...a,
                      ...{
                        [subcategory]: (inner as string[]).reduce(
                          (
                            aa: { [index: string]: string },
                            vv: string,
                            i: number
                          ) => ({ ...aa, ...{ [i]: { value: vv } } }),
                          {}
                        ),
                      },
                    },
              {}
            ),
          },
        },
      };
    }

    if (isCategory) {
      return { ...acc, ...{ [category]: { value } } };
    }

    return {
      ...acc,
      ...{
        [category]: {
          ...(value as string[]).reduce(
            (a, v, i) => ({ ...a, ...{ [i]: { value: v } } }),
            {}
          ),
        },
      },
    };
  }, {}),
});
