import { Color } from '../../src/color';

describe('Some sample workflows working with palettes', () => {
  test('Scenario: a single monochromatic color scheme', () => {
    const base = new Color('gainsboro');
    expect(base.createTints().createShades(85, 2).palettes).toStrictEqual([
      'rgb(220, 220, 220)',
      [
        'rgb(232, 232, 232)',
        'rgb(243, 243, 243)',
        'rgb(254, 254, 254)',
        'rgb(167, 167, 167)',
        'rgb(87, 87, 87)'
      ]
    ]);
  });
  test("Scenario: Quarksuite's own color palette", () => {
    const palette = new Color('#348ec9')
      .createTriad()
      .schemes.map((swatch, index) => {
        if (index === 0)
          return new Color(swatch).createTints().createShades(97, 2).palettes;
        return swatch;
      });
    expect(palette).toStrictEqual([
      [
        'rgb(52, 142, 201)',
        [
          'rgb(151, 186, 220)',
          'rgb(207, 222, 237)',
          'rgb(251, 252, 254)',
          'rgb(39, 103, 145)',
          'rgb(19, 30, 39)'
        ]
      ],
      'rgb(203, 52, 143)',
      'rgb(143, 203, 52)'
    ]);
  });
});
