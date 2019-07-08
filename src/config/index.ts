import {CustomPaletteSchema, CustomSwatchSchema, BasicPaletteSchema} from '../utils/interfaces';

const defaults = {
  colors: {
    base: '#aaaaaa'
  },
  content: {
    fonts: {
      system: {
        name: 'System Sans',
        stack: [
          '-apple-system',
          'BlinkMacSystemFont',
          'avenir next',
          'avenir',
          'helvetica neue',
          'helvetica',
          'Ubuntu',
          'roboto',
          'noto',
          'segoe ui',
          'arial',
          'sans-serif'
        ],
        styles: ['400', '400i', '700']
      }
    },
    scale: {
      base: '1em',
      ratio: 1.25
    }
  }
};

export const Config = {
  defaults,
  init(data: BasicPaletteSchema | CustomSwatchSchema & CustomPaletteSchema) {
    return data;
  }
}
