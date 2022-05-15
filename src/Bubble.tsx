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

type BubbleProps = {
  x: number;
  y: number;
  enabled: boolean;
};

const BUBBLE_COLORS = {
  true: 'rgba(256, 0, 0, 1.0)',
  false: 'rgba(30,30,30,1.0)',
};

const LEFT_OFFSET = 20;
const TOP_OFFSET = 50;

const SLOW_DURATION_MS = 10000;
const SLOW_VELOCITY = 0.1;
const SLOW_MASS = 10;

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
      }),
      top: withSpring(TOP_OFFSET + position.value.top, {
        velocity: SLOW_VELOCITY,
        mass: SLOW_MASS,
      }),
      backgroundColor: interpolateColor(
        colorProgress.value,
        [0, 1],
        [BUBBLE_COLORS.false, BUBBLE_COLORS.true],
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
