import { loadPalette, getComplement, split, spread } from "../../src/utils/colors";

describe('color utilities', () => {
  const color = '#ff0000';
  describe('loadPalette(color, options?)', () => {
    test('loads a given color with tints and shades', () => {
      const schema = {
        100: { value: expect.any(String)},
        200: { value: expect.any(String)},
        300: { value: expect.any(String)},
        400: { value: expect.any(String)},
        500: { value: expect.any(String)},
        600: { value: expect.any(String)},
        700: { value: expect.any(String)},
        800: { value: expect.any(String)},
        900: { value: expect.any(String)}
      }

      expect(loadPalette(color)).toMatchObject(schema)
    })
  })

  describe('getComplement(color)', () => {
    test('fetches the complement of a given color', () => {
      expect(getComplement(color)).toBe('#00ffff')
    })
  })

  describe('split(color, distance?)', () => {
    test('returns a tuple of the colors adjacent to color', () => {
      expect(split(color)).toStrictEqual(['#ff007f', '#ff8000'])
    })
    test('with distance = 45', () => {
      expect(split(color, 45)).toStrictEqual(['#ff00bf', '#ffbf00'])
    })
    test('with distance = 75', () => {
      expect(split(color, 75)).toStrictEqual(['#bf00ff', '#bfff00'])
    })
    test('with distance = 90 (clash)', () => {
      expect(split(color, 90)).toStrictEqual(['#7f00ff', '#80ff00'])
    })
    test('with distance = 120 (triad)', () => {
      expect(split(color, 120)).toStrictEqual(['#0000ff', '#00ff00'])
    })
  })
  describe('spread(color, rotation?)', () => {
    test('returns a range of colors fanned from base', () => {
      expect(spread(color)).toStrictEqual(['#ff00ff', '#ffa6a6', '#ffff00'])
    })
  })
})
