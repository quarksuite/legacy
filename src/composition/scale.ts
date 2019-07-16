import { ContentScaleSchema } from '../schema';
import { scaleValues } from '../toolkit/content';

export const tokenize = (data: ContentScaleSchema): object => {
  const { base, ratio, limit = 'full' } = data;
  let count = 0;
  let scale = [];

  if (limit === 'full') count = 17;
  if (limit === 'half') count = 9;

  for (let i = 0; i < count; i++) scale.push(scaleValues(i, { base, ratio }));

  return scale
    .map((value: number) =>
      [parseFloat(value.toPrecision(4)), base.replace(/[0-9.]+/g, '')].join('')
    )
    .reduce((container, value: string, i: number) => {
      return { ...container, ...{ [i]: { value } } };
    }, {});
};
