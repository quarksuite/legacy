import { validateColor } from "@color/validate";

describe("validateColor :: string -> string | Error", () => {
  test("can validate hex colors", () => {
    expect(validateColor("#000000")).toBeTruthy();
    expect(validateColor("#aaaaaa")).toBeTruthy();
    expect(validateColor("#ffffff")).toBeTruthy();
    expect(validateColor("#00f")).toBeTruthy();
    expect(validateColor("#0fa31011")).toBeTruthy();
    expect(validateColor("#af15")).toBeTruthy();
    expect(validateColor("#fqq000")).toBeFalsy();
    expect(validateColor("f0aa00")).toBeFalsy();
  });
  test("can validate rgb colors", () => {
    expect(validateColor("rgb(0, 0, 0)")).toBeTruthy();
    expect(validateColor("rgb(128, 128, 128)")).toBeTruthy();
    expect(validateColor("rgb(255, 255, 255)")).toBeTruthy();
    expect(validateColor("rgb(20, 110, 19)")).toBeTruthy();
    expect(validateColor("rgba(10, 210, 119, 0.1)")).toBeTruthy();
    expect(validateColor("rgb(20%, 70%, 19%)")).toBeTruthy();
    expect(validateColor("rgba(2%, 7%, 79%, 0.5)")).toBeTruthy();
    expect(validateColor("rgb(301, 200, 1)")).toBeFalsy();
  });
  test("can validate hsl colors", () => {
    expect(validateColor("hsl(0, 0%, 0%)")).toBeTruthy();
    expect(validateColor("hsl(0, 0%, 50%)")).toBeTruthy();
    expect(validateColor("hsl(0, 0%, 100%)")).toBeTruthy();
    expect(validateColor("hsl(304, 11%, 40%)")).toBeTruthy();
    expect(validateColor("hsl(30deg, 11%, 40%)")).toBeTruthy();
    expect(validateColor("hsl(15grad, 11%, 40%)")).toBeTruthy();
    expect(validateColor("hsla(100, 11%, 40%, 0.75)")).toBeTruthy();
    expect(validateColor("hsla(3.5rad, 70%, 89%, 0.1)")).toBeTruthy();
    expect(validateColor("hsla(0.25turn, 70%, 89%, 0.1)")).toBeTruthy();
    expect(validateColor("hsl(-30, 70%, 89%)")).toBeTruthy();
    expect(validateColor("hsl(30h, 20, 1)")).toBeFalsy();
  });
  test("can validate named colors", () => {
    expect(validateColor("black")).toBeTruthy();
    expect(validateColor("gray")).toBeTruthy();
    expect(validateColor("white")).toBeTruthy();
    expect(validateColor("dodgerblue")).toBeTruthy();
    expect(validateColor("coral")).toBeTruthy();
    expect(validateColor("evergreen")).toBeFalsy();
  });
});
