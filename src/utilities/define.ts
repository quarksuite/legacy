import { DesignLanguage, DesignData, FormattedDesignData } from "./types";

/**
 * A utiliity for defining your design language and mapping data to it.
 *
 * ## Usage
 * ```ts
 * const swatch = hex("dodgerblue");
 *
 * // single level data formatting
 * const a = [swatch, tints(3, 99, swatch), shades(3, 99, swatch)];
 *
 * define(["main", "tint", "shade"], a);
 *
 * // multilevel data formatting
 * const b = analogous(45, swatch).map((c) => [
 *   c,
 *   tints(2, 99, c),
 *   shades(1, 99, c),
 * ]);
 * define([
 *   ["main", "tint", "shade"],
 *   ["secondary", "tint", "shade"],
 *   ["tertiary", "tint", "shade"]
 * ])
 *
 * // blended data formatting
 * const c = [
 *   ...[analogous(45, swatch)[0]].map((c) => [
 *     c,
 *     tints(2, 99, c),
 *     shades(1, 99, c),
 *   ]),
 *   analogous(45, swatch)[1],
 *   analogous(45, swatch)[2]
 * ];
 * define([["main", "tint", "shade"], "secondary", "tertiary"], c);
 * ```
 *
 * @param model - an array of strings modeling the design language your system
 * @param data - the raw data you want to map
 * @returns an object representing your data mapped to the model
 */
export const define = (
  model: DesignLanguage,
  data: DesignData
): FormattedDesignData =>
  (model as Array<string | string[]>).reduce(
    (acc: FormattedDesignData, key: string | string[], index: number) => {
      const val: string | (string | string[])[] = data[index];
      // checks for base values

      // data tree
      if (Array.isArray(key)) {
        const [category] = key;
        return {
          ...acc,
          ...{
            [category]: {
              ...key.reduce((a, k, i) => {
                const v: string | string[] = val[i];
                if (typeof v === "string") return { ...a, ...{ base: v } };
                return { ...a, ...{ [k]: { ...v } } };
              }, {}),
            },
          },
        };
      }

      // single layer data
      if (typeof val === "string") return { ...acc, ...{ [key]: val } };

      return {
        ...acc,
        ...{
          [key]: (val as string[]).reduce(
            (a, _v, _i, arr) => ({
              ...a,
              ...arr,
            }),
            {}
          ),
        },
      };
    },
    {}
  );
