import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Telas
import AdminCategorias from "../screens/Admin/Categorias";
import Perfil from "../screens/Profile";
import AdminProdutos from "../screens/Admin/Produtos";
import ListUsers from "../screens/Admin/ListaUsuarios";
import QRCodeGenerator from "../screens/Admin/QrcodeGeneretor";
import config from "../screens/Admin/Config";
import PaymentMethods from "../screens/Admin/PaymentMethods";
import FilesList from "../screens/Admin/FilesList";
import AtendimentoOn from "../screens/Admin/AtendimentoOn";
import ControlleOrder from "../screens/Admin/ControlleOrder";
import SalesScreen from "../screens/Admin/SalesScreen";
import Employees from "../screens/Admin/Employees";

import { useTheme } from "styled-components";

export type StackParamListAdmin = {
    AdminProdutos: undefined;
    AdminCategorias: undefined;
    Perfil: undefined;
    ListUsers: undefined;
    QRCodeGenerator: undefined;
    Config: undefined;
    PaymentMethods: undefined;
    FilesList: undefined;
    AtendimentoOn: undefined;
    ControlleOrder: undefined;
    SalesScreen: undefined;
    Employees: undefined;
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
                            break;
                        case 'FilesList':
                            iconName = focused ? 'document-attach' : 'document-attach-outline';
                            break;
                        case 'AtendimentoOn':
                            iconName = focused ? 'chatbox' : 'chatbox-outline';
                            break;
                        case 'ControlleOrder':
                            iconName = focused ? 'clipboard' : 'clipboard-outline';
                            break;
                        case 'SalesScreen':
                            iconName = focused ? 'analytics' : 'analytics-outline';
                            break;
                        case 'Employees':
                            iconName = focused ? 'people' : 'people-outline';
                            break;

                    }

                    return <Ionicons name={iconName} size={size} color={focused ? theme.primary : theme.black
                    } />;
                },
            })}
        >
            <Drawer.Screen
                name="Config"
                component={config}
                options={{
                    title: "Configurações",
                }}
            />
            <Drawer.Screen
                name="SalesScreen"
                component={SalesScreen}
                options={{
                    title: "Vendas",
                }}
            />
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
                name="PaymentMethods"
                component={PaymentMethods}
                options={{
                    title: "Métodos de Pagamento",
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
                name="ControlleOrder"
                component={ControlleOrder}
                options={{
                    title: "Controle de Pedidos",
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
                name="FilesList"
                component={FilesList}
                options={{
                    title: "Arquivos",
                }}
            />
            <Drawer.Screen
                name="Employees"
                component={Employees}
                options={{
                    title: "Funcionários",
                }}
            />
            <Drawer.Screen
                name="AtendimentoOn"
                component={AtendimentoOn}
                options={{
                    title: "Atendimento Online",
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
