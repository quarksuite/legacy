import {BasicPaletteSchema} from '../../utils/interfaces';
import {Utility} from '../../utils';

export const Scheme = {
  monochromatic(data: BasicPaletteSchema) {
    const { base, options = {}, neutral, } = data;
    return neutral ? {
      primary: Utility.loadPalette(base, options),
      neutral
    } : {
      primary: Utility.loadPalette(base, options)
    }
  }
}
