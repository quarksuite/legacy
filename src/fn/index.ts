export type Unary<T, R> = (x: T) => R;
export type Binary<T, U, R> = (y: U, x: T) => R;
export type Ternary<T, U, V, R> = (z: V, y: U, x: T) => R;
export type Variadic<T extends unknown[], U extends unknown[], R> = (
  ...args: [...T, ...U]
) => R;

export const compose = <T, U, R>(
  f: Unary<U, T>,
  g: Unary<T, R>
): Unary<U, R> => (x: U): R => g(f(x));

export const curry2 = <T, U, R>(fn: Binary<T, U, R>) => (y: U) => (x: T): R =>
  fn(y, x);

export const curry3 = <T, U, V, R>(fn: Ternary<T, U, V, R>) => (z: V) => (
  y: U
) => (x: T): R => fn(z, y, x);
