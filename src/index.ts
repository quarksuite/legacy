import * as ColorsKit from './colors/kit';
import * as Custom from './colors/custom';

/**
 * Exposes the public API of Quarksilver
 *
 * Modules:
 *  + colors - responsible for color transformations and
 *  scheme generation. Exports several convenience functions
 *    + colors.custom - for custom palettes and swatch collections
 *    + colors.scheme - for basic color scheme generation
 *    + colors.kit - for the utilities of working with colors
 * */
export default {
  colors: {
    custom: Custom,
    kit: ColorsKit
  }
};
