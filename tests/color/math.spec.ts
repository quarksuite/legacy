import {
  radToDeg,
  gradToDeg,
  fractionOfCircle,
  percentAsFraction,
  percentAsFloat,
  alphaAsHex,
  channelAsFraction,
  percentChannelAsInt,
  calculateDifference,
  normalization,
} from "@color/math";

describe("normalization :: (number, number, number) -> number", () => {
  test("bounds values within a range", () => {
    expect(normalization(0, 100, 20)).toBe(20);
    expect(normalization(0, 100, -25)).toBe(0);
    expect(normalization(0, 100, 900)).toBe(100);
    expect(normalization(0, 360, 220)).toBe(220);
    expect(normalization(0, 360, -45)).toBe(0);
    expect(normalization(0, 360, 720)).toBe(360);
  });
});

describe("calculateDifference :: (number, number, number) -> number", () => {
  test("calculates the variance between two values", () => {
    expect(calculateDifference(0, 0, 0.5)).toBe(0);
    expect(calculateDifference(255, 255, 0.5)).toBe(255);
    expect(calculateDifference(255, 0, 0.5)).toBe(180);
    expect(calculateDifference(0, 255, 0.5)).toBe(180);
    expect(calculateDifference(38, 215, 0.5)).toBe(154);
  });
});

describe("radToDeg :: number -> number", () => {
  test("n ㎭ -> n°", () => {
    expect(radToDeg(0)).toBe(0);
    expect(radToDeg(2)).toBe(115);
    expect(radToDeg(4)).toBe(229);
    expect(radToDeg(6)).toBe(344);
    expect(radToDeg(8)).toBe(458);
  });
});

describe("gradToDeg :: number -> number", () => {
  test("nᵍ -> n°", () => {
    expect(gradToDeg(0)).toBe(0);
    expect(gradToDeg(100)).toBe(90);
    expect(gradToDeg(200)).toBe(180);
    expect(gradToDeg(300)).toBe(270);
    expect(gradToDeg(400)).toBe(360);
  });
});

describe("fractionOfCircle :: number -> number", () => {
  test("n / 360 -> n°", () => {
    expect(fractionOfCircle(0)).toBe(0);
    expect(fractionOfCircle(0.25)).toBe(90);
    expect(fractionOfCircle(0.5)).toBe(180);
    expect(fractionOfCircle(0.75)).toBe(270);
    expect(fractionOfCircle(1)).toBe(360);
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
