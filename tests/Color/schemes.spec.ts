import Color from '../../src/color';

describe('Color scheme utilities', () => {
  test('can create a complementary scheme', () => {
    const color = new Color('#348ec9');
    expect(color.createComplementaryScheme().schemeState).toStrictEqual([
      'rgb(52, 142, 201)',
      'rgb(203, 112, 52)'
    ]);
  });
  test('can create an analogous scheme with default options', () => {
    const color = new Color('#348ec9');
    expect(color.createAnalogousScheme().schemeState).toStrictEqual([
      'rgb(52, 203, 150)',
      'rgb(52, 142, 201)',
      'rgb(75, 52, 203)'
    ]);
  });
  test('can create an analogous scheme with less spread', () => {
    const color = new Color('#348ec9');
    expect(color.createAnalogousScheme(30).schemeState).toStrictEqual([
      'rgb(52, 203, 188)',
      'rgb(52, 142, 201)',
      'rgb(52, 67, 203)'
    ]);
  });
  test('can create a pure triad', () => {
    const color = new Color('#348ec9');
    expect(color.createTriadicScheme().schemeState).toStrictEqual([
      'rgb(52, 142, 201)',
      'rgb(203, 52, 143)',
      'rgb(143, 203, 52)'
    ]);
  });
  test('can create a triad with less contrast', () => {
    const color = new Color('#348ec9');
    expect(color.createTriadicScheme(30).schemeState).toStrictEqual([
      'rgb(52, 142, 201)',
      'rgb(203, 52, 67)',
      'rgb(203, 188, 52)'
    ]);
  });
  test('can create a pure tetrad', () => {
    const color = new Color('#348ec9');
    expect(color.createTetradicScheme().schemeState).toStrictEqual([
      'rgb(52, 142, 201)',
      'rgb(203, 112, 52)',
      'rgb(188, 52, 203)',
      'rgb(67, 203, 52)'
    ]);
  });
  test('can create a tetrad with less contrast', () => {
    const color = new Color('#348ec9');
    expect(color.createTetradicScheme(30).schemeState).toStrictEqual([
      'rgb(52, 142, 201)',
      'rgb(203, 112, 52)',
      'rgb(52, 67, 203)',
      'rgb(203, 188, 52)'
    ]);
  });
});
