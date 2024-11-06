import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Estilos
import { COLORS } from "../styles/COLORS";

// Telas
import AdminCategorias from "../screens/Admin/Categorias";
import Perfil from "../screens/Profile";
import AdminProdutos from "../screens/Admin/Produtos";
import ListUsers from "../screens/Admin/ListaUsuarios";
import QRCodeGenerator from "../screens/Admin/QrcodeGeneretor";
import config from "../screens/Admin/Config";
import PaymentMethods from "../screens/Admin/PaymentMethods";

export type StackParamListAdmin = {
    AdminProdutos: undefined;
    AdminCategorias: undefined;
    Perfil: undefined;
    ListUsers: undefined;
    QRCodeGenerator: undefined;
    Config: undefined;
    PaymentMethods: undefined;
}

const Drawer = createDrawerNavigator<StackParamListAdmin>();

function AdminRoutes() {
    return (
        <Drawer.Navigator
            screenOptions={({ route }) => ({
                headerShown: true,
                headerStyle: {
                    backgroundColor: COLORS.primary,
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
                        case 'PaymentMethods':
                            iconName = focused ? 'card' : 'card-outline';
                            break;
                        case 'Perfil':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        case 'QRCodeGenerator':
                            iconName = focused ? 'qr-code' : 'qr-code-outline';
                            break;
                        case 'Config':
                            iconName = focused ? 'settings' : 'settings-outline';
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
                name="PaymentMethods"
                component={PaymentMethods}
                options={{
                    title: "Métodos de Pagamento",
                }}
            />
            <Drawer.Screen
                name="QRCodeGenerator"
                component={QRCodeGenerator}
                options={{
                    title: "Gerador de QR Code",
                }}
            />
            <Drawer.Screen
                name="Config"
                component={config}
                options={{
                    title: "Configurações",
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
