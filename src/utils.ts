// Functional mini-toolbox

// Compose
export const compose = (f: Function, g: Function): Function => (
  x: string | number | boolean
): string | number | boolean => f(g(x));

// Variadic
export const composeAll = (...fns: Function[]): Function =>
  fns.reduceRight(compose);

// Curry implementation
// https://folktale.origamitower.com/api/v2.3.0/en/folktale.core.lambda.curry.curry.html
export const curry = (arity: number, fn: Function): Function => {
  const curried = (oldArgs: (string | number)[]): Function => (
    ...newArgs: (string | number)[]
  ): Function => {
    const allArgs = oldArgs.concat(newArgs);
    const argCount = allArgs.length;

    return argCount < arity ? curried(allArgs) : fn(...allArgs);
  };

  return curried([]);
};
