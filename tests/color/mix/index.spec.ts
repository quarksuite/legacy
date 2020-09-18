import { mix } from "@color/mix";

describe("Public color mixing functions", () => {
  describe("mix :: number -> string -> string -> string", () => {
    const evenly = mix(50);

    const white = evenly("white");
    const black = evenly("black");

    const red = evenly("red");
    const yellow = evenly("yellow");
    const green = evenly("lime");
    const cyan = evenly("cyan");
    const blue = evenly("blue");
    const magenta = evenly("magenta");

    test("mixes two colors of any format", () => {
      const [R, Y, G, C, B, M] = [red, yellow, green, cyan, blue, magenta];

      expect(white("black")).toBe("#b4b4b4");
      expect(white("gray")).toBe("#cacaca");
      expect(black("coral")).toBe("#b45a39");
      expect(R("rgb(33, 210, 0)")).toBe("rgb(182, 148, 0)");
      expect(Y("hsl(180, 40.95%, 90%)")).toBe("hsl(68, 85%, 82%)");
      expect(G("rgba(240, 230, 0, 0.5)")).toBe("rgba(170, 243, 0, 0.79)");
      expect(C("dodgerblue")).toBe("#15cfff");
      expect(B("#ffcc00")).toBe("#b490b4");
      expect(M("hsla(128, 65%, 40%, 0.25)")).toBe(
        "hsla(298, 31.4%, 59.5%, 0.73)"
      );
    });
    test("calculates alpha distance when both colors have a transparency", () => {
      expect(mix(25, "rgba(33, 10, 240, 0.5)", "hsla(22, 75%, 34%, 0.5)")).toBe(
        "hsla(309, 37.9%, 37.9%, 0.5)"
      );
      expect(
        mix(75, "rgba(230, 10, 240, 0.75)", "hsla(2, 75%, 34%, 0.31)")
      ).toBe("hsla(301, 86%, 44.9%, 0.67)");
      expect(mix(15, "rgba(30, 10, 40, 0.2)", "hsla(2, 75%, 54%, 0.9)")).toBe(
        "hsla(1, 63.6%, 50.6%, 0.83)"
      );
    });
  });
});
