/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import {BubbleContainer} from './src/Display/BubbleContainer';
import {BACKGROUND_BLACKISH} from './src/colors';

const App = () => {
  return (
    <SafeAreaProvider style={{backgroundColor: BACKGROUND_BLACKISH}}>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView>
        <BubbleContainer />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
