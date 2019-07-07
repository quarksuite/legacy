import generateColors from './colors';
import {
  monochromatic,
  complementary,
  splitComplementary,
  analogous
} from './colors/schemes';
import { createCustomColors, createCustomPalette } from './colors/custom';

import generateContent from './content';
import fonts from './content/fonts';
import scale from './content/scale';
import styles from './content/styles';
import leading from './content/leading';

import { writeTokens, buildTokens } from './utils/tokens';

import loadConfig from './config/load';

export const quarks = {
  colors: {
    custom: {
      createColors: createCustomColors,
      createPalette: createCustomPalette
    },
    scheme: { monochromatic, complementary, splitComplementary, analogous },
    generate: generateColors
  },
  content: {
    fonts,
    scale,
    styles,
    leading,
    generate: generateContent
  },
  utils: {
    config: { load: loadConfig },
    writeTokens,
    buildTokens
  }
};
