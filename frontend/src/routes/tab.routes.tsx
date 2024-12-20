import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeContext } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Telas
import {Home} from '../screens/Home';
import Pedidos from '../screens/Orders';
import Carrinho from '../screens/Cart';
import Favoritos from '../screens/Favorites';
import Chat from '../screens/Chat';

// Componente para Customizar a Barra de Navegação
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} theme={theme} />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={Carrinho}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="cart" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="heart" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={Pedidos}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="clipboard" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="chatbubble-ellipses" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
