import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BubbleContainer} from './Display/BubbleContainer';

import {TimerControls} from './Timer/TimerControls';
import {observer} from 'mobx-react-lite';
import {SafeAreaView} from 'react-native-safe-area-context';

export const MainScreen = observer(() => {
  return (
    <SafeAreaView>
      <View style={styles.fullScreenAbsolute}>
        <BubbleContainer />
      </View>
      <View style={styles.container}>
        <View style={[styles.timerControls]}>
          <TimerControls />
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
  },
  fullScreenAbsolute: {position: 'absolute', top: 0, left: 0, right: 0},
  timerControls: {
    minHeight: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
