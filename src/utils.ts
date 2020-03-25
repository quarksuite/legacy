// Functional mini-toolbox

// A classical composition
export const compose = (f: Function, g: Function): Function => (
  x: string | number | boolean
): string | number | boolean => f(g(x));

// Variadic compose
export const composeAll = (...fns: Function[]): Function =>
  fns.reduceRight(compose);
