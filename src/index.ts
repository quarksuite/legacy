import * as colors from './toolkit/colors';
import * as custom from './colors/custom';
import * as scheme from './colors/scheme';

import * as content from './toolkit/content';
import * as fonts from './content/fonts';
import * as scale from './composition/scale';

/**
 * Exposes the public API of Quarksilver
 *
 * Modules:
 *  + colors - responsible for color transformations and
 *  scheme generation. Exports several convenience functions
 *    + colors.custom - for custom palettes and swatch collections
 *    + colors.scheme - for basic color scheme generation
 *  + content - responsible for content
 *    + content.fonts - for outputing font tokens
 *    + content.styles - for creating a modular scale that encompasses
 *    typography and composition
 *  + composition - responsible for layout
 *    + composition.scale - for content proportion
 *    + composition.spacing - uniform spacing units
 *  + toolkit - the baremetal utilities of Quarksilver
 * */
export default {
  colors: { custom, scheme },
  content: {
    fonts
    // styles
  },
  composition: {
    scale
    // spacing
  },
  toolkit: { colors, content }
};
