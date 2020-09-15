import { toHex, toRGB, toHSL } from "@color/convert/named";

describe("named color conversions", () => {
  describe("toHex: string -> string", () => {
    test("named -> #RRGGBB", () => {
      expect(toHex("black")).toBe("#000000");
      expect(toHex("gray")).toBe("#808080");
      expect(toHex("white")).toBe("#ffffff");
      expect(toHex("dodgerblue")).toBe("#1e90ff");
      expect(toHex("coral")).toBe("#ff7f50");
    });
  });
  describe("toRGB: string -> string", () => {
    test("named -> rgb(R, G, B)", () => {
      expect(toRGB("black")).toBe("rgb(0, 0, 0)");
      expect(toRGB("gray")).toBe("rgb(128, 128, 128)");
      expect(toRGB("white")).toBe("rgb(255, 255, 255)");
      expect(toRGB("skyblue")).toBe("rgb(135, 206, 235)");
      expect(toRGB("goldenrod")).toBe("rgb(218, 165, 32)");
    });
  });
  describe("toHSL: string -> string", () => {
    test("named -> hsl(H, S%, L%)", () => {
      expect(toHSL("black")).toBe("hsl(0, 0%, 0%)");
      expect(toHSL("gray")).toBe("hsl(0, 0%, 50.2%)");
      expect(toHSL("white")).toBe("hsl(0, 0%, 100%)");
      expect(toHSL("firebrick")).toBe("hsl(0, 68%, 41.5%)");
      expect(toHSL("forestgreen")).toBe("hsl(120, 60.8%, 33.9%)");
    });
  });
});
