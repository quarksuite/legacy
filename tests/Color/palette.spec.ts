import Color from '../../src/color';

describe('Color palette utilities', () => {
  test('Can create tints with defaults', () => {
    const color = new Color('#348ec9');
    expect(color.createTints().paletteState).toStrictEqual([
      'rgb(52, 142, 201)',
      ['rgb(151, 186, 220)', 'rgb(207, 222, 237)', 'rgb(251, 252, 254)']
    ]);
  });
  test('Can lower the contrast of tints', () => {
    const color = new Color('#348ec9');
    expect(color.createTints(72).paletteState).toStrictEqual([
      'rgb(52, 142, 201)',
      ['rgb(133, 176, 215)', 'rgb(181, 204, 229)', 'rgb(218, 229, 241)']
    ]);
  });
  test('Can lower the contrast of tints and output fewer', () => {
    const color = new Color('#348ec9');
    expect(color.createTints(72, 2).paletteState).toStrictEqual([
      'rgb(52, 142, 201)',
      ['rgb(159, 191, 222)', 'rgb(218, 229, 241)']
    ]);
  });
  test('Can create tones with defaults', () => {
    const color = new Color('#348ec9');
    expect(color.createTones().paletteState).toStrictEqual([
      'rgb(52, 142, 201)',
      ['rgb(106, 152, 192)', 'rgb(140, 161, 182)', 'rgb(168, 169, 171)']
    ]);
  });
  test('Can create tones with pure gray', () => {
    const color = new Color('#348ec9');
    expect(color.createTones(100).paletteState).toStrictEqual([
      'rgb(52, 142, 201)',
      ['rgb(107, 152, 191)', 'rgb(142, 161, 181)', 'rgb(170, 170, 170)']
    ]);
  });
  test('Can create more tones', () => {
    const color = new Color('#348ec9');
    expect(color.createTones(72, 8).paletteState).toStrictEqual([
      'rgb(52, 142, 201)',
      [
        'rgb(71, 145, 198)',
        'rgb(86, 147, 196)',
        'rgb(99, 150, 193)',
        'rgb(110, 153, 190)',
        'rgb(120, 155, 188)',
        'rgb(130, 158, 185)',
        'rgb(139, 160, 182)',
        'rgb(147, 163, 179)'
      ]
    ]);
  });
  test('Can create more tones', () => {
    const color = new Color('#348ec9');
    expect(color.createTones(72, 8).paletteState).toStrictEqual([
      'rgb(52, 142, 201)',
      [
        'rgb(71, 145, 198)',
        'rgb(86, 147, 196)',
        'rgb(99, 150, 193)',
        'rgb(110, 153, 190)',
        'rgb(120, 155, 188)',
        'rgb(130, 158, 185)',
        'rgb(139, 160, 182)',
        'rgb(147, 163, 179)'
      ]
    ]);
  });
  test('Can create shades with the defaults', () => {
    const color = new Color('#348ec9');
    expect(color.createShades().paletteState).toStrictEqual([
      'rgb(52, 142, 201)',
      ['rgb(44, 117, 166)', 'rgb(34, 86, 120)', 'rgb(19, 30, 39)']
    ]);
  });
  test('Can create subtler shades', () => {
    const color = new Color('#348ec9');
    expect(color.createShades(69).paletteState).toStrictEqual([
      'rgb(52, 142, 201)',
      ['rgb(46, 125, 177)', 'rgb(40, 105, 148)', 'rgb(32, 80, 113)']
    ]);
  });
  test('Can create fewer, bolder shades', () => {
    const color = new Color('#348ec9');
    expect(color.createShades(100, 2).paletteState).toStrictEqual([
      'rgb(52, 142, 201)',
      ['rgb(39, 101, 143)', 'rgb(17, 17, 17)']
    ]);
  });
});
