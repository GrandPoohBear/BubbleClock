import {bubbleModel} from '../Display/BubbleModel';
import {interpolateColor} from 'react-native-reanimated';
import {sortedIndex} from './sortedIndex';

export interface BubbleGradient {
  inputRange: number[];
  outputRange: string[];
}

export const makeColorLookupTable = (gradient: BubbleGradient) => {
  'worklet';
  const numSteps = (60 * bubbleModel.colorChangeDurationMs) / 1000;
  const stepSize = 1 / numSteps;

  const timeValues = Array(numSteps);
  const colorValues = Array(numSteps);

  for (let i = 0; i < numSteps; i++) {
    const thisTime = stepSize * i;
    const thisColor = interpolateColor(
      thisTime,
      gradient.inputRange,
      gradient.outputRange,
    );
    timeValues[i] = thisTime;
    colorValues[i] = thisColor;
  }

  return (timeValue: number) => {
    'worklet';
    const index = sortedIndex(timeValues, timeValue);
    const color = colorValues[Math.max(index - 1, 0)];
    return color;
  };
};
