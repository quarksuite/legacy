import { HierarchyFormat, QSData, QSFormattedData } from "./types";

/**
 * A formatting utility that prepares raw data for transformation.
 *
 * ## Usage
 * ```ts
 * const swatch = hex("dodgerblue");
 *
 * // single level data formatting
 * const a = [swatch, tints(3, 99, swatch), shades(3, 99, swatch)];
 *
 * assemble(["main", "tint", "shade"], a);
 *
 * // multilevel data formatting
 * const b = analogous(45, swatch).map((c) => [
 *   c,
 *   tints(2, 99, c),
 *   shades(1, 99, c),
 * ]);
 * assemble([
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
 * assemble([["main", "tint", "shade"], "secondary", "tertiary"], c);
 * ```
 *
 * @remarks
 * To keep your data as portable as possible and for ease of use, single layer data
 * formatting is preferred in most cases. Multilevel has its uses, though.
 * Like formatting your data all at once.
 *
 * @param hierarchy - an array of strings mapping to the structure of your data
 * @param data - the raw data you want to format
 * @returns a formatted object ready for consumption by the build function
 */
export default (hierarchy: HierarchyFormat, data: QSData): QSFormattedData =>
  (hierarchy as Array<string | string[]>).reduce(
    (acc: QSFormattedData, key: string | string[], index: number) => {
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
