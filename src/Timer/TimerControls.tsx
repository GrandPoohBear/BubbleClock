import React, {useCallback, useState} from 'react';
import {Button, ButtonGroup} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';
import {View, StyleSheet} from 'react-native';
import {timerModel} from './TimerModel';

export const TimerControls = observer(() => {
  const [timerDuration, setTimerDuration] = useState(1);

  const startTimer = useCallback(() => {
    timerModel.startTimer(timerDuration * 60);
  }, [timerDuration]);

  const stopTimer = useCallback(() => {
    timerModel.stopTimer();
  }, []);

  const set1Minute = useCallback(() => {
    setTimerDuration(1);
    timerModel.setInitialTimeString('0100');
  }, []);

  const set3Minute = useCallback(() => {
    setTimerDuration(3);
    timerModel.setInitialTimeString('0300');
  }, []);

  const set5Minute = useCallback(() => {
    setTimerDuration(5);
    timerModel.setInitialTimeString('0500');
  }, []);

  return (
    <View style={styles.container}>
      <ButtonGroup appearance="filled" status="control">
        <Button
          onPress={set1Minute}
          disabled={timerModel.isRunning}
          appearance={timerDuration === 1 ? 'filled' : 'outline'}>
          1 min
        </Button>
        <Button
          onPress={set3Minute}
          disabled={timerModel.isRunning}
          appearance={timerDuration === 3 ? 'filled' : 'outline'}>
          3 min
        </Button>
        <Button
          onPress={set5Minute}
          disabled={timerModel.isRunning}
          appearance={timerDuration === 5 ? 'filled' : 'outline'}>
          5 min
        </Button>
      </ButtonGroup>

      <Button
        style={styles.startButton}
        status="info"
        onPress={timerModel.isRunning ? stopTimer : startTimer}>
        {timerModel.isRunning ? 'Stop' : 'Start'}
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: 50,
    paddingRight: 50,
    justifyContent: 'space-between',
  },
  startButton: {},
});
