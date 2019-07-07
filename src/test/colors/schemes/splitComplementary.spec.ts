interface ColorSchemeParams {
  base: string;
  options?: ColorAdjustments;
  scheme?: string;
}

interface ColorAdjustments {
  mode: InterpolationMode;
  variants: number;
  intensity?: number;
}

let data: ColorSchemeParams;

describe('basic scheme generation', () => {
  describe('for split complementary schemes', () => {
    test('with a base defined', () => {
      data = {
        base: '#DEADED',
        scheme: 'split complementary'
      };

      const schema = {
        primary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        },
        secondary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        },
        tertiary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        }
      };
    });
  });
  describe('triadic schemes', () => {
    test('with a base defined', () => {
      data = {
        base: '#DEADED',
        scheme: 'triadic'
      };

      const schema = {
        primary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        },
        secondary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        },
        tertiary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        }
      };
    });
  });
  describe('clash schemes', () => {
    test('with a base defined', () => {
      data = {
        base: '#DEADED',
        scheme: 'clash'
      };

      const schema = {
        primary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        },
        secondary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        },
        tertiary: {
          100: { value: expect.any(String) },
          200: { value: expect.any(String) },
          300: { value: expect.any(String) },
          400: { value: expect.any(String) },
          500: { value: expect.any(String) }
        }
      };
    });
  });
});
