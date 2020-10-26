import cssFormat from "./css";
import styleDictionary from "./integrations";
import { DesignData, DesignTokens, StyleDictionaryProperties } from "./types";

export const css = (context: string, data: DesignData): DesignTokens =>
  `\n:root {${cssFormat({ context, padding: 2 }, data)}\n}\n`;

export const sass = (context: string, data: DesignData): DesignTokens =>
  cssFormat({ context, prefix: "$" }, data);

export const less = (context: string, data: DesignData): DesignTokens =>
  cssFormat({ context, prefix: "@" }, data);

export const stylus = (context: string, data: DesignData): DesignTokens =>
  cssFormat({ context, prefix: "", operator: " = ", suffix: "" }, data);

export const json = (context: string, data: DesignData): DesignTokens =>
  JSON.stringify({ [context]: data }, null, 2);

export const styleProps = (
  context: string,
  data: DesignData
): StyleDictionaryProperties => styleDictionary(context, data);
