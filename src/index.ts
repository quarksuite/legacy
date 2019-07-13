import * as ColorsKit from './colors/kit';

/**
 * Exposes the public API of Quarksilver
 *
 * Modules:
 *  + colors - responsible for color transformations and
 *  scheme generation. Exports several convenience functions
 *    + colors.custom - for custom palettes and swatch collections
 *    + colors.scheme - for basic color scheme generation
 *    + colors.kit - for the bare metal of working with colors
 * */
export default {
  colors: {
    kit: ColorsKit
  }
};
