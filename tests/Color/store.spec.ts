import { Color, ColorData } from '../../src/color';

describe('Color attribute utilities', () => {
  test('original color is preserved for reference', () => {
    const color = new Color('#348ec9');
    expect(
      color
        .shiftHue(420)
        .mix('red')
        .neutralize().originalValue
    ).toBe('rgb(52, 142, 201)');
  });
  test('swatch is tracked through its transformations', () => {
    const color = new Color('#348ec9');
    expect(
      color
        .shiftHue(420)
        .mix('red')
        .neutralize().value
    ).toBe('rgb(142, 142, 120)');
  });
  test('can collect data', () => {
    const color = new Color('#348ec9');
    const data = color
      .shiftHue(420)
      .mix('red')
      .neutralize()
      .createTriad(25).data;

    const ColorDataSchema: ColorData = {
      origin: expect.any(String),
      current: expect.any(String),
      scheme: expect.any(Array),
      variation: expect.any(Array),
      palette: expect.any(Array)
    };
    expect(data).toMatchObject(ColorDataSchema);
  });
});
