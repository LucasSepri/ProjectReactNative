import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Estilos
import { COLORS } from "../styles/COLORS";

// Telas
import AdminCategorias from "../screens/Admin/Categorias";
import Perfil from "../screens/Perfil";
import AdminProdutos from "../screens/Admin/Produtos";
import ListUsers from "../screens/Admin/ListaUsuarios";

export type StackParamListAdmin = {
    AdminProdutos: undefined;
    AdminCategorias: undefined;
    Perfil: undefined;
    ListUsers: undefined;
}

const Drawer = createDrawerNavigator<StackParamListAdmin>();

function AdminRoutes() {
    return (
        <Drawer.Navigator
            screenOptions={({ route }) => ({
                headerShown: true,
                headerStyle: {
                    backgroundColor: COLORS.dark,
                },
                headerTintColor: COLORS.white,
                drawerActiveTintColor: COLORS.primary,
                drawerIcon: ({ focused, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'ListUsers':
                            iconName = focused ? 'people' : 'people-outline';
                            break;
                        case 'AdminCategorias':
                            iconName = focused ? 'pricetags' : 'pricetags-outline';
                            break;
                        case 'AdminProdutos':
                            iconName = focused ? 'cube' : 'cube-outline';
                            break;
                        case 'Perfil':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        default:
                            iconName = 'menu';
                    }

                    return <Ionicons name={iconName} size={size} color={focused ? COLORS.primary : COLORS.black} />;
                },
            })}
        >
            <Drawer.Screen
                name="ListUsers"
                component={ListUsers}
                options={{
                    title: "Lista de Usuários",
                }}
            />
            <Drawer.Screen
                name="AdminCategorias"
                component={AdminCategorias}
                options={{
                    title: "Controle de Categorias",
                }}
            />
            <Drawer.Screen
                name="AdminProdutos"
                component={AdminProdutos}
                options={{
                    title: "Controle de Produtos",
                }}
            />
            <Drawer.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    title: "Seus Dados",
                }}
            />
        </Drawer.Navigator>
    );
}

export default AdminRoutes;
