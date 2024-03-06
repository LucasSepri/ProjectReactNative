import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import Ionicons from '@expo/vector-icons/Ionicons';

import Home from './src/pages/Home';
import Tarefas from './src/pages/Tarefas';
import Clientes from './src/pages/Clientes';
import Login from './src/pages/Login';


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Tarefas') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Clientes') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tarefas" component={Tarefas} />
      <Tab.Screen name="Clientes" component={Clientes} />
    </Tab.Navigator>
  );
}


export default function app() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Tarefas"
          component={Tarefas}
          options={{
            title: 'Meu Aplicativo',
            headerStyle: {
              backgroundColor: '#3f64c7'
            },
            headerTintColor: '#FFF'
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}



