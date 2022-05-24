import {makeAutoObservable} from 'mobx';
import {Dimensions, ScaledSize} from 'react-native';
import {DISPLAY_DOTS_WIDTH} from './BubbleFont';
import {EdgeInsets} from 'react-native-safe-area-context';
class BubbleModel {
  windowDimensions = Dimensions.get('window');
  safeAreaInsets: EdgeInsets = {bottom: 0, left: 0, right: 0, top: 0};
  leftInset = 20;
  topOffset = 50;
  refreshIntervalSecs = 10;

  colorChangeDurationMs = 10500;
  springVelocity = 1.5;
  springMass = 11;
  springEasyStiffness = 20;
  springStiffStiffness = 40;

  constructor() {
    Dimensions.addEventListener('change', ({window}) => {
      this.setWindowDimensions(window);
    });

    makeAutoObservable(this);
  }

  get bubbleWidth() {
    return (
      (this.windowDimensions.width -
        (this.safeAreaInsets.left + this.safeAreaInsets.right) -
        2 * this.leftInset) /
      (1.25 * DISPLAY_DOTS_WIDTH)
    );
  }

  get interBubbleSpace() {
    return this.bubbleWidth * 0.25;
  }

  setWindowDimensions = (windowDimensions: ScaledSize) => {
    this.windowDimensions = windowDimensions;
  };

  setSafeAreaInsets = (safeAreaInsets: EdgeInsets) => {
    this.safeAreaInsets = safeAreaInsets;
  };
}

export const bubbleModel = new BubbleModel();
