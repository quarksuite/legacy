import {
  intToHex,
  hexToInt,
  extractNumber,
  percentAsFraction,
  percentAsFloat,
  channelAsFraction,
  percentChannelAsInt,
  matchValues,
  alphaAsHex
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

describe("percentAsFraction :: number -> number", () => {
  test("n% -> n / 100", () => {
    expect(percentAsFraction(0)).toBe(0);
    expect(percentAsFraction(10)).toBe(0.1);
    expect(percentAsFraction(25)).toBe(0.25);
    expect(percentAsFraction(31.8)).toBe(0.318);
    expect(percentAsFraction(100)).toBe(1);
  });
});

describe("percentAsFloat :: number -> number", () => {
  test("n / 100 -> n%", () => {
    expect(percentAsFloat(0.1)).toBe(10);
    expect(percentAsFloat(0.25)).toBe(25);
    expect(percentAsFloat(0.394)).toBe(39.4);
  });
});

describe("channelAsFraction :: number -> number", () => {
  test("n -> n / 255", () => {
    expect(channelAsFraction(0)).toBe(0);
    expect(channelAsFraction(5)).toBe(0.0196);
    expect(channelAsFraction(25)).toBe(0.098);
    expect(channelAsFraction(42)).toBe(0.165);
    expect(channelAsFraction(120)).toBe(0.471);
    expect(channelAsFraction(255)).toBe(1);
  });
});

describe("percentChannelAsInt :: number -> number", () => {
  test("n% -> n", () => {
    expect(percentChannelAsInt(0)).toBe(0);
    expect(percentChannelAsInt(25)).toBe(64);
    expect(percentChannelAsInt(50)).toBe(128);
    expect(percentChannelAsInt(75)).toBe(191);
    expect(percentChannelAsInt(100)).toBe(255);
  });
});

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
  });
});

describe("alphaAsHex :: number -> number", () => {
  test("n / 100 -> AA", () => {
    expect(alphaAsHex(0)).toBe("00");
    expect(alphaAsHex(0.25)).toBe("40");
    expect(alphaAsHex(0.5)).toBe("80");
    expect(alphaAsHex(0.66714919)).toBe("aa");
    expect(alphaAsHex(0.75)).toBe("bf");
    expect(alphaAsHex(1)).toBe("ff");
  });
});
