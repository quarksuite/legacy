import { toHex, toRGB, toHSL } from "@color/convert";

describe("Public conversion interface", () => {
  describe("toHex :: string -> string", () => {
    test("correctly converts, RGB, HSL, named colors", () => {
      expect(toHex("rgb(0, 0, 0)")).toBe("#000000");
      expect(toHex("hsl(0, 0%, 66.7%)")).toBe("#aaaaaa");
      expect(toHex("white")).toBe("#ffffff");
      expect(toHex("rgb(39, 110, 0)")).toBe("#276e00");
      expect(toHex("hsl(128grad, 100%, 49%)")).toBe("#15fa00");
      expect(toHex("hsl(3.2rad, 70%, 53%)")).toBe("#33d3db");
      expect(toHex("rgb(70%, 60%, 40%)")).toBe("#b39966");
      expect(toHex("rgba(101, 33, 39, 0.6)")).toBe("#65212799");
      expect(toHex("hsla(330, 50%, 75%, 0.8)")).toBe("#df9fbfcc");
      expect(toHex("dodgerblue")).toBe("#1e90ff");
    });
    test("rejects invalid CSS colors", () => {
      expect(() => toHex("rgba()")).toThrow();
      expect(() => toHex("hsl()")).toThrow();
      expect(() => toHex("#ffo")).toThrow();
    });
    test("returns input color if format is the same", () => {
      expect(toHex("#000000")).toBe("#000000");
      expect(toHex("#33900ccf")).toBe("#33900ccf");
    });
  });
  describe("toRGB :: string -> string", () => {
    test("correctly converts hex, HSL, named colors", () => {
      expect(toRGB("hsl(0, 0%, 0%)")).toBe("rgb(0, 0, 0)");
      expect(toRGB("gray")).toBe("rgb(128, 128, 128)");
      expect(toRGB("#ffffff")).toBe("rgb(255, 255, 255)");
      expect(toRGB("#abcedef9")).toBe("rgba(171, 206, 222, 0.976)");
      expect(toRGB("hsla(320, 32%, 64%, 0.48)")).toBe(
        "rgba(193, 134, 173, 0.48)"
      );
      expect(toRGB("dodgerblue")).toBe("rgb(30, 144, 255)");
    });
    test("rejects invalid CSS colors", () => {
      expect(() => toRGB("hsl()")).toThrow();
      expect(() => toRGB("#ffo")).toThrow();
      expect(() => toRGB("fifo")).toThrow();
    });
    test("returns input color if format is the same", () => {
      expect(toRGB("rgb(22, 110, 0)")).toBe("rgb(22, 110, 0)");
    });
  });
  describe("toHSL :: string -> string", () => {
    test("correctly converts hex, RGB, named colors", () => {
      expect(toHSL("#000000")).toBe("hsl(0, 0%, 0%)");
      expect(toHSL("rgb(128, 128, 128)")).toBe("hsl(0, 0%, 50.2%)");
      expect(toHSL("antiquewhite")).toBe("hsl(35, 77.4%, 91.1%)");
      expect(toHSL("dodgerblue")).toBe("hsl(210, 100%, 55.9%)");
      expect(toHSL("#face")).toBe("hsla(336, 100%, 83.4%, 0.933)");
      expect(toHSL("#ace")).toBe("hsl(210, 66.5%, 80%)");
    });
    test("rejects invalid CSS colors", () => {
      expect(() => toHSL("rgb")).toThrow();
      expect(() => toHSL("#ffo")).toThrow();
      expect(() => toHSL("fifo")).toThrow();
    });
  });
});
