import { c } from '../../src/color';

describe('Color variation utilities', () => {
  test('Can create tints with defaults', () => {
    const color = c('#348ec9');
    expect(color.createTints().variations).toStrictEqual([
      'rgb(151, 186, 220)',
      'rgb(207, 222, 237)',
      'rgb(251, 252, 254)'
    ]);
  });
  test('Can lower the contrast of tints', () => {
    const color = c('#348ec9');
    expect(color.createTints(72).variations).toStrictEqual([
      'rgb(133, 176, 215)',
      'rgb(181, 204, 229)',
      'rgb(218, 229, 241)'
    ]);
  });
  test('Can lower the contrast of tints and output fewer', () => {
    const color = c('#348ec9');
    expect(color.createTints(72, 2).variations).toStrictEqual([
      'rgb(159, 191, 222)',
      'rgb(218, 229, 241)'
    ]);
  });
  test('Can create tones with defaults', () => {
    const color = c('#348ec9');
    expect(color.createTones().variations).toStrictEqual([
      'rgb(106, 152, 192)',
      'rgb(140, 161, 182)',
      'rgb(168, 169, 171)'
    ]);
  });
  test('Can create tones with pure gray', () => {
    const color = c('#348ec9');
    expect(color.createTones(100).variations).toStrictEqual([
      'rgb(107, 152, 191)',
      'rgb(142, 161, 181)',
      'rgb(170, 170, 170)'
    ]);
  });
  test('Can create more tones', () => {
    const color = c('#348ec9');
    expect(color.createTones(72, 8).variations).toStrictEqual([
      'rgb(71, 145, 198)',
      'rgb(86, 147, 196)',
      'rgb(99, 150, 193)',
      'rgb(110, 153, 190)',
      'rgb(120, 155, 188)',
      'rgb(130, 158, 185)',
      'rgb(139, 160, 182)',
      'rgb(147, 163, 179)'
    ]);
  });
  test('Can create shades with the defaults', () => {
    const color = c('#348ec9');
    expect(color.createShades().variations).toStrictEqual([
      'rgb(44, 117, 166)',
      'rgb(34, 86, 120)',
      'rgb(19, 30, 39)'
    ]);
  });
  test('Can create subtler shades', () => {
    const color = c('#348ec9');
    expect(color.createShades(69).variations).toStrictEqual([
      'rgb(46, 125, 177)',
      'rgb(40, 105, 148)',
      'rgb(32, 80, 113)'
    ]);
  });
  test('Can create fewer, bolder shades', () => {
    const color = c('#348ec9');
    expect(color.createShades(100, 2).variations).toStrictEqual([
      'rgb(39, 101, 143)',
      'rgb(17, 17, 17)'
    ]);
  });
  test('Can chain variations', () => {
    const color = c('#348ec9');
    expect(color.createTints().createShades(100, 2).variations).toStrictEqual([
      'rgb(151, 186, 220)',
      'rgb(207, 222, 237)',
      'rgb(251, 252, 254)',
      'rgb(39, 101, 143)',
      'rgb(17, 17, 17)'
    ]);
  });
  test('Can go on and on and on', () => {
    const color = c('#348ec9');
    expect(
      color
        .createTints()
        .createShades(100, 2)
        .createBlend('red', 80, 4)
        .createBlend('green')
        .createBlend('blue', 50, 8).variations
    ).toStrictEqual([
      'rgb(151, 186, 220)',
      'rgb(207, 222, 237)',
      'rgb(251, 252, 254)',
      'rgb(39, 101, 143)',
      'rgb(17, 17, 17)',
      'rgb(123, 127, 180)',
      'rgb(166, 110, 156)',
      'rgb(200, 90, 127)',
      'rgb(229, 64, 90)',
      'rgb(43, 138, 165)',
      'rgb(31, 133, 119)',
      'rgb(9, 128, 35)',
      'rgb(50, 137, 205)',
      'rgb(49, 133, 209)',
      'rgb(47, 128, 212)',
      'rgb(45, 123, 216)',
      'rgb(43, 118, 219)',
      'rgb(41, 112, 223)',
      'rgb(39, 107, 226)',
      'rgb(37, 100, 230)'
    ]);
  });
});
