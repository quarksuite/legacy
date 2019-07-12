/**
 * Exposes the Quarksilver core API for usage
 * You can also import individual modules.
 */

import * as Custom from './colors/custom';
import * as Scheme from './colors/scheme';
import * as SwatchKit from './utils/colors';

/**
 * Public API
 */
export default {
  Colors: {
    Custom,
    Scheme,
    SwatchKit
  }
}
