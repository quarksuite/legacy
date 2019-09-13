export const linBlend = (c0: string, c1: string, p: number) => {
  var i = parseInt,
    r = Math.round,
    P = 1 - p,
    [a, b, c, d] = c0.split(','),
    [e, f, g, h] = c1.split(','),
    x = d || h,
    d = x
      ? ',' +
        (!d
          ? h
          : !h
          ? d
          : r((parseFloat(d) * P + parseFloat(h) * p) * 1000) / 1000 + ')')
      : ')';
  return (
    'rgb' +
    (x ? 'a(' : '(') +
    r(
      i(a[3] == 'a' ? a.slice(5) : a.slice(4)) * P +
        i(e[3] == 'a' ? e.slice(5) : e.slice(4)) * p
    ) +
    ',' +
    r(i(b) * P + i(f) * p) +
    ',' +
    r(i(c) * P + i(g) * p) +
    d
  );
};

export const logBlend = (c0: string, c1: string, p: number) => {
  var i = parseInt,
    r = Math.round,
    P = 1 - p,
    [a, b, c, d] = c0.split(','),
    [e, f, g, h] = c1.split(','),
    x = d || h,
    d = x
      ? ',' +
        (!d
          ? h
          : !h
          ? d
          : r((parseFloat(d) * P + parseFloat(h) * p) * 1000) / 1000 + ')')
      : ')';
  return (
    'rgb' +
    (x ? 'a(' : '(') +
    r(
      (P * i(a[3] == 'a' ? a.slice(5) : a.slice(4)) ** 2 +
        p * i(e[3] == 'a' ? e.slice(5) : e.slice(4)) ** 2) **
        0.5
    ) +
    ',' +
    r((P * i(b) ** 2 + p * i(f) ** 2) ** 0.5) +
    ',' +
    r((P * i(c) ** 2 + p * i(g) ** 2) ** 0.5) +
    d
  );
};
