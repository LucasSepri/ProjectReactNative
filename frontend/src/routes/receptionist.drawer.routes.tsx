import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Telas
import Perfil from "../screens/Profile";
import ControlleOrder from "../screens/Admin/ControlleOrder";

import { useTheme } from "styled-components";

export type StackParamListAdmin = {
    Perfil: undefined;
    ControlleOrder: undefined;
}

const Drawer = createDrawerNavigator<StackParamListAdmin>();

function AdminRoutes() {
    const theme = useTheme(); // Acessa o tema carregado

    return (
        <Drawer.Navigator
            screenOptions={({ route, navigation }) => ({
                headerShown: true,
                headerStyle: {
                    backgroundColor: theme.primary, // Usando a cor primária
                },
                headerTintColor: theme.color, // Usando a cor branca para o texto do header
                drawerActiveTintColor: theme.primary, // Cor primária para itens ativos do drawer
                drawerIcon: ({ focused, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Perfil':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        default:
                            iconName = 'menu';
                            break;
                        case 'ControlleOrder':
                            iconName = focused ? 'clipboard' : 'clipboard-outline';
                            break;

                    }

                    return <Ionicons name={iconName} size={size} color={focused ? theme.primary : theme.black
                    } />;
                },
            })}
        >
            <Drawer.Screen
                name="ControlleOrder"
                component={ControlleOrder}
                options={{
                    title: "Controle de Pedidos",
                }}
            />
            <Drawer.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    title: "Seus Dados",
                }}
            />

        </Drawer.Navigator >
    );
}

export default AdminRoutes;
