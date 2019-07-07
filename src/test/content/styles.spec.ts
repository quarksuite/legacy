describe('Content config', () => {
  describe('generates style tokens', () => {
    test('with one font', () => {
      const data = {
        primary: {
          name: 'Roboto',
          stack: ['system-ui', 'sans-serif'],
          styles: ['200', '400', '400i', '700', '900']
        }
      };
      const schema = {
        extralight: { value: expect.any(String) },
        regular: { value: expect.any(String) },
        bold: { value: expect.any(String) },
        black: { value: expect.any(String) }
      };
    });
    test('with multiple fonts', () => {
      const data = {
        primary: {
          name: 'Roboto',
          stack: ['system-ui', 'sans-serif'],
          styles: ['400', '400i', '700']
        },
        secondary: {
          name: 'Merriweather',
          stack: ['system-ui', 'serif'],
          styles: ['200', '900']
        },
        code: {
          name: 'Space Mono',
          stack: ['system-ui', 'monospace'],
          styles: ['400', '700']
        }
      };
      const schema = {
        extralight: { value: expect.any(String) },
        regular: { value: expect.any(String) },
        bold: { value: expect.any(String) },
        black: { value: expect.any(String) }
      };
    });
    test('all weights', () => {
      const data = {
        primary: {
          name: 'Roboto',
          stack: ['system-ui', 'sans-serif'],
          styles: [
            '100',
            '100i',
            '200',
            '200i',
            '300',
            '300i',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900'
          ]
        }
      };
      const schema = {
        hairline: { value: expect.any(String) },
        extralight: { value: expect.any(String) },
        light: { value: expect.any(String) },
        regular: { value: expect.any(String) },
        medium: { value: expect.any(String) },
        semibold: { value: expect.any(String) },
        bold: { value: expect.any(String) },
        extrabold: { value: expect.any(String) },
        black: { value: expect.any(String) }
      };
    });
  });
});
