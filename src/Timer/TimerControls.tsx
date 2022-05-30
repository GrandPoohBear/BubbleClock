import React, {useCallback, useState, useEffect} from 'react';
import {Button, ButtonGroup} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';
import {View, StyleSheet} from 'react-native';
import {timerModel} from './TimerModel';
import {bubbleModel} from '../Display/BubbleModel';
import {denseFont} from '../Font/BubbleFontDense';
import {sparseFont} from '../Font/BubbleFontSparse';
import {tinyFont} from '../Font/BubbleFontTiny';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  withTiming,
} from 'react-native-reanimated';

export const TimerControls = observer(() => {
  const [timerDuration, setTimerDuration] = useState(1);
  const animationProgress = useSharedValue(1);

  useEffect(() => {
    animationProgress.value = withTiming(timerModel.isRunning ? 0 : 1);
  });

  const startTimer = useCallback(() => {
    timerModel.startTimer(timerDuration * 60);
  }, [timerDuration]);

  const set1Minute = useCallback(() => {
    setTimerDuration(1);
    timerModel.setInitialTimeString('100');
  }, []);

  const set3Minute = useCallback(() => {
    setTimerDuration(3);
    timerModel.setInitialTimeString('300');
  }, []);

  const set5Minute = useCallback(() => {
    setTimerDuration(5);
    timerModel.setInitialTimeString('500');
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      animationProgress.value,
      [0, 1],
      ['#00000000', '#25023099'],
    );
    return {
      borderColor: color,
      backgroundColor: color,
      opacity: withTiming(animationProgress.value),
    };
  });

  return (
    <Animated.View
      pointerEvents={timerModel.isRunning ? 'none' : 'auto'}
      style={[animatedStyle, styles.container]}>
      <View style={styles.spacer} />
      <View style={styles.buttonContainer}>
        <ButtonGroup appearance="filled" status="control">
          <Button
            onPress={set1Minute}
            disabled={timerModel.isRunning}
            appearance={timerDuration === 1 ? 'filled' : 'outline'}>
            1 m
          </Button>
          <Button
            onPress={set3Minute}
            disabled={timerModel.isRunning}
            appearance={timerDuration === 3 ? 'filled' : 'outline'}>
            3 m
          </Button>
          <Button
            onPress={set5Minute}
            disabled={timerModel.isRunning}
            appearance={timerDuration === 5 ? 'filled' : 'outline'}>
            5 m
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            disabled={timerModel.isRunning}
            onPress={() => bubbleModel.setFont(tinyFont)}>
            Sm
          </Button>
          <Button
            disabled={timerModel.isRunning}
            onPress={() => bubbleModel.setFont(sparseFont)}>
            Med
          </Button>
          <Button
            disabled={timerModel.isRunning}
            onPress={() => bubbleModel.setFont(denseFont)}>
            Lrg
          </Button>
        </ButtonGroup>
      </View>
      <View>
        <Button
          style={styles.startButton}
          status="info"
          disabled={timerModel.isRunning}
          onPress={startTimer}>
          {'Start'}
        </Button>
      </View>
      <View style={styles.spacer} />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  spacer: {
    maxWidth: 50,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderWidth: 20,
    borderRadius: 20,
  },
  startButton: {flex: 1, marginLeft: 10},
  buttonContainer: {
    alignItems: 'center',
  },
});
