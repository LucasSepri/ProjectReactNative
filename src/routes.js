import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Favoritos from './pages/Favoritos';
import Pedidos from './pages/Pedidos';
import Configuracoes from './pages/Configuracoes';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

import CustomTabBar from './components/CustomTabBar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: false,
      tabBarShowLabel: false,
      tabBarInactiveTintColor: '#121212',
      tabBarStyle: {
        borderTopWidth: 0,
        backgroundColor: '#FFF',
      }
    }}
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Cadastro" component={Cadastro} />
  </Stack.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: false,
      tabBarShowLabel: false,
      tabBarInactiveTintColor: '#121212',
      tabBarStyle: {
        borderTopWidth: 0,
        backgroundColor: '#FFF',
      }
    }}
    tabBar={(props) => <CustomTabBar {...props} />}
  >
    <Tab.Screen
      name="Cardapio"
      component={Home}
      options={{ tabBarIcon: "restaurant" }}
    />
    <Tab.Screen
      name="Carrinho"
      component={Carrinho}
      options={{ tabBarIcon: "cart" }}
    />
    <Tab.Screen
      name="Favoritos"
      component={Favoritos}
      options={{ tabBarIcon: "heart" }}
    />
    <Tab.Screen
      name="Pedidos"
      component={Pedidos}
      options={{ tabBarIcon: "clipboard" }}
    />
    <Tab.Screen
      name="Configuracoes"
      component={Login}
      options={{ tabBarIcon: "cog" }}
    />
  </Tab.Navigator>  
);

export function Routes() {
  // You can conditionally render either the login stack or the main tab navigator based on authentication status
  const isAuthenticated = true; // Set to true if the user is authenticated

  return (
    <>
      {isAuthenticated ? (
        <MainTabNavigator />
      ) : (
        <AuthStack />
      )}
    </>
  );
}
