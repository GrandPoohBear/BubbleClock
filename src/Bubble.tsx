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
import {BUBBLE_WIDTH} from './BubbleContainer';
import {redGradient} from './BubbleColors';

type BubbleProps = {
  x: number;
  y: number;
  enabled: boolean;
};

const LEFT_OFFSET = 20;
const TOP_OFFSET = 50;

const SLOW_DURATION_MS = 10000;
const SLOW_VELOCITY = 1;
const SLOW_MASS = 10;
const EASY_STIFFNESS = 20;
const STIFFER_STIFFNESS = 40;

export const Bubble: React.FC<BubbleProps> = ({x, y, enabled}) => {
  const position = useSharedValue({
    left: Math.random() * Dimensions.get('window').width,
    top: Math.random() * Dimensions.get('window').height,
  });

  useEffect(() => {
    position.value = {left: x, top: y};
  }, [position, x, y]);

  const colorProgress = useDerivedValue(() => {
    return withTiming(enabled ? 1 : 0, {duration: SLOW_DURATION_MS});
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: withSpring(LEFT_OFFSET + position.value.left, {
        velocity: SLOW_VELOCITY,
        mass: SLOW_MASS,
        stiffness: EASY_STIFFNESS,
      }),
      top: withSpring(TOP_OFFSET + position.value.top, {
        velocity: SLOW_VELOCITY,
        mass: SLOW_MASS,
        stiffness: STIFFER_STIFFNESS,
      }),
      backgroundColor: interpolateColor(
        colorProgress.value,
        redGradient.inputRange,
        redGradient.outputRange,
      ),
    };
  });

  return <Animated.View style={[animatedStyle, styles.bubble]} />;
};

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    width: BUBBLE_WIDTH,
    height: BUBBLE_WIDTH,
    borderRadius: BUBBLE_WIDTH,
  },
});
