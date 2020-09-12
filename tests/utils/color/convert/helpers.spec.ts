import { intToHex } from "@color/convert/helpers";

describe("Color conversion utilities", () => {
  describe("intToHex(x: number)", () => {
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
});
