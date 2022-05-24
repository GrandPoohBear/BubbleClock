import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';

import {ApplicationProvider} from '@ui-kitten/components';
import {MainScreen} from './src/MainScreen';
import {BACKGROUND_BLACKISH} from './src/colors';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <SafeAreaProvider style={{backgroundColor: BACKGROUND_BLACKISH}}>
        <StatusBar barStyle={'dark-content'} />
        <SafeAreaView>
          <MainScreen />
        </SafeAreaView>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
};

export default App;
