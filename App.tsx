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

