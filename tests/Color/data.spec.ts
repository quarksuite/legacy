import Color from '../../src/color';

describe('Color data utilities', () => {
  test('original color is preserved for reference', () => {
    const color = new Color('#348ec9');
    expect(
      color
        .shiftHue(420)
        .mix('red')
        .neutralize().baseState
    ).toBe('rgb(52, 142, 201)');
  });
  test('swatch is is tracked through its transformations', () => {
    const color = new Color('#348ec9');
    expect(
      color
        .shiftHue(420)
        .mix('red')
        .neutralize().swatchState
    ).toBe('rgb(148, 128, 147)');
  });
  test('schemes allow further transformation via native Array methods', () => {
    const color = new Color('#348ec9');
    expect(
      color
        .shiftHue(420)
        .mix('red')
        .neutralize()
        .createTriadicScheme(25)
        .schemeState.map(
          swatch => new Color(swatch).createTetradicScheme().schemeState
        )
    ).toStrictEqual([
      [
        'rgb(148, 128, 147)',
        'rgb(127, 148, 128)',
        'rgb(148, 139, 127)',
        'rgb(127, 137, 148)'
      ],
      [
        'rgb(135, 148, 127)',
        'rgb(140, 127, 148)',
        'rgb(127, 146, 148)',
        'rgb(148, 130, 127)'
      ],
      [
        'rgb(127, 148, 137)',
        'rgb(148, 127, 138)',
        'rgb(127, 127, 148)',
        'rgb(148, 148, 127)'
      ]
    ]);
  });
  test('chaining basic color schemes is allowed', () => {
    const color = new Color('#348ec9');
    expect(
      color.createComplementaryScheme().createAnalogousScheme().schemeState
    ).toStrictEqual([
      'rgb(52, 142, 201)',
      'rgb(203, 112, 52)',
      'rgb(52, 203, 150)',
      'rgb(75, 52, 203)'
    ]);
  });
});
