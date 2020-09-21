import { mix } from "@color/mix";

xdescribe("Public color mixing functions", () => {
  xdescribe("mix :: number -> string -> string -> string", () => {
    xtest("mixes two colors of any format", () => {
      expect(mix(50, "white", "black")).toBe("#b4b4b4");
      expect(mix(50, "white", "gray")).toBe("#cacaca");
      expect(mix(50, "black", "coral")).toBe("#b45a39");
      expect(mix(50, "red", "rgb(33, 210, 0)")).toBe("rgb(182, 148, 0)");
      expect(mix(50, "yellow", "hsl(180, 40.95%, 90%)")).toBe(
        "hsl(68, 85%, 82%)"
      );
      expect(mix(50, "green", "rgba(240, 230, 0, 0.5)")).toBe(
        "rgba(170, 243, 0, 0.79)"
      );
      expect(mix(50, "cyan", "dodgerblue")).toBe("#15cfff");
      expect(mix(50, "blue", "#ffcc00")).toBe("#b490b4");
      expect(mix(50, "magenta", "hsla(128, 65%, 40%, 0.25)")).toBe(
        "hsla(298, 31.4%, 59.5%, 0.73)"
      );
    });
    xtest("calculates alpha distance when both colors have a transparency", () => {
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
