import {
  intToHex,
  hexToInt,
  matchValues,
  extractNumber
} from "@color/formatting";

describe("matchValues :: string -> string[]", () => {
  test("s -> [a, b, c[, d]]", () => {
    expect(matchValues("#fec0a0")).toStrictEqual(["fe", "c0", "a0"]);
    expect(matchValues("#fec0a0cc")).toStrictEqual(["fe", "c0", "a0", "cc"]);
    expect(matchValues("rgb(30, 10, 100)")).toStrictEqual(["30", "10", "100"]);
    expect(matchValues("rgb(30%, 20%, 100%)")).toStrictEqual([
      "30%",
      "20%",
      "100%"
    ]);
    expect(matchValues("hsl(320, 20%, 30%)")).toStrictEqual([
      "320",
      "20%",
      "30%"
    ]);
    expect(matchValues("hsl(10deg, 40%, 30%)")).toStrictEqual([
      "10deg",
      "40%",
      "30%"
    ]);
    expect(matchValues("hsl(10rad, 30%, 90%)")).toStrictEqual([
      "10rad",
      "30%",
      "90%"
    ]);
    expect(matchValues("hsl(15grad, 30%, 90%)")).toStrictEqual([
      "15grad",
      "30%",
      "90%"
    ]);
    expect(matchValues("hsl(0.25turn, 40%, 30%)")).toStrictEqual([
      "0.25turn",
      "40%",
      "30%"
    ]);
    expect(matchValues("hsla(75, 60%, 80%, 0.344)")).toStrictEqual([
      "75",
      "60%",
      "80%",
      "0.344"
    ]);
    expect(matchValues("hsla(12rad, 20%, 50%, 0.5)")).toStrictEqual([
      "12rad",
      "20%",
      "50%",
      "0.5"
    ]);
    expect(matchValues("hsla(24grad, 50%, 90%, 0.25)")).toStrictEqual([
      "24grad",
      "50%",
      "90%",
      "0.25"
    ]);
    expect(matchValues("hsl(-33, 59%, 44%)")).toStrictEqual([
      "-33",
      "59%",
      "44%"
    ]);
  });
});

describe("intToHex :: number -> string", () => {
  test("correct conversion of integer to hexadecimal", () => {
    expect(intToHex(0)).toBe("00");
    expect(intToHex(1)).toBe("01");
    expect(intToHex(2)).toBe("02");
    expect(intToHex(4)).toBe("04");
    expect(intToHex(8)).toBe("08");
    expect(intToHex(16)).toBe("10");
    expect(intToHex(32)).toBe("20");
    expect(intToHex(64)).toBe("40");
    expect(intToHex(128)).toBe("80");
    expect(intToHex(255)).toBe("ff");
  });
});

describe("hexToInt :: string -> number", () => {
  test("correct conversion of hexadecimal fragment to integer", () => {
    expect(hexToInt("00")).toBe(0);
    expect(hexToInt("01")).toBe(1);
    expect(hexToInt("02")).toBe(2);
    expect(hexToInt("04")).toBe(4);
    expect(hexToInt("08")).toBe(8);
    expect(hexToInt("10")).toBe(16);
    expect(hexToInt("20")).toBe(32);
    expect(hexToInt("40")).toBe(64);
    expect(hexToInt("80")).toBe(128);
    expect(hexToInt("ff")).toBe(255);
  });
});

describe("extractNumber :: string -> number", () => {
  test("extracts a number from a string", () => {
    expect(extractNumber("10deg")).toBe(10);
    expect(extractNumber("0.5turn")).toBe(0.5);
    expect(extractNumber("0.25rad")).toBe(0.25);
    expect(extractNumber("25.9%")).toBe(25.9);
  });
});
