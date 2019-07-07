describe('basic scheme generation', () => {
  describe('for monochromatic schemes (default)', () => {
    test('with a base defined', () => {
      const data = {
        base: '#DEADED'
      };

      const schema = {
        primary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        }
      };
    });
    test('with a contrast intensity', () => {
      const data = {
        base: '#DEADED',
        options: {
          intensity: 0.5
        }
      };

      const schema = {
        primary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        }
      };
    });
    test('with fewer colors', () => {
      const data = {
        base: '#DEADED',
        options: {
          colors: 2
        }
      };

      const schema = {
        primary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) }
        }
      };
    });
    test('with more colors', () => {
      const data = {
        base: '#DEADED',
        options: {
          colors: 4
        }
      };

      const schema = {
        primary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) },
          600: { value: expect.any(String) },
          700: { value: expect.any(String) }
        }
      };
    });
  });
});
