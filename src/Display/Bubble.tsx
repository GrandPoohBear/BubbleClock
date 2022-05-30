import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {Dimensions, StyleSheet, View} from 'react-native';
import {redGradientCLUT} from './BubbleColors';
import {bubbleModel} from './BubbleModel';

type BubbleProps = {
  x: number;
  y: number;
  enabled: boolean;
};

export const Bubble: React.FC<BubbleProps> = ({x, y, enabled}) => {
  // Set the initial position to something random
  const position = useSharedValue({
    left: Math.random() * Dimensions.get('window').width,
    top: Math.random() * Dimensions.get('window').height,
  });

  useEffect(() => {
    position.value = {left: x, top: y};
  }, [position, x, y]);

  const colorChangeIndex = useDerivedValue(() => {
    const target = enabled ? 1 : 0;
    return withTiming(target, {
      duration: bubbleModel.colorChangeDurationMs,
    });
  }, [enabled]);
  const color = useDerivedValue(() => {
    return redGradientCLUT(colorChangeIndex.value);
  }, [colorChangeIndex]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(bubbleModel.leftInset + position.value.left, {
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

      backgroundColor: color.value,
      width: withTiming(bubbleModel.bubbleWidth, {
        duration: bubbleModel.colorChangeDurationMs / 2,
      }),
      height: withTiming(bubbleModel.bubbleWidth, {
        duration: bubbleModel.colorChangeDurationMs / 2,
      }),
      borderRadius: withTiming(bubbleModel.bubbleWidth, {
        duration: bubbleModel.colorChangeDurationMs / 2,
      }),
      borderWidth: withTiming(bubbleModel.bubbleWidth / 4, {
        duration: bubbleModel.colorChangeDurationMs / 2,
      }),
    };
  });

  return (
    <Animated.View
      style={[animatedStyle, styles.bubble, styles.foregroundBubble]}
    />
  );
};

export const StaticBubble: React.FC<BubbleProps> = ({x, y}) => {
  return (
    <View
      style={[
        {
          transform: [
            {translateX: bubbleModel.leftInset + x},
            {translateY: bubbleModel.topOffset + y},
          ],
          backgroundColor: redGradientCLUT(0),
          width: bubbleModel.bubbleWidth,
          height: bubbleModel.bubbleWidth,
          borderRadius: bubbleModel.bubbleWidth,
          borderWidth: bubbleModel.bubbleWidth / 4,
        },
        styles.bubble,
        styles.backgroundBubble,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    borderColor: '#1119',
    borderStyle: 'solid',
  },
  backgroundBubble: {
    zIndex: 0,
  },
  foregroundBubble: {
    zIndex: 1,
  },
});
