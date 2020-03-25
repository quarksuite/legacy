import * as colorFuncs from './color';
import * as schemeFuncs from './color/scheme';
import * as variantFuncs from './color/variant';
import * as typographyFuncs from './typography';
import * as scaleFuncs from './scale';

export * from './typography/types';
export * from './scale/types';

export const color = {
  ...colorFuncs
};

export const scheme = {
  ...schemeFuncs
};

export const variant = {
  ...variantFuncs
};

/**
 * An object enclosing all {@link Typography} functions.
 *
 * Functions:
 *  - {@link system}
 */
export const typography = {
  ...typographyFuncs
};

/**
 * An object enclosing all {@link Scale} functions.
 *
 * Functions:
 *  - {@link create}
 *  - {@link modify}
 *  - {@link merge}
 *  - {@link output}
 */
export const scale = {
  ...scaleFuncs
};
