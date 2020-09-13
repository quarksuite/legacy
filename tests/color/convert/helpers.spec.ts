import {
  intToHex,
  hexToInt,
  extractNumber,
  toFraction,
  toPercent,
  parseFraction,
  parsePercent
} from "@color/convert/helpers";

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

describe("toFraction :: number -> number", () => {
  test("converts an percentage to a fraction", () => {
    expect(toFraction(10)).toBe(0.1);
    expect(toFraction(25)).toBe(0.25);
    expect(toFraction(31.8)).toBe(0.318);
  });
});

describe("toPercent :: number -> number", () => {
  test("converts an fraction to a percent", () => {
    expect(toPercent(0.1)).toBe(10);
    expect(toPercent(0.25)).toBe(25);
    expect(toPercent(0.394)).toBe(39.4);
  });
});

describe("parsePercent :: string -> number -> number", () => {
  test("parses a percent and converts it to a fraction", () => {
    expect(parsePercent("15%")).toBe(0.15);
    expect(parsePercent("39.6%")).toBe(0.396);
  });
});

describe("parseFraction :: string -> number -> number", () => {
  test("parses a fraction and converts it to a percent", () => {
    expect(parseFraction("0.781")).toBe(78.1);
    expect(parseFraction("0.42")).toBe(42);
  });
});
