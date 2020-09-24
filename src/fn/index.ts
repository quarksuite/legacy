export type Unary<T, R> = (x: T) => R;
export type Binary<T, U, R> = (y: U, x: T) => R;
export type Ternary<T, U, V, R> = (z: V, y: U, x: T) => R;
export type Variadic<T extends unknown[], U extends unknown[], R> = (
  ...args: [...T, ...U]
) => R;

/**
 * Composes two **unary** functions of any return type.
 *
 * In the public API, this function is exposed as `pipe`
 *
 * ## Usage
 * ```ts
 * const thirdOfCircle = set(hue, 360 / 3);
 * const muteByHalf = set(saturation, 100 / 2);
 *
 * pipe(thirdOfCircle, muteByHalf)('royalblue');
 * ```
 *
 * @param g - second function
 * @param f - first function
 * @param x - the value to be composed
 * @returns `h(x)`
 *
 * @remarks
 * If function `arity > 1`, you'll have to curry it to `1`.
 *
 * For simplicity's sake, this is a classic f => g => h(x) composition. If you
 * pass more than two functions, it will whine at you.
 */
export const compose = <T, U, R>(
  f: Unary<U, T>,
  g: Unary<T, R>
): Unary<U, R> => (x: U): R => g(f(x));

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
 * A higher order function that accepts a function, and separates
 * its parameters into a sequence of calls.
 *
 * In the public API, this function is exposed as `set`
 *
 * ## Usage
 * ```ts
 * const mixWithGreen = set(mix, 32, 'lime');
 * mixWithGreen('skyblue');
 * ```
 *
 * @param fn - the function to curry
 * @param applied - initial arguments
 * @param remaining - remaining arguments
 * @returns the args of `fn` as a sequence of two calls of its arguments
 *
 */
export const curryN = <T extends unknown[], U extends unknown[], R>(
  fn: Variadic<T, U, R>,
  ...applied: T
) => (...remaining: U): R => fn(...applied, ...remaining);
