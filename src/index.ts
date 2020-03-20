import * as colorFuncs from './color';
import * as schemeFuncs from './color/scheme';
import * as variantFuncs from './color/variant';
import * as typographyFuncs from './typography';
import * as scaleFuncs from './scale';

export * from './color/types';
export * from './typography/types';
export * from './scale/types';

/**
 * An object enclosing all {@link Color} functions.
 *
 * Functions:
 *  - {@link hue}
 *  - {@link saturation}
 *  - {@link lightness}
 *  - {@link mix}
 *  - {@link complement}
 *  - {@link negate}
 */
export const color = {
  ...colorFuncs
};

/**
 * An object enclosing all {@link Scheme} functions.
 *
 * Functions:
 *  - {@link complementary}
 *  - {@link analogous}
 *  - {@link triad}
 *  - {@link tetrad}
 */
export const scheme = {
  ...schemeFuncs
};

/**
 * An object enclosing all {@link Variant} functions.
 *
 * Functions:
 *  - {@link create}
 *  - {@link tints}
 *  - {@link tones}
 *  - {@link shades}
 */
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
