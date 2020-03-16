// Function utils
export const compose = (
  value: string,
  ...operations: Function[]
): string | string[] | number | number[] =>
  operations.map((fn: Function) => fn(value));

export const apply = (fn: Function, fixed: string | number): Function => (
  ...rest: (string | number)[]
): string => fn(fixed, ...rest);
