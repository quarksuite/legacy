import { scheme } from '../../src/color';

describe('Color utilities', () => {
  const color = '#348ec9';
  describe('monochromatic(color)', () => {
    test('returns a monochromatic color scheme', () => {
      expect(scheme.monochromatic(color)).toStrictEqual([
        '#348ec9',
        ['#65a9d6', '#96c4e3', '#c8dff0', '#f9fbfd'],
        ['#5195c2', '#6d9bba', '#8aa2b3', '#a6a9ac'],
        ['#2c73a3', '#24597c', '#1c3e56', '#142430']
      ]);
    });
    test('allows a range to be passed', () => {
      expect(scheme.monochromatic(color, 2)).toStrictEqual([
        '#348ec9',
        ['#96c4e3', '#f9fbfd'],
        ['#6d9bba', '#a6a9ac'],
        ['#24597c', '#142430']
      ]);
    });
  });
  describe('complementary(color)', () => {
    test('returns a complementary color scheme', () => {
      expect(scheme.complementary(color)).toStrictEqual([
        [
          '#348ec9',
          ['#65a9d6', '#96c4e3', '#c8dff0', '#f9fbfd'],
          ['#5195c2', '#6d9bba', '#8aa2b3', '#a6a9ac'],
          ['#2c73a3', '#24597c', '#1c3e56', '#142430']
        ],
        [
          '#c96f34',
          ['#d69265', '#e3b496', '#f0d7c8', '#fdfaf9'],
          ['#c27d51', '#ba8b6d', '#b3998a', '#aca8a6'],
          ['#a35b2c', '#7c4624', '#56321c', '#301e14']
        ]
      ]);
    });
  });
  describe('splitComplementary(color)', () => {
    test('returns a split complementary color scheme', () => {
      expect(scheme.splitComplementary(color)).toStrictEqual([
        [
          '#348ec9',
          ['#65a9d6', '#96c4e3', '#c8dff0', '#f9fbfd'],
          ['#5195c2', '#6d9bba', '#8aa2b3', '#a6a9ac'],
          ['#2c73a3', '#24597c', '#1c3e56', '#142430']
        ],
        [
          '#c94a34',
          ['#d67665', '#e3a296', '#f0cdc8', '#fdf9f9'],
          ['#c26151', '#ba786d', '#b38f8a', '#aca7a6'],
          ['#a33d2c', '#7c3124', '#56241c', '#301714']
        ],
        [
          '#c99434',
          ['#d6ae65', '#e3c796', '#f0e1c8', '#fdfbf9'],
          ['#c29951', '#ba9e6d', '#b3a48a', '#aca9a6'],
          ['#a3782c', '#7c5d24', '#56411c', '#302514']
        ]
      ]);
    });
  });
  describe('triadic(color)', () => {
    test('returns a split complementary color scheme', () => {
      expect(scheme.triadic(color)).toStrictEqual([
        [
          '#348ec9',
          ['#65a9d6', '#96c4e3', '#c8dff0', '#f9fbfd'],
          ['#5195c2', '#6d9bba', '#8aa2b3', '#a6a9ac'],
          ['#2c73a3', '#24597c', '#1c3e56', '#142430']
        ],
        [
          '#c9348e',
          ['#d665a9', '#e396c4', '#f0c8df', '#fdf9fb'],
          ['#c25195', '#ba6d9b', '#b38aa2', '#aca6a9'],
          ['#a32c73', '#7c2459', '#561c3e', '#301424']
        ],
        [
          '#8ec934',
          ['#a9d665', '#c4e396', '#dff0c8', '#fbfdf9'],
          ['#95c251', '#9bba6d', '#a2b38a', '#a9aca6'],
          ['#73a32c', '#597c24', '#3e561c', '#243014']
        ]
      ]);
    });
  });
  describe('analogous(color)', () => {
    test('returns an analogous color scheme', () => {
      expect(scheme.analogous(color)).toStrictEqual([
        [
          '#348ec9',
          ['#65a9d6', '#96c4e3', '#c8dff0', '#f9fbfd'],
          ['#5195c2', '#6d9bba', '#8aa2b3', '#a6a9ac'],
          ['#2c73a3', '#24597c', '#1c3e56', '#142430']
        ],
        [
          '#34b3c9',
          ['#65c5d6', '#96d7e3', '#c8eaf0', '#f9fcfd'],
          ['#51b1c2', '#6dafba', '#8aadb3', '#a6aaac'],
          ['#2c91a3', '#246f7c', '#1c4d56', '#142b30']
        ],
        [
          '#3469c9',
          ['#658dd6', '#96b1e3', '#c8d5f0', '#f9fafd'],
          ['#5179c2', '#6d88ba', '#8a98b3', '#a6a7ac'],
          ['#2c56a3', '#24437c', '#1c3056', '#141d30']
        ]
      ]);
    });
  });
  describe('dual(color)', () => {
    test('returns an dual color scheme', () => {
      expect(scheme.dual(color)).toStrictEqual([
        [
          '#348ec9',
          ['#65a9d6', '#96c4e3', '#c8dff0', '#f9fbfd'],
          ['#5195c2', '#6d9bba', '#8aa2b3', '#a6a9ac'],
          ['#2c73a3', '#24597c', '#1c3e56', '#142430']
        ],
        [
          '#3469c9',
          ['#658dd6', '#96b1e3', '#c8d5f0', '#f9fafd'],
          ['#5179c2', '#6d88ba', '#8a98b3', '#a6a7ac'],
          ['#2c56a3', '#24437c', '#1c3056', '#141d30']
        ],
        [
          '#c96f34',
          ['#d69265', '#e3b496', '#f0d7c8', '#fdfaf9'],
          ['#c27d51', '#ba8b6d', '#b3998a', '#aca8a6'],
          ['#a35b2c', '#7c4624', '#56321c', '#301e14']
        ],
        [
          '#c99434',
          ['#d6ae65', '#e3c796', '#f0e1c8', '#fdfbf9'],
          ['#c29951', '#ba9e6d', '#b3a48a', '#aca9a6'],
          ['#a3782c', '#7c5d24', '#56411c', '#302514']
        ]
      ]);
    });
  });
});
