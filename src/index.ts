import * as colors from './toolkit/colors';
import * as custom from './colors/custom';
import * as scheme from './colors/scheme';

import * as content from './toolkit/content';
import * as fonts from './content/fonts';
import * as scale from './content/scale';

import * as tokenize from './toolkit/tokenize';

/**
 * Exposes the public API of Quarksilver
 *
 * Modules:
 *  + colors - responsible for color transformations and
 *  scheme generation. Exports several convenience functions
 *    + colors.custom - for custom palettes and swatch collections
 *    + colors.scheme - for basic color scheme generation
 *  + content - responsible for content output and transformations
 *    + content.fonts - for outputing font tokens
 *    + content.scale - for sizing and proportion scales
 *  + toolkit - the baremetal utilities of Quarksilver
 *    + toolkit.colors - all color utilities
 *    + toolkit.composition - all composition utilities
 * */
export default {
  colors: { custom, scheme },
  content: { fonts, scale },
  toolkit: { colors, content, tokenize }
};
