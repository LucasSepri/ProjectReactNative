<<<<<<< HEAD

import React from 'react';
// import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


import { Routes } from './src/routes'

// Corrijir
// Replace this import statement
// import { ViewPropTypes } from 'react-native';
// With this import statement
// import { ViewPropTypes } from 'deprecated-react-native-prop-types';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
          <Routes />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
=======
import { View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

import COLORS from './src/styles/COLORS';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.dark} barStyle="light-content" translucent={false} />
      <Routes />
    </NavigationContainer>
  );
}

>>>>>>> d1a297fc9f8517b4c00f95c014f4289073d843c8
