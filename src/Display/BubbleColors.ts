import {
  BubbleGradient,
  makeColorLookupTable,
} from '../utility/ColorLookUpTable';

const redGradient: BubbleGradient = {
  inputRange: [0, 0.5, 1],
  outputRange: [
    'rgba(30,30,30,0.5)',

    'rgba(255,0,255, 0.5)', //magenta

    'rgba(255, 0, 0, 0.95)', //red
  ],
};
export const redGradientCLUT = makeColorLookupTable(redGradient);
