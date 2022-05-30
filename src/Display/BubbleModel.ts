import {makeAutoObservable} from 'mobx';
import {Dimensions, ScaledSize} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {BubbleFont} from '../Font/BubbleFont';
import {SPACE_BETWEEN_CHARS, COLON_WIDTH} from '../Font/constants';
import {sparseFont} from '../Font/BubbleFontSparse';

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

  currentFont: BubbleFont = sparseFont;

  constructor() {
    Dimensions.addEventListener('change', ({window}) => {
      this.setWindowDimensions(window);
    });

    makeAutoObservable(this);
  }

  get gridWidth() {
    return (this.currentFont.charWidth + SPACE_BETWEEN_CHARS) * 3 + COLON_WIDTH;
  }

  get bubbleWidth() {
    return (
      (this.windowDimensions.width -
        (this.safeAreaInsets.left + this.safeAreaInsets.right) -
        2 * this.leftInset) /
      (1.25 * this.gridWidth)
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

  setFont = (font: BubbleFont) => {
    this.currentFont = font;
  };
}

export const bubbleModel = new BubbleModel();
