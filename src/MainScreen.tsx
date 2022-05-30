import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BubbleContainer} from './Display/BubbleContainer';

import {TimerControls} from './Timer/TimerControls';
import {observer} from 'mobx-react-lite';
import {SafeAreaView} from 'react-native-safe-area-context';
import {bubbleModel} from './Display/BubbleModel';

export const MainScreen = observer(() => {
  return (
    <SafeAreaView>
      <View style={styles.fullScreenAbsolute}>
        <BubbleContainer />
      </View>
      <View
        style={[
          styles.timerControls,
          {
            marginTop:
              bubbleModel.currentFont.charHeight *
                bubbleModel.bubbleWidth *
                1.25 +
              bubbleModel.safeAreaInsets.top +
              50,
          },
        ]}>
        <TimerControls />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  fullScreenAbsolute: {position: 'absolute', top: 0, left: 0, right: 0},
  timerControls: {
    flex: 1,
    minHeight: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
