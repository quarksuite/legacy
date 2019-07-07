describe('Content config', () => {
  describe('generates modular scale', () => {
    test('with defaults', () => {
      const data = { base: '1em', ratio: 1.25, count: 17 };
      const schema = {
        0: { value: expect.any(String) },
        1: { value: expect.any(String) },
        2: { value: expect.any(String) },
        3: { value: expect.any(String) },
        4: { value: expect.any(String) },
        5: { value: expect.any(String) },
        6: { value: expect.any(String) },
        7: { value: expect.any(String) },
        8: { value: expect.any(String) },
        9: { value: expect.any(String) },
        10: { value: expect.any(String) },
        11: { value: expect.any(String) },
        12: { value: expect.any(String) },
        13: { value: expect.any(String) },
        14: { value: expect.any(String) },
        15: { value: expect.any(String) },
        16: { value: expect.any(String) }
      };
    });
    test('with base: 2em', () => {
      const data = { base: '2em', ratio: '1.25' };
      const schema = {
        0: { value: expect.any(String) },
        1: { value: expect.any(String) },
        2: { value: expect.any(String) },
        3: { value: expect.any(String) },
        4: { value: expect.any(String) },
        5: { value: expect.any(String) },
        6: { value: expect.any(String) },
        7: { value: expect.any(String) },
        8: { value: expect.any(String) },
        9: { value: expect.any(String) },
        10: { value: expect.any(String) },
        11: { value: expect.any(String) },
        12: { value: expect.any(String) },
        13: { value: expect.any(String) },
        14: { value: expect.any(String) },
        15: { value: expect.any(String) },
        16: { value: expect.any(String) }
      };
    });
    test('with ratio: 1.618 (golden)', () => {
      const data = { base: '1em', ratio: 1.618 };
      const schema = {
        0: { value: expect.any(String) },
        1: { value: expect.any(String) },
        2: { value: expect.any(String) },
        3: { value: expect.any(String) },
        4: { value: expect.any(String) },
        5: { value: expect.any(String) },
        6: { value: expect.any(String) },
        7: { value: expect.any(String) },
        8: { value: expect.any(String) },
        9: { value: expect.any(String) },
        10: { value: expect.any(String) },
        11: { value: expect.any(String) },
        12: { value: expect.any(String) },
        13: { value: expect.any(String) },
        14: { value: expect.any(String) },
        15: { value: expect.any(String) },
        16: { value: expect.any(String) }
      };
    });
  });
});
