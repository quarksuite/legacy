import { CSSFormatOpts, TokenDictionary } from "./types";

const formatter = ({
  padding = "",
  prefix = "--",
  operator = ": ",
  suffix = ";",
  eol = "\n",
}: CSSFormatOpts) => (collector: string, key: string, value: string): string =>
  collector.concat(padding, prefix, key, operator, value, suffix, eol);

const variable = (
  collected: string,
  current: string,
  delimiter: string
): string =>
  current === "base"
    ? collected
    : collected
    ? [collected, current].join(delimiter)
    : current;

export const properties = (
  tree: TokenDictionary,
  settings: CSSFormatOpts
): string => {
  const aggregator = (node = {}, head = ""): string =>
    Object.entries(node).reduce((product, [key, value]: [string, unknown]) => {
      const format = formatter(settings);
      const delimiter = "-";

      // Walk the tree
      if (typeof value === "object")
        return product.concat(
          aggregator(
            value as Record<string, unknown>,
            variable(head, key, delimiter)
          )
        );

      // Assemble the result
      return format(product, variable(head, key, delimiter), value as string);
    }, "");

  return "".concat("\n", aggregator(tree));
};
