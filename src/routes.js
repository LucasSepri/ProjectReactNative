import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Favoritos from './pages/Favoritos';
import Pedidos from './pages/Pedidos';
import Configuracoes from './pages/Configuracoes';

import CustomTabBar from './components/CustomTabBar';

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
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
        name="Home"
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
        component={Configuracoes}
        options={{ tabBarIcon: "cog" }}
      />
    </Tab.Navigator>
  );
}