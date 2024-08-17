import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Telas
import Home from '../screens/Home';
import Pesquisa from '../screens/Pesquisa';
import Pedidos from '../screens/Pedidos';
import Carrinho from '../screens/Carrinho';
import Favoritos from '../screens/Favoritos';

// Componente para Customizar a Barra de Navegação
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} />}
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
                name="Pesquisa"
                component={Pesquisa}
                options={{
                    tabBarIcon: ({ color, size }) => <Icon name="search" color={color} size={size} />,
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
                    tabBarIcon: ({ color, size }) => <Icon name="list" color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
}
