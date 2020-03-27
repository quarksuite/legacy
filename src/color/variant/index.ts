import { createBlend } from '../utils';
import { curry } from '../../toolbox';
import { a11y } from '../';

const create = curry(4, createBlend);

export const blend = create;
export const tints = create(a11y('white'));
export const tones = create(a11y('gray'));
export const shades = create(a11y('black'));
