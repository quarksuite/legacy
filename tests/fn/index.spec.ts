import { compose, curry2, curry3 } from "@fn/index";

describe("Functional helpers", () => {
  test("compose :: [Fn] -> Arg", () => {
    const fn1 = (n: string): string => `fn1(${n})`;
    const fn2 = (val: string): string => `fn2(${val})`;
    const composed = compose(fn1, fn2);
    const result = composed("value");

    expect(result).toBe("fn2(fn1(value))");
  });
  test("curry2 :: (Fn) -> y -> x", () => {
    const sum = curry2((y: number, x: number): number => x + y);

    const sumOf10 = sum(10);
    const completeSum = sum(3)(4);

    expect(sumOf10(3)).toBe(13);
    expect(completeSum).toBe(7);
  });
  test("curry3 :: (Fn) -> z -> y -> x", () => {
    const aggregate = curry3((...values: number[]): number =>
      values.reduce((a: number, b: number): number => a + b)
    );

    const a = aggregate(100);
    const b = a(28);
    const c = b(42);

    expect(a(42)(75)).toBe(217);
    expect(b(97)).toBe(225);
    expect(c).toBe(170);
  });
});
