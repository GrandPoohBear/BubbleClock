import {makeAutoObservable} from 'mobx';
import {Dimensions, ScaledSize} from 'react-native';
import {DISPLAY_DOTS_WIDTH} from './BubbleFont';

class BubbleModel {
  windowDimensions = Dimensions.get('window');
  leftOffset = 0;
  topOffset = 50;
  refreshIntervalMs = 10000;

  colorChangeDurationMs = 10000;
  springVelocity = 1;
  springMass = 10;
  springEasyStiffness = 20;
  springStiffStiffness = 40;

  constructor() {
    Dimensions.addEventListener('change', ({window}) => {
      this.setWindowDimensions(window);
    });

    makeAutoObservable(this);
  }

  get bubbleWidth() {
    return this.windowDimensions.width / (1.25 * DISPLAY_DOTS_WIDTH);
  }

  get interBubbleSpace() {
    return (this.windowDimensions.width / (1.25 * DISPLAY_DOTS_WIDTH)) * 0.25;
  }

  setWindowDimensions = (windowDimensions: ScaledSize) => {
    this.windowDimensions = windowDimensions;
  };
}

export const bubbleModel = new BubbleModel();
