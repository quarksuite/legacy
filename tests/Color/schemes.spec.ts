import { c } from '../../src/color';

describe('Color scheme utilities', () => {
  test('can create a complementary scheme', () => {
    const color = c('#348ec9');
    expect(color.createComplementary().schemes).toStrictEqual([
      'rgb(52, 142, 201)',
      'rgb(203, 112, 52)'
    ]);
  });
  test('can create an analogous scheme with default options', () => {
    const color = c('#348ec9');
    expect(color.createAnalogous().schemes).toStrictEqual([
      'rgb(52, 203, 150)',
      'rgb(52, 142, 201)',
      'rgb(75, 52, 203)'
    ]);
  });
  test('can create an analogous scheme with less spread', () => {
    const color = c('#348ec9');
    expect(color.createAnalogous(30).schemes).toStrictEqual([
      'rgb(52, 203, 188)',
      'rgb(52, 142, 201)',
      'rgb(52, 67, 203)'
    ]);
  });
  test('can create a pure triad', () => {
    const color = c('#348ec9');
    expect(color.createTriad().schemes).toStrictEqual([
      'rgb(52, 142, 201)',
      'rgb(203, 52, 143)',
      'rgb(143, 203, 52)'
    ]);
  });
  test('can create a triad with less contrast', () => {
    const color = c('#348ec9');
    expect(color.createTriad(30).schemes).toStrictEqual([
      'rgb(52, 142, 201)',
      'rgb(203, 52, 67)',
      'rgb(203, 188, 52)'
    ]);
  });
  test('can create a pure tetrad', () => {
    const color = c('#348ec9');
    expect(color.createTetrad().schemes).toStrictEqual([
      'rgb(52, 142, 201)',
      'rgb(203, 112, 52)',
      'rgb(188, 52, 203)',
      'rgb(67, 203, 52)'
    ]);
  });
  test('can create a tetrad with less contrast', () => {
    const color = c('#348ec9');
    expect(color.createTetrad(30).schemes).toStrictEqual([
      'rgb(52, 142, 201)',
      'rgb(203, 112, 52)',
      'rgb(52, 67, 203)',
      'rgb(203, 188, 52)'
    ]);
  });
});
