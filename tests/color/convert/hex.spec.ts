import { extractHexChannels, mapToRGB, toRGB, toHSL } from "@color/convert/hex";

describe("Hex formatting", () => {
  describe("extractHexChannels :: string -> string[]", () => {
    test("#RGB[A] -> [R, G, B[, A]]", () => {
      expect(extractHexChannels("#000")).toStrictEqual(["00", "00", "00"]);
      expect(extractHexChannels("#aaa")).toStrictEqual(["aa", "aa", "aa"]);
      expect(extractHexChannels("#fff")).toStrictEqual(["ff", "ff", "ff"]);
      expect(extractHexChannels("#f00")).toStrictEqual(["ff", "00", "00"]);
      expect(extractHexChannels("#0ff")).toStrictEqual(["00", "ff", "ff"]);
      expect(extractHexChannels("#00f")).toStrictEqual(["00", "00", "ff"]);
      expect(extractHexChannels("#0003")).toStrictEqual([
        "00",
        "00",
        "00",
        "33"
      ]);
      expect(extractHexChannels("#aaa6")).toStrictEqual([
        "aa",
        "aa",
        "aa",
        "66"
      ]);
      expect(extractHexChannels("#fff9")).toStrictEqual([
        "ff",
        "ff",
        "ff",
        "99"
      ]);
      expect(extractHexChannels("#3aed")).toStrictEqual([
        "33",
        "aa",
        "ee",
        "dd"
      ]);
      expect(extractHexChannels("#face")).toStrictEqual([
        "ff",
        "aa",
        "cc",
        "ee"
      ]);
    });
    test("#RRGGBB[AA] -> [R, G, B[, A]]", () => {
      expect(extractHexChannels("#000000")).toStrictEqual(["00", "00", "00"]);
      expect(extractHexChannels("#aaaaaa")).toStrictEqual(["aa", "aa", "aa"]);
      expect(extractHexChannels("#ffffff")).toStrictEqual(["ff", "ff", "ff"]);
      expect(extractHexChannels("#bada55")).toStrictEqual(["ba", "da", "55"]);
      expect(extractHexChannels("#c0ffee")).toStrictEqual(["c0", "ff", "ee"]);
      expect(extractHexChannels("#deaded")).toStrictEqual(["de", "ad", "ed"]);
      expect(extractHexChannels("#abcdef07")).toStrictEqual([
        "ab",
        "cd",
        "ef",
        "07"
      ]);
      expect(extractHexChannels("#c3c89fb7")).toStrictEqual([
        "c3",
        "c8",
        "9f",
        "b7"
      ]);
    });
  });
  describe("mapToRGB :: string -> number[]", () => {
    describe("maps a hex color string to its raw red, green, blue values", () => {
      test("#RGB[A] -> [R, G, B[, A]]", () => {
        expect(mapToRGB("#000")).toStrictEqual([0, 0, 0]);
        expect(mapToRGB("#aaa")).toStrictEqual([170, 170, 170]);
        expect(mapToRGB("#fff")).toStrictEqual([255, 255, 255]);
        expect(mapToRGB("#b0b")).toStrictEqual([187, 0, 187]);
        expect(mapToRGB("#fab")).toStrictEqual([255, 170, 187]);
        expect(mapToRGB("#be7")).toStrictEqual([187, 238, 119]);
        expect(mapToRGB("#0003")).toStrictEqual([0, 0, 0, 0.2]);
        expect(mapToRGB("#aaaa")).toStrictEqual([170, 170, 170, 0.667]);
        expect(mapToRGB("#ffff")).toStrictEqual([255, 255, 255, 1]);
      });
      test("#RRGGBB[AA] -> [R, G, B[, A]]", () => {
        expect(mapToRGB("#000000")).toStrictEqual([0, 0, 0]);
        expect(mapToRGB("#aaaaaa")).toStrictEqual([170, 170, 170]);
        expect(mapToRGB("#ffffff")).toStrictEqual([255, 255, 255]);
        expect(mapToRGB("#a3001c")).toStrictEqual([163, 0, 28]);
        expect(mapToRGB("#a99cc0")).toStrictEqual([169, 156, 192]);
        expect(mapToRGB("#0fce00")).toStrictEqual([15, 206, 0]);
        expect(mapToRGB("#00000033")).toStrictEqual([0, 0, 0, 0.2]);
        expect(mapToRGB("#aaaaaaaa")).toStrictEqual([170, 170, 170, 0.667]);
        expect(mapToRGB("#ffffffff")).toStrictEqual([255, 255, 255, 1]);
      });
    });
  });
});

describe("hex color conversion", () => {
  describe("toRGB :: string -> string", () => {
    test("#RGB(A) -> rgb[a](R, G, B[, A])", () => {
      expect(toRGB("#000")).toBe("rgb(0, 0, 0)");
      expect(toRGB("#aaa")).toBe("rgb(170, 170, 170)");
      expect(toRGB("#fff")).toBe("rgb(255, 255, 255)");
      expect(toRGB("#ace")).toBe("rgb(170, 204, 238)");
      expect(toRGB("#bae")).toBe("rgb(187, 170, 238)");
      expect(toRGB("#7c8")).toBe("rgb(119, 204, 136)");
      expect(toRGB("#000c")).toBe("rgba(0, 0, 0, 0.8)");
      expect(toRGB("#aaad")).toBe("rgba(170, 170, 170, 0.867)");
      expect(toRGB("#fffe")).toBe("rgba(255, 255, 255, 0.933)");
    });
    test("#RRGGBB[AA] -> [R, G, B[, A]]", () => {
      expect(toRGB("#000000")).toBe("rgb(0, 0, 0)");
      expect(toRGB("#aaaaaa")).toBe("rgb(170, 170, 170)");
      expect(toRGB("#ffffff")).toBe("rgb(255, 255, 255)");
      expect(toRGB("#39900a")).toBe("rgb(57, 144, 10)");
      expect(toRGB("#ce300a")).toBe("rgb(206, 48, 10)");
      expect(toRGB("#3030fa")).toBe("rgb(48, 48, 250)");
      expect(toRGB("#cc939310")).toBe("rgba(204, 147, 147, 0.0627)");
      expect(toRGB("#dc3ea3ac")).toBe("rgba(220, 62, 163, 0.675)");
    });
  });
  describe("toHSL :: string -> string", () => {
    test("#RGB[A] -> hsl[a](H, S, L[, A])", () => {
      expect(toHSL("#000")).toBe("hsl(0, 0%, 0%)");
      expect(toHSL("#aaa")).toBe("hsl(0, 0%, 66.7%)");
      expect(toHSL("#fff")).toBe("hsl(0, 0%, 100%)");
    });
  });
});
