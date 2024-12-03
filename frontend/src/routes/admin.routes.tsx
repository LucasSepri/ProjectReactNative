import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import EditarPerfil from "../screens/EditarPerfil";
import AdminRoutes from "./drawer.routes";
import MapScreen from "../screens/Map";
import Endereco from "../screens/Address";
import QrcodeGerneretor from "../screens/Admin/QrcodeGeneretor";
import Config from "../screens/Admin/Config";
import PaymentMethods from "../screens/Admin/PaymentMethods";
import AddProduct from "../screens/Admin/AddProduct";
import ChatAtendimento from "../screens/Admin/ChatAtendimento";
import OrderDetails from "../screens/OrderDetails";
import EmployeeDetail from "../screens/Admin/AddEmployees";

import { useTheme } from "styled-components";

// Definindo os tipos de rotas
export type StackParamList = {
    ListUsers: undefined;
    EditarPerfil: undefined;
    AdminRoutes: undefined;
    MapScreen: {
        address: string;
        latitude: number;
        longitude: number;
        complement: string;
        referencePoint: string;
        zip: string;
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        state: string;
        isVisualize: boolean;
        addForUser: boolean;
        returnScreen: string;
    };
    Endereco: {
        addForUser: boolean;
        returnScreen: string;
     };
    QrcodeGerneretor: undefined;
    Config: undefined;
    PaymentMethods: undefined;
    AddProduct: {
        productId: string;
    };
    ChatAtendimento: {
        chatId: string;
    };
    OrderDetails: {
        orderId: string;
    };
    EmployeeDetail: {
        id: string;
    };
}

const Stack = createStackNavigator<StackParamList>();

function AppRoutes() {
    const theme = useTheme();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AdminRoutes"
                component={AdminRoutes}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditarPerfil"
                component={EditarPerfil}
                options={{
                    headerShown: true,
                    title: "Editar Perfil",
                    headerStyle: {
                        backgroundColor: theme.background,
                    },
                    headerTintColor: theme.white,
                }}
            />
            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    title: "Mapa",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }} />
            <Stack.Screen
                name="Endereco"
                component={Endereco}
                options={{
                    title: "Endereco",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }} />
            <Stack.Screen
                name="QrcodeGerneretor"
                component={QrcodeGerneretor}
                options={{
                    title: "Gerador de QrCode",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }} />
            <Stack.Screen
                name="Config"
                component={Config}
                options={{
                    title: "Configurações",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }} />
            <Stack.Screen
                name="PaymentMethods"
                component={PaymentMethods}
                options={{
                    title: "Métodos de Pagamento",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }} />
            <Stack.Screen
                name="AddProduct"
                component={AddProduct}
                options={{
                    title: "Adicionar Produto",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }} />
            <Stack.Screen
                name="ChatAtendimento"
                component={ChatAtendimento}
                options={{
                    title: "Chat de Atendimento",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }} />
            <Stack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{
                    title: "Detalhes da Compra",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white
                }}
            />
            <Stack.Screen
                name="EmployeeDetail"
                component={EmployeeDetail}
                options={{
                    title: "Ficha do Funcionário",
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.white,
                }} />

        </Stack.Navigator>
    );
}

export default AppRoutes;