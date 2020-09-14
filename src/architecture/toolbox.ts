// Functional mini-toolbox

// Composition
const _compose = (f: Function, g: Function): Function => (
  x: string | number | boolean
): string | number | boolean => f(g(x));

export const compose = (...fns: Function[]): Function =>
  fns.reduceRight(_compose);

// Currying borrowed from:
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
