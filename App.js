
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
