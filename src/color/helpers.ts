import convert from './convert';
import { hslData, convertPercentage } from '../convert/helpers';

const linBlend = (c0: string, c1: string, p: number) => {
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

const logBlend = (c0: string, c1: string, p: number) => {
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

export const spin = (color: string, rotation: number = 180) => {
  let [h, s, l] = hslData(convert(color, 'hsl'));

  h = (h + rotation) % 360;
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return convert(`hsl(${h}, ${s}%, ${l}%)`, 'hex');
};

export const blend = (
  color: string,
  target: string,
  amount: number = 50,
  type: 'logarithmic' | 'linear' = 'logarithmic'
) => {
  const c = convert(color, 'rgb');
  const t = convert(target, 'rgb');
  const a = convertPercentage(amount);

  if (type === 'linear') return linBlend(c, t, a);
  return logBlend(c, t, a);
};
