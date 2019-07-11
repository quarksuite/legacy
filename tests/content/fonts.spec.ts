describe('Content config', () => {
  describe('generates font tokens', () => {
    test('with primary', () => {
      const data = {
        primary: {
          name: 'Roboto',
          stack: ['system-ui', 'sans-serif'],
          styles: ['200', '400', '400i', '700', '900']
        }
      };
      const schema = {
        primary: {
          metadata: {
            name: expect.any(String),
            styles: expect.any(Object)
          },
          value: expect.any(String)
        }
      };
    });
    test('with secondary', () => {
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
        }
      };
      const schema = {
        primary: {
          metadata: {
            name: expect.any(String),
            styles: expect.any(Object)
          },
          value: expect.any(String)
        },
        secondary: {
          metadata: {
            name: expect.any(String),
            styles: expect.any(Object)
          },
          value: expect.any(String)
        }
      };
    });
    test('with code', () => {
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
        primary: {
          metadata: {
            name: expect.any(String),
            styles: expect.any(Object)
          },
          value: expect.any(String)
        },
        secondary: {
          metadata: {
            name: expect.any(String),
            styles: expect.any(Object)
          },
          value: expect.any(String)
        },
        code: {
          metadata: {
            name: expect.any(String),
            styles: expect.any(Object)
          },
          value: expect.any(String)
        }
      };
    });
  });
});
