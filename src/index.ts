import * as custom from './colors/custom';
import * as scheme from './colors/scheme';

import * as colors from './toolkit/colors';
import * as content from './toolkit/content';
import * as tokenize from './toolkit/tokenize';

/**
 * Exposes the public API of Quarksilver
 *
 * Modules:
 *  + colors - responsible for color transformations and
 *  scheme generation. Exports several convenience functions
 *    + colors.custom - for custom palettes and swatch collections
 *    + colors.scheme - for basic color scheme generation
 *  + toolkit - the baremetal utilities of Quarksilver
 *    + toolkit.colors - all color utilities
 *    + toolkit.content - all content utilities
 *    + toolkit.tokenize - utilities that format design data for
 *    transformation into design tokens
 * */
export default {
  colors: { custom, scheme },
  toolkit: { colors, content, tokenize }
};
