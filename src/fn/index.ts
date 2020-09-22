export type Unary<T, R> = (x: T) => R;
export type Binary<T, U, R> = (y: U, x: T) => R;
export type Ternary<T, U, V, R> = (z: V, y: U, x: T) => R;
export type Variadic<T extends any[], U extends any[], R> = (
  ...args: [...T, ...U]
) => R;

/**
 * Composes two **unary** functions of any return type.
 *
 * @param g - second function
 * @param f - first function
 * @param x - the value to be composed
 * @returns `h(x) = g`
 *
 * @remarks
 * If function `arity > 1`, you'll have to curry it to `1`.
 *
 * This library never composes more than three functions, so a classical binary
 * compose utility is just right.
 */
export const compose = <T, U, R>(f: Unary<T, U>, g: Unary<U, R>) => (x: T) =>
  g(f(x));

/**
 * A higher order function that accepts a binary function, and separates
 * its parameters into a sequence of calls.
 *
 * @remarks
 * It can also be used to short circuit a variadic function into a fixed arity.
 *
 * In this case, arity `2`
 *
 * @param fn - the function to curry
 * @param y - arg
 * @param x - data
 * @returns the args of `fn` as a sequence of 2 calls
 *
 */
export const curry2 = <T, U, R>(fn: Binary<T, U, R>) => (y: U) => (x: T): R =>
  fn(y, x);

/**
 * A higher order function that accepts a ternary function, and separates
 * its parameters into a sequence of calls.
 *
 * @remarks
 * It can also be used to truncate a variadic function into a fixed arity.
 *
 * In this case, arity `3`
 *
 * @param fn - the function to curry
 * @param z - arg
 * @param y - arg
 * @param x - data
 * @returns the args of `fn` as a sequence of 3 calls
 *
 */
export const curry3 = <T, U, V, R>(fn: Ternary<T, U, V, R>) => (z: V) => (
  y: U
) => (x: T): R => fn(z, y, x);

/**
 * A higher order function that accepts a variadic function, and separates
 * its parameters into a sequence of calls.
 *
 * @remarks
 * If called on a function of fixed arity, it enables partial application
 * of its parameters
 *
 * @param fn - the function to curry
 * @param applied - initial arguments
 * @param remaining - remaining arguments
 * @returns the args of `fn` as a sequence of two calls of its arguments
 *
 */
export const curryN = <T extends any[], U extends any[], R>(
  fn: Variadic<T, U, R>,
  ...applied: T
) => (...remaining: U): R => fn(...applied, ...remaining);
