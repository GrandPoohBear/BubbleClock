import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import {Dimensions, StyleSheet} from 'react-native';
import {redGradient} from './BubbleColors';
import {bubbleModel} from './BubbleModel';

type BubbleProps = {
  x: number;
  y: number;
  enabled: boolean;
};

export const Bubble: React.FC<BubbleProps> = ({x, y, color}) => {
  // Set the initial position to something random
  const position = useSharedValue({
    left: Math.random() * Dimensions.get('window').width,
    top: Math.random() * Dimensions.get('window').height,
  });

  useEffect(() => {
    position.value = {left: x, top: y};
  }, [position, x, y]);

  const colorProgress = useDerivedValue(() => {
    return withTiming(enabled ? 1 : 0, {
      duration: bubbleModel.colorChangeDurationMs,
    });
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(bubbleModel.leftOffset + position.value.left, {
            velocity: bubbleModel.springVelocity,
            mass: bubbleModel.springMass,
            stiffness: bubbleModel.springEasyStiffness,
          }),
        },
        {
          translateY: withSpring(bubbleModel.topOffset + position.value.top, {
            velocity: bubbleModel.springVelocity,
            mass: bubbleModel.springMass,
            stiffness: bubbleModel.springStiffStiffness,
          }),
        },
      ],

      backgroundColor: interpolateColor(
        colorProgress.value,
        redGradient.inputRange,
        redGradient.outputRange,
      ),
      width: withTiming(bubbleModel.bubbleWidth, {
        duration: bubbleModel.colorChangeDurationMs / 2,
      }),
      height: withTiming(bubbleModel.bubbleWidth, {
        duration: bubbleModel.colorChangeDurationMs / 2,
      }),
      borderRadius: withTiming(bubbleModel.bubbleWidth, {
        duration: bubbleModel.colorChangeDurationMs / 2,
      }),
    };
  });

  return <Animated.View style={[animatedStyle, styles.bubble]} />;
};

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
  },
});
