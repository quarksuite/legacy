import { createBlend } from '../utils';
import { curry } from '../../toolbox';

const create = curry(4, createBlend);

export const blend = create;
export const tints = create('#fff');
export const tones = create('#aaa');
export const shades = create('#111');
